import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../shared/ProductType";
import {ActivatedRoute} from "@angular/router";
import {ProductTypeService} from "../../../services/ProductTypeService";
import {ProductExample} from "../../../shared/ProductExample";
import {ContactsPageComponent} from "../contacts-page/contacts-page.component";
import {CategoriesOverviewComponent} from "../categories-overview/categories-overview.component";
import {AboutUsComponent} from "../about-us/about-us.component";
import {Meta, Title} from "@angular/platform-browser";

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
    private productTypeService: ProductTypeService,
    private titleService: Title, private metaService: Meta
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let categoryId = parseInt(params.get('categoryId'));
      let subcategoryId = parseInt(params.get('subcategoryId'));
      this.isContacts = this.route.component === (ContactsPageComponent);
      this.isDemesnes = this.route.component === (CategoriesOverviewComponent);
      this.isAboutUs = this.route.component === (AboutUsComponent);
      if (categoryId) {
        this.productTypeService.getCategoryById(categoryId).subscribe(category => {
          this.category = category;
          this.titleService.setTitle(this.category.name);
          this.metaService.removeTag("name='keywords'");
          this.metaService.removeTag("name='description'");
          this.metaService.addTags([
            {name: 'keywords', content: this.category.name},
            {name: 'description', content: this.category.description},
            {name: 'robots', content: 'index, follow'}
          ]);
        });
        if (this.category && this.category.children.length > 1 && subcategoryId) {
          this.productTypeService.getCategoryById(subcategoryId).subscribe(subcategory =>
            this.subcategory = subcategory
          )
        }
      } else if (this.isContacts) {
        this.titleService.setTitle('Контакты');
      } else if (this.isAboutUs) {
        this.titleService.setTitle('О нас');
      } else if (this.isDemesnes) {
        this.titleService.setTitle('Услуги');
      }
    });
  }

}
