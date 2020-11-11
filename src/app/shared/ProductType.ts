export class ProductType {

  constructor(public name: string, public children: ProductType[], public description: string) {
    this.name = name;
    this.children = children;
    this.description = description;
  }

}
