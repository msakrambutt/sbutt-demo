import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { db, userTable} from "@/lib/drizzle";
import { eq, or} from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: Request) => {
  try {
    const setCookies=cookies();
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
        const salt: string = await bcrypt.genSaltSync(10);
        let encryptPwd: string = await bcrypt.hash(body.clientPwd, salt);


        const query = await db
          .insert(userTable)
          .values({
            name: body.clientName,
            email: body.clientEmail,
            password: encryptPwd,
            created_at: new Date(),
          })
          .returning();

        const data = {
          user: {
            id: query[0].id,
          },
        };
        const authToken = jwt.sign(data, process.env.SECRET_KEY); 
        const auth_token = cookies().get("authToken")?.value;
        if (!auth_token) {
          setCookies.set("authToken", authToken);
        }else{
          console.log("cookie already created of this name");
        }
        return new NextResponse(JSON.stringify({ message:"New user register successfully!" ,authToken:authToken}));

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
