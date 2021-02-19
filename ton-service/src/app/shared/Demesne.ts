import {ProductType} from "./ProductType";

export class Demesne {
  public id: number;
  public name: string;
  public productTypes: ProductType[];

  constructor(dto) {
    this.id = dto.id;
    this.name = dto.name;
    this.productTypes = dto.productTypes;
  }
}
