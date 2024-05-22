import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "maestoso",
  description: "hotel room reservation application",
};

export default function RootLayout({ children }) {
  return (
    <NextUIProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </NextUIProvider>
  );
}
