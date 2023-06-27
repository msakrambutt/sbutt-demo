import jwt from "jsonwebtoken";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { db, usertable} from "@/lib/drizzle";
import { eq} from "drizzle-orm";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST= async (req: Request) => {
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientPwd) {
        const user = await db.select().from(usertable)
        .where(eq(usertable.email,body.clientEmail));
        console.log(user);
        if (user.length ==0) {
          return new NextResponse(
            JSON.stringify({ message: "Email not found. Please register!", status: 400 }));
        }

        //check password throught encryption
        if (typeof body.clientPwd === "string") {
          const passwordCompare: boolean = await bcrypt.compare(
            body.clientPwd,
            user[0].password
          );

          if (!passwordCompare) {
            return new NextResponse(
              JSON.stringify({ message: "Incorrect password", status: 400 })
            );
          }
        const data = {
          user: {
            id:user[0].id,
          },
        };
        const authToken = jwt.sign(data, process.env.SECRET_KEY);//sign digital signature on token
        //serialized token and store as a cookie value
        const serialized: string | undefined = serialize("authToken", authToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
        });
       
        const response = new NextResponse(null, {
          headers: {
            'Set-Cookie': serialized,
          },
        });

        return new NextResponse(JSON.stringify({ authToken: authToken}));
      }

    } else {
      return new NextResponse(
        JSON.stringify({ message: "clientName or clientEmail is missing." }));
    }
  }
  }catch (error) {
    console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error." }));
  }
};


 