export class ProductExample {

  public id: number;
  public productTypeId: number;
  public image: string;
  public formattedImage: string;
  public companyName: string;
  public displayOrder: number;

  constructor(dto) {
    this.id = dto.id;
    this.productTypeId = dto.productTypeId;
    this.companyName = dto.companyName;
    this.displayOrder = dto.displayOrder;
    this.formattedImage = 'data:image/jpg;base64,' + dto.image;
  }

}
