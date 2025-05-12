import { CartItem } from "@/types/product";
import { Box, Typography } from "@mui/material";

interface Props {
  item: CartItem;
}

export const CheckoutBillItem = ({ item }: Props) => {
  const subtotal = item.price * item.quantity;

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 1,
      py: 2,
      borderBottom: "1px solid",
      borderColor: "divider"
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Name</Typography>
        <Typography variant="body1">{item.name}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Quantity</Typography>
        <Typography variant="body1">{item.quantity} x {item.price}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Subtotal</Typography>
        <Typography variant="body1">{subtotal.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};
