import { User } from "next-auth";
import { Product } from "./Product";

export interface Wishlist {
  id: number;
  user: User;
  items: Product[];
}
