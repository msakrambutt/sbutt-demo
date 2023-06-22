import { NextRequest, NextResponse } from "next/server";
import { db, table } from "@/app/drizzle/schema";
import { v4 as uuid } from "uuid";
import { cookies } from "next/dist/client/components/headers";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const id = uuid();
  const setCookies = cookies();
  const user_id = cookies().get("user_id")?.value;
  if (!user_id) {
    setCookies.set("user_id", id);
  }
  try {
    const query = await db
      .insert(table)
      .values({
        product_id: req.product_id,
        price: req.price,
        quantity: req.quantity,
        user_id: cookies().get("user_id")?.value as string,
      })
      .returning();
      console.log("insert "+query);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(JSON.stringify(req));
}

