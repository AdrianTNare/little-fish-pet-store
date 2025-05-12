import { render, screen, fireEvent } from '../test/utils';
import { ProductCartTrigger } from './ProductCartTrigger';
import React from 'react';

const mockOnOpenModal = jest.fn();
const mockCartModal = jest.fn(() => <div data-testid="cart-modal">Cart Modal</div>);

jest.mock('./hooks/useModal', () => ({
  useModal: () => ({
    onOpenModal: mockOnOpenModal,
    CartModal: mockCartModal,
  }),
}));

// Mock CartModal to avoid ESM/CJS issues
jest.mock('./Modals/CartModal', () => ({
  CartModal: () => <div data-testid="cart-modal">Cart Modal</div>,
}));

describe('ProductCartTrigger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the View cart button', () => {
    render(<ProductCartTrigger />);
    expect(screen.getByText('View cart')).toBeInTheDocument();
  });

  it('opens the CartModal when the button is clicked', () => {
    render(<ProductCartTrigger />);
    fireEvent.click(screen.getByText('View cart'));
    expect(mockOnOpenModal).toHaveBeenCalled();
    expect(screen.getByTestId('cart-modal')).toBeInTheDocument();
  });
}); 