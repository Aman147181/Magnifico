import mongoose from "mongoose";
export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  let connectionState = mongoose.connection.readyState;
  console.log(connectionState);
  if (connectionState === 1) {
    console.log("mongo db is already connected");
    return;
    }
    if (connectionState === 2) {
        console.log("Connecting");
        return;
      }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("mongo db is connected");
  } catch (error) {
    console.log(error);
  }
};
