import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.SECRET_KEY) {
      return;
    }

    const body = await req.json();
    console.log(body);

    if (!body.email || !body.password) {
      return new NextResponse(
        JSON.stringify({
          message: "Email, or password is missing.",
        })
      );
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (user.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Email not found. Please register!",
          status: 400,
        })
      );
    }

    //check encrypted password
    if (typeof body.password === "string") {
      const passwordCompare: boolean = await bcrypt.compare(
        body.password,
        user[0].password
      );
      if (!passwordCompare) {
        return new NextResponse(
          JSON.stringify({ message: "Incorrect password", status: 400 })
        );
      }
      const data = {
        user: {
          id: user[0]._id,
        },
      };
      const authToken = jwt.sign(data, process.env.SECRET_KEY);
      cookies().set("authToken", authToken);
      return new NextResponse(
        JSON.stringify({
          message: "User Credential found, Allow user to access ",
        })
      );
    }
  } catch (error) {
    console.log("POST request error:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error." })
    );
  }
};
