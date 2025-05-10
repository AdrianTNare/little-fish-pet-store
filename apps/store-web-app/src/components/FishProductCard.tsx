import { Product } from "@/types/product";
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  product: Product;
}

export const FishProductCard = ({
  product: { id, name, price, description },
}: Props) => {
  return (
    <Box py={2} height="100%" maxHeight={150}>
      <Typography mb={0.5} fontWeight="bold" fontSize="small">
        {price}
      </Typography>
      <Typography mb={1} fontWeight="bold">
        {name}
      </Typography>
      <Typography fontSize="small">{description}</Typography>
      <MuiLink component={Link} href={{ pathname: `/fish/${id}` }}>
        View
      </MuiLink>
    </Box>
  );
};
