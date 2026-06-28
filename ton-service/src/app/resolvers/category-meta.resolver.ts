import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductTypeService } from '../services/ProductTypeService';
import { ProductType } from '../shared/ProductType';
import { CanonicalService } from '../services/canonical.service';

@Injectable({ providedIn: 'root' })
export class CategoryMetaResolver implements Resolve<ProductType | null> {

  constructor(
    private productTypeService: ProductTypeService,
    private titleService: Title,
    private metaService: Meta,
    private canonicalService: CanonicalService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductType | null> {
    const categoryId = parseInt(route.paramMap.get('categoryId'), 10);
    const subcategoryId = parseInt(route.paramMap.get('subcategoryId'), 10);

    if (!categoryId) {
      return of(null);
    }

    const category$ = this.productTypeService.getCategoryById(categoryId).pipe(
      catchError(() => of(this.redirectToNotFound())),
    );

    if (subcategoryId) {
      return forkJoin({
        category: category$,
        subcategory: this.productTypeService.getCategoryById(subcategoryId).pipe(
          catchError(() => of(this.redirectToNotFound())),
        ),
      }).pipe(
        tap(({ category, subcategory }) => {
          if (category && subcategory) {
            this.applyMeta(category, route, subcategory);
          }
        }),
        map(({ category }) => category),
      );
    }

    return category$.pipe(
      tap(category => {
        if (category) {
          this.applyMeta(category, route);
        }
      }),
    );
  }

  private redirectToNotFound(): null {
    void this.router.navigateByUrl('/404', { replaceUrl: true });
    return null;
  }

  private applyMeta(category: ProductType, route: ActivatedRouteSnapshot, subcategory?: ProductType): void {
    const title = subcategory
      ? `${category.name} в Гродно: ${subcategory.name}`
      : `${category.name} в Гродно`;

    const description = category.description?.trim() || '';

    this.titleService.setTitle(title);
    this.metaService.removeTag("name='keywords'");
    this.metaService.removeTag("name='description'");
    this.metaService.removeTag("rel='canonical'");
    this.metaService.addTags([
      { name: 'keywords', content: category.name },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
    ]);
    this.canonicalService.setCanonical(this.pathFromRoute(route));
  }

  private pathFromRoute(route: ActivatedRouteSnapshot): string {
    const segments: string[] = [];
    for (const snapshot of route.pathFromRoot) {
      for (const segment of snapshot.url) {
        segments.push(segment.path);
      }
    }
    return `/${segments.join('/')}`;
  }
}
