import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import order from "@/model/order";

export async function POST(req) {
  try {
  
    await connectDb();

    
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      userEmail, 
      phone, 
      address, 
      city, 
      paymentMethod, 
      items, 
      subtotal, 
      total 
    } = body;


    if (!email || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Missing required vault parameters or empty bag." },
        { status: 400 }
      );
    }

    
    const newOrder = new order({
      firstName,
      lastName,
      email: email.toLowerCase(),
      userEmail: userEmail || email.toLowerCase(), 
      phone,
      address,
      city,
      paymentMethod,
      items,
      subtotal,
      total,
      status: "Pending", 
      createdAt: new Date()
    });

    await newOrder.save();

    
    return NextResponse.json(
      { message: "Luxury sequence archived successfully.", order: newOrder },
      { status: 201 }
    );

  } catch (error) {
    console.error("Critical Back-End Order Placement Error:", error);
    return NextResponse.json(
      { message: "Internal server registry breakdown.", error: error.message },
      { status: 500 }
    );
  }
}