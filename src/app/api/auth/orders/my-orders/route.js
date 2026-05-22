import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import order from "@/model/order";
export async function GET(request) {
  try {
    await connectDb();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    const orders = await order.find({ email }).sort({ createdAt: -1 });
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}