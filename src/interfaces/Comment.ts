// import { User } from "node-telegram-bot-api";
import { User } from "next-auth";
import { Product } from "./Product";

export interface Comment {
  id: number;
  user: User;
  product: Product;
  text: string;
  commentAt: Date;
  updateAt: Date;
}
