"use client";
import React, { useEffect, useState } from "react";
import { EB_Garamond, Montserrat } from "next/font/google";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const page = () => {
  const [villas, setVillas] = useState([]);
  useEffect(() => {
    const fetchVillas = async () => {
      const response = await fetch("/api/villa");
      const data = await response.json();
      setVillas(data);
    };
    fetchVillas();
  }, []);
  if (villas.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner />
      </div>
    );
  } else
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start space-y-4 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28  pt-20">
        <h1 className={`text-center ${garamond.className} text-6xl pb-20`}>
          Our Villas
        </h1>
        {console.log(villas)}
        {villas.map((villa) => (
          <div className="grid grid-cols-1  pb-16 lg:grid-cols-11 gap-8 gap-y-5  text-center w-full h-full justify-center items-center ">
            <div className="col-span-1 relative  lg:col-span-4 ">
              <img
                src={villa?.images[0]}
                alt="customer"
                className="w-full aspect-square h-full object-cover"
              />
            </div>
            <div className=" col-span-1 lg:col-span-7  relative text-center items-center justify-start lg:items-start flex flex-col h-full space-y-5 sm:space-y-10">
              <h3
                className={`  text-3xl sm:text-4xl text-center ${mont.className} lg:text-left text-[#1a2e2e] font-medium`}
              >
                {villa.name}
              </h3>
              <p className="mt-6  text-center lg:text-left text-sm sm:text-lg">
                {villa.description}
              </p>
              <div className="max-w-2xl w-full grid gap-y-4 grid-cols-2">
                <div className="col-span-1 flex flex-col   items-start justify-start  ">
                  <h1
                    className={`md:text-2xl sm:text-xl text-lg  ${mont.className}`}
                  >
                    Area
                  </h1>
                  <h1>{villa.area} sq. ft.</h1>
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start  ">
                  <h1
                    className={`md:text-2xl sm:text-xl text-lg ${mont.className}`}
                  >
                    Guests
                  </h1>
                  <h1>{villa.people} people</h1>
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start  ">
                  <h1
                    className={`md:text-2xl sm:text-xl text-lg ${mont.className}`}
                  >
                    Price Per Night
                  </h1>
                  <h1>$ {villa.pricePerNight}</h1>
                </div>
              </div>
              <div className="flex items-start justify-start w-full ">
                <Link href={`/villa/${villa._id}`}>
                  <button className="px-10 h-12 flex items-center  bg-[#883C36] text-white transition-all duration-200 hover:bg-[#393537]">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default page;
