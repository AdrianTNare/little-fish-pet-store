"use client";

import { CheckoutBillItem } from "./CheckoutBillItem";
import { useAppSelector } from "@/hooks/store";
import { getProducts } from "@/stores/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export const CheckoutBill = () => {
  const { back, push } = useRouter();
  const pathname = usePathname();
  const products = useAppSelector(getProducts);

  const totalAmount = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  const onPay = () => {
    push("/complete");
  };

  return (
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
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        {pathname.includes("checkout") ? "Checkout" : "Complete"}
      </Typography>

      <Box sx={{ mb: 4 }}>
        {products.map((billItem) => (
          <CheckoutBillItem key={billItem.name} item={billItem} />
        ))}
      </Box>

      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        borderTop: 2,
        borderColor: "divider",
        py: 2,
        mb: 3
      }}>
        <Typography variant="h6">Total Amount</Typography>
        <Typography variant="h6">{totalAmount.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button 
          variant="outlined" 
          onClick={back}
          startIcon={<ArrowBackIcon />}
          sx={{ minWidth: 120 }}
        >
          Back
        </Button>
        
        {pathname.includes("checkout") && (
          <Button 
            variant="contained" 
            onClick={onPay} 
            disabled={!products.length}
            startIcon={<PaymentIcon />}
            sx={{ minWidth: 120 }}
          >
            Pay
          </Button>
        )}

        {!pathname.includes("checkout") && (
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{ minWidth: 120 }}
            >
              Back Home
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};
