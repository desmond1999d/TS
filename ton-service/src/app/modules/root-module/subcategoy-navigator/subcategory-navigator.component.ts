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

  private categoryId: number;
  public subcategoryId: number;
  public horizontalReferenceSubcategories: ProductType[];
  public selectedSubcategory: ProductType;

  constructor(
    private route: ActivatedRoute,
    private productTypeService: ProductTypeService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'));
      this.subcategoryId = parseInt(params.get('subcategoryId'));
      this.productTypeService.getHorizontalReferences(this.categoryId).subscribe(
        horizontalReferenceSubcategories => {
          this.horizontalReferenceSubcategories = horizontalReferenceSubcategories;
          this.selectedSubcategory = horizontalReferenceSubcategories.find(subcategory => subcategory.id === this.subcategoryId);
        }
      );
    });
  }

}
