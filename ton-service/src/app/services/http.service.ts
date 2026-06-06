import {Inject, Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {API_BASE_URL} from './api-url';

@Injectable()
export class HttpService {

  public static readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string) {}

  /** Builds a request URL; uses a relative /api path when base is empty (Docker / SSR transfer cache). */
  apiUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return this.baseUrl ? this.baseUrl + normalizedPath : normalizedPath;
  }

}
