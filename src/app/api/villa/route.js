import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        
    } catch (error) {
        return new NextResponse({ error: error.message }, { status: 500 })
    }
}