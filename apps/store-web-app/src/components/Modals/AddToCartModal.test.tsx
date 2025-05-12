import { render, screen, fireEvent } from '../../test/utils';
import { AddToCartModal } from './AddToCartModal';
import React from 'react';

jest.mock('../CartItem', () => ({
  CartItem: ({ item, onIncreaseQuantity, onDecreaseQuantity }: any) => (
    <div>
      <span data-testid="cart-item-name">{item.name}</span>
      <span data-testid="cart-item-quantity">{item.quantity}</span>
      <button onClick={onDecreaseQuantity}>-</button>
      <button onClick={onIncreaseQuantity}>+</button>
    </div>
  ),
}));

const mockDispatch = jest.fn();
jest.mock('@/hooks/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

// Mock addProductToCart to avoid ESM/CJS issues
export const mockAddProductToCart = jest.fn();
jest.mock('@/stores/slices/cartSlice', () => ({
  addProductToCart: (...args: any[]) => mockAddProductToCart(...args),
}));

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  description: 'Test Description',
};

describe('AddToCartModal', () => {
  const onCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with product info and controls', () => {
    render(
      <AddToCartModal isModalOpen={true} onCloseModal={onCloseModal} currentProduct={mockProduct} />
    );
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-name')).toHaveTextContent(mockProduct.name);
    expect(screen.getByTestId('cart-item-quantity')).toHaveTextContent('1');
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('increments and decrements quantity', () => {
    render(
      <AddToCartModal isModalOpen={true} onCloseModal={onCloseModal} currentProduct={mockProduct} />
    );
    const plus = screen.getByText('+');
    const minus = screen.getByText('-');
    const quantity = screen.getByTestId('cart-item-quantity');
    // Increment
    fireEvent.click(plus);
    expect(quantity).toHaveTextContent('2');
    // Decrement
    fireEvent.click(minus);
    expect(quantity).toHaveTextContent('1');
  });

  it('calls onCloseModal when cancel is clicked', () => {
    render(
      <AddToCartModal isModalOpen={true} onCloseModal={onCloseModal} currentProduct={mockProduct} />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseModal).toHaveBeenCalled();
  });

  it('dispatches addProductToCart and closes modal on confirm', () => {
    render(
      <AddToCartModal isModalOpen={true} onCloseModal={onCloseModal} currentProduct={mockProduct} />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockDispatch).toHaveBeenCalled();
    expect(onCloseModal).toHaveBeenCalled();
  });
}); 