import mongoose from "mongoose";

const villaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: Number,
      default: 100,
    },
    bathroom: {
      type: Number,
      default: 1,
    },
    people: {
      type: Number,
      default: 2,
    },
    images: [
      {
        type: String,
      },
    ],
    highlights: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Villa || mongoose.model("Villa", villaSchema);
