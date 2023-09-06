import { NextRequest, NextResponse } from "next/server";
import { users,playlist,watched_time,certificate } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { eq,and, sql } from "drizzle-orm";

// //Fetch data by certificate_id
export const GET = async (request: NextRequest, response: NextResponse) => {

  try {
    const Params = request.nextUrl;
    const urlParams = Params.searchParams.get("certificate_id") as string;  
    const UserID = urlParams !== null ? urlParams : -1;

    let certificates: any;
    if (UserID === "" || parseInt(UserID as string) === -1) {
      let error_response = {
        status: 400,
        message: "Please Provide a Certificate ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } 

    //fecth data by certificate id from certificate_issue table
    certificates = await db
    .select()
    .from(certificate)
    .where(eq(certificate._id, parseInt(UserID as string)));
    if (certificates.length === 0) {
      let error_response = {
        status: "fail",
        message: "Requested Certificate ID  not exist, please provide correct  Id!",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
      let json_response = {
      status: "success",
      message: "Requested certificates records fetched Successfully",
      certificates,
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

//DELETE user by user ID
export const DELETE= async (request: NextRequest)=>{
  try {
    const Params = request.nextUrl;
    const urlParams = Params.searchParams.get("certificate_id") as string;  
    const certificateID =
    urlParams !== null ? urlParams : -1;
    if (certificateID === "" || parseInt(certificateID as string) === -1) {
      let error_response = {
        status: "fail",
        message: "Please Provide a User ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Delete the certificate record by user_id
    const certificates=await db
      .delete(certificate)
      .where(eq(certificate._id, parseInt(certificateID as string)));

      if (certificates.rowCount === 0) {
        const error_response = {
          status: "failed",
          message: "Certificate Record with Provided ID does not Exist!",
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    const json_response = {
      status: "success",
      message: "Requested Certificate record deleted successfully",
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
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
    if (!body.course_id) {
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: "courseId is missing.",
          })
        );
      }

      //Get userId from request header
    const requestHeaders = new Headers(request.headers);
    console.log("requestHeaders: ",requestHeaders);
    const user_data = requestHeaders.get("user_data");
    console.log("user_data: ",user_data);
    const newBody = {
      user_id: parseInt(user_data as string),
      course_id: body.course_id
    };

    const { user_id, course_id } =newBody;
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

        //check certificate already added or issue
      const certificateExist = await db
      .select()
      .from(certificate)
      .where(
        and(
        eq(certificate.user_id,user_id),
        eq(certificate.course_id,course_id)
        ));
      console.log("certificateExist ",certificateExist);
    if (certificateExist.length>0) {
      return new NextResponse(
        JSON.stringify({
          status: 404,
          message: "Certificate Already issue to this User or certificate already found.",
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
    }).returning();
      
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
