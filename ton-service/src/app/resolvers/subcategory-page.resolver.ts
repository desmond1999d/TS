import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductExampleService } from '../services/ProductExampleService';
import { ProductTypeService } from '../services/ProductTypeService';
import { ProductExample } from '../shared/ProductExample';
import { ProductType } from '../shared/ProductType';

export interface SubcategoryPageData {
  description: string;
  examples: ProductExample[];
  subcategory: ProductType;
}

@Injectable({ providedIn: 'root' })
export class SubcategoryPageResolver implements Resolve<SubcategoryPageData> {

  constructor(
    private productExampleService: ProductExampleService,
    private productTypeService: ProductTypeService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<SubcategoryPageData> {
    let categoryId = parseInt(route.paramMap.get('subcategoryId'), 10);
    if (!categoryId) {
      categoryId = parseInt(route.paramMap.get('categoryId'), 10);
    }

    return forkJoin({
      subcategory: this.productTypeService.getCategoryById(categoryId),
      examples: this.productExampleService.getProductExamplesByTypeId(categoryId),
    }).pipe(
      map(({ subcategory, examples }) => ({
        description: subcategory.typeDescription,
        subcategory,
        examples: examples
          .map(example => new ProductExample(example))
          .sort((example1, example2) => example1.displayOrder - example2.displayOrder),
      }))
    );
  }
}
