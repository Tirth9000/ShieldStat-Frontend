"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserProfileDropdown() {
  const { logout, user } = useAuth(); // Keeping your Context logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click Outside Logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // First letter of username helper
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`relative h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-inner transition-all duration-200 focus:outline-none ${
          isDropdownOpen
            ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f0f0f]"
            : "hover:ring-2 hover:ring-gray-600"
        }`}
      >
        {getInitials(user?.username)}
      </button>

      {/* Dropdown Menu (The UI you liked) */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-12 w-80 bg-[#1e1e20] rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
          
          {/* Close Button (X) */}
          <button
            onClick={() => setIsDropdownOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* User Info Section */}
          <div className="flex flex-col items-center pt-10 pb-6 px-6 w-full text-center">
            {/* Large Profile Circle */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-3xl font-bold text-white shadow-inner mb-4 ring-4 ring-[#2a2a2c]">
              {getInitials(user?.username)}
            </div>

            {/* Name & Email */}
            <h3 className="text-lg font-semibold tracking-tight text-white">
              Hello, {user?.username || "Guest"}!
            </h3>
            <p className="text-sm text-gray-400 mt-1 font-medium truncate max-w-full px-4">
              {user?.email || "No email linked"}
            </p>

            {/* Free Plan Badge Feature */}
            <div className="mt-4">
              <span className="px-3 py-1 rounded-full border border-gray-600 text-xs text-gray-400 font-medium">
                Free Plan
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5"></div>

          {/* Logout Section */}
          <div className="w-full bg-[#252527] p-5">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-[#2d2d30] hover:bg-[#353538] text-gray-200 hover:text-white transition-all duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 rounded text-gray-400 group-hover:text-red-400 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              <span className="font-medium text-sm">Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}