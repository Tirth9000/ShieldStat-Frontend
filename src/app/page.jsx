"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import router
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import DashboardPage from "./dashboard/page";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const t = setTimeout(() => setLoading(false), 2500);
      return () => clearTimeout(t);
    }
  }, [router]);

  // Show loader while checking auth or waiting for timeout
  if (loading) return <Loader />;

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <div className="pt-24 px-6">
        <DashboardPage />
      </div>
    </main>
  );
}
