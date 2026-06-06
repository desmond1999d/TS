import {ProductExample} from './ProductExample';

/** Shared modal carousel state for category / subcategory galleries. */
export class GalleryModalState {
  activeSlideIndex = 0;
  modalImagesEnabled = false;

  openModal(index: number): void {
    this.activeSlideIndex = index;
    this.modalImagesEnabled = true;
  }

  activeModalImage(examples: ProductExample[] | undefined): string | null {
    if (!this.modalImagesEnabled || !examples?.length) {
      return null;
    }
    return examples[this.activeSlideIndex]?.formattedImage ?? null;
  }

  syncActiveSlideFromCarousel(carouselElement: HTMLElement): void {
    const items = carouselElement.querySelectorAll('.carousel-item');
    const active = carouselElement.querySelector('.carousel-item.active');
    const index = active ? Array.from(items).indexOf(active) : -1;
    if (index >= 0) {
      this.activeSlideIndex = index;
    }
  }
}
