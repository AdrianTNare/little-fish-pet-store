import { render, screen, fireEvent } from '../test/utils';
import { CartItem } from './CartItem';
import { CartItem as CartItemType } from '@/types/product';

describe('CartItem', () => {
  const mockItem: CartItemType = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    quantity: 2
  };

  it('renders product name and price', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText(`Name of product : ${mockItem.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Price : ${mockItem.price}`)).toBeInTheDocument();
  });

  it('renders quantity controls', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
  });

  it('calls onDecreaseQuantity when minus button is clicked', () => {
    const mockDecrease = jest.fn();
    render(<CartItem item={mockItem} onDecreaseQuantity={mockDecrease} />);
    fireEvent.click(screen.getByText('-'));
    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it('calls onIncreaseQuantity when plus button is clicked', () => {
    const mockIncrease = jest.fn();
    render(<CartItem item={mockItem} onIncreaseQuantity={mockIncrease} />);
    fireEvent.click(screen.getByText('+'));
    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it('does not throw when quantity callbacks are not provided', () => {
    render(<CartItem item={mockItem} />);
    expect(() => {
      fireEvent.click(screen.getByText('-'));
      fireEvent.click(screen.getByText('+'));
    }).not.toThrow();
  });
}); 