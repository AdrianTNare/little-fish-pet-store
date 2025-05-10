"use client";

import { fishProducts } from "@/fixtures/fishProducts";
import { FishProductCard } from "./FishProductCard";
import { Box, Button } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { useState } from "react";
import { CartModal } from "./Modals/CartModal";

export const PetFishList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CartModal isModalOpen={isModalOpen} onCloseModal={onCloseModal} />

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
