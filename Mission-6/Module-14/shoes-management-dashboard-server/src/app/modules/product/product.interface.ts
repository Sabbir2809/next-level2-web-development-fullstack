export interface IProduct {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  style: string;
  size: string;
  color: string;
  material?: string;
  productID: string;
  verified: boolean;
}
