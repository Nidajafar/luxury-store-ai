import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import Product from '@/model/Product';

// 1. GET SINGLE PRODUCT BY ID
export async function GET(req, { params }) {
  await connectDb();
  try {
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 2. UPDATE PRODUCT (Super clean aur fast)
export async function PUT(req, { params }) {
  await connectDb();
  try {
    const body = await req.json();
    const {id} = await params;
    // Frontend se direct updated URLs mil rahe hain, toh direct save karein
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 3. DELETE PRODUCT
export async function DELETE(req, { params }) {
  await connectDb();
  try {
    const {id}=await params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// 4. POST REVIEW
export async function PATCH(req, { params }) {
  await connectDb();
  try {
    const { user, rating, comment } = await req.json();
    const {id} = await params;
    const product = await Product.findById(id);

    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    const review = {
      user,
      rating: Number(rating),
      comment,
      date: new Date()
    };

    product.reviews.push(review);
    await product.save();
    return NextResponse.json({ message: "Review added successfully!", product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}