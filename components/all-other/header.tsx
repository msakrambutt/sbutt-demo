"use client";
import Image from "next/image";
import Link from "next/link";
import img from "../../pics/New folder (3)/img.png";
import img1 from "../../pics/New folder/bazar.png";
import img2 from "../../pics/New folder/bustle.png";
import img3 from "../../pics/New folder/instyle.png";
import img4 from "../../pics/New folder/versac.png";
import Button from "@/components/all-other/button";
import Navbar from "@/components/navbar/navbar";

const Header = () => {
  return (
    <>
      <div className="min-w-full min-h-full mt-16 flex justify-center items-center">
        <div className="w-full h-full flex justify-center items-center">
          <div
            id="left-part"
            className="w-full h-full py-4 flex flex-col relative justify-between gap-6"
          >
            <p className="text-center rounded-md bg-[#E1EDFF] text-md text-[#0016FF] font-bold max-w-fit px-6 py-2 max-h-fit">
              Sale 70%
            </p>
            <p className="text-5xl bg-white text-[#212121] font-extrabold min-w-fit">
              An Industrial <br className="hidden lg:inline-block" />
              Take on <br className="hidden md:block" />
              Streetwear
            </p>
            <p className="line-clamp-4 bg-white text-gray-500">
              Anyone can beat you but no one can
              <br className="inline-block" /> beat your outfit as long as you
              wear
              <br className="inline-block" /> Dine outfits.
            </p>
            <Link href="/aallproducts">
              <Button />
            </Link>
            <div className="bg-white grid grid-cols-2 sm:grid-cols-4 justify-between items-center min-w-fit lg:gap-2">
              <Image src={img1} alt="" />
              <Image src={img2} alt="" />
              <Image src={img4} alt="" />
              <Image src={img3} alt="" />
            </div>
          </div>
          <div id="right-part" className="hidden p-3 lg:flex">
            <div className="relative w-[600px] h-[600px] rounded-full bg-[#FFECE3]">
              <Image
                src={img}
                alt=""
                width={650}
                height={650}
                className="z-20 absolute top-[-20px] w-[650px] h-[650px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
