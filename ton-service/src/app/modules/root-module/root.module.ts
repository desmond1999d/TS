import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
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
import { TopProductOfferingsComponent } from './top-product-offerings/top-product-offerings.component';
import { MainPagePortfolioComponent } from './main-page-portfolio/main-page-portfolio.component';
import {HttpClientModule} from '@angular/common/http';
import { SubcategoryNavigatorComponent } from './subcategoy-navigator/subcategory-navigator.component';
import {SafeHtmlPipe, SubcategoryExamplesComponent} from './subcategory-examples/subcategory-examples.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterComponent } from './router/router.component';
import { AdminSubcategoryEditorComponent } from './admin-subcategory-editor/admin-subcategory-editor.component';
import { CategoriesOverviewComponent } from './categories-overview/categories-overview.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [HeaderComponent,
    ContactsHeaderComponent,
    MainPageCarouselComponent,
    FooterComponent,
    MainPageProsComponent,
    MapComponent,
    MainPageComponent,
    MailContactComponent,
    ContactsPageComponent,
    TopProductOfferingsComponent,
    MainPagePortfolioComponent,
    SubcategoryNavigatorComponent,
    SubcategoryExamplesComponent,
    LeaveRequestComponent,
    CategoryComponent,
    RouterComponent,
    AdminSubcategoryEditorComponent,
    CategoriesOverviewComponent,
    AboutUsComponent,
    SafeHtmlPipe],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
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
    ContactsPageComponent,
    MainPagePortfolioComponent,
    RouterComponent
  ]
})
export class RootModule {

  public isCollapsed = false;

}
