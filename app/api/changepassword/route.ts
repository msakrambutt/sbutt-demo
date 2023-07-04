import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}


export const PUT = async (req: Request) => {
  try {
    if (!process.env.SECRET_KEY) return;
    const body = await req.json();
    if (!body.email || !body.oldPassword || !body.newPassword) {
      return new NextResponse(
        JSON.stringify({
          message: "Email,old password or new password is missing.",
        })
      );
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (user.length === 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Email not found. Please register!",
          status: 400,
        })
      );
    }
    //check encrypted password
    if (typeof body.oldPassword === "string") {
      const passwordCompare: boolean = await bcrypt.compare(
        body.oldPassword,
        user[0].password
      );
      if (!passwordCompare) {
        return new NextResponse(
          JSON.stringify({
            message: "Your old password is Incorrect!",
            status: 400,
          })
        );
      }
      const salt: string = bcrypt.genSaltSync(10);
      let newPass: string = await bcrypt.hash(body.newPassword, salt);
      const updatePwd = await db
        .update(users)
        .set({ password: newPass })
        .where(eq(users._id, user[0]._id))
        .returning();
      if (updatePwd.length == 0) {
        return new NextResponse(
          JSON.stringify({ message: "User password not updated! " })
        );
      }
      return new NextResponse(
        JSON.stringify({
          message: "User password has been changed successfully! ",
        })
      );
    }
  } catch (error) {
    console.log("POST request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
