"use client";

import { FishProductCard } from "./FishProductCard";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useState, useCallback } from "react";
import { PaginationInput } from "@/types/product";
import { useGetAllPetFishQuery } from "@/stores/slices/api/productsApiSlice";
import { ProductCartTrigger } from "./ProductCartTrigger";

export const PetFishList = () => {
  const [paginationInput, setPaginationInput] = useState<PaginationInput>({
    page: 1,
    size: 10,
  });

  const {
    data,
    isLoading,
    error: isError,
  } = useGetAllPetFishQuery(paginationInput);

  const onNextPage = useCallback(() => {
    setPaginationInput((currentInput) => ({
      ...currentInput,
      page:
        !data?.total || data.total / currentInput.size > currentInput.page
          ? currentInput.page + 1
          : currentInput.page,
    }));
  }, [data?.total]);

  const onPreviousPage = useCallback(() => {
    setPaginationInput((currentInput) => ({
      ...currentInput,
      page: currentInput.page > 1 ? currentInput.page - 1 : 1,
    }));
  }, []);

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {isError && (
          <Alert 
            severity="warning"
            sx={{ 
              height: 36,
              mb: 2
            }}
          >
            Error Loading Fish
          </Alert>
        )}

        {isLoading && (
          <Alert 
            severity="info"
            variant="outlined"
            sx={{ 
              height: 36,
              mb: 2
            }}
          >
            Loading Fish
          </Alert>
        )}

        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          overflow="scroll"
          flexGrow={1}
          maxHeight="76vh"
        >
          <Grid container spacing={2} sx={{ width: '100%', maxWidth: 840 }}>

            {data?.products && (
              <>
                {data.products.map((pet) => (
                  <FishProductCard key={pet.id} product={pet} />
                ))}
              </>
            )}
          </Grid>
        </Box>

        {data?.total && (
          <Typography variant="body2" mt={2} mb={1}>
            Total: {data.total}
          </Typography>
        )}
        <Box display="flex" alignItems="center" columnGap={2} mb={1}>
          <Button
            size="small"
            onClick={onPreviousPage}
            startIcon={<NavigateBeforeIcon />}
          >
            Previous
          </Button>

          <Typography variant="body2">page: {paginationInput.page}</Typography>

          <Button
            size="small"
            onClick={onNextPage}
            endIcon={<NavigateNextIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>

      <ProductCartTrigger />
    </>
  );
};
