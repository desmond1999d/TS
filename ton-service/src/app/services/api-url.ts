import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

/** Injected during SSR render so HttpClient uses the Express /api proxy origin. */
export const REQUEST_ORIGIN = new InjectionToken<string>('REQUEST_ORIGIN');

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
