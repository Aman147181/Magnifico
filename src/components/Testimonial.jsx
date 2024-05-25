"use client";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { EB_Garamond, Montserrat } from "next/font/google";
export const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});
export const mont = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const Testimonial = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const reviews = [
    {
      id: 1,
      customerName: "Matt Murdock",
      rating: 5.0,
      feedback:
        "Staying at the villa was an unforgettable experience! The serene environment and luxurious amenities were perfect for a relaxing getaway. Highly recommended!",
      imgURL: "/customer1.jpeg",
    },
    {
      id: 2,
      customerName: "Karen Page",
      rating: 4.8,
      feedback:
        "The villa was stunning and the service was impeccable. We enjoyed the beautiful interiors and the breathtaking views. Can't wait to return!",
      imgURL: "/customer2.jpeg",
    },
    {
      id: 3,
      customerName: "Foggy Nelson",
      rating: 4.9,
      feedback:
        "The villa provided the perfect mix of comfort and luxury. Every detail was carefully considered to ensure a wonderful stay. Highly recommended!",
      imgURL: "/customer4.jpg",
    },
    {
      id: 4,
      customerName: "Wilson Fisk",
      rating: 4.7,
      feedback:
        "The villa was impressive with its elegant design and top-notch facilities. The booking process was smooth and the staff was very accommodating. Great experience overall!",
      imgURL: "/customer3.jpg",
    },
  ];
  

  return (
    <section className=" md:mx-20 mx-5 mb-10 py-10">
      <h1 className={` text-5xl ${garamond.className}`}>Testimonials</h1>

      <div className={`mt-16 px-10 flex relative min-h-80  items-center w-full justify-center ${mont.className} `}>
        {reviews
          .filter((slide) => slide.id === activeSlide)
          .map((review, index) => (
            <ReviewCard
              key={index}
              imgURL={review.imgURL}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          ))}
      </div>
    </section>
  );
};

export default Testimonial;
