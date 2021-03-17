import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductExampleService} from "../../../services/ProductExampleService";
import {ProductExample} from "../../../shared/ProductExample";

@Component({
  selector: 'app-subcategory-examples',
  templateUrl: './subcategory-examples.component.html',
  styleUrls: ['./subcategory-examples.component.scss']
})
export class SubcategoryExamplesComponent implements OnInit {

  private categoryId: number;
  public subcategoryId: number;
  public examples: ProductExample[];

  constructor(
    private route: ActivatedRoute,
    private productExampleService: ProductExampleService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'));
      this.subcategoryId = parseInt(params.get('subcategoryId'));
      this.productExampleService.getProductExamplesByTypeId(this.subcategoryId).subscribe(examples => {
        this.examples = [];
        examples.forEach(example => {
          this.examples.push(new ProductExample(example));
        });
        this.examples.sort((example1, example2) => example1.displayOrder - example2.displayOrder);
      });
    });
  }

}
