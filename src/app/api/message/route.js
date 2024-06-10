import Message from "@/models/Message";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    await connectDB();
    console.log(request);
    const body = await request.json();
    const message = new Message(body);
    await message.save();
    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
export const GET = async (request) => {
  try {
    await connectDB();

    const message = await Message.find();
    return new NextResponse(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
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

    await Message.deleteMany({ _id: { $in: ids } });
    return new NextResponse("message deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
