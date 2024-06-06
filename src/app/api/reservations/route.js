import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Reservation from "@/models/Reservation";
export const GET = async () => {
  try {
    await connectDB();
    const reservation = await Reservation.find();
    return new NextResponse(JSON.stringify(reservation), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const reservation = new Reservation(body);
    await reservation.save();

    return new NextResponse(JSON.stringify(reservation), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
