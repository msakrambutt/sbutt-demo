"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Allproductdata } from "@/app/datafetching";
import { Image as IImage } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

interface Iproduct {
  name: string;
  price: number;
  image: IImage;
}
const SwipperCode = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Allproductdata();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        // When screen size is less than lg (tailwindcss breakpoint)
        983: {
          slidesPerView: 2,
        },
        // When screen size is less than xl (tailwindcss breakpoint)
        1243: {
          slidesPerView: 3,
        },
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((item: any, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          <div className="min-w-full min-h-full flex justify-center lg:justify-evenly xl:justify-normal overflow-visible relative">
            <div className="w-fit h-fit transition-all duration-700 transform-gpu hover:scale-105 sm:hover:scale-110 lg:hover:scale-125">
              <div className="w-full h-full">
                <Image
                  src={urlForImage(item.image).url()}
                  alt={item.name}
                  width={380}
                  height={400}
                />
                <div className="ml-10 font-semibold mt-2 flex flex-col gap-2  relative">
                  <h1>{item.name}</h1>
                  <h1>${item.price}</h1>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Swipper = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <h1>PRODUCTS</h1>
        <h1>Check What We Have</h1>
      </div>
      <div className="w-full h-full">
        <SwipperCode />
      </div>
    </div>
  );
};

export default Swipper;
