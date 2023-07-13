import { NextRequest, NextResponse } from "next/server";
import { watched_time } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { watchedVideosCreationSchema } from "./validations";
// import { NewWatchedTime } from "@/lib/drizzle";

//Get Watch time by playlist id and user_id or just user_id
export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const requestHeaders = new Headers(request.headers);
    const user_data = requestHeaders.get("user_data");
    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    console.log("urlParams ",urlParams);

    const playlistID =
      urlParams.get("playlistID") !== null ? urlParams.get("playlistID") : -1;
      console.log("playlistID ",playlistID);


    let records: any;
    if (playlistID === "" || parseInt(playlistID as string) === -1) {
      let error_response = {
        status: "fail",
        message: "Please Provide a Playlist ID to Fetch the Records.",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      records = await db
        .select()
        .from(watched_time)
        .where(eq(watched_time.playlist_id, parseInt(playlistID as string)));
    }

    let json_response = {
      status: "success",
      message: "WatchTime records fetched Successfully",
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = {
      ...body,
    };
    console.log("body: ",body);
    const { error, value } = watchedVideosCreationSchema.validate(data);
    console.log("value: ",value);

    if (error) {
      return new NextResponse(JSON.stringify(error.details[0]), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const watchedTimeExist = await db
      .select()
      .from(watched_time)
      .where(eq(watched_time.playlist_id, value.playlist_id));

    if (watchedTimeExist.length > 0) {
      let json_response = {
        status: "failed",
        message: "WatchTime record already exist with current playlist id.",
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (value.watch_video_no > 1) {
      let json_response = {
        status: "failed",
        message: "WatchTime record should always start with video number 1.",
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 406,
        headers: { "Content-Type": "application/json" },
      });
    }

    const new_watched_time = {
      ...value,
    };

    const record = await db
      .insert(watched_time)
      .values(new_watched_time)
      .returning();

    let json_response = {
      status: "success",
      message: "Watch Time Record added Successfully",
      data: {
        record,
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