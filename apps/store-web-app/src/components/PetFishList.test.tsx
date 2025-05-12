import { render, screen, fireEvent, within } from '../test/utils';
import { PetFishList } from './PetFishList';
import React from 'react';

const mockOnOpenModal = jest.fn();
const mockCartModal = jest.fn(() => <div data-testid="cart-modal">Cart Modal</div>);

jest.mock('./hooks/useModal', () => ({
  useModal: () => ({
    onOpenModal: mockOnOpenModal,
    CartModal: mockCartModal,
  }),
}));

jest.mock('./Modals/CartModal', () => ({
  CartModal: () => <div data-testid="cart-modal">Cart Modal</div>,
}));

jest.mock('./FishProductCard', () => ({
  FishProductCard: ({ product }: any) => <div data-testid={`product-${product.id}`}>{product.name}</div>,
}));

const mockProducts = [
  { id: 1, name: 'Fish 1' },
  { id: 2, name: 'Fish 2' },
  { id: 3, name: 'Fish 3' },
  { id: 4, name: 'Fish 4' },
];

const createMockData = (page: number, size: number) => ({
  products: mockProducts.slice((page - 1) * size, page * size),
  total: mockProducts.length,
  page,
});

const mockUseGetAllPetFishQuery = jest.fn();

jest.mock('@/stores/slices/api/productsApiSlice', () => ({
  useGetAllPetFishQuery: (paginationInput: { page: number; size: number }) =>
    mockUseGetAllPetFishQuery(paginationInput),
}));

describe('PetFishList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetAllPetFishQuery.mockImplementation(({ page, size }) => ({
      data: createMockData(page, size),
      isLoading: false,
      error: undefined,
    }));
  });

  it('renders loading state', () => {
    mockUseGetAllPetFishQuery.mockImplementation(({ page, size }) => ({
      data: createMockData(page, size),
      isLoading: true,
      error: undefined,
    }));
    render(<PetFishList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseGetAllPetFishQuery.mockImplementation(({ page, size }) => ({
      data: createMockData(page, size),
      isLoading: false,
      error: new Error('Failed to load'),
    }));
    render(<PetFishList />);
    expect(screen.getByText('Error: failed to load data')).toBeInTheDocument();
  });

  it('renders product cards and pagination controls', () => {
    render(<PetFishList />);
    expect(screen.getByTestId('product-1')).toHaveTextContent('Fish 1');
    expect(screen.getByTestId('product-2')).toHaveTextContent('Fish 2');
    expect(screen.getByText('Total: 4')).toBeInTheDocument();
    expect(screen.getByText('page: 1')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('navigates pagination', () => {
    render(<PetFishList />);
    // First page
    expect(screen.getByTestId('product-1')).toHaveTextContent('Fish 1');
    expect(screen.getByTestId('product-2')).toHaveTextContent('Fish 2');
    // Go to second page
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('product-3')).toHaveTextContent('Fish 3');
    expect(screen.getByTestId('product-4')).toHaveTextContent('Fish 4');
    const paginationBox = screen.getByText('Previous').parentElement;
    expect(within(paginationBox!).getByText('2')).toBeInTheDocument();
    // Go back to first page
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByTestId('product-1')).toHaveTextContent('Fish 1');
    expect(screen.getByTestId('product-2')).toHaveTextContent('Fish 2');
    expect(within(paginationBox!).getByText('1')).toBeInTheDocument();
  });

  it('opens the CartModal when Open cart is clicked', () => {
    render(<PetFishList />);
    fireEvent.click(screen.getByText('Open cart'));
    expect(mockOnOpenModal).toHaveBeenCalled();
    expect(screen.getByTestId('cart-modal')).toBeInTheDocument();
  });
}); 