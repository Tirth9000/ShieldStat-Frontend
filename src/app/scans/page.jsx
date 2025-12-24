"use client";

import Navbar from "@/components/Navbar";
import NewScan from "./new/page";

export default function AssessmentPage() {
  return(
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <main className="pt-24 px-6">
        <NewScan />
      </main>
    </div>
  );
}