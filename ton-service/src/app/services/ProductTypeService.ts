import {ProductType} from '../shared/ProductType';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from "./http.service";

@Injectable()
export class ProductTypeService {

  constructor(private http: HttpClient) {
  }

  public getTopServiceHierarchy(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('/api/product-types');
  }

  public getHorizontalReferences(parentProductTypeId: number): Observable<ProductType[]> {
    let params = new HttpParams().set('productTypeId', parentProductTypeId.toString());
    return this.http.get<ProductType[]>('/api/product-types/horizontal-reference', {params: params, headers: HttpService.httpOptions.headers});
  }

  public getCategoryById(parentProductTypeId: number): Observable<ProductType> {
    let params = new HttpParams().set('productTypeId', parentProductTypeId.toString());
    return this.http.get<ProductType>('/api/product-types/by-id', {params: params, headers: HttpService.httpOptions.headers});
  }
}
