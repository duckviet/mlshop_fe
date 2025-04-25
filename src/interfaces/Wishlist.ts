import { User } from "node-telegram-bot-api";
import { Product } from "./Product";

export interface Wishlist {
  id: number;
  user: User;
  items: Product[];
}
