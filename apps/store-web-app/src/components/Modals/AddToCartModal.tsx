import { Product } from "@/types/product";
import { CartModalProps } from "@/types/modal";
import { Box, Button, Modal, Typography, IconButton } from "@mui/material";
import { CartItem } from "../CartItem";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CancelIcon from "@mui/icons-material/Cancel";
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
  borderRadius: 1,
  boxShadow: 24,
  p: 0,
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
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h6" component="h2">
            Add to Cart
          </Typography>
          <IconButton size="small" onClick={onCloseModal} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          <CartItem
            item={{ ...currentProduct, quantity }}
            onIncreaseQuantity={onIncrement}
            onDecreaseQuantity={onDecrement}
          />
        </Box>

        <Box sx={{ 
          display: "flex", 
          gap: 2, 
          justifyContent: "flex-end",
          p: 2,
          borderTop: 1,
          borderColor: "divider"
        }}>
          <Button 
            variant="outlined" 
            onClick={onCloseModal}
            startIcon={<CancelIcon />}
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={onConfirm}
            startIcon={<ShoppingCartIcon />}
            sx={{ minWidth: 100 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
