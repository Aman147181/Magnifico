import { NextResponse } from "next/server";
import Villa from "@/models/Villa";
import { connectDB } from "@/utils/connectDB";
import cloudinary from "@/utils/config";

export const POST = async (request) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    // Extract highlights
    const numHighlights = parseInt(formData.get("numHighlights"), 10);
    const highlights = [];
    for (let i = 0; i < numHighlights; i++) {
      highlights.push(formData.get(`highlight_${i}`));
    }

    const villaData = {
      name: formData.get("name"),
      description: formData.get("description"),
      location: formData.get("location"),
      pricePerNight: formData.get("pricePerNight"),
      bathroom: formData.get("bathroom"),
      area: formData.get("area"),
      people: formData.get("people"),
      highlights: highlights,
    };
    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
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

      imageUploadPromises.push(result.secure_url);

      const uploadedImages = await Promise.all(imageUploadPromises);
      villaData.images = uploadedImages;
    }
    const villa = new Villa(villaData);
    await villa.save();
    return Response.redirect(`${process.env.NEXT_PUBLIC_API_URL}/admin/villa`);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const villas = await Villa.find();
    return new NextResponse(JSON.stringify(villas), { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
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

    await Villa.deleteMany({ _id: { $in: ids } });
    return new NextResponse("villa deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
