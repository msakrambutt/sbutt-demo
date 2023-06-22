"use client";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

const Button = () => {
  const initialButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-[#545454] border-l-2 border-l-[#545454] border-r-2 border-r-black border-b-2 border-b-black";
  const activeButtonClassName =
    "flex bg-[#212121] text-white justify-center items-center px-4 py-2 border-t-2 border-t-black border-l-2 border-l-black border-r-2 border-r-[#545454] border-b-2 border-b-[#545454]";

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
      <CgShoppingCart style={{ fontSize: "24px", color: "white" }} />
      <p className="pl-2">Start Shopping</p>
    </button>
  );
};

export default Button;
