import { NextResponse,NextRequest } from "next/server";
import { db, usertable, playlistTable,watchTimeTable} from "@/lib/drizzle";
import { eq} from "drizzle-orm";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req:NextRequest) => {
    
    try{
      if (process.env.SECRET_KEY) {
        // const body = await req.json();
        const request = req.nextUrl;
        console.log("user name ",request);
        const clientName = request.searchParams.get("name") as string;
        console.log("clientname " +clientName);
        if (clientName) {
        const result = await db.select()
        .from(usertable)
        .fullJoin(playlistTable, eq(playlistTable.user_id,usertable.id))
        .fullJoin(watchTimeTable, eq(watchTimeTable.playlist_id,playlistTable.id))
        .where(eq(usertable.name,clientName));
        console.log(result);
        if (result.length ===0) {
        return new NextResponse(
          JSON.stringify({ message: "Data not found", status: 400 }));
        }
    
      return new NextResponse(JSON.stringify({ data: result}));
    }else{
        return new NextResponse(
            JSON.stringify({ message: "clientName is missing." }));
        }
    }
    
    }catch(error){
          console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
        return new NextResponse(
          JSON.stringify({ status: 500, message: "Internal Server Error." }));
        }
    
  }


