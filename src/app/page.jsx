"use client";

<<<<<<< HEAD
import LandingPage from "./LandingView/page"; 

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
=======
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import DashboardPage from "./dashboard/page";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

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
>>>>>>> cc6e118 (Add files via upload)
