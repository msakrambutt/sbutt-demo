"use client";
import React, { createContext, useContext, useState } from "react";
import Button from "../counter/button";
import { Context } from "../counter/QuantityContext";

const Counter = ({
  price,
  product_id,
  showButton = true,
}: {
  price: number;
  product_id: string;
  showButton?: boolean;
}) => {
  // const [quantiy, setQuantity] = useState(1);
  const { quantity, addToCart, removeFromCart } = useContext(Context);
  const increment = () => {
    addToCart(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      removeFromCart(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-4">
        <h1 className="font-semibold text-lg">Quantity:</h1>
        <button
          type="button"
          onClick={decrement}
          className={`w-10 h-10 ${
            quantity === 1 ? "cursor-not-allowed" : ""
          } bg-gray-200 hover:shadow-lg rounded-full text-3xl font-light`}
          disabled={quantity === 1}
        >
          -
        </button>

        <div className="flex justify-center items-center text-lg">
          {quantity}
        </div>
        <button
          type="button"
          onClick={increment}
          className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black hover:shadow-lg text-3xl font-light"
        >
          +
        </button>
      </div>
      {showButton && (
        <div id="button" className="flex gap-4">
          <Button quantity={quantity} price={price} product_id={product_id} />
          <p className="font-bold text-xl leading-8 tracking-wider">${price}</p>
        </div>
      )}
    </div>
  );
};

export default Counter;

// const datafetch = async () => {
//   const user_id = cookies().get("user_id")?.value;
//   const data = await fetch(`http://localhost:3000/api/cart/${user_id}`, {
//     method: "GET",
//   });
//   if (!data.ok) {
//     console.log("Failed to fetch data");
//   }
//   return data.json();
// };
// export default datafetch;
