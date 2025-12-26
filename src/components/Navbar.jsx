"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path || (path === "/Dashboard" && pathname === "/");

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

      <div className="flex items-center justify-center gap-12">
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

      {/* User / Profile Section*/}
      <UserProfileDropdown />
      </div>
    </nav>
  );
}