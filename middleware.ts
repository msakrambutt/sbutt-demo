import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("authToken")?.value;

  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.log(err)));

  if (req.nextUrl.pathname.startsWith("/auth/signin") && !verifiedToken) {
    return NextResponse.next();
  }
  if (
    req.url.includes("/auth/signin") ||
    (req.url.includes("/auth/signin") && verifiedToken)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
};
export default middleware;
export const config = {
  matcher: ["/", "/auth/signin"],
};