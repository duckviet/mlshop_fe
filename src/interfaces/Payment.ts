import { Order } from "./Order";

export interface Payment {
  id: number;
  order: Order;
  amount: number;
  paymentDate: Date;
  paymentMethod: PaymentMethod;
}

type PaymentMethod = "credit card" | "debit card" | "paypal" | "bank transfer";
