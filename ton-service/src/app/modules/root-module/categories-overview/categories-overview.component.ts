import {Component, OnInit} from '@angular/core';
import {DemesneService} from "../../../services/DemesneService";
import {Demesne} from "../../../shared/Demesne";
import {ProductType} from "../../../shared/ProductType";

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss']
})
export class CategoriesOverviewComponent implements OnInit {

  public demesnes: Demesne[];

  constructor(private demesneService: DemesneService) { }

  ngOnInit() {
    this.demesneService.getAllDemesnes().subscribe(demesnes => this.demesnes = demesnes);
  }

  public hasDisplayedChildren(productType: ProductType): boolean {
    return productType.children.filter(child => !child.hideInTree).length !== 0;
  }

}
