import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../../shared/ProductType';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {ContactsConstants} from "../../../shared/ContactsConstants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public productTypeHierarchy: ProductType[];
  public contactsConstants: ContactsConstants;

  constructor(private productTypeService: ProductTypeService) {
    this.contactsConstants = new ContactsConstants();
  }

  ngOnInit() {
    this.productTypeHierarchy = [];
    this.productTypeService.getTopServiceHierarchy().subscribe(productTypeHierarchy => {
      for (let productType of productTypeHierarchy) {
        this.productTypeHierarchy.push(productType);
        for (let productType of this.productTypeHierarchy) {
          productType.children = productType.children.filter(a => !a.hideInTree);
        }
        for (let child of productType.children) {
          this.productTypeHierarchy.push(child);
        }
      }
    });
  }

}
