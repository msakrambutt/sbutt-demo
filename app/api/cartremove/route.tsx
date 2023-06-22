import { NextRequest, NextResponse } from "next/server";
import { db, table } from "@/app/drizzle/schema";
import { cookies } from "next/dist/client/components/headers";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    const query = await db
      .delete(table)
      .where(eq(table.user_id, req.user_id))
      .returning();
    return NextResponse.json("Data Deleted");
  } catch (error) {
    console.log(error);
  }
}
