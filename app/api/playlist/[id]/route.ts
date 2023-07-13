import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { playlist, watched_time } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { playListCreationSchema } from "../validations";
import { NewPlaylist } from "@/lib/drizzle";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    console.log("playlist id: ",id);
    let playlists: any;

    playlists = await db
      .select()
      .from(playlist)
      .where(eq(playlist._id, parseInt(id as string)));

    if (playlists.length === 0) {
      let error_response = {
        status: "fail",
        message: "No Playlist with the Provided ID Found",
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

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const deletedRecordsFromWatchtime = await db
      .delete(watched_time)
      .where(eq(watched_time.playlist_id, parseInt(id)));

    const deletedRecords = await db
      .delete(playlist)
      .where(eq(playlist._id, parseInt(id)));

    if (deletedRecords.rowCount === 0) {
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "Playlist Record with Provided ID does not Exist.",
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
          message: "Successfully deleted Playlist.",
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