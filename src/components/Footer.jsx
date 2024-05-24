import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Montserrat, EB_Garamond } from "next/font/google";
import Link from "next/link";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const Footer = () => {
  return (
    <div className="flex flex-col space-y-10 w-full items-center justify-center text-xl  text-[#D39364] bg-[#2F4137] py-16">
      <h1 className={`${garamond.className} uppercase text-4xl`}>
        Magnifiqo Resort
      </h1>
      <hr className="border block md:hidden w-full border-[#836651]" />
      <div className="grid grid-cols-1 md:grid-cols-3   w-full max-w-7xl gap-y-16 py-16 border-x-0 md:border-x-0 md:border md:border-y-2  border-[#58655C]">
        <div className="flex items-center  justify-start uppercase md:space-y-7 space-y-3 flex-col">
          <h1>Location</h1>
          <Link href={"https://maps.app.goo.gl/EeNG8NASzrWcRis16"}>
            <h1 className="text-white px-2 ">73 Spring Ave, Latham, NY, USA</h1>
          </Link>
        </div>

        <div className="flex items-center md:border-x-1 md:border-y-0  md:border-[#58655C]   justify-start  md:space-y-7 space-y-3 flex-col">
          <h1 className="uppercase">reservation</h1>

          <div className="flex flex-col space-y-1 items-center">
            <a href="tel:(+999) 1234 5678">
              <h1 className="text-white hover:text-[#D39364]">
                (+999) 1234 5678
              </h1>
            </a>
            <a href="mailto: support@magnifiqo.com">
              <h1 className="text-white px-2 hover:text-[#D39364]">
                support@magnifiqo.com
              </h1>
            </a>
          </div>
        </div>
        <div className="flex items-center uppercase justify-start  md:space-y-7 space-y-3 flex-col">
          <h1>follow us</h1>
          <div className="flex items-center justify-center space-x-5">
            <h1 className="text-white hover:text-[#D39364]">
              <FaFacebookF />
            </h1>
            <h1 className="text-white hover:text-[#D39364]">
              <FaInstagram />
            </h1>
            <h1 className="text-white hover:text-[#D39364]">
              <FaTwitter />
            </h1>
          </div>
        </div>
      </div>
      <h1 className={`text-center px-2 text-gray-300 ${mont.className}`}>
        © Magnifiqo Resort. All Rights Reserved 2024.
      </h1>
    </div>
  );
};

export default Footer;
