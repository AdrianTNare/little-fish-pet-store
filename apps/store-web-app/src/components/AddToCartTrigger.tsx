"use client";

import { Button } from "@mui/material";
import { Product } from "@/types/product";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useModal } from "./hooks/useModal";
import { LazyAddToCartModal as Modal } from "./lazy";
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

      <Button 
        variant="outlined" 
        onClick={back}
        startIcon={<ArrowBackIcon />}
        sx={{ minWidth: 120 }}
      >
        Back
      </Button>

      <Button 
        variant="contained" 
        onClick={onOpenAddToCartModal}
        startIcon={<AddShoppingCartIcon />}
        sx={{ minWidth: 120 }}
      >
        Add to cart
      </Button>
    </>
  );
};
