import Link from "next/link";
import React from "react";
import { EB_Garamond, Montserrat } from "next/font/google";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const page = () => {
  return (
    <div className=" grid grid-cols-3 mt-20 p-10  gap-10 w-full ">
      <div className="p-6 px-4 bg-white min-h-32 border rounded-md shadow-md">
        <div className="flex items-center justify-between w-full text-base text-gray-700 font-poppins">
          <h1>Bookings</h1>

          <span
            className={`flex items-center px-4 py-0.5 mx-2 text-sm text-green-600 bg-green-100
                 
            rounded-full`}
          >
            <span>10%</span>
          </span>
        </div>
        <div className="flex items-center pt-1">
          <div className="text-2xl font-bold text-gray-900 font-volkof ">
            100
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
