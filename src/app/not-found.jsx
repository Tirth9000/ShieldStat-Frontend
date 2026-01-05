import React from "react";
import Link from "next/link";
import { MatrixContext } from "@/context/MatrixContext"; // Assuming this handles your canvas background

const NotFound = () => {
  return (
    <MatrixContext>
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden text-slate-300 font-sans selection:bg-indigo-500/30">
        
        {/* Main Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="max-w-md w-full text-center relative bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl ring-1 ring-white/5">
            
            {/* 404 Header with Gradient */}
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse tracking-widest drop-shadow-2xl">
              404
            </h1>

            {/* Rotated Badge */}
            <div className="bg-[#FF6A3D] px-2 py-1 text-sm rounded rotate-12 absolute top-20 left-1/2 -translate-x-1/2 shadow-lg text-white font-mono font-bold tracking-wider border border-[#FF6A3D] z-10">
              PAGE_NOT_FOUND
            </div>

            {/* Error Message */}
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-white md:text-3xl drop-shadow-md font-mono">
                &lt;System Error /&gt;
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                The component you requested has been moved, deleted, or does not
                exist in the <span className="text-indigo-400 font-semibold">Cyberguard</span> database.
              </p>
            </div>

            {/* Improved Button Section */}
            <div className="mt-10 flex items-center justify-center">
              <Link href="/" className="group relative inline-block focus:outline-none focus:ring">
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-indigo-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 rounded-md"></span>
                
                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-indigo-500 bg-black group-active:text-opacity-75 rounded-md group-hover:bg-indigo-950/50 transition-colors">
                  Return to Dashboard
                </span>
              </Link>
            </div>
            
          </div>
        </div>
      </main>
    </MatrixContext>
  );
};

export default NotFound;