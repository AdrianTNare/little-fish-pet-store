import { Box, Typography } from "@mui/material";
import { Header } from "../Header";

export const HeaderFooterLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" position="relative">
      <Header />

      <Box flexGrow={1}>{children}</Box>

      <Box
        height={32}
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={"primary.main"}
      >
        <Typography variant="body2" >
           © Written by Adrian
        </Typography>
      </Box>
    </Box>
  );
};
