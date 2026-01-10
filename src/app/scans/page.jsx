"use client";

import Navbar from "@/components/Navbar";
import NewScan from "./new/page";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-24 px-6">
        <NewScan />
      </main>
    </div>
  );
}