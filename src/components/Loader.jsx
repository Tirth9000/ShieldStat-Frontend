"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/assets/favicon.png";
import { useTheme } from "@/context/ThemeContext";

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 dark:bg-[#0a0c10] transition-colors duration-300">
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div className="absolute w-48 h-48 rounded-full border-4 border-transparent border-t-indigo-600 border-b-violet-600 animate-spin" />

        {/* Inner static ring */}
        <div className="absolute w-40 h-40 rounded-full border border-slate-200 dark:border-white/10" />

        {/* Center logo */}
        <div className="relative z-10 animate-pulse">
          <Image
            src={logo}
            alt="Logo"
            width={90}
            height={90}
            priority
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
