"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserProfileDropdown({ isOpen }) {
    const { logout, user } = useAuth();

    // First letter of username helper
    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    return (
        <div className="relative">
            {/* name initial profile picture */}
            <div
                className={`relative h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-inner transition-all duration-200 focus:outline-none ${isOpen
                    ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f0f0f]"
                    : "hover:ring-2 hover:ring-gray-600"
                    }`}
            >
                {getInitials(user?.username)}
            </div>

            {/* user info and sign out */}
            <div className={`absolute left-15 bottom-[-10] w-59 bg-gray-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-gray-100 z-70 overflow-hidden transition-all ease-in-out ${isOpen ? "opacity-100 duration-800" : "opacity-0 pointer-events-none duration-200"}`}>

                    {/* User Info Section */}
                    <div className={`flex flex-col items-center pt-10 pb-6 px-6 w-full text-center transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}>

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
                    <div className={`w-full bg-gray-800 p-5 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-gray-700 hover:bg-[#353538] text-gray-200 hover:text-white transition-all duration-200 group cursor-pointer"
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
        </div>
    );
}