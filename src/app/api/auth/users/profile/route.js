import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import User from "@/model/user";    


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};


const getAuthUser = async (req) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Database se password ke bina user dhoondna
        return await User.findById(decoded.id).select("-password");
    } catch (error) {
        return null;
    }
};


// 1. GET REQUEST - Profile Fetch Karna

export async function GET(req) {
    await connectDb(); // DB Connection 

    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ message: "Not authorized, token failed" }, { status: 401 });
    }

    return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
}


// 2. PUT REQUEST - Profile Update Karna

export async function PUT(req) {
    await connectDb();

    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ message: "Not authorized, token failed" }, { status: 401 });
    }

    try {
        const body = await req.json(); // Express ke req.body ki jagah Next.js ke req.json() se data le rahe hain

        // Database se user ko fresh fetch karein taaki save chal sake
        const dbUser = await User.findById(user._id);

        if (dbUser) {
            dbUser.name = body.name || dbUser.name;
            dbUser.email = body.email || dbUser.email;
            
            if (body.password) {
                dbUser.password = body.password; // Agar model me pre-save bcrypt hook laga hai toh yeh encrypt ho jayega
            }

            const updatedUser = await dbUser.save();

            return NextResponse.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id), // Naya token return karna
            });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message || "Server Error" }, { status: 500 });
    }
}