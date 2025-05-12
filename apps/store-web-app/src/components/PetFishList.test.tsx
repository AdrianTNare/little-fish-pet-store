import { render, screen, fireEvent } from "../test/utils";
import { PetFishList } from "./PetFishList";
import React from "react";
import { Product } from "@/types/product";

const mockOnOpenModal = jest.fn();
const mockCartModal = jest.fn(() => <div>Cart Modal</div>);

jest.mock("./hooks/useModal", () => ({
  useModal: () => ({
    onOpenModal: mockOnOpenModal,
    CartModal: mockCartModal,
  }),
}));

jest.mock("./Modals/CartModal", () => ({
  CartModal: () => <div>Cart Modal</div>,
}));

jest.mock("./FishProductCard", () => ({
  FishProductCard: ({ product }: { product: Product }) => (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  ),
}));

const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Fish ${i + 1}`,
  price: 10.99,
  description: `Description for Fish ${i + 1}`,
}));

const createMockData = (page: number, size: number) => ({
  products: mockProducts.slice((page - 1) * size, page * size),
  total: mockProducts.length,
  page,
});

const mockUseGetAllPetFishQuery = jest.fn();

jest.mock("@/stores/slices/api/productsApiSlice", () => ({
  useGetAllPetFishQuery: (paginationInput: { page: number; size: number }) =>
    mockUseGetAllPetFishQuery(paginationInput),
}));

describe("PetFishList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetAllPetFishQuery.mockImplementation(({ page, size }) => ({
      data: createMockData(page, size),
      isLoading: false,
      error: undefined,
    }));
  });

  it("renders loading state", () => {
    mockUseGetAllPetFishQuery.mockImplementation(() => ({
      data: undefined,
      isLoading: true,
      error: undefined,
    }));
    render(<PetFishList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseGetAllPetFishQuery.mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to load"),
    }));
    render(<PetFishList />);
    expect(screen.getByText("Error: failed to load data")).toBeInTheDocument();
  });

  it("renders product cards and pagination controls", () => {
    render(<PetFishList />);
    expect(screen.getByText("Fish 1")).toBeInTheDocument();
    expect(screen.getByText("Fish 2")).toBeInTheDocument();
    expect(
      screen.getByText((_, node) => node?.textContent === "Total: 20"),
    ).toBeInTheDocument();
    expect(screen.getByText("page: 1")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("navigates pagination", () => {
    render(<PetFishList />);
    // First page (items 1-10)
    expect(screen.getByText("Fish 1")).toBeInTheDocument();
    expect(screen.getByText("Fish 10")).toBeInTheDocument();
    expect(screen.queryByText("Fish 11")).not.toBeInTheDocument();
    // Go to second page
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Fish 11")).toBeInTheDocument();
    expect(screen.getByText("Fish 20")).toBeInTheDocument();
    expect(screen.queryByText("Fish 1")).not.toBeInTheDocument();
    // Find the Typography element that contains the page number
    const paginationBox = screen.getByText("Previous").parentElement;
    const pageTypography = paginationBox?.querySelector(
      "[class*=MuiTypography-root]",
    );
    expect(pageTypography?.textContent).toContain("2");
    // Go back to first page
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Fish 1")).toBeInTheDocument();
    expect(screen.getByText("Fish 10")).toBeInTheDocument();
    expect(pageTypography?.textContent).toContain("1");
  });

  it("opens the CartModal when cart button is clicked", () => {
    render(<PetFishList />);
    const cartButton = screen.getByRole("button", { name: /cart/i });
    fireEvent.click(cartButton);
    expect(mockOnOpenModal).toHaveBeenCalled();
    expect(screen.getByText("Cart Modal")).toBeInTheDocument();
  });
});
