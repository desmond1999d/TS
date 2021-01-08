import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductExample} from "../shared/ProductExample";
import {HttpService} from "./http.service";

@Injectable()
export class ProductExampleService {

  constructor(private http: HttpClient) {
  }

  public getProductExamplesByTypeId(productTypeId: number): Observable<ProductExample[]> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.get<ProductExample[]>(HttpService.url + '/api/product-examples', {params: params, headers: HttpService.httpOptions.headers});
  }

  public getProductExamplesByTypeIdNp(productTypeId: number): Observable<ProductExample[]> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.get<ProductExample[]>(HttpService.url + '/api/product-examples/np', {params: params, headers: HttpService.httpOptions.headers});
  }

  public getProductExampleById(productTypeId: number): Observable<ProductExample> {
    let params = new HttpParams().set('id', productTypeId.toString());
    return this.http.get<ProductExample>(HttpService.url + '/api/product-examples/by-id', {params: params, headers: HttpService.httpOptions.headers});
  }

  public getProductCategoryPreview(productTypeId: number): Observable<ProductExample[]> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.get<ProductExample[]>(HttpService.url + '/api/product-examples/category-examples',
      {params: params, headers: HttpService.httpOptions.headers});
  }

  public getProductCategoryPreviewNp(productTypeId: number): Observable<ProductExample[]> {
    let params = new HttpParams().set('productTypeId', productTypeId.toString());
    return this.http.get<ProductExample[]>(HttpService.url + '/api/product-examples/category-examples-np',
      {params: params, headers: HttpService.httpOptions.headers});
  }
}
