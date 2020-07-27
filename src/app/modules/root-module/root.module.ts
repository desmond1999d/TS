import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContactsHeaderComponent } from './contacts-header/contacts-header.component';
import { MainPageCarouselComponent } from './main-page-carousel/main-page-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageProsComponent } from './main-page-pros/main-page-pros.component';
import { MapComponent } from './map/map.component';
import { MainPageComponent } from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import { MailContactComponent } from './mail-contact/mail-contact.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';



@NgModule({
  declarations: [HeaderComponent,
    ContactsHeaderComponent,
    MainPageCarouselComponent,
    FooterComponent,
    MainPageProsComponent,
    MapComponent,
    MainPageComponent,
    MailContactComponent,
    ContactsPageComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ContactsHeaderComponent,
    MainPageCarouselComponent,
    FooterComponent,
    MainPageProsComponent,
    MapComponent,
    MainPageComponent,
    MailContactComponent,
    ContactsPageComponent
  ]
})
export class RootModule {

  public isCollapsed = false;

}
