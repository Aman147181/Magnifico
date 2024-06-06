import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // villa: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Villa',
    //   required: true,
    //   index: true,
    // },
    villa: {
      type: String,

      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after start date.",
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Ensure no overlapping reservations for the same villa
reservationSchema.pre("save", async function (next) {
  const existingReservations = await mongoose.models.Reservation.find({
    villa: this.villa,
    _id: { $ne: this._id },
    $or: [
      { startDate: { $lt: this.endDate, $gte: this.startDate } },
      { endDate: { $gt: this.startDate, $lte: this.endDate } },
      { startDate: { $lte: this.startDate }, endDate: { $gte: this.endDate } },
    ],
  });
  if (existingReservations.length > 0) {
    throw new Error("The villa is already reserved for the selected dates.");
  }
  next();
});

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);
