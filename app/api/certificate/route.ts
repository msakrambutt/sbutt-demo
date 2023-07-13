import { NextRequest, NextResponse } from "next/server";
import { users,playlist,watched_time,certificate } from "@/lib/drizzle";
import { db} from "@/lib/db";
import { eq,and } from "drizzle-orm";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

//Fetch data on through user_id
export const GET = async (request: NextRequest, response: NextResponse) => {

  try {
    if (!process.env.SECRET_KEY) {
      return;
    }
    const Params = request.nextUrl;
    const urlParams = Params.searchParams.get("id") as string;  
    const UserID =
    urlParams !== null ? urlParams : -1;

    let certificates: any;
    if (UserID === "" || parseInt(UserID as string) === -1) {
      let error_response = {
        status: "fail",
        message: "Please Provide a User ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } 
/////////////////////
    // Check user is authorized or not
    const user = await db
    .select()
    .from(users)
    .where(eq(users._id,parseInt(UserID as string)));

  if (!user.length) {
    return new NextResponse(
      JSON.stringify({
        status: 404,
        message: "User not register.",
      })
    );
  }

  // // Check requested user enrolled in any course & its exist in the playlist
  const playlistExists = await db.select().from(playlist)
  .where(
      eq(playlist.user_id,parseInt(UserID as string)));
  if (playlistExists.length===0) {
  return new NextResponse(
      JSON.stringify({
      status: 404,
      message: "Request User not enrolled in any course.",
      })
  );
  }

  // // If  user enrolled in any course check it completion status in watched_time
  // const completedWatchedTime = await db
  // .select()
  // .from(watched_time)
  // .innerJoin(playlist,eq(watched_time.playlist_id,playlistExists[0]._id))
  //  .where(
  //       and(
  //       eq(playlist.user_id,playlistExists[0].user_id),
  //       eq(playlist.course_id,playlistExists[0].course_id),
  //       eq(watched_time.completed,true)
  //       ));

  //       if (completedWatchedTime.length === 0) {
  //         return new NextResponse(
  //           JSON.stringify({
  //             status: 200,
  //             message: "Course completion is required to issue a certificate.",
  //           })
  //         );
  //       }



//////////////////////




    //fecth data by user id
      certificates = await db
        .select()
        .from(certificate)
        .where(eq(certificate.user_id, parseInt(UserID as string)));
    
    if (certificates.length === 0) {
      let error_response = {
        status: "fail",
        message: "Requested User ID  not Found!",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    

    let json_response = {
      status: "success",
      message: "Certificate records fetched Successfully",
      data: {
        certificates,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

//Check in DELETE crud user enter blank value
export const DELETE= async (request: NextRequest)=>{
  try {
    const Params = request.nextUrl;
    const urlParams = Params.searchParams.get("id") as string;  
    const userID =
    urlParams !== null ? urlParams : -1;
    if (userID === "" || parseInt(userID as string) === -1) {
      let error_response = {
        status: "fail",
        message: "Please Provide a User ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
  } catch (error:any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
    
  }
}

//Add new certificate
export const POST = async (
  request: NextRequest) => {
  try {
    if (!process.env.SECRET_KEY) {
        return;
      }

    const body = await  request.json();
    if (!body.user_id || !body.course_id) {
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: "userId or courseId is missing.",
          })
        );
      }
    const { user_id, course_id } = body;
    // Check user is authorized
      const user = await db
      .select()
      .from(users)
      .where(eq(users._id,user_id));

    if (!user.length) {
      return new NextResponse(
        JSON.stringify({
          status: 404,
          message: "User not register.",
        })
      );
    }

        // Check requested user enrolled the course & its exist in the playlist
        const playlistExists = await db.select().from(playlist)
        .where(
            and(
            eq(playlist.user_id,user_id),
            eq(playlist.course_id,course_id)
            ));
        if (playlistExists.length===0) {
        return new NextResponse(
            JSON.stringify({
            status: 404,
            message: "Request User not enrolled in this course.",
            })
        );
        }
    // Check user  completed for the  requested course in watched_time
    const completedWatchedTime = await db
    .select()
    .from(watched_time)
    .innerJoin(playlist,eq(watched_time.playlist_id,playlist._id))
     .where(
          and(
          eq(playlist.user_id,user_id),
          eq(playlist.course_id,course_id),
          eq(watched_time.completed,true)
          ));

          if (completedWatchedTime.length === 0) {
            return new NextResponse(
              JSON.stringify({
                status: 200,
                message: "Course completion is required to issue a certificate.",
              })
            );
          }

    // Insert user completion details into the certificate_issue table
    const newCertificate = await db.insert(certificate)
    .values({
      user_id: user_id,
      course_id: course_id,
      completion_date: new Date(),
      certificate_issued_date: new Date()
    });
      
    const jsonResponse = {
      status: "success",
      message: "New Certificate record inserted successfully",
      data: {
        certificate: newCertificate,
      },
    };

    return new NextResponse(JSON.stringify(jsonResponse), {
      status: 201, // Use 201 Created status code for successful resource creation
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorResponse = {
      status: "error",
      message: error.message,
    };

    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
