"use client";
import Image from "next/image";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
const ReviewCard = ({
  imgURL,
  customerName,
  feedback,
  activeSlide,
  setActiveSlide,
}) => {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 gap-y-5  text-center w-full h-full justify-center items-center ">
      <div className="col-span-1 relative aspect-square">
        <Image src={imgURL} alt="customer" fill />
      </div>
      <div className=" col-span-1 lg:col-span-2 relative text-center items-center justify-center lg:items-start flex flex-col h-full space-y-5 sm:space-y-10">
        <p className="mt-6  text-center lg:text-left text-sm sm:text-lg">
          {feedback}
        </p>

        <h3 className="mt-1  text-3xl sm:text-4xl text-center lg:text-left text-[#1a2e2e] font-bold">
          {customerName}
        </h3>
        <div className=" flex w-full lg:absolute sm:pr-10 sm:bottom-0  space-x-2 sm:space-x-4 sm:justify-end justify-center items-center">
          <button
            className="p-3 bg-slate-200 sm:hover:bg-slate-300 rounded-full"
            onClick={() => {
              if (activeSlide == 1) setActiveSlide(4);
              else setActiveSlide(activeSlide - 1);
            }}
          >
            <GrLinkPrevious />
          </button>
          <button
            className="p-3 bg-slate-200 hover:bg-slate-300 rounded-full"
            onClick={() => {
              if (activeSlide == 4) setActiveSlide(1);
              else setActiveSlide(activeSlide + 1);
            }}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
