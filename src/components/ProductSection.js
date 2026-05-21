"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Main categories jo aapke home page par filter lagayengi
  const categories = ['All', 'Gold', 'Diamond', 'Silver', 'Watches', 'Fragrance',"ACCESSORIES"];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('/api/auth/product');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products on home page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter logic: Agar 'All' select hai toh sab dikhao, warna match karo
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif italic text-[#1a2b4b]">OUR COLLECTION</h2>
          <div className="w-20 h-[2px] bg-[#c4a457] mx-auto mt-3"></div>
        </div>
        
        {/* Filter Tabs on Home Page */}
        <div className="flex justify-center flex-wrap gap-6 mb-12  pb-4">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-[3px] uppercase transition-all pb-2 ${
                activeCategory === cat 
                  ? 'text-[#1a2b4b] border-b-2 border-[#1a2b4b]' 
                  : 'text-gray-400 hover:text-[#c4a457]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 tracking-widest text-xs uppercase animate-pulse">
            Loading Products...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100 rounded-sm">
             <p className="text-gray-400 uppercase tracking-widest text-xs">
               No products found in {activeCategory}.
             </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductSection;