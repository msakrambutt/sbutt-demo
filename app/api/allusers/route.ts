import { NextResponse,NextRequest } from "next/server";
import { db, usertable, playlistTable,watchTimeTable} from "@/lib/drizzle";
import jwt from "jsonwebtoken";
import { eq} from "drizzle-orm";
import bcrypt from "bcryptjs";

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

// Function to decrypt the password
// const decryptPassword = (hashedPassword: string): boolean => {
//   // Add your decryption logic here
//   // For example, using bcryptjs to compare the hashed password with a plain text password
//   return bcrypt.compareSync('plainTextPassword', hashedPassword);
// };


export const GET = async (req:NextRequest) => {
    
    try{
      if (process.env.SECRET_KEY) {
        const result = await db.select()
        .from(usertable)
        .fullJoin(playlistTable, eq(playlistTable.user_id,usertable.id))
        .fullJoin(watchTimeTable, eq(watchTimeTable.playlist_id,playlistTable.id));
        console.log(result);
      if (result.length ===0) {
        return new NextResponse(
          JSON.stringify({ message: "Data not found", status: 400 }));
      }
      
     // Decrypt the password for each user
    //  const modifiedResult = result.map((row) => {
    //   const user = row.users;
    //   console.log(user);
    //   if (user && user.password) {
    //   const decryptedPassword = decryptPassword(user.password);
      
    //   return {
    //     ...row,
    //     users: {
    //       ...user,
    //       password: decryptedPassword ? user.password : 'N/A', // Display 'N/A' if password decryption fails
    //     },
    //   };
    // }
    // });

  
      return new NextResponse(JSON.stringify({ data: result}));
    }
    }catch(error){
          console.log("🚀 ~ file: route.ts:16 ~ POST ~ error:", error);
        return new NextResponse(
          JSON.stringify({ status: 500, message: "Internal Server Error." }));
        }
    
  }


