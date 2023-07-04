import { NextResponse,NextRequest } from "next/server";
import { db, users, playlist,watchVideo} from "@/lib/drizzle";
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
            _id: users._id,
            name: users.name,
            email: users.email,
            created_at: users.created_at,
            role: users.role,
          },
          playlist: {
            _id:playlist._id,
            userId:playlist.user_id,
            orderDate:playlist.order_date,
            courseId:playlist.course_id,
          
          },
          watched_video: {
            _id:watchVideo._id,
            playListID:playlist._id,
            watchVideoNo:watchVideo.watch_video_no,
            watchVideoID:watchVideo.watch_video_id
          },
        })
        .from(users)
        .fullJoin(playlist, eq(playlist.user_id,users._id))
        .fullJoin(watchVideo, eq(watchVideo.playlist_id,playlist._id))
        .where(eq(users.name,clientName));
        
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


