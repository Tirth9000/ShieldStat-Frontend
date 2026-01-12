"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown";
import { BsArrowBarLeft } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuScanSearch } from "react-icons/lu";
import { TbReportSearch, TbClipboardCheck } from "react-icons/tb";

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarItems = [
        { name: "Dashboard", icon: MdOutlineSpaceDashboard },
        { name: "Scans", icon: LuScanSearch },
        { name: "Reports", icon: TbReportSearch },
        { name: "Assessments", icon: TbClipboardCheck }
    ];

    const isActive = (path) => pathname === path;

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // return no component is the user is not logged in
    if (!user) {
        return null;
    }

    return (
        <>
            {/* side panel */}
            <div className="bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg flex flex-col items-center justify-between py-5 fixed top-0 left-0 h-screen w-16 p-3 border-r border-gray-800 z-60">

                <div className="flex flex-col gap-8">

                    <button
                        onClick={openMenu}
                        className="p-2 text-white hover:bg-gray-800 rounded-lg transition-opacity cursor-pointer mb-2"
                    >
                        <Image
                            src="/assets/favicon.png"
                            alt="Cyberguard Logo"
                            width={32}
                            height={32}
                            className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all"
                        />
                    </button>

                    <div className="flex flex-col gap-3 items-center">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.name}
                                href={`/${item.name.toLowerCase()}`}
                                className={`p-2 text-white hover:text-gray-300 rounded-lg transition-all`}
                                title={item.name}
                                onClick={closeMenu}
                            >
                                <item.icon 
                                    size={20} 
                                    className={`transition-all duration-300 ease-in-out ${isActive(`/${item.name.toLowerCase()}`) ? "text-[#ef28ed]" : ""}`} 
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <UserProfileDropdown isOpen={isOpen} />
            </div>

            <>
                <div
                    className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={closeMenu}
                />

                {/* side menu */}

                {/* bg blur */}
                <div className={`bg-[#0d0d1a]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between fixed top-0 left-16 h-screen border-r border-gray-800 rounded-xl z-50 text-lg transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
                    }`}>

                    {/* menu items */}
                    <div className={`p-5 transition-opacity duration-300 ease-in-out whitespace-nowrap flex flex-col gap-5 ${isOpen ? "opacity-100 delay-100" : "opacity-0"
                        }`}>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold tracking-wide text-white group-hover:text-gray-200 transition-colors">
                                Cyberguard
                            </span>
                            <button
                                onClick={closeMenu}
                                className="p-2 text-white hover:bg-gray-800 rounded-lg transition-opacity cursor-pointer"
                            >
                                <BsArrowBarLeft size={20} />
                            </button>
                        </div>


                        {/* divider line */}
                        <div className="border border-gray-700"></div>

                        <div className="flex flex-col gap-5 mt-1.5">
                            {sidebarItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={`/${item.name.toLowerCase()}`}
                                    onClick={closeMenu}
                                    className={`transition-colors hover:text-gray-300 ${isActive(`/${item.name.toLowerCase()}`) ? "text-[#ef28ed]" : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* bottom section / sign out */}
                    
                </div>
            </>
        </>
    );
}
