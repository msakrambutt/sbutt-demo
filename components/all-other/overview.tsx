import React from "react";

const Overview = () => {
  return (
    <div className="mx-5 my-5 lg:mx-32 lg:my-16 bg-[#FCFCFC] flex justify-start items-start">
      <div className="flex flex-col justify-start items-start gap-10 bg-white w-full">
        <div className="flex justify-start items-center border-b-2 border-gray-300 w-full h-[150px]">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-bold flex text-gray-100 tracking-wide">
            Overview
          </div>
          <div className="flex absolute z-0 xs:text-[1.4rem] font-bold loading-6 top-auto">
            Product Information
          </div>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6">
          <div className="text-gray-500 font-bold">PRODUCT DETAILS</div>
          <div className="col-span-2 text-base leading-6 text-justify tracking-wider text-[#353535]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="text-gray-500 font-bold">PRODUCT CARE</div>
          <div className="col-span-2 font-semibold text-[#212121] pl-4">
            <ul className="list-disc">
              <li>Hand wash using cold water.</li>
              <li>Do not use bleach.</li>
              <li>Hang it to dry.</li>
              <li>Iron on low temperature.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
