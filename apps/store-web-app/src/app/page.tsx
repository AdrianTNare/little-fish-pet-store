//import Image from "next/image";
//import styles from "./page.module.css";

import { PetFishList } from "@/components/PetFishList";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
        height={60}
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={"primary.main"}
      >
        <Typography>Navbar</Typography>
      </Box>

      <PetFishList />
      <Box
        height={60}
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={"primary.main"}
      >
        Footer
      </Box>
    </Box>
  );
}
