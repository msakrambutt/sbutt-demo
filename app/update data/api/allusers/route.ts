import { NextResponse, NextRequest } from "next/server";
import { db, userTable, playlistTable, watchTimeTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { AES, enc } from 'crypto-js';

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const GET = async (req: NextRequest) => {
  try {
    if (process.env.SECRET_KEY) {
      const results = await db
        .select()
        .from(userTable)
        .fullJoin(playlistTable, eq(playlistTable.user_id, userTable.id))
        .fullJoin(watchTimeTable,eq(watchTimeTable.playlist_id, playlistTable.id));
       
      // Decrypt the password for each user
      results.forEach((result) => {
        if (result.users && result.users.password) {
          const decryptedBytes = AES.decrypt(result.users.password, JWT_SECRET_KEY);
          const decryptedPassword = decryptedBytes.toString(enc.Utf8);
          result.users.password = decryptedPassword;
        }
      });
      if (results.length === 0) {
        return NextResponse.json({ message: "Data not found", status: 400 });
      }
      return NextResponse.json({ data: results });
    }
  } catch (error) {
    console.log(" GET request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
