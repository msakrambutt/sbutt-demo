import { sign,Jwt,verify} from 'jsonwebtoken';
import {jwtVerify} from 'jose';
import bcrypt, { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';
import { db, users,ForgetPwd } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse,NextRequest } from "next/server";


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
  const {email}= await req.json();
  console.log(email);
  if (!email) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: 'Email field is empty.',
      }),
    );
  }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email,email));
      console.log(user);
  
      if (user.length === 0) {
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: 'Email not found.',
          }),
        );
      }   
      const expiresTime = 60; // Token expiration time in seconds
      const expirationTime = Math.floor(Date.now() / 1000) + expiresTime;
      console.log("pwd-reset",expirationTime)
      const token =sign({email, exp:expirationTime},JWT_SECRET_KEY);

  // Hash the JWT token for storage
  const salt: string = bcrypt.genSaltSync(10);
  let hashedToken: string = await bcrypt.hash(token, salt);
   // Save the hashed token and email in  database 
  const result=await db
  .insert(ForgetPwd)
          .values({
            user_email:email,
            user_token: hashedToken,
          })
          .returning();   
        console.log("forgetpwd insert ",result);      
   // Send the password reset email
  const transporter = nodemailer.createTransport({
    // Configure your email service
    service: 'gmail',
    host:'smtp.gmail.com',
    auth: {
      user: 'msakrambutt@gmail.com',
      pass: process.env.GMAIL_PWD,
    }
  });
  const clientEmail=user[0].email;
  const delimiter = '|';
    const resetLink = `${process.env.BASE_URL}/reset-pwd/${token}${delimiter}${encodeURIComponent(clientEmail)}`;
    const mailOptions = {
      from: 'msakrambutt@gmail.com',
      to: 'msakrambutt@gmail.com',
      subject: 'Password Reset',
      html:`<p>Click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>`,
  }

   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: "Error sending email.",
          })
        );
    } else {
        console.log('Email sent: ' + info.response);
        return new NextResponse(
          JSON.stringify({
            status: 200,
            message: "email send sucessfully.",
          })
        );
    }
  })
}catch(error) {

  console.log("POST request password-reset api error:", error);
  return NextResponse.json({ status: 500, message: "Internal Server Error." });
}

}


