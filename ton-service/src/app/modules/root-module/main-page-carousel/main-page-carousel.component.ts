import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import { CanonicalService } from '../../../services/canonical.service';

export interface CarouselSlide {
  fullSrc: string;
  cropSrc: string;
  header: string;
  textHtml: string;
}

@Component({
  selector: 'app-main-page-carousel',
  templateUrl: './main-page-carousel.component.html',
  styleUrls: ['./main-page-carousel.component.css']
})
export class MainPageCarouselComponent implements OnInit {

  readonly slides: CarouselSlide[] = [
    {
      fullSrc: 'assets/images/viber_image_2021-02-19_19-25-31.jpg',
      cropSrc: 'assets/images/viber_image_1_%20crop.jpg',
      header: 'Фасадные вывески',
      textHtml: 'Дизайн, изготовление,<br>обслуживание...',
    },
    {
      fullSrc: 'assets/images/viber_image_2021-02-19_19-25-32.jpg',
      cropSrc: 'assets/images/viber_image_2_crop.jpg',
      header: 'Объект ТРК TRINITI',
      textHtml: 'Оформление фитнесклуба...',
    },
    {
      fullSrc: 'assets/images/viber_image_2021-02-uu19-25-32.jpg',
      cropSrc: 'assets/images/viber_image_2021-02-23_15-56-24.jpg',
      header: 'Нестандартные решения',
      textHtml: 'Металлоконструкции,<br>световое обеспечение...',
    },
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Тон-сервис');
    this.metaService.addTags([
      {name: 'keywords', content: 'Реклама, Антикоррозийная, Вывески'},
      {name: 'description', content: 'Реклама, антикоррозийная обработка и тонировка стекол Гродно'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this.canonicalService.setCanonical('/');
  }

}
