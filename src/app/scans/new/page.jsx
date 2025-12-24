"use client";
<<<<<<< HEAD
<<<<<<< HEAD

=======
import Navbar from "@/components/Navbar";
>>>>>>> cc6e118 (Add files via upload)
=======

>>>>>>> dc323aa (nev and assessment)
import ScanModeCard from "@/components/ScanModeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewScan() {
  const [mode, setMode] = useState("standard");
  const router = useRouter();

  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <Navbar />

>>>>>>> cc6e118 (Add files via upload)
=======
>>>>>>> dc323aa (nev and assessment)
      <main className="max-w-4xl mx-auto mt-16 px-6">
        <h1 className="text-4xl font-bold text-center">
          New Reconnaissance Mission
        </h1>
        <p className="text-center text-gray-400 mt-2">
          Initiate a comprehensive vulnerability assessment
        </p>

        <div className="mt-10">
          <label className="block text-sm mb-2">Target Domain</label>
          <input
            placeholder="company.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div onClick={() => setMode("quick")}>
            <ScanModeCard
              title="Quick Subdomain"
              desc="Passive enumeration. Fast."
              active={mode === "quick"}
            />
          </div>

          <div onClick={() => setMode("standard")}>
            <ScanModeCard
              title="Standard Recon"
              desc="DNS + Port scanning"
              active={mode === "standard"}
            />
          </div>

          <div onClick={() => setMode("full")}>
            <ScanModeCard
              title="Full Attack Mode"
              desc="Intrusive testing"
              active={mode === "full"}
            />
          </div>
        </div>

        <button
          onClick={() => router.push("/scans/progress")}
          className="w-full mt-12 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
        >
          🚀 Launch Scanner
        </button>
      </main>
    </>
  );
}
