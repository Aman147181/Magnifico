"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Inter, Roboto_Condensed } from "next/font/google";
import Image from "next/image";
import ImageGalleryComponent from "../../components/ImageGalleryComponent";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import ReservationModal from "../../components/ReservationModal";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
});
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  async function fetchProperty(id) {
    try {
      const res = await fetch(`/api/villa/${id}`);
      console.log(res);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          console.error("Failed to fetch user data");
          return;
        }
        const data = await response.json();
        setSession(data.user);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center min-h-screen text-2xl font-bold mt-32">
        Property Not Found
      </h1>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-20 sm:pt-36 px-6 sm:px-20">
      <h1 className={`${inter.className} text-4xl font-semibold `}>
        {property?.name}
      </h1>
      <div
        className={`grid mt-10 grid-cols-2 md:grid-cols-4 text-xl max-w-4xl place-items-start gap-5 gap-x-3 ${roboto.className}`}
      >
        <div className="flex flex-col">
          <h1>Price per Night</h1>
          <h1 className="font-medium">USD {property?.pricePerNight}</h1>
        </div>
        <div className="flex flex-col">
          <h1>Area</h1>
          <h1 className="font-medium">{property?.area} sq. ft.</h1>
        </div>
        <div className="flex flex-col">
          <h1>No. of Guests</h1>
          <h1 className="font-medium">{property?.people}</h1>
        </div>
        <div className="flex flex-col">
          <h1>Bathrooms</h1>
          <h1 className="font-medium">{property?.bathroom}</h1>
        </div>
        <div className="flex flex-col">
          <h1>Location</h1>
          <h1 className="font-medium">{property?.location}</h1>
        </div>
      </div>
      <div className="relative w-full mt-8  aspect-[3/2] px-24">
        <Image
          className="rounded-md sm:rounded-lg"
          fill
          alt="property image"
          src={property?.images[0]}
        />
      </div>
      <div className="grid grid-cols-1 gap-12 gap-y-5 lg:grid-cols-2 mt-10 md:mt-32 py-5">
        <div className="col-span-1">
          <h1 className=" text-3xl sm:text-5xl font-medium pb-10">
            More details about the property
          </h1>
          <h1>{property?.description}</h1>
        </div>
        <div className="col-span-1"></div>

        <div className="col-span-1 flex flex-col space-y-0 items-start justify-start">
          <div className="flex flex-col space-y-0 w-full items-start justify-start">
            <h1 className="text-4xl mt-12">Highlights</h1>
            {property?.highlights?.map((el, index) => (
              <div
                key={index}
                className="border-b-2 border-[#e0e0e0] mt-10 py-4 flex justify-between items-center w-full"
              >
                <h1>{el}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={onOpen} className=" bg-[#a26235] text-white px-8 py-3 hover:bg-[#1d221d]">
        make a reservation
      </button>
      <ReservationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        session={session}
      />
      <div className="w-full mt-5 ">
        <ImageGalleryComponent images={property?.images} />
      </div>
    </div>
  );
};

export default Page;
