"use client";
import React, { useContext, useState } from "react";
import Button from "./button";
import { Context } from "./QuantityContext";

const Counter = ({
  price,
  product_id,
  showButton = true,
  text = true,
}: {
  price: number;
  product_id: string;
  showButton?: boolean;
  text?: boolean;
}) => {
  const { quantity, addToCart, removeFromCart } = useContext(Context);
  const [value, setValue] = useState(1);
  const [val, setVal] = useState(value);

  const increment = () => {
    if (showButton === false) {
      setValue(value + 1);
      addToCart(val);
    } else {
      setValue((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrement = () => {
    if (showButton === false) {
      setValue(value - 1);
      removeFromCart(val);
    } else if (value > 1) {
      setValue((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-4">
        <h1 className="font-semibold text-lg">{text && "Quantity:"}</h1>
        <button
          type="button"
          onClick={decrement}
          className={`w-10 h-10 ${
            value === 1 ? "cursor-not-allowed" : ""
          } bg-gray-200 hover:shadow-lg rounded-full text-3xl font-light`}
          disabled={value === 1}
        >
          -
        </button>

        <div className="flex justify-center items-center text-lg">{value}</div>
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
          <Button quantity={value} price={price} product_id={product_id} />
          <p className="font-bold text-xl leading-8 tracking-wider">${price}</p>
        </div>
      )}
    </div>
  );
};

export default Counter;
