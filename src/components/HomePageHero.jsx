import React from 'react'
import { EB_Garamond, Roboto_Condensed } from "next/font/google";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const roboto = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const HomePageHero = () => {
  return (
    <div
    className="bg-cover grid grid-cols-2  items-end pb-36 sm:pb-24 text-white justify-center bg-center h-screen px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28  w-full"
    style={{ backgroundImage: "url(main-banner.jpg)" }}
  >
    <div className="col-span-2 lg:col-span-1 flex flex-col items-end justify-end space-y-10">
      <div
        className={` flex flex-col text-[54px] sm:text-[72px] lg:text-[92px] xl:text-[112px] leading-[1] space-y-0   text-right ${garamond.className}`}
      >
        <h1
          className={`text-right italic text-slate-50 leading-[1] text-4xl sm:text-[72px] `}
        >
          visit
        </h1>
        <h1 className="uppercase">Magnifiqo</h1>
        <h1>Resort</h1>
      </div>

      <h1
        className={`text-right text-slate-50 text-lg sm:text-xl ${roboto.className}`}
      >
        Treat yourself to everyday exceptional.
      </h1>
    </div>
  </div>
  )
}

export default HomePageHero