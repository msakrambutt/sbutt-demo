import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db, userTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { AES, enc } from 'crypto-js';

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

function comparePasswords(enteredPassword:string, storedEncryptedPassword:string, secretKey:string) {
  const decryptedBytes = AES.decrypt(storedEncryptedPassword, secretKey);
  const decryptedText = decryptedBytes.toString(enc.Utf8);
  return enteredPassword === decryptedText;
}

export const POST = async (req: Request) => {
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientPwd) {
        const user = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, body.clientEmail));
        if (user.length === 0) {
          return NextResponse.json({
              message: "Email not found. Please register!",
              status: 400,
            });
        }

        //check encrypted password
        const enteredPassword = body.clientPwd;
        const storedEncryptedPassword =user[0].password;
        const secretKey = JWT_SECRET_KEY;

        if (typeof body.clientPwd === "string") {
        const passwordsMatch = comparePasswords(enteredPassword, storedEncryptedPassword, secretKey);
        if(!passwordsMatch){
            return NextResponse.json({ message: "Incorrect password", status: 400 });
        }
          const data = {
            user: {
              id: user[0].id,
            },
          };
          const authToken = jwt.sign(data, process.env.SECRET_KEY); //sign digital signature on token
          //serialized & store token as a cookie value
          const serialized: string | undefined = serialize(
            "authToken",
            authToken,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              path: "/",
            }
          );

          const response = new NextResponse(null, {
            headers: {
              "Set-Cookie": serialized,
            },
          });

          return new NextResponse(JSON.stringify({ message:"User Credential found, Allow user to access "}));
        }
      } else {
        return new NextResponse(
          JSON.stringify({ message: "clientEmail or clientPassword is missing." })
        );
      }
    }
  } catch (error) {
    console.log("POST request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
