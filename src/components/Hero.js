'use client'; 
import { useState, useEffect, use } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070',
      title: 'Diamond Dreams',
      sub: 'The Bridal Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974',
      title: 'Timeless Luxury',
      sub: 'Exquisite Watches'
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-gray-900">
      {/* Slide Image */}
      <div 
        key={slides[index].url}
        style={{ backgroundImage: `url(${slides[index].url})` }}
        className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out scale-105 animate-pulse-slow"
      >
        {/* Animated Text Content */}
        <div 
          key={index} // This triggers animation on every slide change
          className="absolute inset-0 bg-[#1a2b4b]/30 flex flex-col items-center justify-center text-center p-4"
        >
          <p className="text-[#c4a457] tracking-[8px] uppercase text-[10px] md:text-xs mb-4 font-bold animate-fade-in-up">
            {slides[index].sub}
          </p>
          
          <h2 className="text-white text-4xl md:text-8xl font-serif italic mb-8 animate-fade-in-up transition-all delay-200">
            {slides[index].title}
          </h2>
          
          <button className="px-10 py-3 bg-[#1a2b4b] text-white hover:bg-[#c4a457] transition-all text-[11px] font-bold tracking-widest rounded-sm animate-fade-in-up delay-500">
            EXPLORE COLLECTION
          </button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => setIndex(index === 0 ? slides.length - 1 : index - 1)} 
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
      >
        <ChevronLeft size={40}/>
      </button>
      
      <button 
        onClick={() => setIndex(index === slides.length - 1 ? 0 : index + 1)} 
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-10"
      >
        <ChevronRight size={40}/>
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div key={i} className={`h-1 w-8 transition-all ${i === index ? 'bg-[#c4a457]' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
};

export default Hero;