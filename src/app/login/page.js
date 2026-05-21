"use client";

import { useState } from 'react';
import Link from 'next/link'; // Next.js version
import { useRouter } from 'next/navigation'; // Next.js navigation
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '@/redux/slices/authSlice'; // Hamara naya async action

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const router = useRouter(); 
  const dispatch = useDispatch();

  // Redux se status check karne ke liye
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatching our async thunk
    const result = await dispatch(loginUser(formData));
    
    // Agar login kamyab raha (fulfilled) toh home par bhej do
    if (loginUser.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white shadow-2xl border-t-4 border-[#1a2b4b] p-8 md:p-12">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#1a2b4b] uppercase tracking-tighter">
            Welcome Back
          </h2>
          <p className="text-[10px] tracking-[4px] text-[#e3a20a] uppercase mt-2 font-light">
            Nida J. Legacy Luxury
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-50 text-red-600 text-[10px] uppercase tracking-widest p-3 mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative border-b border-gray-200 pb-2">
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
              Email Address
            </label>
            <div className="flex items-center">
              <Mail size={16} className="text-gray-300 mr-3" />
              <input 
                type="email" 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-200"
                placeholder="nida@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative border-b border-gray-200 pb-2">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-bold uppercase text-gray-400">Password</label>
              <Link href="/forgot-password" size={10} className="text-[10px] text-[#e3a20a] hover:underline font-bold uppercase tracking-widest">
                Forgot?
              </Link>
            </div>
            <div className="flex items-center">
              <Lock size={16} className="text-gray-300 mr-3" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Luxury Sign-In Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#1a2b4b] text-white py-4 text-[11px] font-bold uppercase tracking-[4px] flex items-center justify-center gap-3 transition-all shadow-lg mt-8 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'}`}
          >
            {loading ? "Verifying..." : "Sign In"} <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500">
            Don&apos;t have an account? 
            <Link href="/register" className="text-[#1a2b4b] font-bold ml-2 hover:underline tracking-tight">
              JOIN THE LEGACY
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login; 