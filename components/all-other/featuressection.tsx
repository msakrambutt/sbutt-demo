"use client";
import Image from "next/image";
import Link from "next/link";
import img8 from "../../pics/New folder (2)/4.png";

const FeaturesSection = () => {
  return (
    <div className="mt-32">
      <div
        id="upper"
        className="flex justify-center px-0 py-0 lg:py-8 lg:px-16 text-5xl font-extrabold xl:px-0 xl:py-0 xl:justify-end xl:text-5xl xl:font-bold pb-8  bg-gradient-to-b from-white from-60% via-[#FBFCFF] via-60% to-[#FBFCFF] to-100%"
      >
        <p>
          Unique and <br className="hidden xl:inline-block " />
          Authentic Vintage <br className="hidden xl:inline-block " />
          Designer Jewellery
        </p>
      </div>

      <div
        id="lower"
        className="grid xl:grid-cols-2 justify-center items-center bg-[#FBFCFF] pb-16  "
      >
        <div
          id="left-col-grid"
          className="relative z-0 grid grid-cols-2 gap-10 tracking-widest w-full min-h-max "
        >
          <div className="flex items-center absolute overflow-none  opacity-50 w-full h-full xl:w-70% text-gray-300 text-[4.5em] sm:text-[6rem] lg:text-[7rem] leading-[7rem] font-extrabold">
            Different <br className="hidden xl:inline-block" />
            from <br className="hidden xl:inline-block" />
            others
          </div>
          <div className="w-full xl:w-70%    z-20">
            <h1 className="lg:text-xl text-[1em] font-semibold w-full pb-4">
              Using Good <br className="hidden lg:inline-block" />{" "}
              Quality_Materials
            </h1>
            <p className="w-full ">
              Lorem ipsum dolor <br className="hidden lg:inline-block" />
              sit amt, consectetur <br className="hidden lg:inline-block" />
              adipiscing elit.
            </p>
          </div>
          <div className="w-full xl:w-70% z-20">
            <h1 className="font-semibold lg:text-xl text-[1em] pb-4">
              100% Handmade <br className="hidden xl:inline-block" />
              Products
            </h1>
            <p className="w-full ">
              Lorem ipsum dolor <br className="hidden lg:inline-block" />
              sit amt, consectetur <br className="hidden lg:inline-block" />
              adipiscing elit.
            </p>
          </div>
          <div className="w-full xl:w-70% z-20">
            <h1 className="font-semibold lg:text-xl text-[0.9em] pb-4">
              Modern Fashion <br className="hidden xl:inline-block" />
              Design
            </h1>
            <p className="w-full ">
              Lorem ipsum dolor <br className="hidden lg:inline-block" />
              sit amt, consectetur <br className="hidden lg:inline-block" />
              adipiscing elit.
            </p>
          </div>
          <div className="w-full xl:w-70% z-20">
            <h1 className="font-semibold lg:text-xl text-[1em] pb-4">
              Discount for Bulk <br className="hidden xl:inline-block" />
              Orders
            </h1>
            <p className="w-full ">
              Lorem ipsum dolor <br className="hidden lg:inline-block" />
              sit amt, consectetur <br className="hidden lg:inline-block" />
              adipiscing elit.
            </p>
          </div>
        </div>

        <div
          id="right-col-flex"
          className="flex flex-col sm:flex-row justify-center items-center mt-10 xl:mt-0 gap-10 "
        >
          <Image src={img8} alt="" className="w-280 h-450" />
          <div className="flex flex-col justify-center font-light text-[1rem] loading-6.5 text-justify">
            <p>
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <Link href="/products" className="mt-8">
              <button
                className="bg-[#212121] text-white w-1/2 text-sm py-2 px-7 loading-4.5 font-[600] flex justify-center items-center gap-2 border-t-2 border-t-[#545454] border-l-2 border-l-[#545454] border-r-2 border-r-black border-b-2 border-b-black"
                type="button"
              >
                See All Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
