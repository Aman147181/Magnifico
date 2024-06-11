import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
export async function middleware(request) {
  const cookie = request.cookies.get("Authorization");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (decoded.payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
