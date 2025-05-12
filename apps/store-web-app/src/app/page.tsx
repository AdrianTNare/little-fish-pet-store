import { PetFishList } from "@/components/PetFishList";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
      }}
    >
      <PetFishList />
    </Box>
  );
}
