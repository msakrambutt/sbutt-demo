import { cookies } from "next/headers";

export default async function User_Token() {
  const user_token = async () => {
    const token = cookies().get("authToken")?.value;
    return token;
  };
  return user_token();
}