import { CheckoutBill } from "@/components/CheckoutBill";
import { Box } from "@mui/material";

export default function Checkout() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
      }}
    >
      <CheckoutBill />
    </Box>
  );
}
