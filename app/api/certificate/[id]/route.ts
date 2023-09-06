import { NextRequest, NextResponse } from "next/server";
import { users,playlist,watched_time,certificate } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

//Fetch data by user_id
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string} }
) => {
  try {
    const id= params.id;
    //Date format function
    function formatDate(date: string): string {
      const options: Intl.DateTimeFormatOptions = {year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Date(date).toLocaleDateString(undefined, options);

      // Custom function to format the day as "15th" instead of "15"
      const day = new Date(date).getDate();
      const dayFormatted = day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");

      return formattedDate.replace(String(day), dayFormatted);
    }

    const certificates = await db
    .select()
    .from(certificate)
    .where(eq(certificate.user_id, parseInt(id as string)));
    if(certificates.length!==0){
       const userData = await db.select().from(users)
       .where(eq(users._id,parseInt(id as string)));
         // Combine the user & certificate result
        const result = {
          username: userData[0].name,
          certificates: certificates.map((cert:any) => ({
            certificate_ID:cert._id,
            course_id: cert.course_id,
            // certificate_issue_date: cert.certificate_issued_date.toISOString().split('T')[0],
            certificate_issue_date: formatDate(cert.certificate_issued_date),
          })),
        };
      let json_response = {
      status: "success",
      message: "Certificate records fetched Successfully",
      result,
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

    // Check user is authorized or not
    const user = await db
    .select()
    .from(users)
    .where(eq(users._id,parseInt(id as string)));

  if (!user.length) {
    return new NextResponse(
      JSON.stringify({
        status: 404,
        message: "User not register.",
      })
    );
  }
  console.log("user exist or not",user);
   // Check requested user enrolled in any course & its exist in the playlist
  const playlistExists = await db.select().from(playlist)
  .where(
      eq(playlist.user_id,parseInt(id as string)));
      console.log("playlistExists exist or not ",playlistExists);

  if (playlistExists.length===0) {
  return new NextResponse(
      JSON.stringify({
      status: 404,
      message: "Request User authorized but yet not enrolled in any course.",
      })
  );
  }

  //  check course completion status in watched_time
  const completedWatchedTime = await db
  .select()
  .from(watched_time)
  .innerJoin(playlist,eq(watched_time.playlist_id,playlistExists[0]._id))
   .where(
        and(
        eq(playlist.user_id,playlistExists[0].user_id),
        eq(playlist.course_id,playlistExists[0].course_id),
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

//DELET data by user_id
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    if (!id) {
      const error_response = {
        status: "fail",
        message: "Please provide the ID.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Delete the certificate record by user_id
    const certificates=await db
      .delete(certificate)
      .where(eq(certificate.user_id, parseInt(id as string)));

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
  } catch (error: any) {
    const error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};