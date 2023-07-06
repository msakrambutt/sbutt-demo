import { cookies } from "next/headers";

import SignOutAction from "./SignOutAction";
interface SignOutProps {
  deleteTokens: () => Promise<void>;
}

export default async function SignOut() {
  async function deleteTokens() {
    "use server";
    console.log("call delete function in page.tsx")
    cookies().delete("authToken");
  }

  return <SignOutAction deleteTokens={deleteTokens} />;
}