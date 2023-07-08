export const runtime = "experimental-edge";
import { type NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}
export const getJWTSecretKey = (): string => {
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY || SECRET_KEY.length === 0) {
    throw new Error("Secret key not found.");
  }
  return SECRET_KEY;
};

export async function verifyAuth(token: string): Promise<UserJwtPayload | undefined> {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {}
}
