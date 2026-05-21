import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import order from '@/model/order';

export async function POST(req) {
  try {
    await connectDb(); // Database  connection establish karna
    
    const body = await req.json();
    
    
    if (!body.firstName || !body.phone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: "Verification failed. Missing shipping credentials." },
        { status: 400 }
      );
    }

    const newOrder = new order(body);
    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (err) {
    console.error("Order Creation Error Trace:", err);
    return NextResponse.json(
      { message: "Order placement execution failed.", error: err.message },
      { status: 500 }
    );
  }
}