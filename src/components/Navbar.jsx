<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserProfileDropdown from "./UserProfileDropdown"; 
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user } = useAuth(); 
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

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
          Cyberguard
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
                {item}
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link href="/webScore" className="hover:text-white transition-colors">All Web Score</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </>
        )}
      </div>

      {/* RIGHT: ACTION BUTTON */}
      <div className="flex items-center gap-4">
        {user ? (
          <UserProfileDropdown />
        ) : (
          <Link href="/login">
            <button className="group relative px-6 py-2 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="absolute inset-0 w-0 bg-blue-600/20 transition-all duration-[250ms] ease-out group-hover:w-full" />
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
=======
import logo from "../../public/assets/favicon.png"
=======
"use client";

>>>>>>> dc323aa (nev and assessment)
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) =>
    pathname === path || (path === "/Dashboard" && pathname === "/");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-8 py-4 border-b border-white/20 bg-black/80 backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3 text-lg font-bold tracking-wide text-white">
        <Image
          src="/assets/favicon.png"
          alt="Logo"
          width={32}
          height={32}
          priority
        />
        <span>
          <span className="text-white">Cyberguard</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8 text-sm font-medium text-gray-400">
        <Link
          href="/dashboard"
          className={`transition-colors hover:text-white ${
            isActive("/dashboard") ? "text-[#1514d0]" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/scans"
          className={`transition-colors hover:text-white ${
            isActive("/scans") ? "text-[#1514d0]" : ""
          }`}
        >
          Scans
        </Link>
        <Link
          href="/reports"
          className={`transition-colors hover:text-white ${
            isActive("/reports") ? "text-[#1514d0]" : ""
          }`}
        >
          Reports
        </Link>
        <Link
          href="/assessments"
          className={`transition-colors hover:text-white ${
            isActive("/assessments") ? "text-[#1514d0]" : ""
          }`}
        >
          Assessments
        </Link>
      </div>

      {/* User / Profile Section */}
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#1514d0] to-purple-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all focus:outline-none"
        >
          🧑‍💻
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 w-[350px] bg-[#202124] rounded-[28px] shadow-2xl border border-gray-700 p-4 flex flex-col items-center text-white z-50 animate-in fade-in zoom-in-95 duration-200">
            {/* Header: Close Button & Email */}
            <div className="w-full flex justify-between items-center mb-4 px-2 relative">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
              {/* Updated to professional placeholder */}
              <span className="text-sm text-gray-400 font-medium">
                Chutiye@Chutiye.com
              </span>
              <div className="w-6"></div> {/* Spacer for centering */}
            </div>

            {/* Profile Image with Camera Icon */}
            <div className="relative mb-3 group cursor-pointer">
              <div className="h-20 w-20 rounded-full overflow-hidden border border-gray-600 relative mx-auto">
                <Image
                  src="/assets/favicon.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-black/70 p-1.5 rounded-full border border-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a4.988 4.988 0 011.656-.475 48.422 48.422 0 013.295 0c.571.045 1.135.207 1.656.475a4.989 4.989 0 011.95 1.95A4.988 4.988 0 0119.5 9v10a2.25 2.25 0 01-2.25 2.25h-10.5A2.25 2.25 0 014.5 19V9c0-1.85.955-3.5 2.454-4.479a4.989 4.989 0 011.95-1.95z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Greeting */}
            <h3 className="text-xl font-medium mb-6">Chutiye tu Jana</h3>

            {/* Manage Account Button */}
            <button className="text-[#8ab4f8] border border-[#5f6368] rounded-full px-6 py-2 text-sm font-medium hover:bg-[#303134] transition-colors mb-6 w-fit">
              Manage your Google Account
            </button>

            {/* Logout Section */}
            <div className="w-full bg-[#171717] rounded-xl overflow-hidden mt-1">
              <button
                onClick={() => console.log("Logout clicked")} // Add your actual logout logic here
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-600 hover:text-white"
              >
                {/* Logout Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-5 text-gray-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
>>>>>>> cc6e118 (Add files via upload)
