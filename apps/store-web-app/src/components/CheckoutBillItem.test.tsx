import { render, screen } from '../test/utils';
import { CheckoutBillItem } from './CheckoutBillItem';

describe('CheckoutBillItem', () => {
  const mockItem = {
    id: 1,
    name: 'Test Fish',
    price: 10.99,
    quantity: 2,
    image: 'test-image.jpg'
  };

  it('renders the item name', () => {
    render(<CheckoutBillItem item={mockItem} />);
    expect(screen.getByText('Name : Test Fish')).toBeInTheDocument();
  });

  it('renders the item price', () => {
    render(<CheckoutBillItem item={mockItem} />);
    expect(screen.getByText('Price : 10.99')).toBeInTheDocument();
  });

  it('calculates and renders the subtotal correctly', () => {
    render(<CheckoutBillItem item={mockItem} />);
    const expectedSubtotal = mockItem.price * mockItem.quantity;
    expect(screen.getByText(`Subtotal : ${expectedSubtotal}`)).toBeInTheDocument();
  });
}); 