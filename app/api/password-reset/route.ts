import { sign} from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users, ForgetPwd } from "@/lib/drizzle";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { mailOptions, transporter } from "../../../lib/nodeMailer";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

export const POST = async (req: NextRequest) => {
  try {
    // Get the user's email from the request body
    if (!process.env.SECRET_KEY) {
      return;
    }
    const { email } = await req.json();
    if (!email) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Email field is empty.",
        })
      );
    }
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Email not found.",
        })
      );
    }
    const expiresTime = 60; // Token expiration time in seconds(one minute)
    const expirationTime = Math.floor(Date.now() / 1000) + expiresTime;
    const token = sign({ email, exp: expirationTime }, JWT_SECRET_KEY);
    // Hash the JWT token for storage
    const salt: string = bcrypt.genSaltSync(10);
    let hashedToken: string = await bcrypt.hash(token, salt);
    // Save the hashed token and email in  database
    const result = await db
      .insert(ForgetPwd)
      .values({
        user_email: email,
        user_token: hashedToken,
      })
      .returning();

      console.log(result);
    const clientEmail = user[0].email;
    console.log(clientEmail);
    const delimiter = "|";
    const resetLink = `${
      process.env.BASE_URL
    }/reset-pwd/${token}${delimiter}${encodeURIComponent(clientEmail)}`;
    try {
      await transporter.sendMail({
        ...mailOptions,
        to:clientEmail,
        subject: "Password Reset",
        html: `<p>Click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>`,
      });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: `Email has been send to your mail id, please follow the instructions to reset password.`,
        })
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Error sending email.",
        })
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: "Internal server error.",
      })
    );
  }
};
