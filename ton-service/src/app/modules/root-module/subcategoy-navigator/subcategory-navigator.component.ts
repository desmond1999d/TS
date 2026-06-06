import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductType} from "../../../shared/ProductType";

@Component({
  selector: 'app-subcategory-navigator',
  templateUrl: './subcategory-navigator.component.html',
  styleUrls: ['./subcategory-navigator.component.css']
})
export class SubcategoryNavigatorComponent implements OnInit {

  public categoryId: number;
  public subcategoryId: number;
  public horizontalReferenceSubcategories: ProductType[];
  public selectedSubcategory: ProductType;
  public selectedCategory: ProductType;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'), 10);
      this.subcategoryId = parseInt(params.get('subcategoryId'), 10);
    });

    this.route.data.subscribe(data => {
      const category = data['category'] as ProductType | undefined;
      if (!category) {
        return;
      }
      this.selectedCategory = category;
      this.horizontalReferenceSubcategories = this.selectedCategory.children ?? [];
      if (this.horizontalReferenceSubcategories.length > 1 && this.subcategoryId) {
        this.selectedSubcategory = this.horizontalReferenceSubcategories
          .find(subcategory => subcategory.id === this.subcategoryId);
      }
    });
  }

}
