"use client";

import Link from 'next/link'; 
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUp 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a2b4b] text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. BRAND STORY */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-[4px] border-b border-[#c4a457] pb-2 inline-block">
            NIDA J.
          </h2>
          <p className="text-[11px] uppercase tracking-[3px] text-[#c4a457] font-bold">
            Legacy of Luxury
          </p>
          <p className="text-gray-400 text-sm leading-relaxed italic">
            Crafting timeless masterpieces that celebrate your unique elegance. From pure gold to sparkling diamonds, we bring luxury to your doorstep.
          </p>
          
          {/* SOCIAL IONS WITH PURE SVGs */}
          <div className="flex gap-4">
            {/* Facebook SVG */}
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#c4a457] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Instagram SVG */}
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#c4a457] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Twitter / X SVG */}
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[#c4a457] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* 2. QUICK LINKS */}
        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[4px] mb-8 text-[#c4a457]">
            Collections
          </h3>
          <ul className="space-y-4 text-sm text-gray-400 uppercase tracking-widest">
            <li>
              <Link href="/category/gold" className="hover:text-white transition-colors">
                Gold Jewelry
              </Link>
            </li>
            <li>
              <Link href="/category/diamond" className="hover:text-white transition-colors">
                Diamond Selection
              </Link>
            </li>
            <li>
              <Link href="/category/watches" className="hover:text-white transition-colors">
                Luxury Watches
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. CONTACT INFO */}
        <div className="space-y-6">
          <h3 className="text-[12px] font-bold uppercase tracking-[4px] mb-4 text-[#c4a457]">
            Boutique Info
          </h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#c4a457] shrink-0" />
              <span>DHA, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#c4a457] shrink-0" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#c4a457] shrink-0" />
              <span>concierge@nidaj.com</span>
            </div>
          </div>
        </div>

        {/* 4. GOOGLE MAP SECTION */}
        <div className="space-y-4">
          <h3 className="text-[12px] font-bold uppercase tracking-[4px] mb-4 text-[#c4a457]">
            Visit Us
          </h3>
          <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108841.05436657954!2d74.22533810148723!3d31.516422774900742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904603097b835%3A0xc3311893c5d6482e!2sDHA%20Phase%205%2C%20Lahore!5e0!3m2!1sen!2s!4v1711234567890!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Nida J. Boutique Location"
            ></iframe>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex justify-between items-center">
        <p className="text-[10px] text-gray-500 uppercase tracking-[2px]">
          © 2026 NIDA JAFAR. All Rights Reserved.
        </p>
        
        <button 
          type="button"
          onClick={scrollToTop}
          className="bg-[#c4a457] text-white p-3 rounded-full hover:bg-white hover:text-[#1a2b4b] transition-all focus:outline-none"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;