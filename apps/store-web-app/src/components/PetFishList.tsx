"use client";

import { fishProducts } from "@/fixtures/fishProducts";
import { FishProductCard } from "./FishProductCard";
import { Box, Button } from "@mui/material";
import { useCartModal } from "./hooks/useCartModal";

export const PetFishList = () => {
  const { onOpenModal, CartModal } = useCartModal();

  return (
    <>
      <CartModal />

      <Box position="relative" overflow="scroll" height="80vh">
        {fishProducts.map((pet) => (
          <FishProductCard key={pet.name} product={pet} />
        ))}

        <Box
          position="sticky"
          width="100%"
          display="flex"
          justifyContent="end"
          zIndex={1}
          bottom={2}
          pr={2}
        >
          <Button variant="contained" onClick={onOpenModal}>
            Open cart
          </Button>
        </Box>
      </Box>
    </>
  );
};
