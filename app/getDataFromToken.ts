import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken=(request:NextRequest)=>{
    try {
        const token = request.cookies.get("authToken")?.value || '';
        const decodeToken:any=jwt.verify(token,process.env.SECRET_KEY!);
        console.log(decodeToken.id);
        return decodeToken.id;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
};
    
