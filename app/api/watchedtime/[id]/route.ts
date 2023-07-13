import { NextRequest, NextResponse } from "next/server";
import { watched_time } from "@/lib/drizzle";
import { db } from "@/lib/db";import { and, eq } from "drizzle-orm";
import { watchedVideosUpdateSchema } from "../validations";
// import { NewWatchedTime } from "@/lib/drizzle";
// import { F } from "drizzle-orm/db.d-cf0abe10";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    console.log("id: ",id);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const id = params.id;
    const { error, value } = watchedVideosUpdateSchema.validate(body);
    if (error) {
      return new NextResponse(JSON.stringify(error.details[0]), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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

    if (records[0].watch_video_no >= value.watch_video_no) {
      let error_response = {
        status: "success",
        message: "No Need to update the WatchTime Record.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    //Prevent user to update watch_time video data directly video number 1 to 3 or 5 or son on.
    if (records[0].watch_video_no + 1 !== value.watch_video_no) {
      let error_response = {
        status: "success",
        message: "Input Data not acceptable.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 406,
        headers: { "Content-Type": "application/json" },
      });
    }
    const updated_watchTime = await db
      .update(watched_time)
      .set({
        watch_video_no: value.watch_video_no,
        watch_video_id: value.watch_video_id,
      })
      .where(eq(watched_time._id, parseInt(id as string)))
      .returning();
    let json_response = {
      status: "success",
      message: "WatchTime Updated Successfully",
      data: {
        updated_watchTime,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
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
}