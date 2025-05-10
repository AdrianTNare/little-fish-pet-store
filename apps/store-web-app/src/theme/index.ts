"use client";
import { cyan } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: cyan[600],
        },
        secondary: {
          main: cyan[300],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: cyan[600],
        },
        secondary: {
          main: cyan[300],
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
          ],
        },
      },
    },
  },
});
