import { CartModalProps } from "@/types/modal";
import { checkoutBillItems } from "@/fixtures/fishProducts";
import { Box, Button } from "@mui/material";
import { Modal, Typography } from "@mui/material";
import { CartItem } from "../CartItem";

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

export const AddToCartModal = ({
  isModalOpen,
  onCloseModal,
}: CartModalProps) => {
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
          {checkoutBillItems
            .filter((_, index) => index < 1)
            .map((billItem) => (
              <CartItem key={billItem.name} item={billItem} />
            ))}
        </Box>

        <Button variant="contained" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="contained">Confirm</Button>
      </Box>
    </Modal>
  );
};
