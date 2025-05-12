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
        const existingProduct = state.products.find(
          (product) => product.id === action.payload.id
        );

        if (existingProduct) {
          state.products = state.products.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                }
              : product
          );
          return;
        }

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
        state.products = state.products
          .map((product) =>
            product.id !== action.payload
              ? product
              : { ...product, quantity: product.quantity - 1 }
          )
          .filter((product) => product.quantity > 0);
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
