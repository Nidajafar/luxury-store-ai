import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDb from "@/lib/db";
import User from "@/model/user";
import sendEmail from "@/lib/sendEmail";

export async function POST(req) {
  try {
    await connectDb();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token for DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save to DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Reset URL (frontend link)
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    console.log("RESET URL:", resetUrl);

    // ✅ EMAIL SEND (FIXED PART)
    await sendEmail(
      user.email,
      "Password Reset Link",
      `Click here to reset your password: ${resetUrl}`
    );

    return NextResponse.json({
      success: true,
      message: "Reset link sent to email successfully",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}