import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-main-page-carousel',
  templateUrl: './main-page-carousel.component.html',
  styleUrls: ['./main-page-carousel.component.css']
})
export class MainPageCarouselComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle("Тон-сервис");
    this.metaService.addTags([
      {name: 'keywords', content: 'Реклама, Антикоррозийная, Вывески'},
      {name: 'description', content: 'Реклама, антикоррозийная обработка и тонировка стекол Гродно'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}
