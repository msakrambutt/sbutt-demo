import { NextResponse,NextRequest } from "next/server";
import { users, playlist,watched_time} from "@/lib/drizzle";
import { db } from "@/lib/db";
import { eq} from "drizzle-orm";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (request:NextRequest) => {
try{
  if (process.env.SECRET_KEY) {
  const req = request.nextUrl;
  console.log("userId "+req);
  const user_id= req.searchParams.get("userId");
  console.log("user_id" +typeof user_id);
    if (!user_id) {
        return new NextResponse(
          JSON.stringify({
            message: "User Id is missing.",
          })
        );
      }
      const userData = await db
        .select()
        .from(users)
        .where(eq(users._id, parseInt(user_id)));
      if (userData.length === 0) {
        return new NextResponse(
          JSON.stringify({
            message: "ID not found!",
            status: 400,
          })
        );
      }else{
        return new NextResponse(
            JSON.stringify({userData:userData,message: "Data fetch sucessfully!" })
          );
      }
    }     
}catch(error){
    console.log(" Get request by UserId error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
}

}