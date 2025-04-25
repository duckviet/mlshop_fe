export interface Cart {
  _id: string;
  customerId: string;
  productId: string;
  options?: string;
  size?: string;
  color?: string;
  material?: string;
  quantity: number;
  price: number;
  createAt: Date;
  updateAt: Date;
}
