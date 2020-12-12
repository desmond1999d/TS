import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RootModule} from './modules/root-module/root.module';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ProductTypeService} from './services/ProductTypeService';
import {HttpService} from './services/http.service';
import {ProductExampleService} from "./services/ProductExampleService";
import {ContactUsService} from "./services/ContactUsService";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootModule,
    CollapseModule.forRoot()
  ],
  providers: [
    ProductTypeService,
    ProductExampleService,
    ContactUsService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
