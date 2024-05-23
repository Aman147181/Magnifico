import React from "react";
import { Cormorant_Garamond } from "next/font/google";
export const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: "500",
});
const Facilities = () => {
  const facilities = [
    {
      img: "/stylishPool.png",
      text: "Stylish Pools",
    },
    {
      img: "/amazingView.png",
      text: "Amazing Views",
    },
    {
      img: "/exquisiteFood.png",
      text: "Exquisite Foods",
    },
  ];
  return (
    <div className="flex flex-col space-y-3 pb-20  px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28  w-full">
      <h1 className={` text-3xl sm:text-4xl lg:text-5xl py-20  text-center  ${garamond.className}`}>
        Come for our fresh, delicious fare, and stay for views & experiences you
        won’t forget. An intimate hideaway with style, inspired by its natural
        environment.
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 ">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className={`flex flex-col  item-center col-span-1 justify-center space-y-5 `}
          >
            <div className="overflow-hidden">
              <img
                radius="none"
                className="max-h-[450px] min-h-72 object-cover w-full scale-125 hover:scale-100 transition-all duration-500 ease-in-out "
                alt="Featured Room"
                src={facility.img}
              />
            </div>

                <h1 className={` text-center text-3xl   text-black ${garamond.className}` }>{facility.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
