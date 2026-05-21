import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import order from '@/model/order'; 
export async function GET() {
  try {
    await connectDb();
    
    // Fetching orders 
    const orders = await order.find().sort({ createdAt: -1 });
    
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Order Pool Retrieval Error:", err);
    return NextResponse.json(
      { message: "Could not fetch dynamic orders pool.", error: err.message },
      { status: 500 }
    );
  }
}