import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import Product from '@/model/Product';

// 1. GET ALL PRODUCTS (Saare products fetch karne ke liye)
export async function GET() {
  await connectDb();
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    
    
    const newProduct = new Product(body); 
    await newProduct.save();
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}