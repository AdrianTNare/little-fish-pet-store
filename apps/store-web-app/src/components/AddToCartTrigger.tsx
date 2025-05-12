"use client";

import { Button } from "@mui/material";
import { Product } from "@/types/product";
import { useModal } from "./hooks/useModal";
import { AddToCartModal as Modal } from "./Modals/AddToCartModal";
import { useRouter } from "next/navigation";

interface Pros {
  product: Product;
}

export const AddToCartTrigger = ({ product }: Pros) => {
  const { back } = useRouter();

  const { onOpenModal: onOpenAddToCartModal, CartModal: AddToCartModal } =
    useModal(Modal);

  return (
    <>
      <AddToCartModal currentProduct={product} />

      <Button variant="outlined" onClick={back}>
        Back
      </Button>

      <Button variant="contained" onClick={onOpenAddToCartModal}>
        Add to cart
      </Button>
    </>
  );
};
