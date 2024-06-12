import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const POST = async (request) => {
  try {
    await connectDB();

    // Parse the request body
    const body = await request.json();
    const { email } = body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email or password" }),
        { status: 400 }
      );
    }

    // Check if the password is correct
    const isAuthenticated = await bcrypt.compare(
      body.password,
      existingUser?.password
    );

    if (!isAuthenticated) {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect email or password" }),
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the JWT token in an HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    };

    const setCookie = cookie.serialize("Authorization", token, cookieOptions);

    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": setCookie,
        },
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
