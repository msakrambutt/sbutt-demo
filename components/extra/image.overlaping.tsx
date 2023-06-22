import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { datafetch } from "@/components/cart/datafetch";
import Footer from "../../components/all-other/footer";
import Navbar from "@/components/navbar/navbar";
import Underfooter from "@/components/all-other/underfooter";
import Button from "./button";

const Cart = async () => {
  const data = await datafetch();
  console.log(data);
  console.log("______________________________________");
  return (
    <>
      <Navbar />
      <div
        id="outer-main"
        className="lg:mx-32 lg:my-16 mx-8 my-4  flex flex-col md:flex md:flex-row  lg:flex justify-center items-center gap-10 border p-[3rem]"
      >
        <div
          id="inner-main"
          className="flex flex-col justify-center items-center gap-10  shadow-xl mt-10  w-full lg:w-2/3 "
        >
          <h1 className="font-sora text-start font-bold text-2xl bg-orange-400 border w-full">
            Shopping Cart
          </h1>
          {/* ________________________________________________________________________ */}
          <div
            id="detail+cart"
            className="flex flex-col justify-between items-center bg-lime-400 w-full gap-10"
          >
            {data.map((data: any) => {
              return (
                <div
                  key={data.product_id}
                  className="flex  justify-between items-center "
                >
                  <div className="w-25 h-[100px] rounded-md">
                    <Image
                      src={urlForImage(data.image).url()}
                      alt=""
                      width={250}
                      height={270}
                      className="w-100% h-100% "
                    />
                  </div>
                  <div>
                    <div>{data.name}</div>
                    <div>{data.type}</div>
                    <div>{data.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ________________________________________________________________________ */}
        </div>
        <div
          id="checkout"
          className="border  flex flex-col gap-10 bg-[#FBFCFF] p-10 w-full lg:w-1/3"
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
      <Footer />
      <Underfooter />
    </>
  );
};

export default Cart;
