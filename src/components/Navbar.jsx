"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // hide navbar when user is logged in
    if (user) {
        return null;
    }


  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      {/* LEFT: LOGO */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative">
          <Image
            src="/assets/favicon.png"
            alt="Cyberguard Logo"
            width={32}
            height={32}
            className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all"
          />
        </div>
        <span className="text-lg font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors">
          ShieldStat
        </span>
      </Link>

      {/* MIDDLE: NAVIGATION LINKS */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        {user ? (
          <>
            {["Dashboard", "Scans", "Reports", "Assessments"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`transition-colors hover:text-white ${
                  isActive(`/${item.toLowerCase()}`) ? "text-blue-500" : ""
                }`}
        >

            {/* LEFT: LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                    <Image
                        src="/assets/favicon.png"
                        alt="Cyberguard Logo"
                        width={32}
                        height={32}
                        className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all"
                    />
                </div>
                <span className="text-lg font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors">
                    Cyberguard
                </span>
            </Link>

            {/* MIDDLE: NAVIGATION LINKS */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <Link href="/webScore" className="hover:text-white transition-colors">All Web Score</Link>
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>

      {/* RIGHT: ACTION BUTTON */}
      <div className="flex items-center gap-4">
        {user ? (
          <UserProfileDropdown />
        ) : (
          <Link href="/login">
            <button className="group relative px-6 py-2 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="absolute inset-0 w-0 bg-blue-600/20 transition-all duration-250 ease-out group-hover:w-full" />
              <span className="relative text-sm font-semibold text-white group-hover:text-blue-100">
                Login / Sign Up
              </span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}