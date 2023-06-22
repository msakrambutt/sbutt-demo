"use client";
import React, { useState, createContext, useEffect } from "react";
import getStripe from "../../stripe/getStripe";

export const Context = createContext({
  quantity: 0,
  addToCart: (q: number) => {},
  removeFromCart: (q: number) => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [quantity, setQuantity] = useState(0);
  const addToCart = (q: number) => {
    setQuantity((prevQuantity) => prevQuantity + q);
  };
  const removeFromCart = (q: number) => {
    setQuantity((prevQuantity) => prevQuantity - q);
  };

  return (
    <>
      <Context.Provider value={{ quantity, addToCart, removeFromCart }}>
        {children}
      </Context.Provider>
    </>
  );
};

export default CartProvider;
