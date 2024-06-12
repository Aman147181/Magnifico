import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { connectDB } from "@/utils/connectDB";
import cloudinary from "@/utils/config";



export const GET = async (request) => {
  try {
    await connectDB();
    const cookie = request.cookies.get("Authorization");
    const decoded = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const user = await User.findById(decoded.payload.userId).select("-password");

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
