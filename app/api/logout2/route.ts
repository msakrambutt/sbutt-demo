import { NextResponse,NextRequest } from "next/server";

export const GET = async (req:NextRequest,response:NextResponse)=>{
    try{
      const response=NextResponse.json({
        message:"Logout Sucessfully",
        success:true,
      });
      const cookieHeader = req.headers.get("Cookie");
      console.log("cookieHeader  ",cookieHeader);
      if (cookieHeader) {
      const cookies = cookieHeader?.split("; ");
      const updatedCookies = cookies?.filter(cookie => {
        const [name, value] = cookie.split("="); // Split the cookie into name and value
        if (name === "authToken") {
          response.headers.set("Set-Cookie", `${name}=; Max-Age=0; Path=/`); // Set the cookie with a Max-Age of 0 to delete it          
          return false; // Exclude this cookie from the updated cookies array
        }
        return true; // Keep other cookies in the updated cookies array
      })
      req.headers.set("Cookie", updatedCookies.join("; ")); 
     }
     return response;
        // response.cookies.set("authToken","",{
        //   httpOnly:true,
        //   expires:new Date(0),
        //  });
    }catch(error:any){
      return new NextResponse(
        JSON.stringify(
          {status:500,message:error.message}
        ));
    }
}
