"use client";

import { CheckoutBillItem } from "./CheckoutBillItem";
import { useAppSelector } from "@/hooks/store";
import { getProducts } from "@/stores/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
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
    <Box>
      <Typography>Checkout </Typography>

      <Box>
        {products.map((billItem) => (
          <CheckoutBillItem key={billItem.name} item={billItem} />
        ))}
      </Box>

      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Total Amount : {totalAmount.toFixed(2)}
      </Typography>

      <Button variant="outlined" onClick={back}>
        Back
      </Button>
      {pathname.includes("checkout") && (
        <Button variant="contained" onClick={onPay} disabled={!products.length}>
          Pay
        </Button>
      )}

      {!pathname.includes("checkout") && (
        <Link href="/">
          <Button
            variant="contained"
            //onClick={onCheckout}
          >
            Back Home
          </Button>
        </Link>
      )}
    </Box>
  );
};
