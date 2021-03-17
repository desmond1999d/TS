import {Component, OnInit} from '@angular/core';
import {ProductExample} from "../../../shared/ProductExample";
import {ActivatedRoute} from "@angular/router";
import {ProductExampleService} from "../../../services/ProductExampleService";
import {AdminService} from "../../../services/AdminService";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin-subcategory-editor',
  templateUrl: './admin-subcategory-editor.component.html',
  styleUrls: ['./admin-subcategory-editor.component.scss']
})
export class AdminSubcategoryEditorComponent implements OnInit {

  private categoryId: number;
  public subcategoryId: number;
  public examples: ProductExample[];
  public file;

  constructor(
    private route: ActivatedRoute,
    private productExampleService: ProductExampleService,
    private adminService: AdminService,
    private titleService: Title, private metaService: Meta
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Тон-сервис');
    this.metaService.addTags([
      {name: 'robots', content: 'noindex, nofollow'}
    ]);
    this.examples = [];
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

  public remove($event, targetExample: ProductExample) {
    const index: number = this.examples.indexOf(targetExample);
    if (index !== -1) {
      for (let i = 0; i < this.examples.length; i++) {
        let example = this.examples[i];
        if (example.displayOrder > targetExample.displayOrder) {
          example.displayOrder--;
        }
      }
      this.adminService.deleteProductExample(targetExample)
        .subscribe(data => this.examples.splice(index, 1),
        error => alert('updateProductExamplesDisplayOrder failed with error: ' + error.message));
    }
  }

  public changeDisplayOrder($event, targetExample: ProductExample) {
    let newDisplayOrder = $event.target.value;
    $event.target.value = '';
    if (newDisplayOrder < 0) {
      return;
    }
    let maxDisplayOrder = Math.max.apply(null, this.examples.map(example => example.displayOrder));
    if (newDisplayOrder > maxDisplayOrder) {
      newDisplayOrder = maxDisplayOrder;
    }
    for (let i = 0; i < this.examples.length; i++) {
      let example = this.examples[i];
      if (example.displayOrder >= targetExample.displayOrder) {
        example.displayOrder--;
      }
      if (newDisplayOrder <= example.displayOrder) {
        example.displayOrder++;
      }
    }
    targetExample.displayOrder = newDisplayOrder;
    this.examples.sort((example1, example2) => example1.displayOrder - example2.displayOrder);
  }

  public addProductExample() {
    let productExample = {} as ProductExample;
    if (this.file) {
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event) => {
        productExample.formattedImage = reader.result as string;
      }
    }
    productExample.productTypeId = this.subcategoryId;
    productExample.displayOrder = this.examples.length !== 0 ? Number(this.examples[this.examples.length - 1].displayOrder) + 1 : 0;
    this.adminService.createProductExample(productExample)
      .subscribe(data => {
        this.adminService.setFileToProductExample(data, this.file)
          .subscribe(
            dataWithPayload =>
              this.examples.push(new ProductExample(dataWithPayload)),
            error1 =>
              alert('createProductExamples failed with error: ' + error1.message));
        },
        error => alert('createProductExamples failed with error: ' + error.message));
  }

  public submit() {
    this.adminService.updateProductExamplesDisplayOrder(this.examples)
      .subscribe(data => alert('success'),
        error => alert('updateProductExamplesDisplayOrder failed with error: ' + error.message));
  }

  public uploadFile($event) {
    this.file = $event.target.files[0];
  }

}
