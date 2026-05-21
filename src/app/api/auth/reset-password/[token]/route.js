import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDb from "@/lib/db";
import User from "@/model/user";

export async function PUT(req, { params }) {
  try {
    await connectDb();

    //await params (IMPORTANT)
    const { token } = await params;

    const { password } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token missing" },
        { status: 400 }
      );
    }

    // Hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}