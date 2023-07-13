import { NextResponse, NextRequest } from "next/server";
import {users, playlist, watched_time} from "@/lib/drizzle";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req: NextRequest) => {
  try {
    if (process.env.SECRET_KEY) {
      const results = await db
      .select({
        users: {
          id: users._id,
          name: users.name,
          email: users.email,
          created_at: users.created_at,
          role: users.role,
        },
        playlist: {
          id:playlist._id,
          userId:users._id,
          orderDate:playlist.order_date,
          courseId:playlist.course_id
        },
        watched_time: {
          id:watched_time._id,
          playListID:playlist._id,
          watchVideoNo:watched_time.watch_video_no,
          watchVideoID:watched_time.watch_video_id,
          completed:watched_time.completed
        },
      })
        .from(users)
        .fullJoin(playlist, eq(playlist.user_id, users._id))
        .fullJoin(watched_time,eq(watched_time.playlist_id, playlist._id));
       
      if (results.length === 0) {
        return NextResponse.json({ message: "UserData not found", status: 400 });
      }
      return NextResponse.json({ data: results });
    }
  } catch (error) {
    console.log(" GET request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
