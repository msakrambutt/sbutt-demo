"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@pics/New folder/logo.png";
import img from "@/pics/New folder (3)/img.png";
import img1 from "@/pics/New folder/bazar.png";
import img2 from "@/pics/New folder/bustle.png";
import img3 from "@/pics/New folder/instyle.png";
import img4 from "@/pics/New folder/versac.png";
import img5 from "@/pics/New folder (2)/1.png";
import img6 from "@/pics/New folder (2)/2.png";
import img7 from "@/pics/New folder (2)/3.png";
import img8 from "@/pics/New folder (2)/4.png";
import extra from "@/pics/extra.png";

import Button from "@/components/all-other/button";
import Navbar from "@/components/navbar/navbar";
import { AiOutlineTwitter } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";

import "swiper/css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Allproductdata } from "@/app/datafetching";
import { Image as IImage } from "sanity";
import { urlForImage } from "@/sanity/lib/image";

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

// const FeaturesSection = () => {
//   return (
//     <div className="mt-32">
//       <div
//         id="upper"
//         className="flex justify-center px-0 py-0 lg:py-8 lg:px-16 text-5xl font-extrabold xl:px-0 xl:py-0 xl:justify-end xl:text-5xl xl:font-bold pb-8  bg-gradient-to-b from-white from-60% via-[#FBFCFF] via-60% to-[#FBFCFF] to-100%"
//       >
//         <p>
//           Unique and <br className="hidden xl:inline-block " />
//           Authentic Vintage <br className="hidden xl:inline-block " />
//           Designer Jewellery
//         </p>
//       </div>

//       <div
//         id="lower"
//         className="grid xl:grid-cols-2 justify-center items-center bg-[#FBFCFF] pb-16  "
//       >
//         <div
//           id="left-col-grid"
//           className="relative z-0 grid grid-cols-2 gap-10 tracking-widest w-full min-h-max "
//         >
//           <div className="flex items-center absolute overflow-none  opacity-50 w-full h-full xl:w-70% text-gray-300 text-[4.5em] sm:text-[6rem] lg:text-[7rem] leading-[7rem] font-extrabold">
//             Different <br className="hidden xl:inline-block" />
//             from <br className="hidden xl:inline-block" />
//             others
//           </div>
//           <div className="w-full xl:w-70%    z-20">
//             <h1 className="lg:text-xl text-[1em] font-semibold w-full pb-4">
//               Using Good <br className="hidden lg:inline-block" />{" "}
//               Quality_Materials
//             </h1>
//             <p className="w-full ">
//               Lorem ipsum dolor <br className="hidden lg:inline-block" />
//               sit amt, consectetur <br className="hidden lg:inline-block" />
//               adipiscing elit.
//             </p>
//           </div>
//           <div className="w-full xl:w-70% z-20">
//             <h1 className="font-semibold lg:text-xl text-[1em] pb-4">
//               100% Handmade <br className="hidden xl:inline-block" />
//               Products
//             </h1>
//             <p className="w-full ">
//               Lorem ipsum dolor <br className="hidden lg:inline-block" />
//               sit amt, consectetur <br className="hidden lg:inline-block" />
//               adipiscing elit.
//             </p>
//           </div>
//           <div className="w-full xl:w-70% z-20">
//             <h1 className="font-semibold lg:text-xl text-[0.9em] pb-4">
//               Modern Fashion <br className="hidden xl:inline-block" />
//               Design
//             </h1>
//             <p className="w-full ">
//               Lorem ipsum dolor <br className="hidden lg:inline-block" />
//               sit amt, consectetur <br className="hidden lg:inline-block" />
//               adipiscing elit.
//             </p>
//           </div>
//           <div className="w-full xl:w-70% z-20">
//             <h1 className="font-semibold lg:text-xl text-[1em] pb-4">
//               Discount for Bulk <br className="hidden xl:inline-block" />
//               Orders
//             </h1>
//             <p className="w-full ">
//               Lorem ipsum dolor <br className="hidden lg:inline-block" />
//               sit amt, consectetur <br className="hidden lg:inline-block" />
//               adipiscing elit.
//             </p>
//           </div>
//         </div>

//         <div
//           id="right-col-flex"
//           className="flex flex-col sm:flex-row justify-center items-center mt-10 xl:mt-0 gap-10 "
//         >
//           <Image src={img8} alt="" className="w-280 h-450" />
//           <div className="flex flex-col justify-center font-light text-[1rem] loading-6.5 text-justify">
//             <p>
//               This piece is ethically crafted in our small family-owned workshop
//               in Peru with unmatched attention to detail and care. The Natural
//               color is the actual natural color of the fiber, undyed and 100%
//               traceable.
//             </p>
//             <Link href="/products" className="mt-8">
//               <button
//                 className="bg-[#212121] text-white w-1/2 text-sm py-2 px-7 loading-4.5 font-[600] flex justify-center items-center gap-2 border-t-2 border-t-[#545454] border-l-2 border-l-[#545454] border-r-2 border-r-black border-b-2 border-b-black"
//                 type="button"
//               >
//                 See All Product
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Newsletter = () => {
//   const clicked = () => console.log("");
//   return (
//     <div className=" py-24">
//       <div className="relative">
//         <div className="absolute inset-0 z-0 bg-inherit flex items-center justify-center">
//           <p className="text-[#f2f3f7] font-extrabold text-[60px] xs:text-[80px] sm:text-[90px] md:text-[120px] text-center">
//             Newsletter
//           </p>
//         </div>
//         <div className="relative z-10 bg-transparent flex flex-col justify-end items-center">
//           <h1 className="font-bold text-3xl text-center tracking-wider p-3">
//             Subscribe Our Newsletter
//           </h1>
//           <p className="font-light p-3 text-center">
//             Get the latest information and promo offers directly
//           </p>
//           <form className="p-3 flex flex-col space-y-6 items-center xs:flex-row xs:space-y-0">
//             <input
//               type="email"
//               placeholder="Input email address"
//               className="px-4 py-1 border border-gray-500 w-72"
//             />
//             <button
//               className="text-white bg-black border-2 border-gray-500 px-4 py-1 sm:ml-4 ml-1 min-w-max"
//               onClick={() => {}}
//             >
//               Get Started
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newsletter;

// const Footer = () => {
//   return (
//     <footer className="w-full h-full flex border-b border-black ">
//       <div className="grid grid-cols-1 lg:grid-cols-5 ">
//         <div className="lg:col-span-2  mr-32">
//           <Image src={logo} alt="lgo" className="my-8 mx-2" />
//           <div className="text-gray-500 my-8 mx-2 ">
//             Small, artisan label that offers a thoughtfully curated collection
//             of high quality everyday essentials made.
//           </div>
//           <div id="icons" className="flex gap-6 my-8 mx-2">
//             <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
//               <AiOutlineTwitter style={{ fontSize: "24px" }} />
//             </div>
//             <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
//               <ImFacebook style={{ fontSize: "24px" }} />
//             </div>
//             <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
//               <TfiLinkedin style={{ fontSize: "24px" }} />
//             </div>
//           </div>
//         </div>
//         <div className=" text-gray-500">
//           <p className="text-gray-600 text-xl py-4 ">
//             <strong>Company</strong>
//           </p>
//           <p className="py-2 pl-1">About</p>
//           <p className="py-2 pl-1">Terms of Use</p>
//           <p className="py-2 pl-1">Privacy Policy</p>
//           <p className="py-2 pl-1">How it Works</p>
//           <p className="py-2 pl-1">Contact Us</p>
//         </div>
//         <div className="  text-gray-500">
//           <p className="text-gray-600 text-xl py-4 ">
//             <strong>Support</strong>
//           </p>
//           <p className="py-2 pl-1">Support Carrer</p>
//           <p className="py-2 pl-1">24h Service</p>
//           <p className="py-2 pl-1">Quick Chat</p>
//         </div>
//         <div className=" text-gray-500">
//           <p className="text-gray-600 text-xl py-4 ">
//             <strong>Contact</strong>
//           </p>
//           <p className="py-2 pl-1">Whatsapp</p>
//           <p className="py-2 pl-1">Support 24h</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const Underfooter = () => {
//   return (
//     <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 justify-around items-center my-8">
//       <div className="text-gray-500">
//         Copyright © 2022 Dine<br />Market
//       </div>
//       <div>
//         <span className="text-gray-500">Design by.</span>
//         <span className="font-bold">
//           Weird<br />Design Studio
//         </span>
//       </div>
//       <div>
//         <span className="text-gray-500">Code by.</span>
//         <span className="font-bold">
//           shabrina12 on<br />
//           github
//         </span>
//       </div>
//     </div>
//   );
// };

// const Promotion = () => {
//   return (
//     <div className="flex flex-col gap-6 justify-center items-center mt-8 ">
//       <div
//         id="promotions"
//         className="flex flex-col gap-6 justify-center items-center "
//       >
//         <p className="text-[#0062F5] font-bold text-xs tracking-widest leading-4  ">
//           PROMOTIONS
//         </p>
//         <p className="font-bold text-4xl tracking-wide leading-10 ">
//           Our Promotions Events
//         </p>
//       </div>
//       <div
//         id="images"
//         className="flex flex-col lg:flex-row  gap-10 justify-center items-center w-full h-full  "
//       >
//         {/* 1-here at images  */}
//         <div id="left" className="flex flex-col gap-6   w-full">
//           <div
//             id="left-upper"
//             className="flex flex-col xs:flex-row px-8  bg-[#D6D6D8] "
//           >
//             <div
//               id="left"
//               className="loading-6 tracking-wide flex justify-between items-center "
//             >
//               <div className="block">
//                 <h1>
//                   <span className="font-bold text-3xl">GET UP TO</span>
//                   <br />
//                   <span className="text-4xl font-extrabold">60%</span>
//                 </h1>
//                 <p className="text-lg">
//                   For the summer<br />season
//                 </p>
//               </div>
//             </div>
//             <div id="right" className=" w-full flex items-center justify-end ">
//               <Image src={img5} alt="" />
//             </div>
//           </div>
//           <div
//             id="left-lower"
//             className="flex bg-[#212121] items-center justify-center text-center text-white px-8 pb-8 pt-12 "
//           >
//             <div>
//               <h3 className="font-bold text-4xl pb-3">GET 30% Off</h3>
//               <p>USE PROMO CODE</p>
//               <button className="bg-[#474747] mt-1 py-2 px-10 rounded-lg font-semibold tracking-[.25em] loading-5 text-sm sm:text-lg ">
//                 DINEWEEKANDSALE
//               </button>
//             </div>
//           </div>
//         </div>
//         <div id="right" className="flex flex-col sm:flex-row  gap-4   w-full">
//           {/* 2-here at right min-w-full min-h-full*/}
//           <div id="left-right" className="pt-4 bg-[#EFE1C7]   w-full">
//             <div className="pl-4  ">
//               <p className="text-lg font-light">Flex Sweatshirt</p>
//               <div className="flex gap-2 ">
//                 <p className="">$100.00</p>
//                 <p className="font-bold text-md">$75.00</p>
//               </div>
//             </div>
//             <div className="pt-4 flex justify-center items-center">
//               <Image src={img6} alt="" />
//             </div>
//           </div>
//           <div id="left-left" className="pt-4 bg-[#D7D7D9]  w-full">
//             <div className="pl-4 ">
//               <p className="text-lg font-light">Flex Push Button Bomber</p>
//               <div className="flex gap-2">
//                 <p className="">$225.00</p>
//                 <p className="font-bold text-md">$190.00</p>
//               </div>
//             </div>
//             <div className="pt-4  flex justify-center items-center">
//               <Image src={img7} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function Header() {
//   return (
//     <div className="min-w-full min-h-full mt-16 flex justify-center items-center">
//       <div className="w-full h-full flex justify-center items-center">
//         <div
//           id="left-part"
//           className="w-full h-full py-4 flex flex-col relative justify-between gap-6"
//         >
//           <p className="text-center rounded-md bg-[#E1EDFF] text-md text-[#0016FF] font-bold max-w-fit px-6 py-2 max-h-fit">
//             Sale 70%
//           </p>
//           <p className="text-5xl bg-white text-[#212121] font-extrabold min-w-fit">
//             An Industrial <br className="hidden lg:inline-block" />
//             Take on <br className="hidden md:block" />
//             Streetwear
//           </p>
//           <p className="line-clamp-4 bg-white text-gray-500">
//             Anyone can beat you but no one can
//             <br className="inline-block" /> beat your outfit as long as you wear
//             <br className="inline-block" /> Dine outfits.
//           </p>
//           <Link href="/aallproducts">
//             <Button />
//           </Link>
//           <div className="bg-white grid grid-cols-2 sm:grid-cols-4 justify-between items-center min-w-fit lg:gap-2">
//             <Image src={img1} alt="" />
//             <Image src={img2} alt="" />
//             <Image src={img4} alt="" />
//             <Image src={img3} alt="" />
//           </div>
//         </div>
//         <div id="right-part" className="hidden p-3 lg:flex">
//           <div className="relative w-[600px] h-[600px] rounded-full bg-[#FFECE3]">
//             <Image
//               src={img}
//               alt=""
//               width={650}
//               height={650}
//               className="z-20 absolute top-[-20px] w-[650px] h-[650px]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
