import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { REQUEST_PUBLIC_ORIGIN } from './api-url';

@Injectable({ providedIn: 'root' })
export class CanonicalService {

  constructor(
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST_PUBLIC_ORIGIN) private publicOrigin: string | null,
  ) {
  }

  setCanonical(path: string): void {
    const href = this.buildUrl(path);
    this.metaService.updateTag({ rel: 'canonical', href });
  }

  buildUrl(path: string): string {
    const normalizedPath = this.normalizePath(path);
    const origin = this.resolveOrigin();
    return origin ? `${origin}${normalizedPath}` : normalizedPath;
  }

  resolveOrigin(): string {
    if (this.publicOrigin) {
      return this.publicOrigin.replace(/\/$/, '');
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }

  normalizePath(path: string): string {
    let normalized = path.split('?')[0].split('#')[0];
    if (!normalized.startsWith('/')) {
      normalized = `/${normalized}`;
    }
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized.toLowerCase();
  }
}
