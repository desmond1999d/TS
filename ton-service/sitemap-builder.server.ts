import * as http from 'node:http';
import * as https from 'node:https';
import {
  collectPathsFromDemesnes,
  collectPathsFromHierarchy,
  mergeSitemapPaths,
  SitemapDemesne,
  SitemapProductType,
  STATIC_PATHS,
} from './sitemap-builder';

let cachedPaths: string[] | null = null;
let cacheExpiry = 0;

const DEFAULT_CACHE_TTL_MS = 60 * 60 * 1000;

export function resetSitemapCache(): void {
  cachedPaths = null;
  cacheExpiry = 0;
}

function fetchJson<T>(apiBackend: string, apiPath: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const backend = new URL(apiBackend);
    const path = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
    const requestFn = backend.protocol === 'https:' ? https.request : http.request;

    const request = requestFn(
      {
        hostname: backend.hostname,
        port: backend.port || (backend.protocol === 'https:' ? 443 : 80),
        path,
        method: 'GET',
        headers: { Accept: 'application/json' },
      },
      (response) => {
        const chunks: Buffer[] = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          if ((response.statusCode ?? 500) >= 400) {
            reject(new Error(`API ${path} returned ${response.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(body) as T);
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    request.on('error', reject);
    request.end();
  });
}

export function fetchProductTypes(apiBackend: string): Promise<SitemapProductType[]> {
  return fetchJson<SitemapProductType[]>(apiBackend, '/api/product-types/');
}

export function fetchDemesnes(apiBackend: string): Promise<SitemapDemesne[]> {
  return fetchJson<SitemapDemesne[]>(apiBackend, '/api/demesne');
}

export async function buildSitemapPaths(apiBackend: string): Promise<string[]> {
  const ttl = Number(process.env['SITEMAP_CACHE_TTL_MS'] || DEFAULT_CACHE_TTL_MS);
  const now = Date.now();

  if (cachedPaths && now < cacheExpiry) {
    return cachedPaths;
  }

  try {
    const [productTypes, demesnes] = await Promise.all([
      fetchProductTypes(apiBackend),
      fetchDemesnes(apiBackend),
    ]);

    const paths = mergeSitemapPaths(
      STATIC_PATHS,
      collectPathsFromHierarchy(productTypes),
      collectPathsFromDemesnes(demesnes),
    );

    cachedPaths = paths;
    cacheExpiry = now + ttl;
    return paths;
  } catch (error) {
    console.error('Failed to build sitemap paths:', error);
    if (cachedPaths) {
      return cachedPaths;
    }
    return [...STATIC_PATHS];
  }
}
