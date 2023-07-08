import { NextResponse,NextRequest } from "next/server";

export const GET = async ()=>{
    try{
      const response=NextResponse.json({
        message:"Logout Sucessfully",
        success:true,
      });
        response.cookies.set("authToken","",{
          httpOnly:true,
          expires:new Date(0),
         });
         return response;
    }catch(error:any){
      return new NextResponse(
        JSON.stringify(
          {status:500,message:error.message}
        ));
    }
}
