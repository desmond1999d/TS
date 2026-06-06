import {AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductExample} from '../../../shared/ProductExample';
import {GalleryModalState} from '../../../shared/gallery-modal.mixin';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  public examples: ProductExample[];
  readonly galleryModal = new GalleryModalState();

  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.examples = data['examples'];
    });
  }

  ngAfterViewInit() {
    if (typeof document === 'undefined') {
      return;
    }
    const carousel = document.getElementById('carouselExample');
    if (!carousel) {
      return;
    }
    const onSlid = () => {
      this.galleryModal.syncActiveSlideFromCarousel(carousel);
      this.cdr.markForCheck();
    };
    carousel.addEventListener('slid.bs.carousel', onSlid);
    this.destroyRef.onDestroy(() => carousel.removeEventListener('slid.bs.carousel', onSlid));
  }

  openExampleModal(index: number): void {
    this.galleryModal.openModal(index);
    this.cdr.markForCheck();
  }

  activeModalImage(): string | null {
    return this.galleryModal.activeModalImage(this.examples);
  }

}
