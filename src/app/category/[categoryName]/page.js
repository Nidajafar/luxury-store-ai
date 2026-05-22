// src/app/category/[categoryName]/page.js
"use client";

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';

const CategoryPage = ({ params }) => {
  // Next.js 15+ standard ke mutabiq params ko unwrap kar rahe hain
  const resolvedParams = use(params);
  const currentCategory = resolvedParams.categoryName; 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Rings', 'Earrings', 'Nose Pins', 'Pendants', 'Bracelets'];

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get('/api/auth/product');
        const mainCategoryProducts = res.data.filter(p => 
          p.category?.toLowerCase() === currentCategory?.toLowerCase()
        );
        setProducts(mainCategoryProducts);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory) {
      fetchCategoryProducts();
    }
  }, [currentCategory]);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'All') return true;
    if (!p.subCategory) return false;

    const productSub = p.subCategory.toLowerCase();
    const currentTab = activeTab.toLowerCase();

    return productSub.includes(currentTab) || currentTab.includes(productSub);
  });

  const displayName = currentCategory ? currentCategory.toUpperCase() : '';

  return (
    <div className="py-20 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <p className="text-xs text-[#c4a457] tracking-[3px] uppercase mb-2">Luxury Collection</p>
          <h2 className="text-4xl font-serif italic text-[#1a2b4b]">{displayName} SELECTION</h2>
          <div className="w-20 h-[2px] bg-[#c4a457] mx-auto mt-4"></div>
        </div>
        
        <div className="flex justify-center flex-wrap gap-6 mb-12 border-b pb-4">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] font-bold tracking-[3px] uppercase transition-all pb-2 ${
                activeTab === tab 
                  ? 'text-[#1a2b4b] border-b-2 border-[#1a2b4b]' 
                  : 'text-gray-400 hover:text-[#c4a457]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-400 tracking-widest text-xs uppercase">
            Loading {displayName} Collection...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100 rounded-sm">
             <p className="text-gray-400 italic mb-2 font-serif text-base">"Exclusivity in Every Detail"</p>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest">
               No {activeTab} found in {displayName}.
             </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;