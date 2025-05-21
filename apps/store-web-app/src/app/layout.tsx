import { Inter } from "next/font/google";
//import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//import theme from "@/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
//import ModeSwitch from "@/components/ModeSwitch";
import { theme } from "@/theme";
import { StoreProvider } from "./StoreProvider";
import { PersistGateProvider } from "./PersistGateProvider";
import { HeaderFooterLayout } from "@/components/CustomLayouts/HeaderFooterLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <InitColorSchemeScript attribute="class" />

        {/*

        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        */}

        <StoreProvider>
          <PersistGateProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              {/*

            <ModeSwitch />
        */}

              <HeaderFooterLayout>{children}</HeaderFooterLayout>
            </ThemeProvider>
          </PersistGateProvider>
        </StoreProvider>

        {/*
        </AppRouterCacheProvider>

        */}
      </body>
    </html>
  );
}
