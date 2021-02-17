import {Demesne} from "./Demesne";
import {HttpService} from "../services/http.service";

export class ProductType {

  public id: number;
  public name: string;
  public children: ProductType[];
  public description: string;
  public parentId: number;
  public thumbnail: string;
  public hideInTree: boolean;
  public demesne: Demesne;

  constructor(dto) {
    this.id = dto.id;
    this.name = dto.name;
    this.children = dto.children;
    this.description = dto.description;
    this.parentId = dto.parentId;
    this.thumbnail = HttpService.url + dto.thumbnail;
    this.hideInTree = dto.hideInTree;
    this.demesne = dto.demesne;
  }
}
