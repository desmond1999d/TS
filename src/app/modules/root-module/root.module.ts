import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContactsHeaderComponent } from './contacts-header/contacts-header.component';
import {ProductTypeService} from '../../services/ProductTypeService';
import { MainPageCarouselComponent } from './main-page-carousel/main-page-carousel.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, ContactsHeaderComponent, MainPageCarouselComponent, FooterComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    ContactsHeaderComponent,
    MainPageCarouselComponent,
    FooterComponent
  ]
})
export class RootModule {

  public isCollapsed = false;

}
