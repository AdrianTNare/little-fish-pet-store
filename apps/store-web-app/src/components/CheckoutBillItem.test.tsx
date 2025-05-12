import { render, screen } from "../test/utils";
import { CheckoutBillItem } from "./CheckoutBillItem";

describe("CheckoutBillItem", () => {
  const mockItem = {
    id: 1,
    name: "Test Fish",
    price: 10.99,
    quantity: 2,
    image: "test-image.jpg",
  };

  it("renders the item name", () => {
    render(<CheckoutBillItem item={mockItem} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  });

  it("renders the item price", () => {
    render(<CheckoutBillItem item={mockItem} />);
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockItem.quantity} x ${mockItem.price}`),
    ).toBeInTheDocument();
  });

  it("calculates and renders the subtotal correctly", () => {
    render(<CheckoutBillItem item={mockItem} />);
    const expectedSubtotal = mockItem.price * mockItem.quantity;
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText(expectedSubtotal.toFixed(2))).toBeInTheDocument();
  });
});
