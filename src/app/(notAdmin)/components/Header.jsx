"use client";
import React, { useEffect, useState } from "react";
import MobileSidebar from "./MobileNavbar";
import { EB_Garamond, Montserrat } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/react";
import ReservationModal from "./ReservationModal";  // Import the new component

export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          console.error("Failed to fetch user data");
          return;
        }
        const data = await response.json();
        setSession(data.user);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div
      className={`flex ${mont.className} fixed bg-white z-30 text-[#2F4137] top-0 w-full items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 h-20`}
    >
      <MobileSidebar
        onOpen={onOpen}
        mobileopen={showMobileMenu}
        onMobileClose={() => setShowMobileMenu(false)}
      />
      <button
        onClick={() => setShowMobileMenu((prev) => !prev)}
        className="hover:text-[#D39364] uppercase flex items-center"
      >
        <GiHamburgerMenu />
        <span className="pl-2">menu</span>
      </button>
      <Link href="/">
        <h1
          className={`${garamond.className} uppercase text-2xl sm:text-3xl lg:text-4xl`}
        >
          magnifiqo
        </h1>
      </Link>
      <button onClick={onOpen} className="hidden md:block hover:text-[#D39364]">
        make a reservation
      </button>
      <ReservationModal isOpen={isOpen} onOpenChange={onOpenChange} session={session} />
    </div>
  );
};

export default Header;
