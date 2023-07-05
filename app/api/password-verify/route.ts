import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { db, users, ForgetPwd } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { jwtVerify } from "jose";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: NextRequest) => {
  let userEmail: string = "";
  try {
    if (!process.env.SECRET_KEY) {
      return;
    }
    const { token, clientEmail, newPassword } = await req.json();
    userEmail = clientEmail;
    //verify token
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    //get email from token
    const emailToken = verified.payload.email as string;
    const exp = verified.payload.exp;
    if (verified) {
      //get Encrypted token from db
      const resetToken = await db
        .select()
        .from(ForgetPwd)
        .where(eq(ForgetPwd.user_email, emailToken));
      if (resetToken.length === 0) {
        return NextResponse.json({
          message: "Token not found in db .",
          status: 400,
        });
      }
      //campare encrypted token store in db
      const tokenCompare: boolean = await bcrypt.compare(
        token,
        resetToken[0].user_token
      );
      if (!tokenCompare) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid Token!", status: 400 })
        );
      } else {
        // Update the user's password in users table in encrypted form
        // Hash the new password before storing it
        const salt: string = bcrypt.genSaltSync(10);
        let newPass: string = await bcrypt.hash(newPassword, salt);
        //update new password in db
        const updatePwd = await db
          .update(users)
          .set({ password: newPass })
          .where(eq(users.email, resetToken[0].user_email))
          .returning();
        if (updatePwd.length === 0) {
          return new NextResponse(
            JSON.stringify({ message: "User password not updated! " })
          );
        } else {
          //delete specific user record from db because user password is updated
          const delRecord = await db
            .delete(ForgetPwd)
            .where(eq(ForgetPwd.user_email, emailToken));
        }
        return NextResponse.json({
          status: 200,
          message: "Password update successfully.",
        });
      }
    } else {
      console.log("Token expiration time (exp) is missing");
    }
  } catch (error) {
    //when token expire control move catch block, here we check in table forgetpwd user record exist or not
    const checkToken = await db
      .select()
      .from(ForgetPwd)
      .where(eq(ForgetPwd.user_email, userEmail));
    if (checkToken.length === 0) {
      //record already deleted  from db only send response reset again due to token expire
      return NextResponse.json({
        message: "Token has expired, reset password again.",
        status: 400,
      });
    } else {
      //user record exist in forgetpwd table delete from db and also send response of reset again  due to token expire
      const delRecord = await db
        .delete(ForgetPwd)
        .where(eq(ForgetPwd.user_email, userEmail))
        .returning();
      return NextResponse.json({
        message: "Token has expired, reset password again.",
        status: 400,
      });
    }
  }
};
