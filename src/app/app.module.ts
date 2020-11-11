import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RootModule} from './modules/root-module/root.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {ProductTypeService} from './services/ProductTypeService';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootModule,
    CollapseModule.forRoot(),
    RootModule
  ],
  providers: [
    ProductTypeService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
