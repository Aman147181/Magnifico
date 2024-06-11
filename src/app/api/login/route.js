import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    console.log(token);
    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
