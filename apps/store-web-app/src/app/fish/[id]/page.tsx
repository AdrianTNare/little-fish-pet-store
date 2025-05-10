import { AddToCartTrigger } from "@/components/AddToCartTrigger";
import { FishProductCard } from "@/components/FishProductCard";
import { useCartModal } from "@/components/hooks/useCartModal";
import { ProductCartTrigger } from "@/components/ProductCartTrigger";
import { fishProducts } from "@/fixtures/fishProducts";
import { Box, Button, Typography } from "@mui/material";

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Product({ params }: Props) {
  //TODO: we might wanna keep the bulk of this component as a server component, meaning we might need to fetch the static data jere instead of on the client

  const { id } = await params;

  console.log({ id });

  const product = fishProducts.find((product) => product.id === parseInt(id));

  return (
    <Box height="100vh" display="relative">
      {!product && <p>Product not found</p>}

      {product && (
        <>
          <Typography mb={0.5} fontWeight="bold" fontSize="small">
            {product.price}
          </Typography>

          <Typography mb={1} fontWeight="bold">
            {product.name}
          </Typography>

          <Typography fontSize="small">{product.description}</Typography>

          <AddToCartTrigger />
        </>
      )}

      <Box
        position="sticky"
        width="100%"
        display="flex"
        justifyContent="end"
        zIndex={1}
        pr={2}
        bottom={0}
      >
        <ProductCartTrigger />
      </Box>
    </Box>
  );
}
