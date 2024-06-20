import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'photoswipe/dist/photoswipe.css';

export default function AdminLayout({ children }) {
  return (
    <NextUIProvider>
     <Header/>
      {children}
     <Footer/>
    </NextUIProvider>
  );
}
