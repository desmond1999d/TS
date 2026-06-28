import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductExampleService } from '../services/ProductExampleService';
import { ProductExample } from '../shared/ProductExample';

@Injectable({ providedIn: 'root' })
export class CategoryExamplesResolver implements Resolve<ProductExample[] | null> {

  constructor(
    private productExampleService: ProductExampleService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductExample[] | null> {
    const categoryId = parseInt(route.paramMap.get('categoryId'), 10);
    return this.productExampleService.getProductCategoryPreview(categoryId).pipe(
      map(examples => examples
        .map(example => new ProductExample(example))
        .sort((example1, example2) => example1.displayOrder - example2.displayOrder)),
      catchError(() => {
        void this.router.navigateByUrl('/404', { replaceUrl: true });
        return of(null);
      }),
    );
  }
}
