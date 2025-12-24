"use client";

import Navbar from "@/components/Navbar";

export default function DashboardPage() {
    return(
        <div className="min-h-screen w-full bg-black text-white">
              <Navbar />
              <div className="pt-24 px-6">
                <h1 className="flex items-center justify-center">Dashboard Content</h1>
              </div>
            </div>
    )
}