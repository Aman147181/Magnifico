import mongoose from "mongoose";



// Define the schema for the date details
const DateDetailsSchema = new mongoose.Schema({
  era: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true }
});

// Define the reservation schema
const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    villaname: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    villa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Villa",
      required: true,
      index: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      default: 1,
    },
    start: {
      type: DateDetailsSchema,
      required: true,
    },
    end: {
      type: DateDetailsSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
