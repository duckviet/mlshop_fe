import { Product } from "./Product";

export interface CartItem {
  customerId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
}
