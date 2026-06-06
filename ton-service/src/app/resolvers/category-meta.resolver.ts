import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductTypeService } from '../services/ProductTypeService';
import { ProductType } from '../shared/ProductType';

@Injectable({ providedIn: 'root' })
export class CategoryMetaResolver implements Resolve<ProductType | null> {

  constructor(
    private productTypeService: ProductTypeService,
    private titleService: Title,
    private metaService: Meta
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductType | null> {
    const categoryId = parseInt(route.paramMap.get('categoryId'), 10);
    const subcategoryId = parseInt(route.paramMap.get('subcategoryId'), 10);

    if (!categoryId) {
      return of(null);
    }

    const category$ = this.productTypeService.getCategoryById(categoryId);

    if (subcategoryId) {
      return forkJoin({
        category: category$,
        subcategory: this.productTypeService.getCategoryById(subcategoryId),
      }).pipe(
        tap(({ category, subcategory }) => this.applyMeta(category, subcategory)),
        map(({ category }) => category),
      );
    }

    return category$.pipe(tap(category => this.applyMeta(category)));
  }

  private applyMeta(category: ProductType, subcategory?: ProductType): void {
    const title = subcategory
      ? `${category.name} в Гродно: ${subcategory.name}`
      : `${category.name} в Гродно`;

    const description = category.description?.trim() || '';

    this.titleService.setTitle(title);
    this.metaService.removeTag("name='keywords'");
    this.metaService.removeTag("name='description'");
    this.metaService.addTags([
      { name: 'keywords', content: category.name },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
    ]);
  }
}