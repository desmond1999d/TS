import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
    ProductTypeService,
    ProductExampleService,
    ContactUsService,
    HttpService,
    AdminService,
    DemesneService,
    ContactsConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
