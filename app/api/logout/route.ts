import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";
import { serialize } from 'cookie';


export const GET = async (request:NextRequest) => {
    try{
      const req = request.nextUrl;
      const user_Cookie= req.searchParams.get("user_Cookie") as string;
      console.log("user_Cookie" ,user_Cookie);
      if(user_Cookie){
        cookies().set('authToken','');
        /* remove cookies from request header */

        return new NextResponse(
            JSON.stringify({
              message: "Cookie has been deleted!",
              status: 200,
            })
          );
      }else{
        return new NextResponse(
            JSON.stringify({
              message: "Method not allowed!",
              status: 405,
            })
          );
      }
      
    }catch(error){
        console.log(" Get request by UserToken  error:", error);
        return new NextResponse(
            JSON.stringify({
              message: "Internal server error!",
              status: 500,
            })
          );
    }
}