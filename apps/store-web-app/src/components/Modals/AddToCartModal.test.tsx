import { render, screen, fireEvent } from "../../test/utils";
import { AddToCartModal } from "./AddToCartModal";
import React from "react";
import { CartItem, Product } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";

jest.mock("../CartItem", () => ({
  CartItem: ({
    item,
    onIncreaseQuantity,
    onDecreaseQuantity,
  }: {
    item: CartItem;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
  }) => (
    <div>
      <span>{item.name}</span>
      <span>{item.quantity}</span>
      <button onClick={onDecreaseQuantity}>-</button>
      <button onClick={onIncreaseQuantity}>+</button>
    </div>
  ),
}));

const mockDispatch = jest.fn();
jest.mock("@/hooks/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

// Mock addProductToCart to avoid ESM/CJS issues
export const mockAddProductToCart = jest.fn();

jest.mock("@/stores/slices/cartSlice", () => ({
  addProductToCart: (payload: CartItem): PayloadAction<CartItem> =>
    mockAddProductToCart(payload),
}));

const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  price: 99.99,
  description: "Test Description",
};

describe("AddToCartModal", () => {
  const onCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with product info and controls", () => {
    render(
      <AddToCartModal
        isModalOpen={true}
        onCloseModal={onCloseModal}
        currentProduct={mockProduct}
      />,
    );
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("increments and decrements quantity", () => {
    render(
      <AddToCartModal
        isModalOpen={true}
        onCloseModal={onCloseModal}
        currentProduct={mockProduct}
      />,
    );
    const plus = screen.getByText("+");
    const minus = screen.getByText("-");
    // Increment
    fireEvent.click(plus);
    expect(screen.getByText("2")).toBeInTheDocument();
    // Decrement
    fireEvent.click(minus);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onCloseModal when cancel is clicked", () => {
    render(
      <AddToCartModal
        isModalOpen={true}
        onCloseModal={onCloseModal}
        currentProduct={mockProduct}
      />,
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCloseModal).toHaveBeenCalled();
  });

  it("dispatches addProductToCart and closes modal on confirm", () => {
    render(
      <AddToCartModal
        isModalOpen={true}
        onCloseModal={onCloseModal}
        currentProduct={mockProduct}
      />,
    );
    fireEvent.click(screen.getByText("Add"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(onCloseModal).toHaveBeenCalled();
  });
});
