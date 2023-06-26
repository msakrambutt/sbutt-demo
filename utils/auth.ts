import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET_KEY: string | undefined = process.env.SECRET_KEY;
export interface IGetUserAuthInfoRequest extends NextRequest {
  user?: string; // or any other type
}
export interface Data extends JwtPayload {
  user: {
    id: string;
  };
}
export const authUser = (req: IGetUserAuthInfoRequest) => {
  try {
    const token = req.headers.get("token");
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Token not found" }));
    }

    let data: JwtPayload | string;
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Access Denied" }));
    } else {
      if (typeof JWT_SECRET_KEY === "string" && typeof token === "string") {
        data = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
        return (req.user = data.user.id);
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Access Denied" }));
  }
};
