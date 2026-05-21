import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import order from '@/model/order';

export async function PUT(req, { params }) {
  try {
    await connectDb();
    
    // Extracting route path dynamic parameters
    const { id } = await params; 
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ message: "Status state is empty." }, { status: 400 });
    }

    // Status mapping variable update logic
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true } // Return modified version instantly
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Target luxury order trace not found." }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    console.error("Status Mutation Override Error Trace:", err);
    return NextResponse.json(
      { message: "Operational system block failure.", error: err.message },
      { status: 500 }
    );
  }
}