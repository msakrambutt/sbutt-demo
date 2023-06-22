"use client";
import Image from "next/image";
import { AiOutlineTwitter } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { TfiLinkedin } from "react-icons/tfi";
import logo from "../../pics/New folder/logo.png";

const Footer = () => {
  return (
    <footer className="w-full h-full flex border-b border-black ">
      <div className="grid grid-cols-1 lg:grid-cols-5 ">
        <div className="lg:col-span-2  mr-32">
          <Image src={logo} alt="lgo" className="my-8 mx-2" />
          <div className="text-gray-500 my-8 mx-2 ">
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </div>
          <div id="icons" className="flex gap-6 my-8 mx-2">
            <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
              <AiOutlineTwitter style={{ fontSize: "24px" }} />
            </div>
            <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
              <ImFacebook style={{ fontSize: "24px" }} />
            </div>
            <div className="w-fit h-fit bg-gray-200 p-2 rounded-md">
              <TfiLinkedin style={{ fontSize: "24px" }} />
            </div>
          </div>
        </div>
        <div className=" text-gray-500">
          <p className="text-gray-600 text-xl py-4 ">
            <strong>Company</strong>
          </p>
          <p className="py-2 pl-1">About</p>
          <p className="py-2 pl-1">Terms of Use</p>
          <p className="py-2 pl-1">Privacy Policy</p>
          <p className="py-2 pl-1">How it Works</p>
          <p className="py-2 pl-1">Contact Us</p>
        </div>
        <div className="  text-gray-500">
          <p className="text-gray-600 text-xl py-4 ">
            <strong>Support</strong>
          </p>
          <p className="py-2 pl-1">Support Carrer</p>
          <p className="py-2 pl-1">24h Service</p>
          <p className="py-2 pl-1">Quick Chat</p>
        </div>
        <div className=" text-gray-500">
          <p className="text-gray-600 text-xl py-4 ">
            <strong>Contact</strong>
          </p>
          <p className="py-2 pl-1">Whatsapp</p>
          <p className="py-2 pl-1">Support 24h</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
