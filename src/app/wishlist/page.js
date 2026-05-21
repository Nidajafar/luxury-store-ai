"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '@/redux/slices/wishlistSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { HeartOff, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const WishlistPage = () => {
  const [mounted, setMounted] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const dispatch = useDispatch();

  // Hydration errors se bachne ke liye mount checking
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-xs tracking-widest text-gray-400 uppercase">
        Loading Wishlist...
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="h-[65vh] flex flex-col items-center justify-center space-y-5 text-gray-400 font-sans">
        <HeartOff size={45} className="text-gray-300 stroke-[1.5]" />
        <h2 className="text-sm font-serif uppercase tracking-[3px] text-gray-500">Your Wishlist is Empty</h2>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 text-black hover:text-[#c4a457] hover:border-[#c4a457] transition-colors">
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-serif text-[#1a2b4b] uppercase tracking-[4px]">My Favorites</h1>
        <div className="w-16 h-[1px] bg-[#c4a457] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map((item) => (
          <div key={item._id} className="border border-gray-100 p-4 bg-white group relative flex flex-col justify-between hover:shadow-xl transition-all duration-300">
            
            {/* Product Link Wrapper */}
            <Link href={`/product/${item._id}`} className="block grow">
              <div className="h-56 bg-[#fbfbfb] w-full flex items-center justify-center p-4 mb-4 overflow-hidden">
                <img 
                  src={item.images?.[0] || 'https://via.placeholder.com/300'} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                  alt={item.name} 
                />
              </div>
              <h3 className="text-[11px] font-bold uppercase text-center text-gray-800 tracking-wide line-clamp-1 mb-1">
                {item.name}
              </h3>
              <p className="text-center text-[#c4a457] mb-4 font-serif text-sm font-semibold">
                Rs. {item.price?.toLocaleString()}
              </p>
            </Link>

            {/* Action Triggers */}
            <div className="flex gap-2 pt-2 border-t border-gray-50">
              <button 
                onClick={() => {
                  dispatch(addToCart({ ...item, quantity: 1 }));
                  alert("Moved to dynamic bag! 🛍️");
                }} 
                className="flex-1 bg-[#1a2b4b] text-white py-2.5 text-[10px] uppercase font-bold tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={12}/> Move to Bag
              </button>
              
              <button 
                onClick={() => dispatch(toggleWishlist(item))} 
                className="p-2.5 border border-gray-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-sm"
                title="Remove Item"
              >
                <HeartOff size={14}/>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;