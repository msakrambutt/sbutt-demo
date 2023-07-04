import { TokenExpiredError } from "jsonwebtoken";
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
  let userEmail:string="";
  try {
    if (!process.env.SECRET_KEY) {
      return;
    }
    const { token, clientEmail, newPassword } = await req.json();
    console.log(token+" email"+clientEmail+" newpassword"+newPassword);
    userEmail=clientEmail;
    console.log("userEmail",userEmail);
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    const emailToken = verified.payload.email as string;
    console.log("verified email token",emailToken);
    const exp = verified.payload.exp;
        if(verified){
        //get Encrypted token from db
        const resetToken = await db
          .select()
          .from(ForgetPwd)
          .where(eq(ForgetPwd.user_email, emailToken));
        if (resetToken.length === 0) {
          console.log("token not found in db");
          return NextResponse.json({
            message: "Token not found in db .",
            status: 400,
          });
        } else {
          console.log("token found", resetToken);
        }
        //campare encrypted token store in db
        const tokenCompare: boolean = await bcrypt.compare(
          token,
          resetToken[0].user_token
        );
        console.log("tokencompare " + tokenCompare);
        if (!tokenCompare) {
          return new NextResponse(
            JSON.stringify({ message: "Invalid Token!", status: 400 })
          );
        } else {
          // Update the user's password in users table in encrypted form
          // Hash the new password before storing it
          console.log("update");
          const salt: string = bcrypt.genSaltSync(10);
          let newPass: string = await bcrypt.hash(newPassword, salt);
          const updatePwd = await db
            .update(users)
            .set({ password: newPass })
            .where(eq(users.email, resetToken[0].user_email))
            .returning();
          console.log(updatePwd);
          if (updatePwd.length === 0) {
            return new NextResponse(
              JSON.stringify({ message: "User password not updated! " })
            );
          } else {
            //delete specific user record from db
            const delRecord = await db
              .delete(ForgetPwd)
              .where(eq(ForgetPwd.user_email, emailToken));
          }
          // Update the user's password in your database using the email from the decoded JWT payload

          return NextResponse.json({
            status: 200,
            message: "Password update successfully.",
          });
        }
      
    } else {
      console.log("Token expiration time (exp) is missing");
    }
  } catch (error) {
    console.log("catch block",userEmail);
    const checkToken = await db
          .select()
          .from(ForgetPwd)
          .where(eq(ForgetPwd.user_email, userEmail));
          console.log("table field"+checkToken[0].user_email)
          if(checkToken.length===0){
            console.log("record deleted token already expire");
            //record deleted on send response reset again due to token expire
            return NextResponse.json({
                    message: "Token has expired, reset password again.",
                    status: 400,
                  });
          }else{
            //record exist delete from db and also send response of reset again  due to token expire
            console.log("record not deleted token  expire");
            const delRecord = await db
            .delete(ForgetPwd)
            .where(eq(ForgetPwd.user_email, userEmail)).returning();
            console.log(delRecord);
            return NextResponse.json({
              message: "Token has expired, reset password again.",
              status: 400,
            });
          }

   
  }
};
