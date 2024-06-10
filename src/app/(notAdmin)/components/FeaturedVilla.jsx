"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cormorant_Garamond, Roboto_Condensed, Montserrat } from "next/font/google";

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
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

const FeaturedVilla = () => {
  const [villa, setVilla] = useState([]);

  async function getFeaturedVilla() {
    const res = await fetch(`/api/villa`);
    const data = await res.json();
    setVilla(data);
  }

  useEffect(() => {
    getFeaturedVilla();
  }, []);

  console.log(villa, "asjsj nasjadskj asjdhaskjdas ");
  return (
    <div className="flex w-full flex-col space-y-10 py-12 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
      <div className="grid gap-y-6 grid-cols-1 md:grid-cols-2 w-full">
        <div className="col-span-1 items-center">
          <h1 className={`text-left text-5xl ${garamond.className}`}>
            Treat yourself to everyday exceptional.
          </h1>
        </div>
        <div className="col-span-1 flex justify-start md:justify-end items-center">
          <button className="sm:h-16 h-12 w-56 sm:w-72 bg-[#883C36] text-white transition-all duration-200 hover:bg-[#393537]">
            View all Villas and Rooms
          </button>
        </div>
      </div>

      <div className="grid pb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pt-10 sm:gap-16 md:gap-12 lg:gap-10 gap-y-12">
        {villa?.slice(0, 3).map((info, index) => (
          <Link key={index} href="/">
            <div
              className={`flex flex-col item-center w-full justify-start space-y-5 ${montserrat.className}`}
            >
              <div className="overflow-hidden">
                <img
                  radius="none"
                  className="max-h-72 min-h-72 object-cover w-full scale-125 hover:scale-100 hover:rounded-[20px] transition-all duration-500 ease-in-out"
                  alt="Featured Room"
                  src={info.images[0]}
                />
              </div>

              <div className="grid grid-cols-2">
                <div className="flex flex-col justify-start items-start">
                  <h1 className="font-bold text-xl">{info.name}</h1>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <h1 className="font-bold text-xl">Nrs. {info.pricePerNight}</h1>
                  <h1 className="text-slate-700 text-lg">{info.location}</h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVilla;
