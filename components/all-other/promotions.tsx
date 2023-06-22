"use client";
import Image from "next/image";
import img1 from "@/pics/New folder (2)/1.png";
import img2 from "@/pics/New folder (2)/2.png";
import img3 from "@/pics/New folder (2)/3.png";
import Button from "@/components/all-other/button";
import Navbar from "@/components/navbar/navbar";

const Promotion = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-8 ">
      <div
        id="promotions"
        className="flex flex-col gap-6 justify-center items-center "
      >
        <p className="text-[#0062F5] font-bold text-xs tracking-widest leading-4  ">
          PROMOTIONS
        </p>
        <p className="font-bold text-4xl tracking-wide leading-10 ">
          Our Promotions Events
        </p>
      </div>
      <div
        id="images"
        className="flex flex-col lg:flex-row  gap-10 justify-center items-center w-full h-full  "
      >
        {/* 1-here at images  */}
        <div id="left" className="flex flex-col gap-6   w-full">
          <div
            id="left-upper"
            className="flex flex-col xs:flex-row px-8  bg-[#D6D6D8] "
          >
            <div
              id="left"
              className="loading-6 tracking-wide flex justify-between items-center "
            >
              <div className="block">
                <h1>
                  <span className="font-bold text-3xl">GET UP TO</span>
                  <br></br>
                  <span className="text-4xl font-extrabold">60%</span>
                </h1>
                <p className="text-lg">
                  For the summer<br></br>season
                </p>
              </div>
            </div>
            <div id="right" className=" w-full flex items-center justify-end ">
              <Image src={img1} alt="" />
            </div>
          </div>
          <div
            id="left-lower"
            className="flex bg-[#212121] items-center justify-center text-center text-white px-8 pb-8 pt-12 "
          >
            <div>
              <h3 className="font-bold text-4xl pb-3">GET 30% Off</h3>
              <p>USE PROMO CODE</p>
              <button className="bg-[#474747] mt-1 py-2 px-10 rounded-lg font-semibold tracking-[.25em] loading-5 text-sm sm:text-lg ">
                DINEWEEKANDSALE
              </button>
            </div>
          </div>
        </div>
        <div id="right" className="flex flex-col sm:flex-row  gap-4  w-full">
          {/* 2-here at right min-w-full min-h-full*/}
          <div id="left-right" className="pt-4 bg-[#EFE1C7]   w-full">
            <div className="pl-4  ">
              <p className="text-lg font-light">Flex Sweatshirt</p>
              <div className="flex gap-2 ">
                <p className="">$100.00</p>
                <p className="font-bold text-md">$75.00</p>
              </div>
            </div>
            <div className="pt-4 flex justify-center items-center">
              <Image src={img2} alt="" />
            </div>
          </div>
          <div id="left-left" className="pt-4 bg-[#D7D7D9] w-full">
            <div className="pl-4 ">
              <p className="text-lg font-light">Flex Push Button Bomber</p>
              <div className="flex gap-2">
                <p className="">$225.00</p>
                <p className="font-bold text-md">$190.00</p>
              </div>
            </div>
            <div className="pt-4  flex justify-center items-center">
              <Image src={img3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
