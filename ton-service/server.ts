import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import * as express from 'express';
import { existsSync } from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import { join } from 'node:path';
import {
  REQUEST_ORIGIN,
  REQUEST_PUBLIC_ORIGIN,
  SSR_REQUEST,
  SSR_RESPONSE,
} from './src/app/services/api-url';
import { buildSitemapPaths } from './sitemap-builder.server';
import { renderSitemapXml } from './sitemap-builder';
import AppServerModule from './src/main.server';

function createApiProxy(backendUrl: string): express.RequestHandler {
  return (req, res, next) => {
    const backend = new URL(backendUrl);
    const path = `/api${req.url}`;
    const requestFn = backend.protocol === 'https:' ? https.request : http.request;

    const proxyReq = requestFn(
      {
        hostname: backend.hostname,
        port: backend.port || (backend.protocol === 'https:' ? 443 : 80),
        path,
        method: req.method,
        headers: { ...req.headers, host: backend.host },
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    proxyReq.on('error', next);

    if (req.method === 'GET' || req.method === 'HEAD') {
      proxyReq.end();
    } else {
      req.pipe(proxyReq);
    }
  };
}

function getPublicOrigin(req: express.Request): string {
  const protocol = (req.get('x-forwarded-proto') || req.protocol || 'http').split(',')[0].trim();
  const host = (req.get('x-forwarded-host') || req.get('host') || '').split(',')[0].trim();
  return `${protocol}://${host}`;
}

function splitPathAndQuery(url: string): { path: string; query: string } {
  const queryIndex = url.indexOf('?');
  if (queryIndex === -1) {
    return { path: url, query: '' };
  }
  return {
    path: url.slice(0, queryIndex),
    query: url.slice(queryIndex),
  };
}

function createSeoRedirectMiddleware(): express.RequestHandler {
  return (req, res, next) => {
    const host = (req.get('x-forwarded-host') || req.get('host') || '').split(',')[0].trim();
    const { path, query } = splitPathAndQuery(req.originalUrl);
    const origin = getPublicOrigin(req);

    if (/^\/index\.(html|php)$/i.test(path)) {
      res.redirect(301, `${origin}/${query}`);
      return;
    }

    if (host.toLowerCase().startsWith('www.')) {
      const bareHost = host.slice(4);
      const protocol = (req.get('x-forwarded-proto') || req.protocol || 'https').split(',')[0].trim();
      res.redirect(301, `${protocol}://${bareHost}${path}${query}`);
      return;
    }

    if (/[A-Z]/.test(path) && !/\.[a-zA-Z0-9]+$/.test(path) && !path.startsWith('/api')) {
      res.redirect(301, `${origin}${path.toLowerCase()}${query}`);
      return;
    }

    if (path.length > 1 && path.endsWith('/')) {
      res.redirect(301, `${origin}${path.slice(0, -1)}${query}`);
      return;
    }

    next();
  };
}

function renderRobots(publicOrigin: string): string {
  const origin = publicOrigin.replace(/\/$/, '');
  return [
    '# Allow all URLs (see https://www.robotstxt.org/robotstxt.html)',
    `Host: ${origin}`,
    'User-agent: *',
    'Disallow: /admin/*',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ton-service/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();
  const apiBackend = process.env['API_URL'] || 'http://localhost:1739';
  const listenPort = Number(process.env['PORT'] || 4000);

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use('/api', createApiProxy(apiBackend));
  server.use(createSeoRedirectMiddleware());

  server.get('/sitemap.xml', async (req, res, next) => {
    try {
      const paths = await buildSitemapPaths(apiBackend);
      res.type('application/xml');
      res.send(renderSitemapXml(getPublicOrigin(req), paths));
    } catch (error) {
      next(error);
    }
  });

  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(renderRobots(getPublicOrigin(req)));
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { originalUrl, baseUrl } = req;

    if (originalUrl.startsWith('/admin')) {
      res.sendFile(indexHtml);
      return;
    }

    const internalOrigin = `http://127.0.0.1:${listenPort}`;
    const publicOrigin = getPublicOrigin(req);

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${internalOrigin}${originalUrl}`,
        publicPath: distFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: REQUEST_ORIGIN, useValue: internalOrigin },
          { provide: REQUEST_PUBLIC_ORIGIN, useValue: publicOrigin },
          { provide: SSR_REQUEST, useValue: req },
          { provide: SSR_RESPONSE, useValue: res },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = Number(process.env['PORT'] || 4000);

  // Start up the Node server
  const server = app();
  server.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://0.0.0.0:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default AppServerModule;
