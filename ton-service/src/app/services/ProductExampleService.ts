import {Inject, Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {ProductExample} from '../shared/ProductExample';
import {HttpService} from './http.service';

@Injectable()
export class ProductExampleService {

  private readonly cache = new Map<string, Observable<unknown>>();

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
  }

  public getProductExamplesByTypeId(productTypeId: number): Observable<ProductExample[]> {
    const params = new HttpParams().set('productTypeId', productTypeId.toString());
    const cacheKey = `productExamples.${productTypeId}`;
    return this.cachedGet(
      cacheKey,
      makeStateKey<ProductExample[]>(cacheKey),
      this.httpService.apiUrl('/api/product-examples'),
      params,
    );
  }

  public getProductExamplesByTypeIdNp(productTypeId: number): Observable<ProductExample[]> {
    const params = new HttpParams().set('productTypeId', productTypeId.toString());
    const cacheKey = `productExamplesNp.${productTypeId}`;
    return this.cachedGet(
      cacheKey,
      makeStateKey<ProductExample[]>(cacheKey),
      this.httpService.apiUrl('/api/product-examples/np'),
      params,
    );
  }

  public getProductExampleById(productTypeId: number): Observable<ProductExample> {
    const params = new HttpParams().set('id', productTypeId.toString());
    const cacheKey = `productExampleById.${productTypeId}`;
    return this.cachedGet(
      cacheKey,
      makeStateKey<ProductExample>(cacheKey),
      this.httpService.apiUrl('/api/product-examples/by-id'),
      params,
    );
  }

  public getProductCategoryPreview(productTypeId: number): Observable<ProductExample[]> {
    const params = new HttpParams().set('productTypeId', productTypeId.toString());
    const cacheKey = `productCategoryPreview.${productTypeId}`;
    return this.cachedGet(
      cacheKey,
      makeStateKey<ProductExample[]>(cacheKey),
      this.httpService.apiUrl('/api/product-examples/category-examples'),
      params,
    );
  }

  private cachedGet<T>(
    cacheKey: string,
    stateKey: StateKey<T>,
    url: string,
    params?: HttpParams,
  ): Observable<T> {
    const existing = this.cache.get(cacheKey);
    if (existing) {
      return existing as Observable<T>;
    }

    let request$: Observable<T>;
    if (this.transferState.hasKey(stateKey)) {
      const data = this.transferState.get(stateKey, null as T);
      this.transferState.remove(stateKey);
      request$ = of(data);
    } else {
      request$ = this.http.get<T>(url, {
        params,
        headers: HttpService.httpOptions.headers,
      }).pipe(
        tap(data => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(stateKey, data);
          }
        }),
      );
    }

    const shared$ = request$.pipe(shareReplay(1));
    this.cache.set(cacheKey, shared$);
    return shared$;
  }
}
