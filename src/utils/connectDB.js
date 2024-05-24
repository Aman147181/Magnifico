import mongoose from "mongoose";
let connected = false; 
export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (connected) {
        console.log("mongo db is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        connected = true;
        console.log("mongo db is connected");
    } catch (error) {
        console.log(error);
    }
     
 }