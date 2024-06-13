import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const cookie = request.cookies.get("Authorization");
    if (!cookie) {
      return new NextResponse(
        JSON.stringify({ error: "Authorization cookie missing" }),
        { status: 401 }
      );
    }
    const decoded = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const user = await User.findById(decoded.payload.userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const { username, password, phoneNumber, nationality } = body;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = await user.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.payload.userId,
      {
        name: username,
        password: hashedPassword,
        phoneNumber,
        nationality,
      },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
