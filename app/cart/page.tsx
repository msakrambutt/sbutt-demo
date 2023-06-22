"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Context } from "@/components/counter/QuantityContext";
import Fun from "./cartquantity";
function Name() {
  const { quantity } = useContext(Context);
  const [value, setValue] = useState<React.JSX.Element>();
  console.log(`quantity is ${quantity}`);
  useEffect(() => {
    const fun = async () => {
      const fun = await Fun({ quantity });
      setValue(fun);
    };
    fun();
  }, [quantity]);
  return value;
}

const Page = () => {
  const value = Name();
  return <>{value}</>;
};
export default Page;
