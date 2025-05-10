import { UUID } from "crypto";
import { UUIDTypes } from "uuid";

export interface Product {
  id: UUIDTypes;
  name: string;
  price: number;
  description: string;
}

export interface CartItem extends Omit<Product, "description"> {
  quantity: number;
}
