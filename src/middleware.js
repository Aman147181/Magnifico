import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const cookie = request.cookies.get("Authorization");
  console.log(cookie, "cookie");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const pathname = new URL(request.url).pathname;

    // Check if the request is for the admin page and if the user is an admin
    if (pathname.startsWith("/admin") && decoded.payload.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
   
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to other pages if needed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/profile"],
};
