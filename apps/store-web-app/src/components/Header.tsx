import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { Fish } from "lucide-react";

export const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{
        marginBottom: 2,
        bgcolor: "background.paper",
        boxShadow: 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            justifyContent: "center",
            py: 1
          }}
        >
          <Link 
            href="/" 
            style={{ 
              textDecoration: "none", 
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <Box sx={{ color: 'primary.main', mr: 2 }}>
              <Fish 
                size={36}
                strokeWidth={1.5}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                color: "text.primary"
              }}
            >
              Littlefish Pet Store
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
