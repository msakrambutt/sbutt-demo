"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { CgShoppingCart } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "./QuantityContext";

const Button = ({
  quantity,
  price,
  product_id,
}: {
  quantity: number;
  price: number;
  product_id: string;
}) => {
  const { addToCart } = useContext(Context);

  const initialButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-[#545454] border-l-2 border-l-[#545454] border-r-2 border-r-black border-b-2 border-b-black";
  const activeButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-black border-l-2 border-l-black border-r-2 border-r-[#545454] border-b-2 border-b-[#545454]";
  const [buttonClassName, setButtonClassName] = useState(
    initialButtonClassName
  );
  const sendData = async () => {
    try {
      const response = await fetch("/api/cartinsert", {
        method: "POST",
        body: JSON.stringify({
          quantity,
          price,
          product_id,
        }),
      });

      if (response.ok) {
        toast.success("Successfully added product to your cart. Enjoy");
        return await response.json();
      } else {
        toast.error("Sorry something went wrong");
        return await response.json();
      }
    } catch (error) {
      console.error("An error occurred while adding product to cart:", error);
    }
  };

  const handleClick = () => {
    setButtonClassName(activeButtonClassName);
    addToCart(quantity);
    sendData();
  };

  useEffect(() => {
    if (buttonClassName === activeButtonClassName) {
      const timeout = setTimeout(() => {
        setButtonClassName(initialButtonClassName);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [buttonClassName, initialButtonClassName, activeButtonClassName]);

  return (
    <button className={buttonClassName} onClick={handleClick}>
      <Toaster />
      <CgShoppingCart style={{ fontSize: "24px", color: "white" }} />
      Add to Cart
    </button>
  );
};

export default Button;
