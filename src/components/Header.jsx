"use client";
import React, { useState } from "react";
import MobileSidebar from "./MobileNavbar";
import { EB_Garamond, Montserrat } from "next/font/google";
import { GiHamburgerMenu } from "react-icons/gi";
import { Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DateRangePicker,
} from "@nextui-org/react";

export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
export const properties = [
  {
    location: {
      street: "hetauda",
      city: "hetauda",
      state: "bagmati",
      zipcode: "44100",
    },
    seller_info: {
      name: "Aman Shrestha",
      email: "aman.752417@thc.tu.edu.np",
      phone: "9823576445",
    },
    _id: "66436100cc3f9dadf106396b",
    owner: "663d0219e23fe7c4e8605887",
    name: "Mountain View Condos",
    type: "Apartment",
    description:
      "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
    beds: 4,
    baths: 2,
    area: 1212,
    amenities: ["Full Kitchen", "Swimming Pool"],
    price: 11999999,
    images: ["/villaone.jpg"],
    is_featured: false,
    createdAt: "2024-05-14T13:02:56.557Z",
    updatedAt: "2024-05-14T13:02:56.557Z",
    __v: 0,
  },
  {
    location: {
      street: "this street",
      city: "london",
      state: "britain",
      zipcode: "23231",
    },
    seller_info: {
      name: "Aman Shrestha",
      email: "aman.752417@thc.tu.edu.np",
      phone: "9823576415",
    },
    _id: "66464e878101d3a52207c8bf",
    owner: "663d0219e23fe7c4e8605887",
    name: "beautiful apartment in london",
    type: "Apartment",
    description:
      "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
    google: "https://maps.app.goo.gl/PKsis7FcePEPCG9N8",
    beds: 2,
    baths: 3,
    area: 12000,
    amenities: [
      "Swimming Pool",
      "Elevator Access",
      "Gym/Fitness Center",
      "Smart TV",
    ],
    price: 1200000,
    images: ["/villatwo.jpg"],
    is_featured: false,
    createdAt: "2024-05-16T18:20:55.311Z",
    updatedAt: "2024-05-16T18:20:55.311Z",
    __v: 0,
  },
  {
    location: {
      street: "hetauda",
      city: "hetauda",
      state: "bagmati",
      zipcode: "44100",
    },
    seller_info: {
      name: "Roshan Subedi",
      email: "roshan.232123@thc.tu.edu.np",
      phone: "9898982312",
    },
    _id: "66464f168101d3a52207c8c8",
    owner: "663d0219e23fe7c4e8605887",
    name: "Astonishing Furnished Room",
    type: "Room",
    description:
      "Nestled in the heart of nature, this property offers a retreat from the hustle and bustle of city life. This exquisite villa boasts stunning panoramic views of lush greenery and serene waters, creating an oasis of tranquility. The spacious interior features luxurious amenities, including a gourmet kitchen, expansive living areas, and elegant bedrooms with en-suite bathrooms.",
    google: "https://maps.app.goo.gl/PKsis7FcePEPCG9N8",
    beds: 3,
    baths: 2,
    area: 12121,
    amenities: [
      "Wifi",
      "Wheelchair Accessible",
      "Elevator Access",
      "Balcony/Patio",
    ],
    price: 12000,
    images: ["/villathree.jpg"],
    is_featured: false,
    createdAt: "2024-05-16T18:23:18.997Z",
    updatedAt: "2024-05-16T18:23:18.997Z",
    __v: 0,
  },
];

const Header = () => {
  const [showmobilemenu, setshowmobilemenu] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = React.useState(null);
  return (
    <div
      className={`flex ${mont.className}  fixed bg-white z-10 text-[#2F4137] top-0 w-full items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 h-20`}
    >
      <MobileSidebar
        onOpen={onOpen}
        mobileopen={showmobilemenu}
        onMobileClose={() => setshowmobilemenu(false)}
      />
      <button
        onClick={() => setshowmobilemenu((el) => !el)}
        className="hover:text-[#D39364] uppercase flex items-center"
      >
        <GiHamburgerMenu />
        <span className="pl-2">menu</span>
      </button>
      <Link href="/">
        <h1
          className={`${garamond.className} uppercase text-2xl sm:text-3xl lg:text-4xl`}
        >
          magnifiqo
        </h1>
      </Link>
      <button onClick={onOpen} className="hidden md:block hover:text-[#D39364]">
        make a reservation
      </button>
      <Modal
        placement="center"
        size="3xl"
        radius="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Book Our Villa Today
              </ModalHeader>
              <ModalBody>
                <Select label="Select a villa" className="">
                  {properties.map((property) => (
                    <SelectItem key={property._id} value={property._id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </Select>
                <DateRangePicker
                  label="Stay duration"
                  value={value}
                  onChange={setValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Book Villa Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Header;
