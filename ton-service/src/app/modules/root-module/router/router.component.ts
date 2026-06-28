import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../shared/ProductType";
import {ActivatedRoute} from "@angular/router";
import {ContactsPageComponent} from "../contacts-page/contacts-page.component";
import {CategoriesOverviewComponent} from "../categories-overview/categories-overview.component";
import {AboutUsComponent} from "../about-us/about-us.component";
import {SubcategoryPageData} from "../../../resolvers/subcategory-page.resolver";
import {Meta, Title} from "@angular/platform-browser";
import { CanonicalService } from "../../../services/canonical.service";

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss']
})
export class RouterComponent implements OnInit {

  public category: ProductType;
  public subcategory: ProductType;
  public isContacts: boolean;
  public isDemesnes: boolean;
  public isAboutUs: boolean;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.isContacts = this.route.component === ContactsPageComponent;
      this.isDemesnes = this.route.component === CategoriesOverviewComponent;
      this.isAboutUs = this.route.component === AboutUsComponent;

      this.route.data.subscribe(data => {
        if (data['category']) {
          this.category = data['category'];
        }
        const pageData = data['pageData'] as SubcategoryPageData | undefined;
        if (pageData?.subcategory) {
          this.subcategory = pageData.subcategory;
        } else {
          this.subcategory = undefined;
        }
      });

      if (!this.route.snapshot.paramMap.get('categoryId')) {
        if (this.isContacts) {
          this.titleService.setTitle('Контакты');
          this.canonicalService.setCanonical('/contacts');
        } else if (this.isAboutUs) {
          this.titleService.setTitle('О нас');
          this.canonicalService.setCanonical('/about-us');
        } else if (this.isDemesnes) {
          this.titleService.setTitle('Услуги');
          this.canonicalService.setCanonical('/demesnes');
        }
      }
    });
  }

}
