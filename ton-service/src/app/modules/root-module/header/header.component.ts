import {Component, OnInit} from '@angular/core';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {ProductType} from '../../../shared/ProductType';

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

  public openSideBar(event: MouseEvent) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth <= 991) {
      return;
    }
    this.getSubMenuFromDropright(event.currentTarget as HTMLElement)?.classList.add('show');
  }

  public closeSideBar(event: MouseEvent) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth <= 991) {
      return;
    }
    this.getSubMenuFromDropright(event.currentTarget as HTMLElement)?.classList.remove('show');
  }

  public openDropDown(event) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth <= 991) {
      return;
    }
    event.stopPropagation();
    document.getElementById('product-types-dropdown').classList.add('show');
  }

  public closeDropDown(event) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth <= 991) {
      return;
    }
    event.stopPropagation();
    document.getElementById('product-types-dropdown').classList.remove('show');
  }

  public sideBarClickEventHandler(event: MouseEvent) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth > 991) {
      return;
    }
    event.stopPropagation();
    const dropright = (event.currentTarget as HTMLElement).closest('.dropright');
    const element = this.getSubMenuFromDropright(dropright as HTMLElement);
    if (!element) {
      return;
    }
    if (element.classList.contains('show')) {
      element.classList.remove('show');
      this.closeAllHierarchy(event);
    } else {
      element.classList.add('show');
    }
  }

  public closeAllHierarchy(event) {
    if (typeof document === 'undefined' || document.documentElement.clientWidth > 991) {
      return;
    }
    const elements = document.getElementsByClassName('dropdown-menu-child');
    Array.from(elements).forEach(element => {
      element.classList.remove('show');
    });
  }

  public closeNavbar(event) {
    if (typeof document === 'undefined') {
      return;
    }
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
      navbar.classList.remove('show');
    }
  }

  public hasDisplayedChildren(productType: ProductType) {
    return (productType.children ?? []).filter(a => !a.hideInTree).length > 0;
  }

  private getSubMenuFromDropright(dropright: HTMLElement | null): HTMLElement | null {
    return dropright?.querySelector('.dropdown-menu-child') ?? null;
  }
}
