"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";
import logo from "@/pics/New folder/logo.png";
import Inputfield from "@/components/navbar/inputfield";
import Cart from "@/components/navbar/cart";

export default function Navbar() {
  const [state, setState] = useState(false);
  const whenClicked = () => {
    setState(!state);
  };
  const Fun = () => {
    return (
      <div className="fixed  inset-0 bg-white z-50  flex flex-col justify-between min-w-full min-h-screen lg:hidden">
        <div className="flex justify-between items-start max-w-full h-fit mx-10 ">
          <Image src={logo} alt="logo" width={150} height={50} />
          <button onClick={whenClicked}>
            <RxCross2 style={{ fontSize: "30px" }} />
          </button>
        </div>
        <div className="max-w-full h-full flex justify-center items-center grow ">
          <div
            id="options"
            className="flex flex-col font-bold items-center justify-center gap-6 overflow-y-auto "
          >
            <Cart />
            <Link className="max-w-full max-h-full" href="../female">
              Female
            </Link>
            <Link className="max-w-full max-h-full" href="../male">
              Male
            </Link>
            <Link className="max-w-full max-h-full" href="../kids">
              Kids
            </Link>
            <Link className="max-w-full max-h-full" href="../allproducts">
              All Products
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const NavFun = () => {
    return (
      <div className="lg:hidden flex justify-between items-center ">
        <Image src={logo} alt="logo" width={150} height={50} />
        <button className=" lg:hidden" onClick={whenClicked}>
          <RiMenu3Fill style={{ fontSize: "30px" }} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="hidden lg:flex justify-between items-center max-w-full h-fit">
        <Link href="#" id="logo" className="flex max-w-fit">
          <Image src={logo} alt="lgo" className="m-2" />
        </Link>
        <div id="options">
          <ul className="flex gap-12 items-center justify-center min-w-full">
            <Link href="../female" className="max-w-fit">
              <li>Female</li>
            </Link>

            <Link href="../male" className="max-w-fit">
              <li>Male </li>
            </Link>

            <Link href="../kids" className="max-w-fit">
              <li>Kids</li>
            </Link>

            <Link href="../allproducts" className="max-w-full">
              <li>All Products</li>
            </Link>
          </ul>
        </div>
        <Inputfield />
        <Cart />
      </div>

      {state ? <Fun /> : <NavFun />}
    </>
  );
}
// const btn = document.querySelector("");
// const menu = document.querySelector("");
// btn?.addEventListener("click", () => {
//   menu?.classList.toggle("hidden");
// });
