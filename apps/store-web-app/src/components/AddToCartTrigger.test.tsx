// Declare the global mock for useModal
declare global {
  // eslint-disable-next-line no-var
  var mockUseModal: jest.Mock;
}

// Mock useModal at the top using globalThis to avoid hoisting issues
jest.mock('./hooks/useModal', () => {
  globalThis.mockUseModal = globalThis.mockUseModal || jest.fn();
  return {
    useModal: globalThis.mockUseModal,
  };
});

import { render, screen, fireEvent } from '../test/utils';
import { AddToCartTrigger } from './AddToCartTrigger';
import { Product } from '@/types/product';

// Mock the cartSlice module
jest.mock('../stores/slices/cartSlice', () => ({
  cartSlice: {
    actions: {
      increaseProductQuantity: jest.fn(),
      decreaseProductQuantity: jest.fn(),
    },
    selectors: {
      getProducts: jest.fn(),
    },
  },
}));

describe('AddToCartTrigger', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    description: 'Test Description'
  };

  beforeEach(() => {
    globalThis.mockUseModal.mockImplementation(() => ({
      onOpenModal: jest.fn(),
      CartModal: ({ currentProduct }: { currentProduct: Product }) => (
        <div>
          Modal for {currentProduct.name}
        </div>
      ),
    }));
  });

  it('renders the back button', () => {
    render(<AddToCartTrigger product={mockProduct} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders the add to cart button', () => {
    render(<AddToCartTrigger product={mockProduct} />);
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });

  it('renders the modal with the correct product', () => {
    render(<AddToCartTrigger product={mockProduct} />);
    expect(screen.getByText(`Modal for ${mockProduct.name}`)).toBeInTheDocument();
  });

  it('calls onOpenAddToCartModal when add to cart button is clicked', () => {
    const mockOnOpenModal = jest.fn();
    globalThis.mockUseModal.mockImplementation(() => ({
      onOpenModal: mockOnOpenModal,
      CartModal: ({ currentProduct }: { currentProduct: Product }) => (
        <div>
          Modal for {currentProduct.name}
        </div>
      ),
    }));
    render(<AddToCartTrigger product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to cart'));
    expect(mockOnOpenModal).toHaveBeenCalled();
  });
}); 