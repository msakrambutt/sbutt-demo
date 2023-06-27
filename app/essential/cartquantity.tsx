import { BiShoppingBag } from "react-icons/bi";
import { cookies } from "next/dist/client/components/headers"; // Update the import path to the correct location
import CartItems from "./CartItems";
import User_id from "./cookies";

const Testing = async ({ quantity }: { quantity: number }) => {
  console.log(quantity);
  const data = await CartItems();
  if (quantity !== 0) {
    return data;
  } else {
    const Testing = async () => {
      const value = await User_id();
      console.log("my value "+value);
      const response = await fetch("http://localhost:3000/api/cartremove", {
        method: "POST",
        body: JSON.stringify({
          value,
        }),
      });
      console.log("Cart is Empty");
    };
    Testing();
    return (
      <div className=" my-16 flex flex-col justify-center items-center">
        <BiShoppingBag style={{ fontSize: "100px" }} />
        <h1 className="font-bold text-3xl">Your Shopping bag is empty</h1>
      </div>
    );
  }
};

export default Testing;
