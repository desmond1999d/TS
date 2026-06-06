import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST_ORIGIN } from './api-url';

/** Prepends the loopback origin during SSR so relative /api requests reach the Express proxy. */
@Injectable()
export class SsrOriginInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const origin = inject(REQUEST_ORIGIN, { optional: true });
    if (origin && req.url.startsWith('/api')) {
      return next.handle(req.clone({ url: origin + req.url }));
    }
    return next.handle(req);
  }
}
