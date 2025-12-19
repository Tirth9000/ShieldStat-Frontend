"use client";
import Navbar from "@/components/Navbar";
import ProgressRing from "@/components/ProgressRing";
import LiveLogs from "@/components/LiveLogs";

export default function ScanProgress() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center mt-20 px-6">
        <ProgressRing percent={35} />
        <div className="mt-10 w-full max-w-3xl">
          <LiveLogs />
        </div>
      </main>
    </>
  );
}
