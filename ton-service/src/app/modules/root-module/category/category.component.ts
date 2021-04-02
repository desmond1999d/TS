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
      this.productExampleService.getProductCategoryPreview(this.categoryId).subscribe(examples => {
        this.examples = [];
        examples.forEach(example => {
          this.examples.push(new ProductExample(example));
        });
        this.examples.sort((example1, example2) => example1.displayOrder - example2.displayOrder);
      });
    });
  }

}
