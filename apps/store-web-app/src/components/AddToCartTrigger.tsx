"use client";

import { Button } from "@mui/material";
import { Product } from "@/types/product";
import { useModal } from "./hooks/useAddCartModal";
import { AddToCartModal as Modal } from "./Modals/AddToCartModal";

interface Pros {
  product: Product;
}

export const AddToCartTrigger = ({ product }: Pros) => {
  const { onOpenModal: onOpenAddToCartModal, CartModal: AddToCartModal } =
    useModal(Modal);

  return (
    <>
      <AddToCartModal currentProduct={product} />

      <Button variant="contained" onClick={onOpenAddToCartModal}>
        Add to cart
      </Button>
    </>
  );
};
