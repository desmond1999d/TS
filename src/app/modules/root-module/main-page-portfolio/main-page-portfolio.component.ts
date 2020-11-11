import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {tns} from '../../../../../node_modules/tiny-slider/src/tiny-slider';

@Component({
  selector: 'app-main-page-portfolio',
  templateUrl: './main-page-portfolio.component.html',
  styleUrls: ['./main-page-portfolio.component.css']
})
export class MainPagePortfolioComponent implements OnInit {
  public productTypeHierarchy: ProductType[];

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit() {
    this.productTypeService.getTopServiceHierarchy().subscribe(productTypeHierarchy => {
      this.productTypeHierarchy = productTypeHierarchy;
    });
  }

  ngAfterViewInit() {
    tns({
      container: '#m-portfolio-slider',
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
