import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";

@Injectable()
export class ContactUsService {

  constructor(private http: HttpClient) {
  }

  public sendContactUsRequest(name: string, email: string, content: string, file: File) {
    const formData: FormData = new FormData();
    if (file != null) {
      formData.append('file', file, file.name);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('content', content);
    return this.http.post(HttpService.url + '/api/contact-us', formData, {});
  }
}
