"use client"
import Link from "next/link";
import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { MdVilla } from "react-icons/md";
import { EB_Garamond, Montserrat, Roboto_Condensed } from "next/font/google";
import { usePathname, useSearchParams } from 'next/navigation'
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const roboto = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
});
const Page = () => {
  const pathname = usePathname()
  return (
    <div className="w-full bg-white flex flex-col p-6 pt-2 h-full   items-start justify-start space-y-16 ">
      <Link href="/"><div className={`${garamond.className} uppercase pl-4 pt-2 text-3xl`}>
        Magnifiqo
      </div></Link>
      <div className={`${roboto.className}  text-xl flex w-full flex-col space-y-2`}>
        <Link href="/admin"><h1 className={`flex items-center space-x-2 p-4 py-2 rounded-md justify-start ${pathname === "/admin" ? "bg-[#f6d8c1]": "hover:bg-[#fcf2eb]"}   w-full`}><MdDashboardCustomize/><span>Dashboard</span></h1></Link>
        <Link href="/admin/villa"><h1 className={`flex items-center space-x-2 p-4 py-2 rounded-md justify-start ${pathname === "/admin/villa" ? "bg-[#f6d8c1]": "hover:bg-[#fcf2eb]"}   w-full`}><MdVilla/><span>Villas</span></h1></Link>
        <Link href="/admin/reservation"><h1 className={`flex items-center space-x-2 p-4 py-2 rounded-md justify-start ${pathname === "/admin/reservation" ? "bg-[#f6d8c1]": "hover:bg-[#fcf2eb]"}   w-full`}><TbBrandBooking/><span>Reservations</span></h1></Link>
        <Link href="/admin/user"><h1 className={`flex items-center space-x-2 p-4 py-2 rounded-md justify-start ${pathname === "/admin/user" ? "bg-[#f6d8c1]": "hover:bg-[#fcf2eb]"}   w-full`}><FaUsers/><span>Users</span></h1></Link>
        <Link href="/admin/message"><h1 className={`flex items-center space-x-2 p-4 py-2 rounded-md justify-start ${pathname === "/admin/message" ? "bg-[#f6d8c1]": "hover:bg-[#fcf2eb] "}  w-full`}><BiSolidMessageSquareDetail/><span>Messages</span></h1></Link>
      </div>
    </div>
  );
};

export default Page;
