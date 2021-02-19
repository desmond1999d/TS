import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {Demesne} from "../shared/Demesne";

@Injectable()
export class DemesneService {

  constructor(private http: HttpClient) {
  }

  public getAllDemesnes(): Observable<Demesne[]> {
    return this.http.get<Demesne[]>(HttpService.url + '/api/demesne', {params: {}, headers: HttpService.httpOptions.headers});
  }

}
