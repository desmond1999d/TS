import { Component, OnInit } from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';

@Component({
  selector: 'app-top-product-offerings',
  templateUrl: './top-product-offerings.component.html',
  styleUrls: ['./top-product-offerings.component.css']
})
export class TopProductOfferingsComponent implements OnInit {

  public productTypeHierarchy: ProductType[];

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit() {
    this.productTypeHierarchy = this.productTypeService.getServiceHierarchy();
  }

}
