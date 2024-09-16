import { Product } from 'src/interfaces/product.ts';

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface UpdateItem {
  productId: number;
  quantity: number;
}

export interface CartState {
  cart: CartProduct[];
}

export interface CheckoutItem {
  id: number;
  quantity: number;
}

export interface Checkout {
  products_data: CheckoutItem[];
  mode: string;
  processor_name: string;
}
