"use client";
import { useEffect, useContext, useState } from "react";
import { Context } from "@/components/counter/QuantityContext";
import { cookies } from "next/dist/client/components/headers";

const EmptyCart = () => {
  const { quantity } = useContext(Context);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (quantity === 0) {
        const user_id = cookies().get("user_id")?.value as string;
        console.log(user_id);
        try {
          const response = await fetch("http://localhost:3000/api/cartremove", {
            method: "POST",
            body: JSON.stringify({
              user_id,
            }),
          });
          console.log(response);
          setIsEmpty(true);
        } catch (error) {
          console.log(error);
          setIsEmpty(false);
        }
      } else {
        console.log("Cart is not Empty");
        setIsEmpty(false);
      }
    };

    fetchData();
  }, [quantity]);

  return isEmpty;
};

export default EmptyCart;
