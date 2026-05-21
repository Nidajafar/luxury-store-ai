"use client";

import { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronDown, Search, ShoppingBag, User, 
  Menu, Heart, X, LogOut, Settings, ShieldAlert, Sparkles, Truck, Star, RefreshCw
} from 'lucide-react';

import { navData } from '@/data/navData'; 
import { logout, initializeAuth } from '@/redux/slices/authSlice';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || { user: null });
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  useEffect(() => {
    dispatch(initializeAuth());
    setMounted(true);
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout()); 
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  return (
    <>
      {/* Premium Announcement Bar */}
      <div className="bg-[#1a2b4b] text-white text-[8px] md:text-[10px] py-2 tracking-[1px] md:tracking-[2px] uppercase font-medium px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-center sm:text-left">
          World&apos;s Finest Diamond & Gold Collection — Custom Designs Available
        </div>
        <div className="flex items-center gap-4 text-gray-300 font-semibold text-[8px] md:text-[9px]">
          <Link href="/cart?tab=track" className="hover:text-[#e3a20a] flex items-center gap-1 transition-colors">
            <Truck size={10} /> Track Order
          </Link>
          <Link href="/cart?tab=reviews" className="hover:text-[#e3a20a] flex items-center gap-1 transition-colors">
            <Star size={10} /> Write Review
          </Link>
          <Link href="/returns-cancellation" className="hover:text-[#e3a20a] flex items-center gap-1 transition-colors">
            <RefreshCw size={10} /> Returns & Cancellation
          </Link>
        </div>
      </div>

      <nav className="sticky top-0 w-full bg-white z-[100] shadow-md font-sans">
        {/* Main Navbar Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-50">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Left: Mobile Menu Toggle Trigger */}
            <button className="lg:hidden text-[#1a2b4b] p-1" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Center Left: Logo Section */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl md:text-3xl font-serif font-bold tracking-tighter text-[#1a2b4b] uppercase leading-none text-center lg:text-left cursor-pointer">
                Nida J. 
                <span className="block text-[7px] md:text-[9px] tracking-[4px] md:tracking-[6px] font-light mt-1 text-[#e3a20a] uppercase">
                  Legacy of Luxury
                </span>
              </h1>
            </Link>

            {/* Center: Desktop Links */}
            <div className="hidden lg:flex space-x-8 items-center">
              {navData.map((category) => (
                <div key={category.title} className="group relative py-8">
                  <Link href={category.path || '#'} className="flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-[#1a2b4b] transition-all uppercase tracking-[1px]">
                    {category.title} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
                  </Link>
                  
                  <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-white border-t-2 border-[#1a2b4b] shadow-2xl py-4 z-50">
                    {category.isNested ? (
                      category.subCategories.map((sub, i) => (
                        <div key={i} className="px-6 py-2">
                          <p className="text-[10px] font-black text-[#e3a20a] uppercase border-b border-gray-100 mb-2">{sub.name}</p>
                          {sub.items.map((item, j) => (
                            <Link key={j} href={item.path} className="block py-1.5 text-[12px] text-gray-600 hover:text-black">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      category.subCategories?.map((sub, index) => (
                        <Link key={index} href={sub.path} className="block px-6 py-3 text-[13px] font-medium text-gray-600 hover:bg-[#f8faff] hover:text-[#1a2b4b]">
                          {sub.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Center Right: Desktop AI Concierge Action */}
            <div className="hidden lg:block">
              <Link href="/chat-with-ai" className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e3a20a]/40 text-[#1a2b4b] text-[11px] font-bold uppercase tracking-wider hover:bg-[#1a2b4b] hover:text-white hover:border-[#1a2b4b] transition-all duration-300 shadow-sm">
                <Sparkles size={12} className="text-[#e3a20a]" />
                AI Concierge
              </Link>
            </div>

            {/* Right: Actions Container (Both Mobile & Desktop) */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-[#1a2b4b]">
              
              {/* Inline Desktop Search Flow */}
              <div className="hidden md:flex items-center gap-2">
                {showSearch ? (
                  <form onSubmit={handleSearch} className="flex items-center border-b border-gray-300 py-1">
                    <input 
                      type="text" 
                      className="outline-none text-[12px] p-1 w-40 bg-transparent text-black" 
                      placeholder="Search collection..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="text-gray-500 hover:text-black px-1">
                      <Search size={14} />
                    </button>
                    <X size={14} className="cursor-pointer text-gray-400 hover:text-black ml-1" onClick={() => setShowSearch(false)} />
                  </form>
                ) : (
                  <Search size={20} className="cursor-pointer hover:text-[#e3a20a] transition-colors" onClick={() => setShowSearch(true)} />
                )}
              </div>

              {/* Mobile-Specific Action Items (Visible only below md breakpoint) */}
              <div className="flex md:hidden items-center gap-3">
                <button onClick={() => setShowSearch(!showSearch)} className="hover:text-[#e3a20a] transition-colors p-1">
                  <Search size={20} />
                </button>
                <Link href="/chat-with-ai" className="text-[#1a2b4b] hover:text-[#e3a20a] transition-colors p-1" title="AI Concierge">
                  <Sparkles size={20} className="text-[#e3a20a]" />
                </Link>
              </div>

              {/* User Account Actions with Flyout Menu */}
              <div 
                className="relative" 
                onMouseEnter={() => setIsUserMenuOpen(true)} 
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button 
                  className="flex items-center py-2 focus:outline-none p-1"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={22} className={mounted && user ? "text-[#e3a20a]" : "text-[#1a2b4b] hover:text-[#e3a20a] transition-colors"} />
                </button>

                {isUserMenuOpen && mounted && (
                  <div className="absolute right-0 top-full w-52 bg-white shadow-2xl border-t-2 border-[#1a2b4b] py-2 z-[130]">
                    {!user ? (
                      <div className="flex flex-col">
                        <Link href="/login" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase text-gray-700 hover:bg-gray-50 hover:text-black">
                          Login
                        </Link>
                        <Link href="/register" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-[11px] font-bold uppercase hover:bg-gray-50 text-[#e3a20a]">
                          Join Now
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100 mb-1 bg-gray-50/60">
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Account Mode</p>
                          <p className="text-[11px] font-bold truncate text-[#1a2b4b]">{user.name}</p>
                          {user.role === 'admin' && (
                            <span className="inline-block bg-red-50 text-red-600 text-[8px] px-1.5 py-0.5 font-bold uppercase tracking-widest rounded-[2px] mt-1">
                              Artisan Admin
                            </span>
                          )}
                        </div>
                        
                        <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase text-gray-700 hover:bg-gray-50">
                          <Settings size={14}/> My Profile
                        </Link>

                        {user.role === 'admin' && (
                          <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase bg-amber-50/50 hover:bg-amber-50 text-amber-800 border-y border-amber-100/60 my-1 transition-all">
                            <ShieldAlert size={14} className="text-[#e3a20a]" /> Control Dashboard
                          </Link>
                        )}
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-[11px] font-bold uppercase hover:bg-red-50 text-red-500 transition-colors mt-1"
                        >
                          <LogOut size={14}/> Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Link */}
              <Link href="/wishlist" className="relative hover:text-[#e3a20a] transition-colors p-1">
                <Heart size={20} />
                {mounted && wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Link */}
              <Link href="/cart" className="relative hover:text-[#e3a20a] transition-colors p-1">
                <ShoppingBag size={22} />
                {mounted && cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#e3a20a] text-white text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-sm">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Dropdown Expandable Mobile Search Field Container */}
        {showSearch && (
          <div className="md:hidden w-full bg-gray-50 px-4 py-3 border-b border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-md px-3 py-2 border border-gray-200">
              <input 
                type="text" 
                className="bg-transparent text-xs outline-none w-full text-black p-1" 
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="p-1">
                <Search size={16} className="text-gray-500" />
              </button>
              <button type="button" onClick={() => setShowSearch(false)} className="p-1 ml-1 text-gray-400">
                <X size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Sliding Navigation Drawer for Mobile Screens */}
        <div 
          className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`fixed left-0 top-0 h-full w-[280px] bg-white transition-transform duration-300 z-[210] flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b">
              <span className="font-serif font-bold text-[#1a2b4b] tracking-widest uppercase">Menu</span>
              <X size={24} onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer" />
            </div>

            <div className="px-4 pt-4">
              <Link 
                href="/chat-with-ai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#1a2b4b] to-[#2a3c61] text-white text-xs font-bold uppercase tracking-widest shadow-md"
              >
                <Sparkles size={14} className="text-[#e3a20a]" />
                Ask Luxury AI
              </Link>
            </div>

            <div className="flex flex-col p-4 overflow-y-auto grow">
              {navData.map((item) => (
                <Link 
                  key={item.title} 
                  href={item.path || '#'} 
                  className="py-4 text-[12px] font-bold border-b border-gray-50 uppercase tracking-widest text-[#1a2b4b]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;