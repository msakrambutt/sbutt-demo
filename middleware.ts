import jwt from "jsonwebtoken";
import { jwtVerify, type JWTPayload } from "jose";
import { NextResponse, NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

export async function middleware(req: NextRequest) {
  // for public routes, we don't need to check for a token
  const pathname = req.nextUrl.pathname;
  if (
    !pathname.startsWith("/api") || // exclude all other than api route
    pathname.startsWith("/api/login") || // exclude /api/login route
    pathname.startsWith("/api/register") // exclude /api/register route
  ) {
    return NextResponse.next();
  }
  
  // check if cookie is present
  const cookieHeader = req.headers.get("Cookie");

  if (!cookieHeader) {
    //user not authenticated
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  const cookiesArray = cookieHeader.split("; ");

  const cookiesObject = cookiesArray.reduce((cookies: any, cookie) => {
    const [name, value] = cookie.split("=");
    cookies[name] = value;
    return cookies;
  }, {});

  // get token from cookie
  const token = cookiesObject.authToken;

  // if no token found, redirect to login page
  if (!token || token === "") {
    //user not authenticated
    return NextResponse.json(
      { message: "Authication failed" },
      { status: 401 }
    );
  }

  // verify token
  let decodedToken: any;
  const requestHeaders = new Headers(req.headers)
  try {
    decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(`${process.env.SECRET_KEY}`)
    );

    requestHeaders.set('user_data', decodedToken?.payload?.user.id)
  } catch (err) {
    return NextResponse.json(
      { message: "Authication failed" },
      { status: 401 }
    );
  }

  // if token is not valid, redirect to login page
  if (!decodedToken) {
    return NextResponse.json(
      { message: "Authication failed" },
      { status: 401 }
    );
  }

  return NextResponse.next({headers: requestHeaders});
}
