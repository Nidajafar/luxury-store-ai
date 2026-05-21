import connectDb from "@/lib/db";
import User from "@/model/user";
import { NextResponse } from "next/server";

// app/api/auth/register/route.js

export async function POST(req) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // User create karena
    const newUser = await User.create({ name, email, password });

    
    return NextResponse.json({ 
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email },
      token: "dummy-or-real-jwt-token" 
    }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error); // Terminal mein error check karne ke liye
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}