import {ProductType} from '../shared/ProductType';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from "./http.service";

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

  constructor(private http: HttpClient) {
  }

  public getTopServiceHierarchy(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(HttpService.url + '/api/product-types/', {headers: HttpService.httpOptions.headers});
  }

  public getTopServiceHierarchyWithThumbnails(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(HttpService.url + '/api/product-types/thumbnails', {headers: HttpService.httpOptions.headers});
  }

  public getTopServiceHierarchyWithExamples(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(HttpService.url + '/api/product-types/with-example', {headers: HttpService.httpOptions.headers});
  }

  public getHorizontalReferences(parentProductTypeId: number): Observable<ProductType[]> {
    let params = new HttpParams().set('productTypeId', parentProductTypeId.toString());
    return this.http.get<ProductType[]>(HttpService.url + '/api/product-types/horizontal-reference', {params: params, headers: HttpService.httpOptions.headers});
  }

  public getCategoryById(productTypeId: number): Observable<ProductType> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.get<ProductType>(HttpService.url + '/api/product-types/by-id', {params: params, headers: HttpService.httpOptions.headers});
  }

  public updateCategoryById(productTypeId: number, typeDescription: string): Observable<ProductType> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.post<ProductType>(HttpService.url + '/api/product-types/update-description', typeDescription,
      {params: params, headers: HttpService.httpOptions.headers});
  }
}
