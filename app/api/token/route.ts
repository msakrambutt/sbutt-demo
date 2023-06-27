import { serialize } from "cookie";
import { NextResponse,NextRequest } from "next/server";
import { db, usertable} from "@/lib/drizzle";
import jwt from "jsonwebtoken";
    // const authToken1 = req.cookies.get('Set-Cookie')?.value ; // Assuming the cookie name is "authToken"


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req:NextRequest) => {
    try{
      if (process.env.SECRET_KEY) {
        const user = await db.select().from(usertable);
      if (user.length ==0) {
        return new NextResponse(
          JSON.stringify({ message: "Data not found", status: 400 }));
      }
      const data = {
        user: {
          id:user[0].id,
        },
      };
      const authToken = jwt.sign(data, process.env.SECRET_KEY);
  
      return new NextResponse(JSON.stringify({ authToken: authToken}));
    }
    }catch(error){
          console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
        return new NextResponse(
          JSON.stringify({ status: 500, message: "Internal Server Error." }));
        }
    
  }
