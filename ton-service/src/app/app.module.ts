import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RootModule} from './modules/root-module/root.module';
import {ProductTypeService} from './services/ProductTypeService';
import {HttpService} from './services/http.service';
import {ProductExampleService} from "./services/ProductExampleService";
import {ContactUsService} from "./services/ContactUsService";
import {AdminService} from "./services/AdminService";
import {DemesneService} from "./services/DemesneService";
import {ContactsConstants} from "./shared/ContactsConstants";
import {HttpTimeoutInterceptor} from './services/http-timeout.interceptor';
import {SsrOriginInterceptor} from './services/ssr-origin.interceptor';
import {provideApiBaseUrl} from './services/api-url';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    provideApiBaseUrl(),
    ProductTypeService,
    ProductExampleService,
    ContactUsService,
    HttpService,
    AdminService,
    DemesneService,
    ContactsConstants,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SsrOriginInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
