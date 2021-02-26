import {Component, OnInit} from '@angular/core';
import {DemesneService} from "../../../services/DemesneService";
import {Demesne} from "../../../shared/Demesne";
import {ProductType} from "../../../shared/ProductType";
import {ProductTypeService} from "../../../services/ProductTypeService";

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss']
})
export class CategoriesOverviewComponent implements OnInit {

  public demesnes: Demesne[];

  constructor(private demesneService: DemesneService) { }

  ngOnInit() {
    this.demesneService.getAllDemesnes().subscribe(demesnes => {
      this.demesnes = demesnes;
      for (let demesne of demesnes) {
        demesne.productTypes.sort(ProductTypeService.SORT_FUNCTION);
        for (let productType of demesne.productTypes) {
          productType.children.sort(ProductTypeService.SORT_FUNCTION);
        }
      }
    });
  }

  public hasDisplayedChildren(productType: ProductType): boolean {
    return productType.children.filter(child => !child.hideInTree).length !== 0;
  }

}
