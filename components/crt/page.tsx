"use client";
import { BiShoppingBag } from "react-icons/bi";
import React, { useContext, useEffect, useState } from "react";
import { cookies } from "next/dist/client/components/headers";
import { Context } from "@/components/counter/QuantityContext";
import CartItems from "./cartItems";

const Testing = async () => {
  const { quantity } = useContext(Context);
  console.log(quantity);
  console.log("quantity  " + quantity);
  // const [isEmpty, setIsEmpty] = useState(true);

  if (quantity > 0) {
    console.log("Cart is not Empty");
    // setIsEmpty(false);
    // return isEmpty;
    return false;
  } else if (quantity === 0) {
    const user_id = cookies().get("user_id")?.value as string;
    console.log(user_id);
    try {
      const response = await fetch("http://localhost:3000/api/cartremove", {
        method: "POST",
        body: JSON.stringify({
          user_id,
        }),
      });
      console.log("Cart is Empty");
      // setIsEmpty(true);
      // return isEmpty;
      return true;
    } catch (error) {
      console.log(error);
      // setIsEmpty(false);
    }
  }
};

const Page = () => {
  const [state, setState] = useState(<></>);
  useEffect(() => {
    const fun = async () => {
      const fun = await Testing();

      if (fun) {
        setState(
          <div className=" my-16 flex flex-col justify-center items-center">
            <BiShoppingBag style={{ fontSize: "100px" }} />
            <h1 className="font-bold text-3xl">Your Shopping bag is empty</h1>
          </div>
        );
      }
    };
  });
  const Data = await CartItems();

  console.log("______________________________________");
  // console.log(fun);

  return (
    <>
      {fun ? (
        <div className=" my-16 flex flex-col justify-center items-center">
          <BiShoppingBag style={{ fontSize: "100px" }} />
          <h1 className="font-bold text-3xl">Your Shopping bag is empty</h1>
        </div>
      ) : (
        Data
      )}
    </>
  );
};
export default Page;

// const Testing = () => {
//   const { quantity } = useContext(Context);
//   console.log(quantity);
//   const [isEmpty, setIsEmpty] = useState(false);

//   useEffect(() => {
//     const checkCart = async () => {
//       if (quantity === 0) {
//         const user_id = cookies().get("user_id")?.value as string;
//         console.log(user_id);
//         try {
//           const response = await fetch("http://localhost:3000/api/cartremove", {
//             method: "POST",
//             body: JSON.stringify({
//               user_id,
//             }),
//           });
//           console.log("Cart is Empty");
//           setIsEmpty(true);
//         } catch (error) {
//           console.log(error);
//           setIsEmpty(false);
//         }
//       } else {
//         console.log("Cart is not Empty");
//         setIsEmpty(false);
//       }
//     };

//     checkCart();
//   }, [quantity]);

//   console.log("quantity: ", quantity);

//   return isEmpty;
// };

// const Page = async () => {
//   const isEmpty = Testing();
//   const data = await CartItems();

//   console.log("______________________________________");

//   return (
//     <>
//       {isEmpty ? (
//         <div className="my-16 flex flex-col justify-center items-center">
//           <BiShoppingBag style={{ fontSize: "100px" }} />
//           <h1 className="font-bold text-3xl">Your Shopping bag is empty</h1>
//         </div>
//       ) : (
//         data
//       )}
//     </>
//   );
// };
