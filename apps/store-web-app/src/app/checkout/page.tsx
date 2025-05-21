import type { Metadata } from "next";
import { CheckoutBill } from "@/components/CheckoutBill";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout details",
};

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
