"use client";

import { Button } from "@mui/material";
import { LazyCartModal as Modal } from "./lazy";
import { useModal } from "./hooks/useModal";
import { ShoppingCart } from "lucide-react";

export const ProductCartTrigger = () => {
  const { onOpenModal, CartModal } = useModal(Modal);

  return (
    <>
      <CartModal />

      <Button
        variant="contained"
        onClick={onOpenModal}
        aria-label="cart"
        sx={{
          borderRadius: "100%",
          width: 56,
          height: 56,
          position: "absolute",
          bottom: 60,
          right: 36,
          zIndex: 1,
        }}
      >
        <ShoppingCart />
      </Button>
    </>
  );
};
