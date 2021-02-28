import {Component, OnInit} from '@angular/core';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {ProductType} from '../../../shared/ProductType';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public isCollapsed;
  public productTypeHierarchy: ProductType[];

  constructor(private productTypeService: ProductTypeService) {
    this.isCollapsed = false;
  }

  ngOnInit() {
    this.productTypeService.getTopServiceHierarchy().subscribe(productTypeHierarchy => {
      this.productTypeHierarchy = productTypeHierarchy;
      this.productTypeHierarchy.sort(ProductTypeService.SORT_FUNCTION);
    });
  }

  public openSideBar(event) {
    if (document.documentElement.clientWidth > 991) {
      document.getElementById(event.target.id + '_sub').classList.add('show');
    }
  }

  public closeSideBar(event) {
    if (document.documentElement.clientWidth > 991) {
      document.getElementById(event.target.id + '_sub').classList.remove('show');
    }
  }

  public openDropDown(event) {
    if (document.documentElement.clientWidth > 991) {
      event.stopPropagation();
      document.getElementById('product-types-dropdown').classList.add('show');
    }
  }

  public closeDropDown(event) {
    if (document.documentElement.clientWidth > 991) {
      event.stopPropagation();
      document.getElementById('product-types-dropdown').classList.remove('show');
    }
  }

  public selfShow(event) {
    if (document.documentElement.clientWidth > 991) {
      event.target.classList.add('show');
    }
  }

  public selfHide(event) {
    if (document.documentElement.clientWidth > 991) {
      event.target.classList.remove('show');
    }
  }

  public sideBarClickEventHandler(event) {
    event.stopPropagation();
    let element = document.getElementById(event.target.id + '_sub');
    if (element.classList.contains('show')) {
      element.classList.remove('show');
      this.closeAllHierarchy(event);
    } else {
      document.getElementById(event.target.id + '_sub').classList.add('show');
    }
  }

  public closeAllHierarchy(event) {
    if (document.documentElement.clientWidth <= 991) {
      let elements = document.getElementsByClassName("dropdown-menu-child");
      Array.from(elements).forEach(function (element) {
        element.classList.remove('show');
      });
    }
  }

  public closeNavbar(event) {
    $('.navbar-collapse').collapse('hide');
  }

  public hasDisplayedChildren(productType: ProductType) {
    return productType.children.filter(a => !a.hideInTree).length > 0;
  }
}
