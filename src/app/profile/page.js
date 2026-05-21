"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
// Sahi named export 'loginUser' import kar rahe hain
import { loginUser } from '@/redux/slices/authSlice'; 

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    // Redux store se user ka data nikalna
    const { user } = useSelector((state) => state.auth || { user: null });

    // Client-side mount checker (Next.js hydration errors se bachne ke liye)
    useEffect(() => {
        setMounted(true);
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    // Agar user logged in nahi hai to login page par redirect karein
    useEffect(() => {
        if (mounted && !user) {
            router.push('/login');
        }
    }, [user, mounted, router]);

    if (!mounted || !user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a2b4b]"></div>
            </div>
        );
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put('/api/auth/users/profile', 
                { name, email, password }, 
                config
            );

            dispatch(loginUser(data)); 
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            toast.success("Profile Updated Successfully!");
            setPassword(''); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-md w-full border-t-8 border-[#1a2b4b]">
                <div className="bg-[#1a2b4b] p-6 text-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 border-4 border-[#e3a20a] flex items-center justify-center overflow-hidden">
                        <span className="text-3xl font-bold text-[#1a2b4b] uppercase">
                            {name ? name.charAt(0) : 'U'}
                        </span>
                    </div>
                    <h2 className="text-white text-2xl font-bold uppercase tracking-widest truncate px-4">{name}</h2>
                    <p className="text-[#e3a20a] text-sm italic">Legacy Member</p>
                </div>

                <form onSubmit={submitHandler} className="p-8 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full border-b-2 border-gray-300 py-2 focus:border-[#1a2b4b] outline-none transition-colors text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full border-b-2 border-gray-300 py-2 focus:border-[#1a2b4b] outline-none transition-colors text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase">New Password (Leave blank to keep same)</label>
                        <input
                            type="password"
                            className="w-full border-b-2 border-gray-300 py-2 focus:border-[#1a2b4b] outline-none transition-colors text-black"
                            value={password}
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1a2b4b] text-white font-bold py-3 mt-6 hover:bg-[#111c31] transition-all shadow-lg disabled:bg-gray-400"
                    >
                        {loading ? 'SAVING...' : 'UPDATE PROFILE'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;