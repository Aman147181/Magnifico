import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Set the `Authorization` cookie to expire immediately
  response.cookies.set("Authorization", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0), // Set the cookie to expire immediately
  });

  return response;
}
