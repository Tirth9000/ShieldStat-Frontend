"use client";
import Image from "next/image";
import Link from "next/link";
import { MatrixContext } from "@/context/MatrixContext";

export default function LandingPage() {
  return (
    <MatrixContext>
      <main className="flex-grow flex flex-col items-center justify-center w-full min-h-screen py-20">

        <div className="flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600 blur-[90px] opacity-40 rounded-full pointer-events-none"></div>

            <Image
              src="/assets/favicon.png"
              width={140}
              height={140}
              alt="Cyberguard Hero"
              priority
              className="animate-spin-y logo-glow object-contain relative z-10"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-8">
            <span className="text-slate-900 dark:text-white">Cyber Reconnaissance</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              & Risk Visibility
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Add Something after some thing here. you need that add that.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/login">
              <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 cursor-pointer">
                Start Free Scan
              </button>
            </Link>

            <Link href="/demoPage">
              <button className="px-8 py-3.5 border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:-translate-y-1 cursor-pointer">
                Book Demo
              </button>
            </Link>
          </div>
        </div>
      </main>
    </MatrixContext>
  );
}