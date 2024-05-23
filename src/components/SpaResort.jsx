import React from "react";
import { Cormorant_Garamond, Roboto_Condensed } from "next/font/google";
export const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});
export const roboto = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const SpaResort = () => {
  return (
    <div className="flex flex-col text-white bg-[#883C36] item-center justify-center space-y-10 py-20 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28  w-full">
      <h1 className={`text-3xl sm:text-5xl lg:text-7xl text-center ${garamond.className}`}>
        Enjoy the peace & seclusion of our exclusive spa resort location.
      </h1>
      <h1 className={`text-base sm:text-xl text-center ${roboto.className}`}>
        Indulge in one of our special offers, which range from a supper at our
        Michelin-starred Restaurant Vinkeles to the opportunity to learn about
        the benefits of organizing the perfect romantic weekend.
      </h1>
      <button className="sm:h-16  h-12 mx-auto w-48 sm:w-72 bg-[#F7E9DE] text-black hover:text-white transition-all duration-200  hover:bg-[#393537]">
        Book Our Villa
      </button>
    </div>
  );
};

export default SpaResort;
