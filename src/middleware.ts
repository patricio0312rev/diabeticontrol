import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function AuthMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/home")) {
    return await AuthMiddleware(request);
  }

  if (request.nextUrl.pathname === "/") {
    const authResponse = await AuthMiddleware(request);
    if (authResponse?.status === 200) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"],
};
