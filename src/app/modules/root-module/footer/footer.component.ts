import { Component, OnInit } from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public productTypeHierarchy: ProductType[];
  public productTypeNames: string[];

  constructor(private productTypeService: ProductTypeService) {
  }

  ngOnInit() {
    this.productTypeNames = [];
    this.productTypeService.getTopServiceHierarchy().subscribe(productTypeHierarchy => {
      this.productTypeHierarchy = productTypeHierarchy;
      for (let productType of this.productTypeHierarchy) {
        this.productTypeNames.push(productType.name);
        for (let child of productType.children) {
          this.productTypeNames.push(child.name);
        }
      }
    });
  }

}
