// src/components/CategoryIcon.js
import Link from "next/link";

const categories = [
  { name: 'Gold', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgwU0pMoH5L9m9ZT_qAKxFpM2698DkY9m0g&s', path: '/category/gold' },
  { name: 'Diamond', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgn0IsrKQU-Ni88HNfFEG1Mc4EKOBm7txPpg&s', path: '/category/diamond' },
  { name: 'Watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999', path: '/category/watches' },
  { name: 'Fragrance', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904', path: '/category/fragrance' },
  { name: 'Silver', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT3XloSTxakfH7pmb5oLcsXtwCtmy9Iyt9aw&s', path: '/category/silver' },
  { name: 'ACCESSORIES', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9qgjE8jq9po6qg2QXL8t7WT8F3om1AL7HDQ&s', path: '/category/accessories' },
];

const CategoryIcons = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif italic text-[#1a2b4b]">SHOP NOW</h2>
          <div className="w-20 h-[2px] bg-[#c4a457] mx-auto mt-4"></div>
        </div>
       
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-between items-center gap-8 min-w-max md:min-w-full">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.path} className="group flex flex-col items-center gap-4 transition-all">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-100 p-1 group-hover:border-[#c4a457] transition-all duration-500 overflow-hidden shadow-sm group-hover:shadow-xl">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <span className="text-[11px] md:text-xs font-bold text-gray-700 tracking-[2px] uppercase group-hover:text-[#1a2b4b]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryIcons;