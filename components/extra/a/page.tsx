import React from "react";
import Image from "next/image";
import { TbTrash } from "react-icons/tb";
import { urlForImage } from "@/sanity/lib/image";
import { datafetch } from "@/components/cart/datafetch";
import Footer from "../../components/all-other/footer";
import Navbar from "@/components/navbar/navbar";
import Underfooter from "@/components/all-other/underfooter";
import Button from "./button";
import Counter from "@/components/counter/counter";

const Cart = async () => {
  const data = await datafetch();
  console.log(data);
  console.log("______________________________________");
  return (
    <>
      <Navbar />
      <div
        id="outer-main"
        className="lg:mx-32 lg:my-16   mx-8 my-4 flex flex-col justify-center items-center  md:flex md:flex-row  lg:flex lg:justify-center lg:items-center gap-10 border p-[3rem]"
      >
        <div
          id="inner-main"
          className="flex flex-col justify-center items-center gap-10  shadow-xl mt-10  w-full lg:w-2/3 "
        >
          <h1 className="font-sora text-start font-bold text-2xl  border w-full">
            Shopping Cart
          </h1>
          {/* ________________________________________________________________________ */}
          <div
            id="detail+cart"
            className="flex flex-col justify-between items-center border  w-full h-full gap-10 p-1"
          >
            {data.map((data: any) => {
              return (
                <div
                  key={data.product_id}
                  className="flex  justify-normal items-center gap-10 border w-full h-full"
                >
                  <div
                    id="product-image"
                    className="flex-start border w-[150px] h-[190px]"
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
                    className="flex justify-between items-center w-full"
                  >
                    <div
                      id="product-detail"
                      className="flex flex-col gap-4 w-full border"
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
                      className="border flex justify-end items-end "
                    >
                      <div
                        id="TbTrash"
                        className="flex flex-col justify-between items-center "
                      >
                        <TbTrash style={{ fontSize: "25px" }} />
                        <Counter
                          price={data.price}
                          product_id={data._id}
                          showButton={false}
                          text={false}
                        />
                      </div>
                      <div id="counter"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* ________________________________________________________________________ */}
        </div>
        <div
          id="checkout"
          className="border  flex flex-col gap-10 md:self-start md:mt-10 bg-[#FBFCFF] p-10 w-full lg:w-1/3"
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

// import React from "react";
// import Image from "next/image";
// import { TbTrash } from "react-icons/tb";
// import { urlForImage } from "@/sanity/lib/image";
// import { datafetch } from "@/app/cart/datafetch";
// import Footer from "../../components/all-other/footer";
// import Navbar from "@/components/navbar/navbar";
// import Underfooter from "@/components/all-other/underfooter";
// import Button from "./button";

// const Cart = async () => {
//   const data = await datafetch();
//   console.log(data);
//   console.log("______________________________________");
//   return (
//     <>
//       <Navbar />
//       <div
//         id="outer-main"
//         className="lg:mx-32 lg:my-16 mx-8 my-4 flex flex-col justify-center items-center md:flex md:flex-row lg:flex lg:justify-center lg:items-center gap-10 border p-6 md:p-12"
//       >
//         <div
//           id="inner-main"
//           className="flex flex-col justify-center items-center gap-10 shadow-xl mt-10 w-full lg:w-2/3"
//         >
//           <h1 className="font-sora text-start font-bold text-2xl border w-full">
//             Shopping Cart
//           </h1>
//           <div
//             id="detail+cart"
//             className="flex flex-col justify-between items-center border w-full gap-10"
//           >
//             {data.map((data: any) => {
//               return (
//                 <div
//                   key={data.product_id}
//                   className="flex justify-normal items-center gap-10 border w-full"
//                 >
//                   <div id="product-image" className="flex-start">
//                     <Image
//                       src={urlForImage(data.image).url()}
//                       className="w-32 h-40 md:w-40 md:h-48 rounded-lg"
//                       alt=""
//                       width={200}
//                       height={200}
//                     />
//                   </div>
//                   <div className="flex justify-between items-center flex-grow">
//                     <div id="product-detail" className="flex flex-col gap-4">
//                       <div className="text-xl font-light">{data.name}</div>
//                       <div className="text-gray-500 font-semibold text-base">
//                         {data.type}
//                       </div>
//                       <div>
//                         <h1 className="font-bold">Delivery Estimation</h1>
//                         <br />
//                         <p className="text-yellow-400 font-bold">
//                           5 Working Days
//                         </p>
//                       </div>
//                       <div className="font-bold text-lg">${data.price}</div>
//                     </div>
//                     <div id="counter-delete" className="border flex-shrink-0">
//                       <div id="TbTrash">
//                         <TbTrash style={{ fontSize: "25px" }} />
//                       </div>
//                       <div id="counter"></div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div
//           id="checkout"
//           className="border flex flex-col gap-10 self-start mt-10 bg-[#FBFCFF] p-10 w-full lg:w-1/3"
//         >
//           <div>
//             <h1>Order Summary</h1>
//           </div>
//           <div className="flex justify-between">
//             <div>Quantity</div>
//             <div>10 Products</div>
//           </div>
//           <div className="flex justify-between">
//             <div>
//               <h1>Sub Total</h1>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <Button />
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <Underfooter />
//     </>
//   );
// };

// export default Cart;
