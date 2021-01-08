import { Component, OnInit } from '@angular/core';
import {ProductExample} from "../../../shared/ProductExample";
import {ActivatedRoute} from "@angular/router";
import {ProductExampleService} from "../../../services/ProductExampleService";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  private categoryId: number;
  public examples: ProductExample[];

  constructor(
    private route: ActivatedRoute,
    private productExampleService: ProductExampleService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = parseInt(params.get('categoryId'));
      this.productExampleService.getProductCategoryPreviewNp(this.categoryId).subscribe(examples => {
        this.examples = [];
        examples.forEach(example => {
          this.productExampleService.getProductExampleById(example.id).subscribe(exampleWithPayload => {
            this.examples.push(new ProductExample(exampleWithPayload));
            if (this.examples.length === examples.length) {
              this.examples.sort((example1, example2) => example1.displayOrder - example2.displayOrder);
            }
          });
        });
      });
    });
  }

}
