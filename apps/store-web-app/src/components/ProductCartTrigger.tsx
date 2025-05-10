"use client";

import { useCartModal } from "@/components/hooks/useCartModal";
import { Button } from "@mui/material";

export const ProductCartTrigger = () => {
  const { onOpenModal, CartModal } = useCartModal();

  return (
    <>
      <CartModal />

      <Button variant="contained" onClick={onOpenModal}>
        View cart
      </Button>
    </>
  );
};
