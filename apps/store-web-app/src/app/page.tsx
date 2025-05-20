import type { Metadata } from "next";
import { PetFishList } from "@/components/PetFishList";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the littlefish pet store",
};

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
