import { render, screen, fireEvent } from '../../test/utils';
import { CartModal } from './CartModal';
import React from 'react';
import { CartItem as CartItemType } from '@/types/product';
import { RootState } from '@/stores/store';
import { cartSlice } from '@/stores/slices/cartSlice';

jest.mock('../CartItem', () => ({
  CartItem: ({ item, onIncreaseQuantity, onDecreaseQuantity }: { 
    item: CartItemType; 
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
const mockPush = jest.fn();

let mockProducts: CartItemType[] = [
  { id: 1, name: 'Fish', price: 10, quantity: 2 },
  { id: 2, name: 'Shrimp', price: 5, quantity: 1 },
];

jest.mock('@/hooks/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: RootState) => CartItemType[]) => selector.name === 'getProducts' ? mockProducts : [],
}));

jest.mock('@/stores/slices/cartSlice', () => ({
  increaseProductQuantity: (id: number) => ({ type: 'INCREASE', payload: id }),
  decreaseProductQuantity: (id: number) => ({ type: 'DECREASE', payload: id }),
  getProducts: function getProducts(state: ReturnType<typeof cartSlice.getInitialState>) { return state; },
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
    expect(screen.getByText('Fish')).toBeInTheDocument();
    expect(screen.getByText('Shrimp')).toBeInTheDocument();
    expect(screen.getByText('Total Amount : 25.00')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('dispatches increase and decrease actions', () => {
    render(<CartModal isModalOpen={true} onCloseModal={onCloseModal} />);
    const plusButtons = screen.getAllByText('+');
    const minusButtons = screen.getAllByText('-');
    
    fireEvent.click(plusButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'INCREASE', payload: 1 });
    
    fireEvent.click(minusButtons[0]);
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