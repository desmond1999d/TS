import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

/** Injected during SSR render so HttpClient uses the Express /api proxy origin. */
export const REQUEST_ORIGIN = new InjectionToken<string>('REQUEST_ORIGIN');

/** Public site origin from the incoming request (e.g. https://ton-service.by). */
export const REQUEST_PUBLIC_ORIGIN = new InjectionToken<string>('REQUEST_PUBLIC_ORIGIN');

/** Express request, provided during SSR only. */
export const SSR_REQUEST = new InjectionToken<unknown>('SSR_REQUEST');

/** Express response, provided during SSR only. */
export const SSR_RESPONSE = new InjectionToken<{ status(code: number): void }>('SSR_RESPONSE');

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function provideApiBaseUrl() {
  return {
    provide: API_BASE_URL,
    useFactory: () => normalizeBaseUrl(environment.apiUrl),
  };
}
