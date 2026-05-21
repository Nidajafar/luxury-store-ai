import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Order from "@/model/order";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({
      userEmail: email.toLowerCase(),
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}