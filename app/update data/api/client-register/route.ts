import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db, userTable} from "@/lib/drizzle";
import { eq, or} from "drizzle-orm";
import { AES, enc } from 'crypto-js';

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: Request) => {
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientName && body.clientPwd) {
        const user = await db
          .select()
          .from(userTable)
          .where(
            or(
              eq(userTable.name, body.clientName),
              eq(userTable.email, body.clientEmail)
            )
          );
        if (user.length>0) {
          return NextResponse.json({
              message:
                "Sorry a user with this email address or UserName already exists",
              status: 400,
            });
        }
        const plaintext = body.clientPwd;
        const secretKey =  process.env.SECRET_KEY
        const encryptedPwd = AES.encrypt(plaintext, secretKey).toString();
        const query = await db
          .insert(userTable)
          .values({
            name: body.clientName,
            email: body.clientEmail,
            password: encryptedPwd,
            created_at: new Date(),
          })
          .returning();

        const data = {
          user: {
            id: query[0].id,
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
        return new NextResponse(JSON.stringify({ message:"New user register successfully!" }));

      }else {
        return new NextResponse(
          JSON.stringify({ message: "clientName , clientEmail or password is missing." }));
      }
    }
  } catch (error) {
    console.log("POST request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
