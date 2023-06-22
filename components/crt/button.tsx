"use client";
import React, { useEffect, useState } from "react";

const Button = () => {
  const initialButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-gray-200 border-l-2 border-l-gray-200   border-r-2 border-r-gray-400     border-b-2   border-b-gray-400";
  const activeButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-gray-400     border-l-2 border-l-gray-400     border-r-2 border-r-gray-200 border-b-2 border-b-gray-200";
  const [buttonClassName, setButtonClassName] = useState(
    initialButtonClassName
  );
  const handleClick = () => {
    setButtonClassName(activeButtonClassName);
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
      Process to Checkout
    </button>
  );
};

export default Button;
