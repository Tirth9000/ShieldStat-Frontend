"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <>
            {/* side panel */}
            <div className="bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg flex flex-col items-center justify-between py-5 fixed top-0 left-0 h-screen w-16 p-3 border-r border-gray-800 z-[60]">
                <button
                    onClick={onClose}
                    className="p-2 text-white hover:bg-gray-700 rounded-lg transition-opacity cursor-pointer mb-2"
                >
                    <Image
                        src="/assets/favicon.png"
                        alt="Cyberguard Logo"
                        width={32}
                        height={32}
                        className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all"
                    />
                </button>
                <UserProfileDropdown />
            </div>

            <>
                <div
                    className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={onClose}
                />

                {/* side menu */}
                <div className={`bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg flex flex-col gap-8 fixed top-0 left-16 h-screen border-r border-gray-800 rounded-xl z-50 text-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
                }`}>
                    <div className={`p-7 transition-opacity duration-300 ease-in-out whitespace-nowrap flex flex-col gap-5 ${
                        isOpen ? "opacity-100 delay-100" : "opacity-0"
                    }`}>
                        <div className="flex justify-between items-center">
                            <Image
                                src="/assets/favicon.png"
                                alt="Cyberguard Logo"
                                width={32}
                                height={32}
                                className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all"
                            />
                        </div>

                        <div className="border border-gray-700">

                        </div>

                        <div className="flex flex-col gap-3">
                            {["Dashboard", "Scans", "Reports", "Assessments"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    onClick={onClose}
                                    className={`transition-colors hover:text-gray-300 ${isActive(`/${item.toLowerCase()}`) ? "text-blue-500" : ""
                                        }`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}
