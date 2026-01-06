"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import api from "@/services/api";
import Image from "next/image";
import { MatrixContext } from "@/context/MatrixContext";
import { useAuth } from "@/context/AuthContext"; // <--- 1. Import Auth Hook

export default function LoginPage() {
  const { login } = useAuth(); // <--- 2. Get login function from Context
  const router = useRouter(); // (Optional: Context usually handles redirect, but good to keep if needed for error handling)
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.login(formData);
      // This handles localStorage, state update (Navbar), and redirection automatically
      login(res.token, res.user || res);

    } catch (err) {
      // console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatrixContext>
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden text-slate-300 font-sans">
        <div className="inset-shadow-sm inset-shadow-indigo-500/50 z-10 w-full max-w-md p-8 bg-[#111827]/80 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/assets/favicon.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="text-xl font-semibold text-white">Cyberguard</h1>
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Welcome Back</h2>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-xs text-slate-400 hover:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Secure Login <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm">
            <span className="text-slate-500"> Don&apos;t have an account? </span>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </MatrixContext>
  );
}