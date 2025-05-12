"use client";

import { FishProductCard } from "./FishProductCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { PaginationInput } from "@/types/product";
import { useGetAllPetFishQuery } from "@/stores/slices/api/productsApiSlice";
import { useModal } from "./hooks/useModal";
import { CartModal as Modal } from "./Modals/CartModal";

export const PetFishList = () => {
  const { onOpenModal, CartModal } = useModal(Modal);

  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    page: 1,
    size: 10,
  });

  const {
    data,
    isLoading,
    error: isError,
  } = useGetAllPetFishQuery(paginationInput);

  const onNextPage = () => {
    setPaginationInput((currentInput) => ({
      ...currentInput,
      page:
        !data?.total || data.total / currentInput.size > currentInput.page
          ? currentInput.page + 1
          : currentInput.page,
    }));
  };

  const onPreviousPage = () => {
    setPaginationInput((currentInput) => ({
      ...currentInput,
      page: currentInput.page > 1 ? currentInput.page - 1 : 1,
    }));
  };

  return (
    <>
      <CartModal />
      <Box position="relative" flexGrow={1}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            overflow="scroll"
            height="68vh"
          >
            <Grid container spacing={2} width="100%" sx={{ maxWidth: 840 }}>
              {isError && <p>Error: failed to load data</p>}

              {isLoading && <p>Loading...</p>}

              {data?.products && (
                <>
                  {data.products.map((pet) => (
                    <FishProductCard key={pet.name} product={pet} />
                  ))}
                </>
              )}
            </Grid>
          </Box>

          {data?.total && (
            <Typography variant="body2" mb={2}>
              Total: {data.total}
            </Typography>
          )}
          <Box display="flex" alignItems="center" columnGap={2}>
            <Button size="small" onClick={onPreviousPage}>
              Previous
            </Button>

            <Typography variant="body2">
              page: {paginationInput.page}
            </Typography>

            <Button size="small" onClick={onNextPage}>
              Next
            </Button>
          </Box>
        </Box>

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
