"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { registerUser } from '@/redux/slices/authSlice';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux se status check karna
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Password Match Validation (Client Side)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 2. Dispatching the Action
    const result = await dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));

    // 3. Success Redirect
    if (registerUser.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white shadow-2xl border-t-4 border-[#1a2b4b] p-8 md:p-12 my-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#1a2b4b] uppercase tracking-tighter">
            Join The Legacy
          </h2>
          <p className="text-[10px] tracking-[4px] text-[#e3a20a] uppercase mt-2 font-light">
            Create Your Exclusive Account
          </p>
        </div>

        {/* Display Redux Error if any */}
        {error && (
          <p className="text-red-500 text-[10px] uppercase text-center mb-4 tracking-widest">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div className="relative border-b border-gray-200 pb-2">
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Full Name</label>
            <div className="flex items-center">
              <User size={16} className="text-gray-300 mr-3" />
              <input 
                type="text" 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-100"
                placeholder="Nida Jafar"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative border-b border-gray-200 pb-2">
            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Email Address</label>
            <div className="flex items-center">
              <Mail size={16} className="text-gray-300 mr-3" />
              <input 
                type="email" 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-100"
                placeholder="nida@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* Create Password */}
          <div className="relative border-b border-gray-200 pb-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1">Create Password</label>
            <div className="flex items-center">
              <Lock size={16} className="text-gray-300 mr-3" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-100"
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

          {/* Confirm Password */}
          <div className="relative border-b border-gray-200 pb-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1">Confirm Password</label>
            <div className="flex items-center">
              <ShieldCheck size={16} className="text-gray-300 mr-3" />
              <input 
                type="password" 
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-100"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* Luxury Register Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-[#1a2b4b] text-white py-4 text-[11px] font-bold uppercase tracking-[4px] flex items-center justify-center gap-3 transition-all shadow-lg mt-6 ${loading ? 'opacity-50' : 'hover:bg-black'}`}
          >
            {loading ? "Registering..." : "Create Account"} <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-500">
            Already a member? 
            <Link href="/login" className="text-[#1a2b4b] font-bold ml-2 hover:underline uppercase tracking-wider">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;