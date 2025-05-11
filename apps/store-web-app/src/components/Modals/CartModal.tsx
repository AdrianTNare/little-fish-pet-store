import { checkoutBillItems } from "@/fixtures/fishProducts";
import { Box, Button } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { CartItem } from "../CartItem";
import { CartModalProps } from "@/types/modal";
import { useAppSelector } from "@/hooks/store";
import { getProducts } from "@/stores/slices/cartSlice";

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
  const products = useAppSelector(getProducts);

  console.log({ products });

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
          {checkoutBillItems.map((billItem) => (
            <CartItem key={billItem.name} item={billItem} />
          ))}
        </Box>

        <Button variant="contained" onClick={onCloseModal}>
          Close
        </Button>
        <Button variant="contained">Checkout</Button>
      </Box>
    </Modal>
  );
};
