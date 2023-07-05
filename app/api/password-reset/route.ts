import { sign,Jwt,verify} from 'jsonwebtoken';
import {jwtVerify} from 'jose';
import bcrypt, { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';
import { db, users,ForgetPwd } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse,NextRequest } from "next/server";
import {mailOptions, transporter} from '../../../lib/nodeMailer';


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
   
  const clientEmail=user[0].email;
  const delimiter = '|';
    const resetLink = `${process.env.BASE_URL}/reset-pwd/${token}${delimiter}${encodeURIComponent(clientEmail)}`;
  
 try{
   await transporter.sendMail({
    ...mailOptions,
    subject:'Password Reset',
    html:`<p>Click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>`,
   });
   console.log("email send:");
      return new NextResponse(
        JSON.stringify({
          status: 200,
          message: "sending email sucessfully.",
        })
      );
 }catch(error){
    console.log(error);
    return new NextResponse(
              JSON.stringify({
                status: 400,
                message: "Error sending email.",
              })
            );
 }

}catch(error) {

  console.error(error);
  return new NextResponse(
    JSON.stringify({
      status: 500,
      message: "Internal server error.",
    })
  );
}

}


