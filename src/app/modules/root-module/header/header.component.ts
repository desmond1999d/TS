import {Component, OnInit} from '@angular/core';
import {ProductTypeService} from '../../../services/ProductTypeService';
import {ProductType} from '../../../shared/ProductType';
import 'bootstrap/dist/js/bootstrap.bundle';

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
    this.productTypeHierarchy = this.productTypeService.getServiceHierarchy();
  }

  public openSideBar(event) {
    if (document.documentElement.clientWidth > 991) {
      event.stopPropagation();
      document.getElementById(event.target.id + '_sub').classList.add('show');
    }
  }

  public closeSideBar(event) {
    if (document.documentElement.clientWidth > 991) {
      event.stopPropagation();
      document.getElementById(event.target.id + '_sub').classList.remove('show');
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
    } else {
      document.getElementById(event.target.id + '_sub').classList.add('show');
    }
  }
}
