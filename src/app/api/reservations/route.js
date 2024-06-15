import { connectDB } from "@/utils/connectDB";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";
import Villa from "@/models/Villa";
import User from "@/models/User";

export const GET = async () => {
  try {
    await connectDB();
    const reservations = await Reservation.find();
    console.log(reservations);
    return new NextResponse(JSON.stringify(reservations), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    console.log(body);

    const { user, villa, numberOfGuests, startDate, endDate } = body;

    // Fetch user details
    const reserveUser = await User.findById(user);
    if (!reserveUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }
    const username = reserveUser.name;

    // Fetch villa details
    const reservedVilla = await Villa.findById(villa);
    if (!reservedVilla) {
      return new NextResponse(
        JSON.stringify({ message: "Villa not found" }),
        { status: 404 }
      );
    }
    const villaname = reservedVilla.name;
    const costpernight = reservedVilla.pricePerNight;

    // Calculate cost
    const start = new Date(startDate.year, startDate.month - 1, startDate.day);
    const end = new Date(endDate.year, endDate.month - 1, endDate.day);
    const cost = costpernight * numberOfGuests * ((end - start) / (1000 * 60 * 60 * 24));

    const processedBody = {
      user,
      villa,
      numberOfGuests,
      start: {
        era: startDate.era,
        year: startDate.year,
        month: startDate.month,
        day: startDate.day,
      },
      end: {
        era: endDate.era,
        year: endDate.year,
        month: endDate.month,
        day: endDate.day,
      },
      cost,
      villaname,
      username
    };

    console.log(processedBody, "processedBody");

    // Check for overlapping reservations
    const overlappingReservations = await Reservation.find({
      villa: villa,
      $or: [
        {
          "start.year": { $lte: end.getFullYear() },
          "end.year": { $gte: start.getFullYear() },
          "start.month": { $lte: end.getMonth() + 1 },
          "end.month": { $gte: start.getMonth() + 1 },
          "start.day": { $lte: end.getDate() },
          "end.day": { $gte: start.getDate() },
        },
      ],
    });

    if (overlappingReservations.length > 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Reservation overlaps with existing reservation",
        }),
        { status: 400 }
      );
    }

    const reservation = await new Reservation(processedBody);
    await reservation.save();

    console.log(reservation, "reservation");
    return new NextResponse(JSON.stringify(reservation), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new NextResponse(JSON.stringify({ error: error.message }), {
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

    await Reservation.deleteMany({ _id: { $in: ids } });
    return new NextResponse("reservation deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};



export const PUT = async (request) => {
  try {
    await connectDB();

    const body = await request.json();
    

    const { ids, status } = body;
console.log(status, "status")
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid request payload" }),
        { status: 400 }
      );
    }

    const reservation = await Reservation.findById(ids[0]);

   


    reservation.status = status;
    await reservation.save();

    return new NextResponse(
      JSON.stringify({ message: "Status updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
};