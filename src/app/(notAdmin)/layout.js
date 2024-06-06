import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function AdminLayout({ children }) {
  return (
    <NextUIProvider>
     <Header/>
      {children}
     <Footer/>
    </NextUIProvider>
  );
}
