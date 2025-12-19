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
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-5xl font-bold mb-4">iSecurify</h1>
      <Button onClick={() => router.push("/scans/new")}>
        Start New Scan
      </Button>
    </main>
  );
}
>>>>>>> cc6e118 (Add files via upload)
