import { NextRequest, NextResponse } from "next/server";
import { db,watched_time } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { watchedVideosCreationSchema } from "../validations";
// import { NewWatchedTime } from "@/lib/drizzle";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const records = await db
      .select()
      .from(watched_time)
      .where(eq(watched_time._id, parseInt(id as string)));

    if (records.length === 0) {
      let error_response = {
        status: "fail",
        message: "No WatchTime Record with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let json_response = {
      status: "success",
      message: "WatchTime Record fetched Successfully",
      data: {
        records,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 409,
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
  //   return NextResponse.json(
  //     {
  //       message: "User is authenticated and allowed to access the resource",
  //     },
  //     { status: 200 }
  //   );
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const deletedRecords = await db
      .delete(watched_time)
      .where(eq(watched_time._id, parseInt(id)));

    if (deletedRecords.rowCount === 0) {
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "WatchTime Record with Provided ID does not Exist.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          status: "success",
          message: "Successfully deleted WatchTime.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
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