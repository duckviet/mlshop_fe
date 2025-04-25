import { Address } from "cluster";
import { Order } from "./Order";

export interface Customer {
  _id: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  birthday: Date;
  address: Address;
  wishList: string[];
  orderHistory: Order[];
  createAt: Date;
  updateAt: Date;
}
