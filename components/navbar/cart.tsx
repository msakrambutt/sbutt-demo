"use client";
import React, { useContext, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Context } from "../counter/QuantityContext";
import Link from "next/link";
export default function Cart() {
  const { quantity } = useContext(Context);
  return (
    <Link href={`../cart`}>
      <div className="flex w-12 h-12 relative rounded-full items-center justify-center bg-[#F1F1F1] hover:transform hover:transition-transform hover:duration-400 hover:ease-in-out">
        <div className="flex justify-center items-center text-xs w-4 h-4 absolute rounded-full bg-red-500 text-white right-1 top-0">
          {quantity}
        </div>
        <CgShoppingCart style={{ fontSize: "24px" }} />
      </div>
    </Link>
  );
}
