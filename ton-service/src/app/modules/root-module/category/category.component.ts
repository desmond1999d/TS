import {AfterViewInit, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductExample} from '../../../shared/ProductExample';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  public examples: ProductExample[] = [];
  selectedIndex = 0;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.examples = data['examples'] ?? [];
    });
  }

  ngAfterViewInit() {
    if (typeof document === 'undefined') {
      return;
    }

    const modal = document.getElementById('categoryModal');
    const carousel = document.getElementById('categoryCarousel');
    const $ = (window as any).$;

    if (!modal || !carousel || !($ && $.fn && $.fn.carousel)) {
      return;
    }

    const firstItem = carousel.querySelector('.carousel-item');
    if (firstItem) {
      firstItem.classList.add('active');
    }

    const $modal = $(modal);
    const $carousel = $(carousel);

    const onShow = () => {
      const items = carousel.querySelectorAll('.carousel-item');
      items.forEach((item, idx) => {
        item.classList.toggle('active', idx === this.selectedIndex);
      });
      $carousel.carousel(this.selectedIndex);
    };

    $modal.on('show.bs.modal', onShow);
    this.destroyRef.onDestroy(() => {
      $modal.off('show.bs.modal', onShow);
    });
  }

  openExampleModal(index: number): void {
    this.selectedIndex = index;
  }

}
