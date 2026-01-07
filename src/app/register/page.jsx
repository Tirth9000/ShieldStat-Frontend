"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from "lucide-react";
import api from "@/services/api";
import Image from "next/image";
import { MatrixContext } from "../../context/MatrixContext";
import { useAuth } from "@/context/AuthContext"; 

export default function RegisterPage() {
  const { login } = useAuth(); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const apiPayload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      console.log("Submitting Payload:", apiPayload);
      const res = await api.register(apiPayload);

      if (res.token) {
        // If API returns token, log them in immediately (Updates Navbar)
        login(res.token, res.user || res); 
      } else {
        // Otherwise, send them to login page
        router.push("/login");
      }

    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatrixContext>
      <main className="h-screen w-full flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden text-slate-300 font-sans pt-15">
        <div className="inset-shadow-sm inset-shadow-indigo-500/50 z-10 w-full max-w-md p-8 bg-[#111827]/80 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/favicon.png"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
              <h1 className="text-xl font-semibold text-white">Cyberguard</h1>
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">
              Create Account
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-400 bg-red-900/20 border border-red-900 rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-400">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  placeholder="Name Surname"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

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
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-400">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#1f2937] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 mt-2 transition-all"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  Sign Up <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>
    </MatrixContext>
  );
}