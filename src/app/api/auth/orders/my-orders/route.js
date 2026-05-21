import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb"; 
import Order from "@/models/Order"; 

export async function GET(request) {
  try {
    await connectMongoDB();
    
ا
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // کسٹمر کے آرڈرز کو نئی تاریخ کے حساب سے ترتیب دے کر لائے گا
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}