import { Product } from "@/types/product";
import {Box, Typography} from "@mui/material";

interface Props {
  product: Product;
}

export const FishProductCard = ({
  product: { name, price, description },
}: Props) => {
  return (
    <Box py={2} height="100%" maxHeight={150}>
      <Typography mb={0.5} fontWeight="bold" fontSize="small">{price}</Typography>
      <Typography mb={1} fontWeight="bold">{name}</Typography>
      <Typography fontSize="small">{description}</Typography>
    </Box>
  );
};
