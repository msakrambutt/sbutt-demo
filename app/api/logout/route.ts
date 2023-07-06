import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";


export const POST = async (req:NextRequest) => {
    try{
      const body = await req.json();
        if(body.userCookie){
          cookies().set("authToken","",{
            httpOnly:true,
          secure:process.env.NODE_ENV!=="development",
          sameSite:'strict',
          expires:new Date(0),
          path: "/",
        });
        console.log("authToken",cookies().get("authToken"));
          return new NextResponse(
          JSON.stringify({
            message: "Cookie has been deleted!",
            status: 200,
          })
        );
        }
        else{
          return new NextResponse(
            JSON.stringify({
              message: "Cookie not found!",
              status: 400,
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