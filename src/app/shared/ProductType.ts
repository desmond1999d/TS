export class ProductType {
  private name: string;
  private children: ProductType[];
  private description: string;

  constructor(name: string, children: ProductType[], description: string) {
    this.name = name;
    this.children = children;
    this.description = description;
  }

  public getName() {
    return this.name;
  }

  public getChildren() {
    return this.children;
  }

  public getDescription() {
    return this.description;
  }

}
