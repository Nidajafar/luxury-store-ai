"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

const ProductInfo = ({ product, isWishlisted, totalReviews }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    alert("Added to your dynamic checkout bag! 🛍️");
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Info */}
      <div>
        <p className="text-[11px] font-bold tracking-[3px] text-[#c4a457] uppercase mb-2">
          {product.category}
        </p>
        <h1 className="text-2xl md:text-4xl font-serif tracking-wide text-[#1a2b4b] uppercase">
          {product.name}
        </h1>
        {product.subCategory && (
          <p className="text-xs text-gray-400 italic mt-1">{product.subCategory}</p>
        )}
      </div>

      {/* Price & Star Rating Preview */}
      <div className="border-y py-4 flex items-center justify-between">
        <p className="text-2xl md:text-3xl font-serif text-[#c4a457] font-semibold">
          Rs. {product.price?.toLocaleString()}
        </p>
        <div className="flex items-center gap-1 text-[#e3a20a]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          <span className="text-xs text-gray-400 font-bold ml-1">({totalReviews})</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">
          The Story & Description
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description ||
            "Handcrafted premium luxury design with meticulous detailing, tailored from world's premium material sources to embody timeless grace."}
        </p>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">
            Quantity
          </span>
          <div className="flex items-center border border-gray-200 rounded-sm">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 font-bold"
            >
              -
            </button>
            <span className="px-4 text-xs font-bold text-gray-800">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#1a2b4b] text-white py-4 text-xs font-bold uppercase tracking-[3px] hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag size={16} /> Add to Bag
          </button>

          <button
            onClick={() => dispatch(toggleWishlist(product))}
            className={`p-4 border rounded-sm transition-all duration-300 flex items-center justify-center ${
              isWishlisted
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500"
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 text-gray-500">
          <ShieldCheck size={20} className="text-[#c4a457]" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            100% Certified Brand
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Truck size={20} className="text-[#c4a457]" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Insured Fast Delivery
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <RefreshCw size={18} className="text-[#c4a457]" />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            Easy 7-Day Returns
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;