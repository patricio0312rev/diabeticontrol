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
    console.error("Error verificando el token:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

async function ApiAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token es requerido." },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando el token:", error);
    return NextResponse.json(
      { success: false, message: "Token inválido." },
      { status: 401 }
    );
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

  // Protect API routes
  if (request.nextUrl.pathname.startsWith("/api/patients")) {
    return await ApiAuthMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/api/patients/:path*"],
};
