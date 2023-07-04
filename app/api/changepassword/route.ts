import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, userTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}


export const PUT = async (req: Request) => {
  try {
    if (process.env.SECRET_KEY) {
      const body = await req.json();
      if (body.clientEmail && body.clientOldPwd && body.clientNewPwd) {
        const user = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, body.clientEmail));
        if (user.length === 0) {
          return NextResponse.json({
              message: "Email not found. Please register!",
              status: 400,
            });
        }        
        //compare encrypted old password
        if (typeof body.clientOldPwd === "string") {
          const passwordCompare: boolean = await bcrypt.compare(
            body.clientOldPwd,
            user[0].password
          );
          if (!passwordCompare) {
            return new NextResponse(
              JSON.stringify({ message: "Old password is Incorrect!", status: 400 })
            );
          }

          const salt: string = bcrypt.genSaltSync(10);
          let newPass: string = await bcrypt.hash(body.clientNewPwd, salt);
          const updatePwd=await db.update(userTable).set({password:newPass})
          .where(eq(userTable.id,user[0].id)).returning();
          if( updatePwd.length===0){
            return new NextResponse(JSON.stringify({ message:"User password not updated! "}));
          }
          return new NextResponse(JSON.stringify({ message:"User password has been update sucessfully! "}));
          
        }
      } else {
        return new NextResponse(
          JSON.stringify({ message: "clientEmail or clientPassword is missing." })
        );
      }
    }
  
  } catch (error) {
    console.log("POST request error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error." });
  }
};
