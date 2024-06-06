import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server"
import User from "@/models/User";
export const GET = async () => {
    try {
        await connectDB();
        const user = await User.find();
        return new NextResponse(JSON.stringify(user), { status: 200 }); 
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    
}