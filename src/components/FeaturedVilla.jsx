import React from "react";
import Link from "next/link";
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
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const FeaturedVilla = () => {
  const property ={
    properties: [
      {
        location: {
          street: "hetauda",
          city: "hetauda",
          state: "bagmati",
          zipcode: "44100"
        },
        seller_info: {
          name: "Aman Shrestha",
          email: "aman.752417@thc.tu.edu.np",
          phone: "9823576445"
        },
        _id: "66436100cc3f9dadf106396b",
        owner: "663d0219e23fe7c4e8605887",
        name: "Mountain View Condos",
        type: "Apartment",
        description: "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
        beds: 4,
        baths: 2,
        area: 1212,
        amenities: [
          "Full Kitchen",
          "Swimming Pool"
        ],
        price: 11999999,
        images: [
          "/villaone.jpg"
          
        ],
        is_featured: false,
        createdAt: "2024-05-14T13:02:56.557Z",
        updatedAt: "2024-05-14T13:02:56.557Z",
        __v: 0
      },
      {
        location: {
          street: "this street",
          city: "london",
          state: "britain",
          zipcode: "23231"
        },
        seller_info: {
          name: "Aman Shrestha",
          email: "aman.752417@thc.tu.edu.np",
          phone: "9823576415"
        },
        _id: "66464e878101d3a52207c8bf",
        owner: "663d0219e23fe7c4e8605887",
        name: "beautiful apartment in london",
        type: "Apartment",
        description: "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
        google: "https://maps.app.goo.gl/PKsis7FcePEPCG9N8",
        beds: 2,
        baths: 3,
        area: 12000,
        amenities: [
          "Swimming Pool",
          "Elevator Access",
          "Gym/Fitness Center",
          "Smart TV"
        ],
        price: 1200000,
        images: [
          "/villatwo.jpg"
        ],
        is_featured: false,
        createdAt: "2024-05-16T18:20:55.311Z",
        updatedAt: "2024-05-16T18:20:55.311Z",
        __v: 0
      },
      {
        location: {
          street: "hetauda",
          city: "hetauda",
          state: "bagmati",
          zipcode: "44100"
        },
        seller_info: {
          name: "Roshan Subedi",
          email: "roshan.232123@thc.tu.edu.np",
          phone: "9898982312"
        },
        _id: "66464f168101d3a52207c8c8",
        owner: "663d0219e23fe7c4e8605887",
        name: "Astonishing Furnished Room",
        type: "Room",
        description: "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
        google: "https://maps.app.goo.gl/PKsis7FcePEPCG9N8",
        beds: 3,
        baths: 2,
        area: 12121,
        amenities: [
          "Wifi",
          "Wheelchair Accessible",
          "Elevator Access",
          "Balcony/Patio"
        ],
        price: 12000,
        images: [
          "/villathree.jpg"
        ],
        is_featured: false,
        createdAt: "2024-05-16T18:23:18.997Z",
        updatedAt: "2024-05-16T18:23:18.997Z",
        __v: 0
      }
    ]
  }
  return (
    <div className="flex w-full flex-col space-y-10 py-12 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
      <div className=" grid gap-y-6 grid-cols-1 md:grid-cols-2  w-full">
        <div className="col-span-1 items-center ">
          <h1 className={`text-left text-5xl ${garamond.className}`}>
            Treat yourself to everyday exceptional.
          </h1>
        </div>
        <div className="col-span-1 flex justify-start md:justify-end items-center">
          <button className="sm:h-16  h-12 w-56 sm:w-72 bg-[#883C36] text-white transition-all duration-200  hover:bg-[#393537]">
            View all Villas and Rooms
          </button>
        </div>
      </div>

      <div className="grid pb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pt-10 sm:gap-16 md:gap-12 lg:gap-10 gap-y-12 ">
        {property.properties?.map((info, index) => (
          <Link key={index} href="/">
            <div
      className={`flex flex-col  item-center w-full justify-start space-y-5 ${montserrat.className}`}
    >
      <div className="overflow-hidden">
        <img
          radius="none"
          className="max-h-72 min-h-72 object-cover w-full scale-125 hover:scale-100 hover:rounded-[20px] transition-all duration-500 ease-in-out "
          alt="Featured Room"
          src={info.images[0]}
        />
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-start items-start">
          <h1 className="font-bold text-xl">{info.name}</h1>
          <h1 className="text-slate-700 text-lg">{info.type}</h1>
        </div>
        <div className="flex flex-col justify-start items-center">
          <h1 className="font-bold text-xl">Nrs. {info.price}</h1>
          <h1 className="text-slate-700 text-lg">{info.location.city}</h1>
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
