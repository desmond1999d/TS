import {AfterViewInit, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ProductExample} from '../../../shared/ProductExample';
import {SubcategoryPageData} from '../../../resolvers/subcategory-page.resolver';
import {GalleryModalState} from '../../../shared/gallery-modal.mixin';

@Component({
  selector: 'app-subcategory-examples',
  templateUrl: './subcategory-examples.component.html',
  styleUrls: ['./subcategory-examples.component.scss']
})
export class SubcategoryExamplesComponent implements OnInit, AfterViewInit {

  public examples: ProductExample[];
  public description: string;
  readonly galleryModal = new GalleryModalState();

  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const pageData = data['pageData'] as SubcategoryPageData;
      this.description = pageData.description;
      this.examples = pageData.examples;
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

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
