"use server";
import { cookies } from "next/headers";

export default async function User_id() {
  const user_id = async () => {
    const usr_id = cookies().get("user_id")?.value as string;
    return usr_id;
  };
  return user_id();
}
