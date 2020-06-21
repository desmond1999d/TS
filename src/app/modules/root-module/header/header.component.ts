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
    event.stopPropagation();
    document.getElementById('secondaryMenu').classList.add('show');
  }

  public closeSideBar(event) {
    event.stopPropagation();
    document.getElementById('secondaryMenu').classList.remove('show');
  }

}
