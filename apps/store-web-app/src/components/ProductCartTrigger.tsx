"use client";

import { Button } from "@mui/material";
import { CartModal as Modal } from "./Modals/CartModal";
import { useModal } from "./hooks/useModal";

export const ProductCartTrigger = () => {
  const { onOpenModal, CartModal } = useModal(Modal);

  return (
    <>
      <CartModal />

      <Button variant="contained" onClick={onOpenModal}>
        View cart
      </Button>
    </>
  );
};
