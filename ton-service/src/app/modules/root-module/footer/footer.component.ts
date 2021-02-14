import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public productTypeHierarchy: ProductType[];

  constructor(private productTypeService: ProductTypeService) {
  }

  ngOnInit() {
    this.productTypeHierarchy = [];
    this.productTypeService.getTopServiceHierarchy().subscribe(productTypeHierarchy => {
      for (let productType of productTypeHierarchy) {
        this.productTypeHierarchy.push(productType);
        if (productType.children.length > 1) {
          for (let child of productType.children) {
            this.productTypeHierarchy.push(child);
          }
        }
      }
    });
  }

}
