"use client";
import React from "react";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import { Input, Textarea, AccordionItem, Accordion } from "@nextui-org/react";
export const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",

  weight: "500",
});
const FAQ = [
    {
      title: "How do I get confirmation of my reservation?",
      content: "Once your reservation is complete, you'll receive a confirmation email containing all the details of your booking. You can also access your booking information through your user account on our website.",
    },
    {
      title: "What should I do if I get an issue during my stay?",
      content: "If you encounter any issues during your stay, please contact the accommodation provider directly or reach out to our customer support team for assistance. We are here to ensure you have a smooth and enjoyable experience.",
    },
    {
      title: "What amenities are included in the villa?",
      content: "The amenities included in each villa can vary. Please check the individual villa listing for a detailed list of amenities such as a private pool, hot tub, fully equipped kitchen, and more.",
    },
    {
      title: "Can I bring my pet to the villa?",
      content: "Pet policies vary by villa. Some villas may allow pets with an additional fee, while others may have restrictions. Please check the individual villa listing or contact us for more information on pet policies.",
    },
    {
      title: "How do I check in and check out of the villa?",
      content: "Check-in and check-out instructions will be provided in your confirmation email and on our website. Most villas offer self-check-in using a keypad or lockbox, but some may require meeting a representative on-site.",
    },
    {
      title: "Is there a minimum stay requirement?",
      content: "Minimum stay requirements can vary depending on the villa, season, and travel dates. Many villas have a minimum stay of 3-7 nights, but some may have shorter or longer minimums. Please check the individual villa listing for specific requirements.",
    },
  ];
const page = () => {
  return (
    <div className="min-h-screen flex flex-col w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 pb-10 mt-20">
      <div className="flex flex-col space-y-4 w-full">
        <h1 className={` uppercase text-base ${mont.className}`}>
          get in touch
        </h1>
        <h1 className={`  text-5xl ${garamond.className}`}>Contact Us</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10 gap-16 w-full ">
        <div className="relative col-span-1 aspect-square">
          <Image src="/contactus.jpg" fill alt="property image" />
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 col-span-2">
          <div className="col-span-1 ">
            <Input
              size="sm"
              type="text"
              variant="underlined"
              label="First Name"
            />
          </div>
          <div className="col-span-1 ">
            <Input
              size="sm"
              type="text"
              variant="underlined"
              label="Last Name"
            />
          </div>
          <div className="col-span-1 ">
            <Input size="sm" type="email" variant="underlined" label="Email" />
          </div>
          <div className="col-span-1 ">
            <Input
              size="sm"
              type="phone"
              variant="underlined"
              label="Phone Number"
            />
          </div>
          <div className="col-span-1 lg:col-span-2 ">
            <Textarea
              size="sm"
              type="text"
              variant="underlined"
              label="Message"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-20 space-y-2 w-full">
        <h1 className={`  text-base ${mont.className}`}>FAQs</h1>
        <h1 className={`  text-5xl ${garamond.className}`}>
          Have Any Questions?
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full ">
        <div className="hidden lg:block col-span-1 "></div>
              <div className={ `col-span-1 ${mont.className}`}>
          <Accordion>
            {FAQ.map((el, index) => (
              <AccordionItem key={index} title={el.title}>
                {el.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default page;
