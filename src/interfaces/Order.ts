import { User } from "node-telegram-bot-api";
import { OrderItem } from "./OrderItem";

export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  orderDate: Date;
  updateDate: Date;
  status: OrderStatus;
}

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
