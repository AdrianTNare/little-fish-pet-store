import { render, screen, fireEvent } from '../../test/utils';
import { CartModal } from './CartModal';
import React from 'react';

jest.mock('../CartItem', () => ({
  CartItem: ({ item, onIncreaseQuantity, onDecreaseQuantity }: any) => (
    <div data-testid={`cart-item-${item.id}`}>
      <span data-testid="cart-item-name">{item.name}</span>
      <span data-testid="cart-item-quantity">{item.quantity}</span>
      <button onClick={onDecreaseQuantity}>-</button>
      <button onClick={onIncreaseQuantity}>+</button>
    </div>
  ),
}));

const mockDispatch = jest.fn();
const mockPush = jest.fn();
let mockProducts: any[] = [
  { id: 1, name: 'Fish', price: 10, quantity: 2 },
  { id: 2, name: 'Shrimp', price: 5, quantity: 1 },
];

jest.mock('@/hooks/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector.name === 'getProducts' ? mockProducts : [],
}));

jest.mock('@/stores/slices/cartSlice', () => ({
  increaseProductQuantity: (id: number) => ({ type: 'INCREASE', payload: id }),
  decreaseProductQuantity: (id: number) => ({ type: 'DECREASE', payload: id }),
  getProducts: function getProducts(state: any) { return state; },
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('CartModal', () => {
  const onCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockProducts = [
      { id: 1, name: 'Fish', price: 10, quantity: 2 },
      { id: 2, name: 'Shrimp', price: 5, quantity: 1 },
    ];
  });

  it('renders modal with cart items and total', () => {
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
    const names = screen.getAllByTestId('cart-item-name').map((el) => el.textContent);
    expect(names).toContain('Fish');
    expect(names).toContain('Shrimp');
    expect(screen.getByText('Total Amount : 25.00')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('dispatches increase and decrease actions', () => {
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    fireEvent.click(screen.getAllByText('+')[0]);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE', payload: 1 });
    fireEvent.click(screen.getAllByText('-')[0]);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'DECREASE', payload: 1 });
  });

  it('disables checkout if cart is empty', () => {
    mockProducts = [];
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    expect(screen.getByText('Checkout')).toBeDisabled();
  });

  it('calls onCloseModal when Close is clicked', () => {
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onCloseModal).toHaveBeenCalled();
  });

  it('calls onCloseModal and navigates on Checkout', () => {
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    fireEvent.click(screen.getByText('Checkout'));
    expect(onCloseModal).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/checkout');
  });
}); 