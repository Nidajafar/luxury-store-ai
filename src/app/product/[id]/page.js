"use client";

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';


import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

const ProductDetailsContent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/auth/product`);
        const foundProduct = res.data.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Set Initial Seed Reviews
          setReviews([
            { name: "Ayesha Khan", rating: 5, comment: "Absolutely breathtaking craftsmanship. The gold polish looks so royal!", date: "2 days ago" },
            { name: "Zainab Ahmed", rating: 4, comment: "Beautiful design, exactly like the picture. Elegant packaging.", date: "1 week ago" }
          ]);
        }
      } catch (err) {
        console.error("Error loading product detail info:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some(item => item._id === product?._id);

  // Appending dynamic review submissions to current state array
  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-xs tracking-[4px] uppercase text-gray-400 animate-pulse">
      Unveiling Luxury Masterpiece...
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <p className="font-serif italic text-gray-400 mb-4">The requested luxury item could not be retrieved.</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Main Section Divided in Two Clean Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <ImageGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} isWishlisted={isWishlisted} totalReviews={reviews.length} />
        </div>

        {/* Bottom Reviews System Block */}
        <div className="border-t border-gray-100 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <ReviewForm onReviewSubmit={handleAddReview} />
            <ReviewList reviews={reviews} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-xs tracking-widest uppercase text-gray-400">Loading Masterpiece details...</div>}>
      <ProductDetailsContent />
    </Suspense>
  );
}