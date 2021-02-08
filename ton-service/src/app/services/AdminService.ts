import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HttpService} from "./http.service";
import {ProductExample} from "../shared/ProductExample";

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  public createProductExample(productExampleDto: ProductExample) {
    return this.http.post<ProductExample>(HttpService.url + '/api/admin/create', productExampleDto,
      {params: {}, headers: HttpService.httpOptions.headers});
  }

  public setFileToProductExample(productExampleDto: ProductExample, file: File) {
    const formData: FormData = new FormData();
    if (file != null) {
      formData.append('file', file, file.name);
    }
    formData.append('productExampleId', productExampleDto.id.toString());
    return this.http.post<ProductExample>(HttpService.url + '/api/admin/set-file', formData,{});
  }

  public updateProductExamplesDisplayOrder(productExamples: ProductExample[]) {
    return this.http.post<ProductExample>(HttpService.url + '/api/admin/display-order', productExamples,
      {params: {}, headers: HttpService.httpOptions.headers});
  }

  public deleteProductExample(productExampleDto: ProductExample) {
    let params = new HttpParams().set('productExampleId', productExampleDto.id.toString());
    return this.http.delete<ProductExample>(HttpService.url + '/api/admin/delete',
      {params: params, headers: HttpService.httpOptions.headers});
  }
}
