export class ProductModel{
  constructor(
    public productId: number,
    public productName: string,
    public productCode: string,
    public releaseDate: string,
    public description: number,
    public price: number,
    public starRating: number,
    public imageUrl: File
  ) {
  }
}
