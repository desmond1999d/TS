import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductExampleService } from '../services/ProductExampleService';
import { ProductExample } from '../shared/ProductExample';

@Injectable({ providedIn: 'root' })
export class CategoryExamplesResolver implements Resolve<ProductExample[]> {

  constructor(private productExampleService: ProductExampleService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductExample[]> {
    const categoryId = parseInt(route.paramMap.get('categoryId'), 10);
    return this.productExampleService.getProductCategoryPreview(categoryId).pipe(
      map(examples => examples
        .map(example => new ProductExample(example))
        .sort((example1, example2) => example1.displayOrder - example2.displayOrder))
    );
  }
}
