import { NextResponse,NextRequest } from "next/server";
import { db, userTable, playlistTable,watchTimeTable} from "@/lib/drizzle";
import { eq} from "drizzle-orm";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req:NextRequest) => {
    
    try{
      if (process.env.SECRET_KEY) {
        const request = req.nextUrl;
        const clientName = request.searchParams.get("name") as string;
        if (clientName) {
        const result = await db
        .select({
          users: {
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            created_at: userTable.created_at,
            role: userTable.role,
          },
          playlist: {
            id:playlistTable.id,
            userId:playlistTable.user_id,
            orderDate:playlistTable.order_date,
            courseId:playlistTable.course_id
          },
          watch_time: {
            id:watchTimeTable.id,
            playListID:watchTimeTable.playlist_id,
            watchVideoNo:watchTimeTable.watch_video_no,
            watchVideoID:watchTimeTable.watch_video_id
          },
        })
        .from(userTable)
        .fullJoin(playlistTable, eq(playlistTable.user_id,userTable.id))
        .fullJoin(watchTimeTable, eq(watchTimeTable.playlist_id,playlistTable.id))
        .where(eq(userTable.name,clientName));
        
        if (result.length ===0) {
        return  NextResponse.json({ message: "This UserName not found", status: 400 });
        }
    
      return NextResponse.json({ data: result});
    }else{
        return NextResponse.json({ message: "UserName is missing." });
        }
    }
    
    }catch(error){
          console.log(" Get request by UserName error:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error." });
        }
    
  }


