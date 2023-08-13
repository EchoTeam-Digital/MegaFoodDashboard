"use client";
import "./globals.css";
import "tailwindcss/tailwind.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

const font = Cairo({ subsets: ["arabic"] });
import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "primeicons/primeicons.css";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Mega Food",
  description: "The best food ordering app in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        />
      </head>
      <body className={font.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
              <PrimeReactProvider>{children}</PrimeReactProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
