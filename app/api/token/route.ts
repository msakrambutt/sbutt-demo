import { NextResponse, NextRequest } from "next/server";
import { db, users } from "@/lib/drizzle";
import jwt from "jsonwebtoken";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req: NextRequest) => {
  try {
    if (process.env.SECRET_KEY) {
      const user = await db.select().from(users);
      if (user.length == 0) {
        return NextResponse.json({ message: "Data not found", status: 400 });
      }
      const data = {
        user: {
          id: user[0]._id,
        },
      };
      const authToken = jwt.sign(data, process.env.SECRET_KEY);

      return NextResponse.json({ authToken: authToken });
    }
  } catch (error) {
    console.log("Get request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
