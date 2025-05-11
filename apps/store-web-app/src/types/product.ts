export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem extends Omit<Product, "description"> {
  quantity: number;
}

export interface PaginationInput {
  page: number;
  size: number;
}
