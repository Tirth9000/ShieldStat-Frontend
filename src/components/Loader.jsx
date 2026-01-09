"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/assets/favicon.png";

export default function Loader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex items-center justify-center">

        {/* Outer rotating ring */}
        <div className="absolute w-48 h-48 rounded-full border-4 border-transparent border-t-blue-600 border-b-purple-600 animate-spin" />

        {/* Inner static ring */}
        <div className="absolute w-40 h-40 rounded-full border border-white/20" />

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
