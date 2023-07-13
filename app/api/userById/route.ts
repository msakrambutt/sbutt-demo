import { NextResponse,NextRequest } from "next/server";
import { users, playlist,watched_time} from "@/lib/drizzle";
import { eq} from "drizzle-orm";
import { db } from "@/lib/db";
   

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (request: NextRequest, response: NextResponse) => {
       try{
        if (!process.env.SECRET_KEY) {
          return;
        }
        const urlParams = request.nextUrl;
        const userID = urlParams.searchParams.get("id") as string;        
        let records: any;
      if (userID === "" || parseInt(userID as string) === -1) {
      let error_response = {
        status: "fail",
        message: "Please Provide a User ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      records = await db
     .select({
            users: {
              id: users._id,
              name: users.name,
              email: users.email,
              created_at: users.created_at,
              role: users.role
            },
            playlist: {
              id:playlist._id,
              userId:playlist.user_id,
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
          .innerJoin(playlist, eq(playlist.user_id,users._id))
          .innerJoin(watched_time, eq(watched_time.playlist_id,playlist._id))
          .where(eq(users._id,parseInt(userID as string)));     
          if (records.length === 0) {
            records = await db.select().from(users).where(eq(users._id,parseInt(userID as string)));
          }
    }
    let json_response = {
      status: "success",
      message: "User records fetched Successfully",
      data: {
        records,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });

      }catch(error){
            console.log(" Get request by UserName error:", error);
            return NextResponse.json({ status: 500, message: "Internal Server Error." });
          }
      
    }


// export const GET = async (req:NextRequest) => {
//     try{
//       if (process.env.SECRET_KEY) {
//         const request = req.nextUrl;
//         const clientName = request.searchParams.get("name") as string;
//         if (clientName) {
//         const result = await db
//         .select({
//           users: {
//             id: users._id,
//             name: users.name,
//             email: users.email,
//             created_at: users.created_at,
//             role: users.role,
//           },
//           playlist: {
//             id:playlist._id,
//             userId:playlist.user_id,
//             orderDate:playlist.order_date,
//             courseId:playlist.course_id,
          
//           },
//           watched_time: {
//             id:watched_time._id,
//             playListID:playlist._id,
//             watchVideoNo:watched_time.watch_video_no,
//             watchVideoID:watched_time.watch_video_id,
//             completed:watched_time.completed
//           },
//         })
//         .from(users)
//         .fullJoin(playlist, eq(playlist.user_id,users._id))
//         .fullJoin(watched_time, eq(watched_time.playlist_id,playlist._id))
//         .where(eq(users.name,clientName));
        
//         if (result.length ===0) {
//         return  NextResponse.json({ message: "This UserName not found", status: 400 });
//         }
    
//       return NextResponse.json({ data: result});
//     }else{
//         return NextResponse.json({ message: "UserName is missing." });
//         }
//     }
    
//     }catch(error){
//           console.log(" Get request by UserName error:", error);
//           return NextResponse.json({ status: 500, message: "Internal Server Error." });
//         }
    
//   }


