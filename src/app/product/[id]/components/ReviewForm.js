"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

const ReviewForm = ({ onReviewSubmit }) => {
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onReviewSubmit({
      name: reviewName,
      comment: reviewComment,
      rating: Number(reviewRating),
      date: "Just now",
    });

    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    alert("Thank you for your elegant review! ✨");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif text-[#1a2b4b] uppercase tracking-wide flex items-center gap-2">
          <MessageSquare size={20} className="text-[#c4a457]" /> Client Feedback
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          Share your luxury collection experience with us.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[#fbfbfb] p-6 rounded-sm border border-gray-100"
      >
        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            className="w-full bg-white border border-gray-200 p-2.5 text-xs outline-none focus:border-[#1a2b4b] transition-colors"
            placeholder="e.g., Nida Jafar"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
            Rating
          </label>
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
            className="w-full bg-white border border-gray-200 p-2.5 text-xs outline-none font-bold text-[#e3a20a]"
          >
            <option value="5">⭐⭐⭐⭐⭐ 5/5 Excellence</option>
            <option value="4">⭐⭐⭐⭐ 4/5 Beautiful</option>
            <option value="3">⭐⭐⭐ 3/3 Satisfactory</option>
            <option value="2">⭐⭐ 2/5 Average</option>
            <option value="1">⭐ 1/5 Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
            Your Opinion / Review
          </label>
          <textarea
            rows="4"
            required
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full bg-white border border-gray-200 p-2.5 text-xs outline-none focus:border-[#1a2b4b] transition-colors resize-none"
            placeholder="Write detailed craftsmanship feedback..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a2b4b] text-white text-[10px] font-bold tracking-[2px] py-3 uppercase hover:bg-black transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;