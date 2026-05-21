"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
import { toggleWishlist } from '@/redux/slices/wishlistSlice';


const ProductCard = ({ product }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isWishlisted = mounted && wishlistItems.some(item => item._id === product._id);

  if (!product) return null;

  
  const handleCardClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full font-sans"
    >
      
      {/* BADGES / ACTIONS (Top Layers) */}
      <div className="absolute top-3 right-3 z-30 flex flex-col gap-2">
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            dispatch(toggleWishlist(product));
          }}
          className={`p-2.5 rounded-full shadow-md transition-all duration-300 transform md:opacity-0 md:group-hover:opacity-100 ${
            isWishlisted 
              ? 'bg-red-50 text-red-500 scale-110 opacity-100' 
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 hover:scale-110'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick View Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-gray-600 hover:bg-[#1a2b4b] hover:text-white transition-all duration-300 transform md:opacity-0 md:group-hover:opacity-100 hidden md:flex"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="relative h-[280px] w-full overflow-hidden bg-[#fbfbfb] flex items-center justify-center p-4 border-b border-gray-50">
        
        {/* Main Image / First Image */}
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className={`max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-700 ${
            isHovered && product.images?.[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`} 
        />

        
        {product.images?.[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} - Alternate`}
            className={`absolute max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-700 top-4 bottom-4 left-4 right-4 m-auto ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />
        )}

        
        <div className="absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
            className="w-full bg-[#1a2b4b] text-white py-3 text-[11px] font-bold tracking-[2px] uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Category */}
          <p className="text-[10px] uppercase tracking-[1.5px] text-gray-400 mb-1 font-semibold">
            {product.category}
          </p>
          
          {/* Title */}
          <h3 className="text-[13px] font-medium text-gray-800 uppercase tracking-wide mb-2 line-clamp-2 group-hover:text-[#c4a457] transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating Placeholder */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[#c4a457] font-serif text-base font-bold">
            Rs. {product.price?.toLocaleString()}
          </p>
          
          
          {product.subCategory && (
            <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm font-medium uppercase tracking-wider">
              {product.subCategory}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductCard;