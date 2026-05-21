import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import Product from '@/model/Product';

// GET: Saare products ke reviews ko ek jagah fetch karna admin panel ke liye
export async function GET() {
  try {
    await connectDb();
    
    
    const products = await Product.find({ "reviews.0": { $exists: true } }, 'name reviews');
    
    // Data ko flat map karna hota hai taake table structure me fit ho sake
    let allReviews = [];
    products.forEach(product => {
      product.reviews.forEach(rev => {
        allReviews.push({
          reviewId: rev._id,
          productId: product._id,
          productName: product.name,
          user: rev.user || rev.name || "Anonymous Client",
          rating: rev.rating,
          comment: rev.comment,
          date: rev.date
        });
      });
    });

    // Sort by latest date
    allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(allReviews, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to pull reviews ledger", error: err.message }, { status: 500 });
  }
}

// PUT/DELETE: Admin agar kisi ghalat ya spam review ka delete karna chahe
export async function PUT(req) {
  try {
    await connectDb();
    const { productId, reviewId } = await req.json();

    if (!productId || !reviewId) {
      return NextResponse.json({ message: "Parameters missing" }, { status: 400 });
    }

    // Product ke andar se specific review ID ko pull (remove) karna
    await Product.findByIdAndUpdate(productId, {
      $pull: { reviews: { _id: reviewId } }
    });

    return NextResponse.json({ message: "Review removed by artisan command successfully." }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Action failed", error: err.message }, { status: 500 });
  }
}