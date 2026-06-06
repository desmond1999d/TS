import {afterNextRender, Component, OnInit} from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-top-product-offerings',
  templateUrl: './top-product-offerings.component.html',
  styleUrls: ['./top-product-offerings.component.css']
})
export class TopProductOfferingsComponent implements OnInit {

  public productTypeHierarchy: ProductType[];
  public maxItemsCount: number;
  public static MAX_ITEMS_DEFAULT = 9;

  constructor(private productTypeService: ProductTypeService) {
    this.maxItemsCount = TopProductOfferingsComponent.MAX_ITEMS_DEFAULT;
    afterNextRender(() => {
      import('tiny-slider').then(({ tns }) => {
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
      });
    });
  }

  ngOnInit() {
    firstValueFrom(this.productTypeService.getTopServiceHierarchy()).then(productTypeHierarchy => {
      this.productTypeHierarchy = productTypeHierarchy
        .filter(productType => productType.thumbnail != null && productType.hideInTree !== true)
        .map(productType => new ProductType(productType))
        .sort(ProductTypeService.SORT_FUNCTION);
    });
  }

}
