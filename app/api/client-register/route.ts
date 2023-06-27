import jwt from "jsonwebtoken";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { db, usertable} from "@/lib/drizzle";
import { eq ,or} from "drizzle-orm";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: Request) => {
    console.log("Register user");
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientName) {
        const user = await db.select().from(usertable)
        .where(
        or(
        eq(usertable.email,body.clientEmail),
        eq(usertable.name,body.clientName)));

        if (!user) {
          return new NextResponse(
            JSON.stringify({ message: "Sorry a user with this email address or Name already exists", status: 400 }));
        }
        
        const salt: string = bcrypt.genSaltSync(10);
        let secPass: string = await bcrypt.hash(body.clientPwd, salt);
        console.log(secPass);
        const query = await db
        .insert(usertable)
        .values({
          name: body.clientName,
          email:body.clientEmail,
          password: secPass,
          created_at:new Date(),
          })
        .returning(); 
        
        console.log("insert data "+query);
        const data = {
          user: {
            id:query[0].id,
          },
        };
        const authToken = jwt.sign(data, process.env.SECRET_KEY);//sign digital signature on token
        console.log(data);

         // Setting the cookies for the user of "authToken"
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
        console.log(response);
        return new NextResponse(JSON.stringify({ authToken: authToken}));
      }

    } else {
      return new NextResponse(
        JSON.stringify({ message: "clientName or clientEmail is missing." }));
    }
  
  }catch (error) {
    console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
    return new NextResponse(
      JSON.stringify({ status: 500, message: "Internal Server Error." }));
  }
};


 