import { connectDB } from "@/utils/connectDB";
import Reservation from "@/models/Reservation";
// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userid = params.userid;

    if (!userid) {
      return new Response('User ID is required', { status: 400 });
    }

    const reservations = await Reservation.find({ user: userid });

    return new Response(JSON.stringify(reservations), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};