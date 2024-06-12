import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { jwtVerify } from "jose";
import { connectDB } from "@/utils/connectDB";
import cloudinary from "@/utils/config";


export const PUT = async (request) => {
    try {
      await connectDB();
      const cookie = request.cookies.get("Authorization");
  
      if (!cookie) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
  
      const decoded = await jwtVerify(
        cookie.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const userId = decoded.payload.userId;
      const formData = await request.formData();
      const name = formData.get("username");
      const password = formData.get("password");
      const phoneNumber = formData.get("phoneNumber");
     
      const images = formData.getAll("image").filter((image) => image.name !== "");
      const updateData = {
        name: name,
        phoneNumber: phoneNumber,
      };
  
      if (password) {
        updateData.password = await bcrypt.hash(password, 10); 
      }
  
      const imageUploadPromises = images.map(async (image) => {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
  
        // Convert the image data to base64
        const imageBase64 = imageData.toString("base64");
  
        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          {
            folder: "Magnifiqo",
          }
        );
  
        return result.secure_url;
      });
  
      const uploadedImages = await Promise.all(imageUploadPromises);
      if (uploadedImages.length > 0) {
        updateData.image = uploadedImages[0];
      }
  
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
  
      if (!user) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), {
          status: 404,
        });
      }
  
      return new NextResponse(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  };
  