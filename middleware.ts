import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("authToken")?.value;
  // console.log("middleware token get from cookies ",token);
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));
  // console.log("verifiedToken send token to auth.ts file for verification  ",verifiedToken);

  if (req.nextUrl.pathname.startsWith("/auth/signin") && !verifiedToken) {
    // console.log("start path with /auth/signin & token not verified");
    return NextResponse.next();
  }
  if (
    req.url.includes("/auth/signin") ||
    (req.url.includes("/auth/signin") && verifiedToken)
  ) {
    // console.log("include path /auth/signin & verifiedToken",verifiedToken);
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith("/api")) {
        // console.log("token not verfied path start with api");
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    // console.log("path not start with api");
    // console.log("token not verfied redirect to auth/signin",req.url);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
};
export default middleware;
export const config = {
  matcher: ["/", "/auth/signin"],
};

