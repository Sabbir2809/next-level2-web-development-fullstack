interface TProductId {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  style: string;
  size: string;
  color: string;
}

export type TSale = {
  _id: string;
  productId: TProductId;
  quantitySold: number;
  buyerName: string;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
};
