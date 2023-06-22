"use client";
import React from "react";

const Newsletter = () => {
  const clicked = () => console.log("");
  return (
    <div className=" py-24">
      <div className="relative">
        <div className="absolute inset-0 z-0 bg-inherit flex items-center justify-center">
          <p className="text-[#f2f3f7] font-extrabold text-[60px] xs:text-[80px] sm:text-[90px] md:text-[120px] text-center">
            Newsletter
          </p>
        </div>
        <div className="relative z-10 bg-transparent flex flex-col justify-end items-center">
          <h1 className="font-bold text-3xl text-center tracking-wider p-3">
            Subscribe Our Newsletter
          </h1>
          <p className="font-light p-3 text-center">
            Get the latest information and promo offers directly
          </p>
          <form className="p-3 flex flex-col space-y-6 items-center xs:flex-row xs:space-y-0">
            <input
              type="email"
              placeholder="Input email address"
              className="px-4 py-1 border border-gray-500 w-72"
            />
            <button
              className="text-white bg-black border-2 border-gray-500 px-4 py-1 sm:ml-4 ml-1 min-w-max"
              onClick={() => {}}
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
