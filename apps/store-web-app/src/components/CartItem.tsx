import { CartItem as CartItemType } from "@/types/product";
import { Box, Button, Typography } from "@mui/material";
interface props {
  item: CartItemType;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
}

export const CartItem = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: props) => {
  return (
    <Box>
      <Typography>Name of product : {item.name}</Typography>
      <Typography>Price : {item.price}</Typography>

      <Box display="flex">
        <Button
          variant="outlined"
          size="small"
          disabled={item.quantity === 1}
          onClick={onDecreaseQuantity}
        >
          -
        </Button>
        <Typography mx={5}>{item.quantity}</Typography>
        <Button variant="contained" size="small" onClick={onIncreaseQuantity}>
          +
        </Button>
      </Box>
    </Box>
  );
};
