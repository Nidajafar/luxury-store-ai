import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Order from "@/model/order";

export async function PUT(req, context) {
  try {
    await connectDb();

    const id = context.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        cancelRequested: true,
        status: "Cancelled",
      },
      { new: true }
    );

    return NextResponse.json(updatedOrder);

  } catch (error) {
    return NextResponse.json(
      { message: "Cancellation failed" },
      { status: 500 }
    );
  }
}