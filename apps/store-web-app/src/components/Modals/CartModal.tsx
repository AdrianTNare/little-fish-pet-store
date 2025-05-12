import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  decreaseProductQuantity,
  getProducts,
  increaseProductQuantity,
} from "@/stores/slices/cartSlice";
import { CartModalProps } from "@/types/modal";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useMemo } from "react";
import { CartItem } from "../CartItem";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CartModal = ({ isModalOpen, onCloseModal }: CartModalProps) => {
  const { push } = useRouter();

  const dispatch = useAppDispatch();

  const products = useAppSelector(getProducts);

  const onIncreaseProductQuantity = (id: number) => {
    dispatch(increaseProductQuantity(id));
  };

  const onDecreaseProductQuantity = (id: number) => {
    dispatch(decreaseProductQuantity(id));
  };

  const onCheckout = () => {
    onCloseModal();

    push("/checkout");
  };

  //TODO: ask ai about the effectiveness of this
  const totalAmount = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cart
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Products will be listed here
        </Typography>

        <Box>
          {products.map((cartItem) => (
            <CartItem
              key={cartItem.name}
              item={cartItem}
              onIncreaseQuantity={() => onIncreaseProductQuantity(cartItem.id)}
              onDecreaseQuantity={() => onDecreaseProductQuantity(cartItem.id)}
            />
          ))}
        </Box>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Total Amount : {totalAmount.toFixed(2)}
        </Typography>

        <Button variant="outlined" onClick={onCloseModal}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={onCheckout}
          disabled={!products.length}
        >
          Checkout
        </Button>
      </Box>
    </Modal>
  );
};
