import Image from "next/image";
import { TbTrash } from "react-icons/tb";
import { urlForImage } from "@/sanity/lib/image";
import { Datafetch } from "@/app/cart/sanityfetch";
import Button from "@/components/crt/button";
import Counter from "@/components/counter/counter";
import React, { Suspense, useEffect, useState } from "react";

const CartItems = async () => {
  const data = await Datafetch();
  return (
    <div
      id="outer-main"
      className="flex flex-col justify-center items-center lg:my-16 lg:mx-32 md:flex md:flex-row  lg:flex lg:justify-center lg:items-center gap-10  p-[3rem]"
    >
      <div
        id="inner-main"
        className="flex flex-col justify-center items-center gap-10 mt-10  w-full lg:w-2/3 "
      >
        <h1 className="font-sora text-start font-bold text-2xl   w-full">
          Shopping Cart
        </h1>
        {/* ________________________________________________________________________ */}
        <div
          id="detail+cart"
          className="flex flex-col justify-between items-center   w-full h-full gap-10 p-1"
        >
          {data && data.map((data: any) => {
            return (
              <div
                key={data.product_id}
                className="flex justify-normal items-center gap-6  w-full h-full"
              >
                <div
                  id="product-image"
                  className="flex-start  w-[200px] h-[190px]"
                >
                  <Image
                    src={urlForImage(data.image).url()}
                    className="w-[150px] h-[190px] rounded-lg"
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div
                  id="main"
                  className="flex justify-between items-center w-full h-full"
                >
                  <div
                    id="product-detail"
                    className="flex flex-col gap-4 w-2/3 h-full "
                  >
                    <div className="text-xl font-light">{data.name}</div>
                    <div className="text-gray-500 font-semibold text-base">
                      {data.type}
                    </div>
                    <div>
                      <h1 className="font-bold">Delivery Estimation</h1>
                      <br />
                      <p className=" text-yellow-400 font-bold">
                        5 Working Days
                      </p>
                    </div>
                    <div className="font-bold text-lg">${data.price}</div>
                  </div>
                  <div
                    id="counter-delete"
                    className=" flex flex-col justify-between items-end gap-32 w-1/3 h-full flex-grow"
                  >
                    <div id="TbTrash" className="items-center h-full ">
                      <TbTrash style={{ fontSize: "30px" }} />
                    </div>
                    <div id="counter" className="w-fit h-fit ">
                      <Counter
                        price={data.price}
                        product_id={data._id}
                        showButton={false}
                        text={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ________________________________________________________________________ */}
      <div
        id="checkout"
        className="  flex flex-col gap-10 md:self-start md:mt-10 bg-[#FBFCFF] p-10 w-full lg:w-1/3"
      >
        <div>
          <h1>Order Summary</h1>
        </div>
        <div className="flex justify-between">
          <div>Quantity</div>
          <div>10Products</div>
        </div>
        <div className="flex justify-between">
          <div>
            <h1>Sub Total</h1>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
