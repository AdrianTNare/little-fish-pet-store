import { CartItem as CartItemType } from "@/types/product";
import { Box, Button, Typography } from "@mui/material";
interface props {
  item: CartItemType;
}

export const CartItem = ({ item }: props) => {
  return (
    <Box>
      <Typography>Name of product : {item.name}</Typography>
      <Typography>Price : {item.price}</Typography>

      <Box display="flex">
        <Button variant="outlined" size="small">
          -
        </Button>
        <Typography mx={5}>{item.quantity}</Typography>
        <Button variant="contained" size="small">
          +
        </Button>
      </Box>
    </Box>
  );
};
