import {Inject, Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {ProductType} from '../shared/ProductType';
import {HttpService} from './http.service';

const TOP_HIERARCHY_KEY = makeStateKey<ProductType[]>('topServiceHierarchy');
const TOP_HIERARCHY_WITH_EXAMPLES_KEY = makeStateKey<ProductType[]>('topServiceHierarchyWithExamples');

@Injectable()
export class ProductTypeService {

  public static SORT_FUNCTION = (a, b) => {
    if (a.children.length == 0 && b.children.length == 0) {
      return a.displayOrder - b.displayOrder;
    } else if (a.children.length != 0 && b.children.length == 0) {
      return -1;
    } else if (a.children.length == 0 && b.children.length != 0) {
      return 1;
    } else {
      return a.displayOrder - b.displayOrder;
    }
  };

  private readonly cache = new Map<string, Observable<unknown>>();

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
  }

  public getTopServiceHierarchy(): Observable<ProductType[]> {
    return this.cachedGet(
      'topServiceHierarchy',
      TOP_HIERARCHY_KEY,
      this.httpService.apiUrl('/api/product-types/'),
    );
  }

  public getTopServiceHierarchyWithExamples(): Observable<ProductType[]> {
    return this.cachedGet(
      'topServiceHierarchyWithExamples',
      TOP_HIERARCHY_WITH_EXAMPLES_KEY,
      this.httpService.apiUrl('/api/product-types/with-example'),
    );
  }

  public getHorizontalReferences(parentProductTypeId: number): Observable<ProductType[]> {
    const params = new HttpParams().set('productTypeId', parentProductTypeId.toString());
    const cacheKey = `horizontalReferences.${parentProductTypeId}`;
    const stateKey = makeStateKey<ProductType[]>(cacheKey);
    return this.cachedGet(
      cacheKey,
      stateKey,
      this.httpService.apiUrl('/api/product-types/horizontal-reference'),
      params,
    );
  }

  public getCategoryById(productTypeId: number): Observable<ProductType> {
    const params = new HttpParams().set('productTypeId', productTypeId.toString());
    const cacheKey = `categoryById.${productTypeId}`;
    const stateKey = makeStateKey<ProductType>(cacheKey);
    return this.cachedGet(
      cacheKey,
      stateKey,
      this.httpService.apiUrl('/api/product-types/by-id'),
      params,
    );
  }

  public updateCategoryById(productTypeId: number, typeDescription: string): Observable<ProductType> {
    const params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.post<ProductType>(
      this.httpService.apiUrl('/api/product-types/update-description'),
      typeDescription,
      {params: params, headers: HttpService.httpOptions.headers}
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
