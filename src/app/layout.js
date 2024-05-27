import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "magnifiqo",
  description: "hotel room reservation application",
};

export default function RootLayout({ children }) {
  return (
   
      <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Header/>
          {children}
          <Footer/>
        </NextUIProvider>
      </body>
      </html>
    
  );
}
