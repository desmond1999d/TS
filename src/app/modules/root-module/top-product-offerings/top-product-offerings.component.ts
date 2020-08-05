import { Component, OnInit } from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';
import { tns } from "../../../../../node_modules/tiny-slider/src/tiny-slider"

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

  ngAfterViewInit() {
    tns({
      container: '.m-products-slider',
      items: 1,
      mouseDrag: true,
      center: true,
      lazyload: true,
      autoplay: true,
      autoplayButton: false,
      autoplayHoverPause: true,
      autoplayButtonOutput: false,
      controls: false,
      nav: false,
      responsive: {
        0: {
          edgePadding: 40,
          gutter: 30,
          items: 1
        },
        640: {
          edgePadding: 40,
          gutter: 30,
          items: 2
        }
      }
    });
  }

}
