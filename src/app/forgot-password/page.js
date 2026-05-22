"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import {
  Mail,
  ArrowLeft,
  Send,
  Loader2,
} from "lucide-react";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const { data } = await axios.post(
        "/api/auth/forgot-password",
        { email }
      );

      setMessage(
        "Success! Please check your email for the reset link."
      );

      console.log(data);

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-4">

      <div className="max-w-md w-full bg-white shadow-2xl border-t-4 border-[#1a2b4b] p-8 md:p-12">

        <div className="text-center mb-8">

          <h2 className="text-2xl font-serif font-bold text-[#1a2b4b] uppercase">
          RESET YOUR PASSWORD
          </h2>

          <p className="text-[10px] tracking-[2px] text-[#e3a20a] uppercase mt-2 font-bold">
            Nida J. Legacy
          </p>

        </div>

        {message && (
          <div
            className={`p-3 mb-4 text-[11px] font-bold text-center uppercase border ${
              message.includes("Success")
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div className="border-b border-gray-200 pb-2">

            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
              Registered Email
            </label>

            <div className="flex items-center">

              <Mail
                size={16}
                className="text-gray-300 mr-3"
              />

              <input
                type="email"
                className="w-full outline-none text-sm bg-transparent"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a2b4b] text-white py-4 text-[11px] font-bold uppercase tracking-[4px] flex items-center justify-center gap-3 hover:bg-black transition-all disabled:bg-gray-400"
          >

            {loading ? (
              <Loader2
                className="animate-spin"
                size={16}
              />
            ) : (
              "Send Reset Link"
            )}

            {!loading && <Send size={14} />}

          </button>

        </form>

        <Link
          href="/login"
          className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase text-gray-500 hover:text-[#1a2b4b] tracking-widest"
        >
          <ArrowLeft size={14} />
          Back to Login
        </Link>

      </div>
    </div>
  );
};

export default ForgotPassword;