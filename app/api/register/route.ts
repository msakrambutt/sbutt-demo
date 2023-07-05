import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { db, users } from "@/lib/drizzle";
import { eq, or } from "drizzle-orm";
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

    if (!body.email || !body.name || !body.password) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Name, email or password is missing.",
        })
      );
    }
    const chkUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, body.email)));

    if (chkUser.length > 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Sorry a user with this email address already exists",
          status: 400,
        })
      );
    }

    const salt: string = bcrypt.genSaltSync(10);
    let secPass: string = await bcrypt.hash(body.password, salt);
    const query = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
        password: secPass,
        created_at: new Date(),
      })
      .returning({
        _id: users._id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    const data = {
      user: {
        id: query[0]._id,
      },
    };
    const authToken = jwt.sign(data, process.env.SECRET_KEY);
    cookies().set("authToken", authToken);
    console.log(authToken,cookies().get("authToken")?.value);
    return new NextResponse(
      JSON.stringify({ message: "New user register successfully!" })
    );
  } catch (error) {
    console.log("POST request error:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error." })
    );
  }
};
