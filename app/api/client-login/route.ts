import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db, userTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
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

        // compare encrypted password
        if (typeof body.clientPwd === "string") {
          const passwordCompare: boolean = await bcrypt.compare(
            body.clientPwd,
            user[0].password
          );
          if (!passwordCompare) {
            return NextResponse.json({ status: 400,message:"Password is incorrect."});
          }
          const data = {
            user: {
              id: user[0].id,
            },
          };
          const authToken = jwt.sign(data, process.env.SECRET_KEY); 
          cookies().set("authToken", authToken);
         
          return NextResponse.json({ message:"User Credential found, Allow user to access the content"});
        }
      } else {
        return NextResponse.json({ message: "clientEmail or clientPassword is missing." });
      }
    }
  } catch (error) {
    console.log("POST request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
