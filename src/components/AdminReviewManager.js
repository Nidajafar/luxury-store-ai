"use client";

import { useState, useEffect } from 'react';
import { Star, Trash2, MessageSquare, Diamond } from 'lucide-react';
import axios from 'axios';

const AdminReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get('/api/auth/admin/reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleDeleteReview = async (productId, reviewId) => {
    if (!confirm("Are you sure you want to remove this client feedback from the boutique storefront?")) return;
    try {
      await axios.put('/api/admin/reviews', { productId, reviewId });
      alert("Review deleted successfully! ✨");
      fetchAllReviews(); // Refresh view instantly
    } catch (err) {
      alert("Error deleting review");
    }
  };

  if (loading) return <div className="text-center py-12 text-xs italic text-gray-400">Syncing Luxury Reviews Vault...</div>;

  return (
    <div className="bg-white shadow-md rounded-sm p-6 md:p-8 border-t-2 border-[#c4a457] animate-fadeIn">
      <h2 className="text-xs font-bold uppercase tracking-[2px] text-[#1a2b4b] flex items-center gap-2 mb-6">
        <MessageSquare size={16} className="text-[#c4a457]" /> Client Appraisals & Feedback Ledger
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fbfbfb] text-[9px] font-bold uppercase text-gray-400 tracking-wider border-b border-gray-100">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Target Product</th>
              <th className="p-4">Appraisal (Rating & Comment)</th>
              <th className="p-4 text-center">Purge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {reviews.length > 0 ? (
              reviews.map((rev, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-800 uppercase tracking-wide">
                    {rev.user}
                    <div className="text-[9px] text-gray-400 font-normal mt-0.5">
                      {new Date(rev.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  
                  <td className="p-4 max-w-[200px] text-gray-500 font-medium truncate">
                    <span className="inline-flex items-center gap-1 text-[#c4a457]">
                      <Diamond size={10} /> {rev.productName}
                    </span>
                  </td>

                  <td className="p-4 space-y-1">
                    <div className="flex text-[#e3a20a]">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={11}
                          fill={idx < rev.rating ? "currentColor" : "none"}
                          className={idx < rev.rating ? "text-[#e3a20a]" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic font-serif text-[11px] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeleteReview(rev.productId, rev.reviewId)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors inline-flex rounded-full hover:bg-red-50"
                      title="Delete Review"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-12 text-center text-xs italic text-gray-400">
                  No boutique product appraisals listed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviewManager;