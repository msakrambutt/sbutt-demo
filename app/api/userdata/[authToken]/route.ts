import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/lib/db";
import { users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const GET = async (
  req: NextRequest,
  { params }: { params: { authToken: string } }
) => {
  try {
    console.log("apic", params.authToken);
    if (!params.authToken)
      return NextResponse.json({
        status: 404,
        message: "Auth token not found.",
      });
    console.log(process.env.SECRET_KEY, "env values");
    if (!process.env.SECRET_KEY)
      return NextResponse.json({
        status: 404,
        message: "Secret key not found.",
      });
    const resp = jwt.verify(params.authToken, process.env.SECRET_KEY as string);
    console.log("res",resp);
    if (typeof resp === "string") {
      return NextResponse.json({
        status: 400,
        message: "Invalid token.",
      });
    }
    const user = await db
      .select({
        _id: users._id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users._id, resp.user.id));
    console.log("🚀 ~ file: route.ts:31 ~ GET ~ user:", user);
    return NextResponse.json({ data: user[0], status: 200 });
  } catch (error: any) {
    console.log("🚀 ~ file: route.ts:38 ~ GET ~ error:", error);
    return NextResponse.json({ status: error.status, message: error.message });
  }
};

export const dynamic = "force-dynamic";
