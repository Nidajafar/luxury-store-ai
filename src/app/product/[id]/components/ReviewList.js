"use client";

import { Star } from "lucide-react";

const ReviewList = ({ reviews }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h3 className="text-sm font-bold uppercase tracking-[3px] text-[#1a2b4b] border-b pb-4">
        Verified Customer Reviews ({reviews.length})
      </h3>

      {reviews.length > 0 ? (
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {reviews.map((rev, index) => (
            <div key={index} className="border-b border-gray-100 pb-6 space-y-2">
              <div className="flex justify-between items-center">
                <h5 className="text-xs font-bold text-gray-800 uppercase">{rev.name}</h5>
                <span className="text-[9px] text-gray-400 font-medium">{rev.date}</span>
              </div>

              <div className="flex text-[#e3a20a]">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={12}
                    fill={idx < rev.rating ? "currentColor" : "none"}
                    className={idx < rev.rating ? "text-[#e3a20a]" : "text-gray-200"}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-600 italic leading-relaxed font-serif">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-400 text-xs italic">
          No boutique ratings listed yet. Be the first to verify!
        </div>
      )}
    </div>
  );
};

export default ReviewList;