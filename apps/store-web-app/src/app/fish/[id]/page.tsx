import { AddToCartTrigger } from "@/components/AddToCartTrigger";
import { ProductCartTrigger } from "@/components/ProductCartTrigger";
import { fishProducts } from "@/fixtures/fishProducts";
import { Box, Typography } from "@mui/material";

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
    <Box
      sx={{
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {!product && (
          <Typography variant="h6" textAlign="center">
            Product not found
          </Typography>
        )}

        {product && (
          <>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              {product.name}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  pb: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6">Price</Typography>
                <Typography variant="h6">
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 4 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <AddToCartTrigger product={product} />
              </Box>
            </Box>
          </>
        )}
      </Box>

      <ProductCartTrigger />
    </Box>
  );
}
