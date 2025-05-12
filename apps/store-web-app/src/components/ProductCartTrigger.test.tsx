import { render, screen, fireEvent } from '../test/utils';
import { ProductCartTrigger } from './ProductCartTrigger';
import React from 'react';

const mockOnOpenModal = jest.fn();
const mockCartModal = jest.fn(() => <div>Cart Modal</div>);

jest.mock('./hooks/useModal', () => ({
  useModal: () => ({
    onOpenModal: mockOnOpenModal,
    CartModal: mockCartModal,
  }),
}));

// Mock CartModal to avoid ESM/CJS issues
jest.mock('./Modals/CartModal', () => ({
  CartModal: () => <div>Cart Modal</div>,
}));

describe('ProductCartTrigger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cart button', () => {
    render(<ProductCartTrigger />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens the CartModal when the button is clicked', () => {
    render(<ProductCartTrigger />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnOpenModal).toHaveBeenCalled();
    expect(screen.getByText('Cart Modal')).toBeInTheDocument();
  });
}); 