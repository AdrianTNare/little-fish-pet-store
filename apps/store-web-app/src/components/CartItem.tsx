import { CartItem as CartItemType } from "@/types/product";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface props {
  item: CartItemType;
  removable?: boolean;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
}

export const CartItem = ({
  item,
  removable = false,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={onDecreaseQuantity}
            disabled={!removable && item.quantity <= 1}
            sx={{ border: 1, borderColor: "divider" }}
            aria-label="remove"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ minWidth: 30, textAlign: "center" }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={onIncreaseQuantity}
            color="primary"
            sx={{ border: 1, borderColor: "primary.main" }}
            aria-label="add"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="right">
        Subtotal: ${(item.price * item.quantity).toFixed(2)}
      </Typography>
    </Box>
  );
};
