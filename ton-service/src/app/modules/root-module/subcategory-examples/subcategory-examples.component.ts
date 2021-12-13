import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductExampleService} from "../../../services/ProductExampleService";
import {ProductExample} from "../../../shared/ProductExample";
import {ProductTypeService} from "../../../services/ProductTypeService";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-subcategory-examples',
  templateUrl: './subcategory-examples.component.html',
  styleUrls: ['./subcategory-examples.component.scss']
})
export class SubcategoryExamplesComponent implements OnInit {

  public examples: ProductExample[];
  public description: string;

  constructor(
    private route: ActivatedRoute,
    private productExampleService: ProductExampleService,
    private productTypeService: ProductTypeService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let category = parseInt(params.get('subcategoryId'));
      category = category ? category : parseInt(params.get('categoryId'));
      this.productTypeService.getCategoryById(category).subscribe(subcategory =>
        this.description = subcategory.typeDescription
      );
      this.productExampleService.getProductExamplesByTypeId(category).subscribe(examples => {
        this.examples = [];
        examples.forEach(example => {
          this.examples.push(new ProductExample(example));
        });
        this.examples.sort((example1, example2) => example1.displayOrder - example2.displayOrder);
      });
    });
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
