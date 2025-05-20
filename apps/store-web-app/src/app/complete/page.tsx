import type { Metadata } from "next";
import { CheckoutBill } from "@/components/CheckoutBill";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Complete",
  description: "Order details",
};

export default function Checkout() {
  return (
    <Box height="100%">
      <CheckoutBill />
    </Box>
  );
}
