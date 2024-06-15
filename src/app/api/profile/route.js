import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { connectDB } from "@/utils/connectDB";
import cloudinary from "@/utils/config";

export const GET = async (request) => {
  try {
    await connectDB();
    const cookie = await request.cookies.get("Authorization");
    const decoded = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const user = await User.findById(decoded.payload.userId).select(
      "-password"
    );

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

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const cookie = await request.cookies.get('Authorization');
    if (!cookie) {
      return new NextResponse(JSON.stringify({ error: 'Authorization cookie missing' }), { status: 401 });
    }

    const decoded = await jwtVerify(cookie.value, new TextEncoder().encode(process.env.JWT_SECRET));
    const user = await User.findById(decoded.payload.userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const { username, password, phoneNumber, nationality, image } = body;
    console.log(image);

    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let imageUrl = user.image;
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'Magnifiqo',
      });
      imageUrl = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.payload.userId,
      {
        username,
        password: hashedPassword,
        phoneNumber,
        nationality,
        image: imageUrl,
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
