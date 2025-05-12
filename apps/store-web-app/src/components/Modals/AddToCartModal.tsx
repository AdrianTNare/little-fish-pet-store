import { Product } from "@/types/product";
import { CartModalProps } from "@/types/modal";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CartItem } from "../CartItem";
import { useAppDispatch } from "@/hooks/store";
import { addProductToCart } from "@/stores/slices/cartSlice";
import { useState } from "react";

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

interface Props extends CartModalProps {
  currentProduct: Product;
}

export const AddToCartModal = ({
  isModalOpen,
  onCloseModal,
  currentProduct,
}: Props) => {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const onIncrement = () => setQuantity(quantity + 1);

  const onDecrement = () => setQuantity(quantity - 1);

  const onConfirm = () => {
    dispatch(addProductToCart({ ...currentProduct, quantity }));

    onCloseModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add to Cart
        </Typography>

        <Box>
          <CartItem
            item={{ ...currentProduct, quantity }}
            onIncreaseQuantity={onIncrement}
            onDecreaseQuantity={onDecrement}
          />
        </Box>

        <Button variant="outlined" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};
