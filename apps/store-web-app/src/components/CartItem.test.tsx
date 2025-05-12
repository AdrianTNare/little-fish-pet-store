import { render, screen, fireEvent } from "../test/utils";
import { CartItem } from "./CartItem";
import { CartItem as CartItemType } from "@/types/product";

describe("CartItem", () => {
  const mockItem: CartItemType = {
    id: 1,
    name: "Test Product",
    price: 99.99,
    quantity: 2,
  };

  it("renders product name and price", () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockItem.price.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("renders quantity controls", () => {
    render(<CartItem item={mockItem} />);
    const minusButton = screen.getByRole("button", { name: /remove/i });
    const plusButton = screen.getByRole("button", { name: /add/i });
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
  });

  it("calls onDecreaseQuantity when minus button is clicked", () => {
    const mockDecrease = jest.fn();
    render(<CartItem item={mockItem} onDecreaseQuantity={mockDecrease} />);
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));
    expect(mockDecrease).toHaveBeenCalledTimes(1);
  });

  it("calls onIncreaseQuantity when plus button is clicked", () => {
    const mockIncrease = jest.fn();
    render(<CartItem item={mockItem} onIncreaseQuantity={mockIncrease} />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(mockIncrease).toHaveBeenCalledTimes(1);
  });

  it("does not throw when quantity callbacks are not provided", () => {
    render(<CartItem item={mockItem} />);
    expect(() => {
      fireEvent.click(screen.getByRole("button", { name: /remove/i }));
      fireEvent.click(screen.getByRole("button", { name: /add/i }));
    }).not.toThrow();
  });
});
