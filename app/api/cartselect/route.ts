import { NextRequest, NextResponse } from "next/server";
import { db, table } from "@/app/drizzle/schema";
import { v4 as uuid } from "uuid";
import { cookies } from "next/dist/client/components/headers";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {

  const req = request.nextUrl;
  console.log("user_id"+req);
  const uid = req.searchParams.get("user_id") as string;
  console.log("uid" +uid);
  try {
    console
    const query = await db
      .select()
      .from(table)
      .where(eq(table.user_id,uid));
    console.log("data table"+query);
    return NextResponse.json(query);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
}
