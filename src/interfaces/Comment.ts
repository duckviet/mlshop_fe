import { User } from "node-telegram-bot-api";
import { Product } from "./Product";

export interface Comment {
  id: number;
  user: User;
  product: Product;
  text: string;
  commentAt: Date;
  updateAt: Date;
}
