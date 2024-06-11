import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import bcryptjs

export const POST = async (request) => {
  try {
    await connectDB();

    // Parse the request body
    const body = await request.json();

    // Check if user already exists
    const isAlreadyExists = await User.findOne({ email: body.email });
    if (isAlreadyExists) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    // Create a new user object with the hashed password
    const user = new User({
      ...body,
      password: hashedPassword,
    });
    // Save the new user
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating user" }),
      {
        status: 500,
      }
    );
  }
};
