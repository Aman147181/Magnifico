import React from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

export const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const Page = () => {
  return (
    <div className="min-h-screen pt-20">
      <div
        className="relative h-96 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/aboutus.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 space-y-7 flex flex-col items-center justify-center">
          <h1
            className={`text-white text-center text-6xl  ${garamond.className}`}
          >
            About Us
          </h1>
          <h1
            className={`text-white text-center px-6 text-lg max-w-3xl font ${mont.className}`}
          >
            All our villas are equipped with premium suites and first-class
            entertainment areas. The comfort and the needs of our guests come
            before all else here. Visit one of our locations!
          </h1>
        </div>
      </div>
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 bg-[#F7EEE3] py-16 md:py-32 ">
        <h1 className={`text-[#2F4137]  text-6xl  ${garamond.className}`}>
          Relax On Vacation
        </h1>
        <h1 className={`text-[#5A7666] text-xl pt-8  ${mont.className}`}>
          Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue the
          aucan ligula. Orci varius natoque senatibus et magnis narturient monte
          nascete ridiculus mus nellentesque
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-12 gap-10 ">
          <div className="flex flex-col space-y-2">
            <h1 className={` text-[#D39364] text-7xl ${mont.className}`}>1</h1>
            <h1 className={`text-[#33453A] text-4xl ${garamond.className}`}>
              Swimming Pool
            </h1>
            <h1 className={`text-[#33453A] text-lg ${mont.className}`}>
              A wonderful serenity has taken possession of my entire soul
            </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className={` text-[#D39364] text-7xl ${mont.className}`}>2</h1>
            <h1 className={`text-[#33453A] text-4xl ${garamond.className}`}>
              Meeting Area
            </h1>
            <h1 className={`text-[#33453A] text-lg ${mont.className}`}>
              A wonderful serenity has taken possession of my entire soul
            </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className={` text-[#D39364] text-7xl ${mont.className}`}>3</h1>
            <h1 className={`text-[#33453A] text-4xl ${garamond.className}`}>
              Indoor Gym
            </h1>
            <h1 className={`text-[#33453A] text-lg ${mont.className}`}>
              A wonderful serenity has taken possession of my entire soul
            </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className={` text-[#D39364] text-7xl ${mont.className}`}>4</h1>
            <h1 className={`text-[#33453A] text-4xl ${garamond.className}`}>
              Mini CLub
            </h1>
            <h1 className={`text-[#33453A] text-lg ${mont.className}`}>
              A wonderful serenity has taken possession of my entire soul
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
