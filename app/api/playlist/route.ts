import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { db,playlist } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { playListCreationSchema } from "./validations";
import { NewPlaylist } from "@/lib/drizzle";

//Get Playlist by user_id
export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    const requestHeaders = new Headers(request.headers);
    const user_data = requestHeaders.get("user_data");
    let playlists: any;
    playlists = await db
      .select()
      .from(playlist)
      .where(eq(playlist.user_id, parseInt(user_data as string)));

    if (playlists.length === 0) {
      let error_response = {
        status: "fail",
        message: "No Playlist with the Provided User ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    let json_response = {
      status: "success",
      message: "Playlists records fetched Successfully",
      data: {
        playlists,
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
};

export async function POST(request: Request) {
  try {
    const requestHeaders = new Headers(request.headers);
    const user_data = requestHeaders.get("user_data");

    const body = await request.json();
    const data = {
      ...body,
      order_date: new Date(body.order_date),
      user_id: user_data,
    };
    const { error, value } = playListCreationSchema.validate(data);

    if (error) {
      return new NextResponse(JSON.stringify(error.details[0]), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.course_id, value.course_id),
          eq(playlist.user_id, value.user_id)
        )
      );

    if (playlistExist.length > 0) {
      let json_response = {
        status: "failed",
        message: "Playlist already exist with the current user.",
      };
      return new NextResponse(JSON.stringify(json_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newPlaylist: NewPlaylist = {
      ...value,
    };

    const record = await db.insert(playlist).values(newPlaylist).returning();

    let json_response = {
      status: "success",
      message: "Playlist Record added Successfully",
      data: {
        record,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
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