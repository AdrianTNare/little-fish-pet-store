import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  decreaseProductQuantity,
  getProducts,
  increaseProductQuantity,
} from "@/stores/slices/cartSlice";
import { CartModalProps } from "@/types/modal";
import { Box, Button, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CancelIcon from "@mui/icons-material/Cancel";
import { CartItem } from "../CartItem";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 0,
  display: "flex",
  flexDirection: "column",
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
  const totalAmount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            Shopping Cart
          </Typography>
          <IconButton size="small" onClick={onCloseModal} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          {products.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              Your cart is empty
            </Typography>
          ) : (
            products.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                item={cartItem}
                removable
                onIncreaseQuantity={() =>
                  onIncreaseProductQuantity(cartItem.id)
                }
                onDecreaseQuantity={() =>
                  onDecreaseProductQuantity(cartItem.id)
                }
              />
            ))
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Total Amount
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              ${totalAmount.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={onCloseModal}
              startIcon={<CancelIcon />}
              sx={{ minWidth: 100 }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={onCheckout}
              disabled={!products.length}
              startIcon={<ShoppingCartCheckoutIcon />}
              sx={{ minWidth: 100 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
