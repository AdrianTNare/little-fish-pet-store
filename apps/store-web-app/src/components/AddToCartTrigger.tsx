"use client";

import { Button } from "@mui/material";
import { useAddCartModal } from "./hooks/useAddCartModal";

export const AddToCartTrigger = () => {
  const { onOpenModal: onOpenAddToCartModal, CartModal: AddToCartModal } =
    useAddCartModal();

  return (
    <>
      <AddToCartModal />

      <Button variant="contained" onClick={onOpenAddToCartModal}>
        Add to cart
      </Button>
    </>
  );
};
