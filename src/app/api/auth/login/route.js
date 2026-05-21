import connectDb from "@/lib/db";
import User from "@/model/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDb();
    const { email, password } = await req.json();

    // 1. User ko dhoondna
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
    }

    // 2. Password match karna
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
    }

    // 3. Token Generate karna
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Response mein user data aur token bhejna
    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}