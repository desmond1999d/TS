import {Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
import {HttpService} from './http.service';
import {Demesne} from '../shared/Demesne';

const ALL_DEMESNES_KEY = makeStateKey<Demesne[]>('allDemesnes');
const ALL_DEMESNES_CACHE_KEY = 'allDemesnes';

@Injectable()
export class DemesneService {

  private readonly cache = new Map<string, Observable<unknown>>();

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
  }

  public getAllDemesnes(): Observable<Demesne[]> {
    const existing = this.cache.get(ALL_DEMESNES_CACHE_KEY);
    if (existing) {
      return existing as Observable<Demesne[]>;
    }

    let request$: Observable<Demesne[]>;
    if (this.transferState.hasKey(ALL_DEMESNES_KEY)) {
      const data = this.transferState.get(ALL_DEMESNES_KEY, []);
      this.transferState.remove(ALL_DEMESNES_KEY);
      request$ = of(data);
    } else {
      request$ = this.http.get<Demesne[]>(
        this.httpService.apiUrl('/api/demesne'),
        {params: {}, headers: HttpService.httpOptions.headers}
      ).pipe(
        tap(data => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(ALL_DEMESNES_KEY, data);
          }
        }),
      );
    }

    const shared$ = request$.pipe(shareReplay(1));
    this.cache.set(ALL_DEMESNES_CACHE_KEY, shared$);
    return shared$;
  }

}
