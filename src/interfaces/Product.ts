import { Category } from "./Category";

export interface Variant {
  color: string[];
  size: string[];
  material: string[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  image: string[];
  // reviews: Review[];
  // comments: Comment[];
  variants: Variant;
  createAt: Date;
  updateAt: Date;
}
