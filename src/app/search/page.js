"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';

const SearchResultsContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/auth/product');
        
        // Frontend Dynamic Filtering
        const filtered = res.data.filter(p => 
          p.name?.toLowerCase().includes(query.toLowerCase()) || 
          p.category?.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(filtered);
      } catch (err) {
        console.error("Search API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 font-sans min-h-screen">
      <div className="mb-12 border-b pb-8">
        <p className="text-[10px] uppercase tracking-[4px] text-gray-400 mb-2">Search Results for:</p>
        <h1 className="text-3xl font-serif text-[#1a2b4b] uppercase italic">"{query}"</h1>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse text-gray-400 uppercase tracking-widest text-xs">
          Searching Boutique Collection...
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="text-gray-400 italic font-serif">"No luxury items match your search."</p>
          <Link href="/" className="inline-block text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#1a2b4b] pb-1 hover:text-[#c4a457] hover:border-[#c4a457] transition-colors">
            Back to Gallery
          </Link>
        </div>
      )}
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs tracking-widest uppercase text-gray-400">Loading Search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}