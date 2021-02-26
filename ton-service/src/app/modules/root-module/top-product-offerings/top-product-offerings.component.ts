import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';
import * as $ from "jquery";
import {tns} from '../../../../../node_modules/tiny-slider/src/tiny-slider';

@Component({
  selector: 'app-top-product-offerings',
  templateUrl: './top-product-offerings.component.html',
  styleUrls: ['./top-product-offerings.component.css']
})
export class TopProductOfferingsComponent implements OnInit, AfterViewInit {

  public productTypeHierarchy: ProductType[];
  public maxItemsCount : number;
  public static MAX_ITEMS_DEFAULT = 9;

  constructor(private productTypeService: ProductTypeService) {
    this.maxItemsCount = TopProductOfferingsComponent.MAX_ITEMS_DEFAULT;
  }

  ngOnInit() {
    $(".hide-btn").hide();
    this.productTypeService.getTopServiceHierarchyWithThumbnails().toPromise().then(productTypeHierarchy => {
      this.productTypeHierarchy = productTypeHierarchy
        .filter(productType => productType.thumbnail != null && productType.hideInTree !== true)
        .map(productType => new ProductType(productType))
        .sort(ProductTypeService.SORT_FUNCTION);
    });
  }

  ngAfterViewInit() {
    tns({
      container: '#m-products-slider',
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
