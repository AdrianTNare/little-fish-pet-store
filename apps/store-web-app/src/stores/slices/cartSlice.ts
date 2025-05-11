import { CartItem } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addProductToCart: create.reducer(
      (state, action: PayloadAction<CartItem>) => {
        state.products = [...state.products, action.payload];
      }
    ),
    increaseProductQuantity: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.products = state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
    ),
    decreaseProductQuantity: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.products = state.products.map((product) =>
          product.id !== action.payload || product.quantity < 1
            ? product
            : { ...product, quantity: product.quantity - 1 }
        );
      }
    ),
  }),
  selectors: {
    getProducts: (state) => state.products,
  },
});

export const {
  addProductToCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;

export const { getProducts } = cartSlice.selectors;

export const cartReducer = cartSlice.reducer;
