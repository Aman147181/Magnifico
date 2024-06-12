import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { connectDB } from "@/utils/connectDB";

export const GET = async (request) => {
  try {
    await connectDB();
 // Extract the user ID from the URL
 const { searchParams } = new URL(request.url);
      const userId = searchParams.get('id');

      if (!userId) {
        const user = await User.find();

        return new NextResponse(JSON.stringify(user), { status: 200 });
      } else {
        const user = await User.findById(userId);
        return new NextResponse(JSON.stringify(user), { status: 200 });
       }
    
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
export const DELETE = async (request) => {
  try {
    await connectDB();
    const body = await request.json();

    const ids = body.ids;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid request payload" });
    }

    await User.deleteMany({ _id: { $in: ids } });
    return new NextResponse("user deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const PUT = async (request) => {
  try {
    await connectDB();
    const body = await request.json();

    const ids = body.ids;

    if (!ids) {
      return new NextResponse(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const user = await User.findById(ids[0]);

    if (!user) {
      return new NextResponse({ error: "User not found" }, { status: 404 });
    }
    const role = user.role;
    const newRole = role === "admin" ? "user" : "admin";
    user.role = newRole;
    await user.save();

    return new NextResponse(
      { message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return new NextResponse(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
