export class ProductType {

  constructor(public id: number, public name: string, public children: ProductType[], public description: string) {
    this.id = id;
    this.name = name;
    this.children = children;
    this.description = description;
  }

}
