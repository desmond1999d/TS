import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContactsHeaderComponent } from './contacts-header/contacts-header.component';
import {ProductTypeService} from '../../services/ProductTypeService';



@NgModule({
  declarations: [HeaderComponent, ContactsHeaderComponent],
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    ContactsHeaderComponent
  ]
})
export class RootModule {

  public isCollapsed = false;

}
