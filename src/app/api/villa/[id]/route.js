import Villa from "@/models/Villa";
import { connectDB } from "@/utils/connectDB";
export const GET = async (request, { params }) => {
    try {
      await connectDB();
  
      const villa = await Villa.findById(params.id);
      console.log(villa);
      if (!villa) return new Response("Villa Not Found", { status: 404 });
  
      return new Response(JSON.stringify(villa), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response("Something Went Wrong", { status: 500 });
    }
  };