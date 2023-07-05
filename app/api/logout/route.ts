import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";


export const POST = async (req:NextRequest) => {
    try{
      const body = await req.json();
        if(body.userCookie){
        cookies().set("authToken","",{
          expires: new Date(-1), // Set the expiration date to a past date
          path: "/", // Specify the path of the cookie
        });
        console.log("cookie value "+cookies().get("authToken")?.value);
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