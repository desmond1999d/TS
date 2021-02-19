import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../shared/ProductType";
import {ActivatedRoute} from "@angular/router";
import {ProductTypeService} from "../../../services/ProductTypeService";
import {ProductExample} from "../../../shared/ProductExample";
import {ContactsPageComponent} from "../contacts-page/contacts-page.component";
import {CategoriesOverviewComponent} from "../categories-overview/categories-overview.component";

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

  constructor(
    private route: ActivatedRoute,
    private productTypeService: ProductTypeService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let categoryId = parseInt(params.get('categoryId'));
      let subcategoryId = parseInt(params.get('subcategoryId'));
      this.isContacts = this.route.component === (ContactsPageComponent);
      this.isDemesnes = this.route.component === (CategoriesOverviewComponent);
      if (categoryId) {
        this.productTypeService.getCategoryById(categoryId).subscribe(category =>
          this.category = category
        );
        if (this.category.children.length > 1 && subcategoryId) {
          this.productTypeService.getCategoryById(subcategoryId).subscribe(subcategory =>
            this.subcategory = subcategory
          )
        }
      }
    });
  }

}
