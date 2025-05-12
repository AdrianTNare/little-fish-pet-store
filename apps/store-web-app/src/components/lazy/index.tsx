import dynamic from "next/dynamic";
import { CartModalProps } from "@/types/modal";
import { Product } from "@/types/product";

interface AddToCartModalProps extends CartModalProps {
  currentProduct: Product;
}

export const LazyCartModal = dynamic<CartModalProps>(
  () =>
    import("../Modals/CartModal").then((mod) => ({ default: mod.CartModal })),
  { ssr: false },
);

export const LazyCheckoutBill = dynamic(
  () =>
    import("../CheckoutBill").then((mod) => ({ default: mod.CheckoutBill })),
  { ssr: false },
);

export const LazyAddToCartModal = dynamic<AddToCartModalProps>(
  () =>
    import("../Modals/AddToCartModal").then((mod) => ({
      default: mod.AddToCartModal,
    })),
  { ssr: false },
);
