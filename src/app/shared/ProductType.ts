export class ProductType {
  private name: string;
  private children: ProductType[];

  constructor(name: string, children: ProductType[]) {
    this.name = name;
    this.children = children;
  }

  public getName() {
    return this.name;
  }

  public getChildren() {
    return this.children;
  }

}
