import { render, screen } from "@testing-library/react";
import React from "react";
import { CartModalProps } from "@/types/modal";
import { Product } from "@/types/product";

interface AddToCartModalProps extends CartModalProps {
  currentProduct: Product;
}

// Mock the actual components with proper types
const CartModalMock: React.FC<CartModalProps> = ({ isModalOpen }) =>
  isModalOpen ? <div>Cart Modal Content</div> : null;

const CheckoutBillMock: React.FC = () => <div>Checkout Bill Content</div>;

const AddToCartModalMock: React.FC<AddToCartModalProps> = ({ isModalOpen }) =>
  isModalOpen ? <div>Add To Cart Modal Content</div> : null;

// Mock the component modules
jest.mock("../Modals/CartModal", () => ({
  CartModal: CartModalMock,
}));

jest.mock("../CheckoutBill", () => ({
  CheckoutBill: CheckoutBillMock,
}));

jest.mock("../Modals/AddToCartModal", () => ({
  AddToCartModal: AddToCartModalMock,
}));

// Mock next/dynamic to handle dynamic imports
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: <T extends Record<string, unknown>>(
    dynamicImport: () => Promise<{ default: React.ComponentType<T> }>,
  ) => {
    const importPath = dynamicImport.toString();
    let Component: React.ComponentType<T>;

    if (importPath.includes("CartModal") && !importPath.includes("AddToCart")) {
      Component = CartModalMock as unknown as React.ComponentType<T>;
    } else if (importPath.includes("CheckoutBill")) {
      Component = CheckoutBillMock as unknown as React.ComponentType<T>;
    } else if (importPath.includes("AddToCartModal")) {
      Component = AddToCartModalMock as unknown as React.ComponentType<T>;
    } else {
      Component = (() => null) as unknown as React.ComponentType<T>;
    }

    return (props: T) => <Component {...props} />;
  },
}));

// Import components to test
import { LazyCartModal, LazyCheckoutBill, LazyAddToCartModal } from "./index";

describe("Lazy Components", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders LazyCartModal when open", () => {
    render(<LazyCartModal isModalOpen={true} onCloseModal={() => {}} />);
    expect(screen.getByText("Cart Modal Content")).toBeInTheDocument();
  });

  it("does not render LazyCartModal when closed", () => {
    render(<LazyCartModal isModalOpen={false} onCloseModal={() => {}} />);
    expect(screen.queryByText("Cart Modal Content")).not.toBeInTheDocument();
  });

  it("renders LazyCheckoutBill", () => {
    render(<LazyCheckoutBill />);
    expect(screen.getByText("Checkout Bill Content")).toBeInTheDocument();
  });

  it("renders LazyAddToCartModal when open", () => {
    const testProduct: Product = {
      id: 1,
      name: "Test",
      price: 10,
      description: "Test Description",
    };

    render(
      <LazyAddToCartModal
        isModalOpen={true}
        onCloseModal={() => {}}
        currentProduct={testProduct}
      />,
    );
    expect(screen.getByText("Add To Cart Modal Content")).toBeInTheDocument();
  });

  it("does not render LazyAddToCartModal when closed", () => {
    const testProduct: Product = {
      id: 1,
      name: "Test",
      price: 10,
      description: "Test Description",
    };

    render(
      <LazyAddToCartModal
        isModalOpen={false}
        onCloseModal={() => {}}
        currentProduct={testProduct}
      />,
    );
    expect(
      screen.queryByText("Add To Cart Modal Content"),
    ).not.toBeInTheDocument();
  });
});
