import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductType} from "../../../shared/ProductType";
import {ProductTypeService} from "../../../services/ProductTypeService";

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

  constructor(
    private route: ActivatedRoute,
    private productTypeService: ProductTypeService
  ) {
    this.route.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'));
      this.subcategoryId = parseInt(params.get('subcategoryId'));
      this.productTypeService.getCategoryById(this.categoryId).subscribe(
        category => {
          this.selectedCategory = category;
          this.horizontalReferenceSubcategories = this.selectedCategory.children;
          if (this.horizontalReferenceSubcategories.length > 1) {
            this.selectedSubcategory = this.horizontalReferenceSubcategories.find(subcategory => subcategory.id === this.subcategoryId);
          }
        }
      );
    });
  }

  ngOnInit() {
  }

}
