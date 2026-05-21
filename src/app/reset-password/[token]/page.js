"use client";

import { useState } from "react";

import { useParams, useRouter }
from "next/navigation";

import axios from "axios";

const ResetPassword = () => {

  const [password, setPassword] = useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const params = useParams();

  const router = useRouter();

  const token = params.token;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      const { data } = await axios.put(
        `/api/auth/reset-password/${token}`,
        { password }
      );

      alert(data.message);

      router.push("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg border-t-4 border-[#1a2b4b]">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-[#1a2b4b] uppercase tracking-widest">
            Nida J.
          </h2>

          <p className="text-[#e3a20a] text-sm mt-1 uppercase">
            Set New Password
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div className="space-y-4">

            <div>

              <label className="text-xs font-bold text-gray-600 uppercase">
                New Password
              </label>

              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1a2b4b]"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            <div>

              <label className="text-xs font-bold text-gray-600 uppercase">
                Confirm Password
              </label>

              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1a2b4b]"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 text-sm font-bold text-white bg-[#1a2b4b]"
          >

            {loading
              ? "UPDATING..."
              : "UPDATE PASSWORD"}

          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;