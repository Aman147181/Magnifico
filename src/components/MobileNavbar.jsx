import React from "react";
import Link from "next/link";
import { EB_Garamond, Montserrat } from "next/font/google";
import { GrClose } from "react-icons/gr";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const MobileSidebar = ({ onOpen, mobileopen, onMobileClose }) => {
  return (
    <div
      className={` ${
        garamond.className
      } fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${
        mobileopen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-y-0 left-0 z-40 w-full sm:w-96 bg-[#883c36]  transition-transform duration-700 ${
          mobileopen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col w-full items-center justify-center h-screen space-y-10 text-2xl sm:space-y-14 sm:text-4xl">
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={onMobileClose}
          >
            Close
          </button>
          <Link
            href="/"
            onClick={onMobileClose}
            className="block py-2 hover:text-gray-400 text-white"
          >
            Home
          </Link>
          <Link
            href="/aboutus"
            onClick={onMobileClose}
            className="block py-2 hover:text-gray-400 text-white"
          >
            About Us
          </Link>
          <Link
            href="/contactus"
            onClick={onMobileClose}
            className="block py-2 hover:text-gray-400 text-white"
          >
            Contact Us
          </Link>
          <Link
            href="/property"
            onClick={onMobileClose}
            className="block py-2 hover:text-gray-400 text-white"
          >
            Properties
          </Link>
          <button
            onClick={() => {
              onMobileClose();
              onOpen();
            }}
            className="block py-2 hover:text-gray-400 text-white"
          >
            Make a reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;