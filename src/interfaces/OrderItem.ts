import { Product } from "./Product";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}
