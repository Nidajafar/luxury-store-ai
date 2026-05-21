"use client";

import { useState, useEffect } from "react";

const ImageGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(() => {
    return images && images.length > 0 ? images[0] : "";
  });

  

  return (
    <div className="space-y-4 sticky top-28">
      {/* Main Preview Image */}
      <div className="h-[400px] md:h-[520px] w-full bg-[#fbfbfb] border border-gray-100 rounded-sm flex items-center justify-center p-6 overflow-hidden">
        
        {activeImage ? (
          <img
            src={activeImage}
            alt={productName || "Product"}
            className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-500"
          />
        ) : (
          /* Placeholder till the state updates */
          <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center text-xs text-gray-300 uppercase tracking-widest">
            Loading Preview...
          </div>
        )}
      </div>

      {/* Thumbnail Selectors */}
      {images && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`h-20 w-20 flex-shrink-0 bg-[#fbfbfb] border p-2 flex items-center justify-center rounded-sm transition-all ${
                activeImage === img
                  ? "border-[#1a2b4b] ring-1 ring-[#1a2b4b]"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              {img ? (
                <img
                  src={img}
                  alt={`thumbnail-${index}`}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;