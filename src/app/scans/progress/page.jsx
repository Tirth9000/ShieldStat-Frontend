"use client";
<<<<<<< HEAD
=======
import Navbar from "@/components/Navbar";
>>>>>>> cc6e118 (Add files via upload)
import ProgressRing from "@/components/ProgressRing";
import LiveLogs from "@/components/LiveLogs";

export default function ScanProgress() {
  return (
    <>
<<<<<<< HEAD
      <main className="flex flex-col items-center mt-50 px-6">
        <ProgressRing percent={10} />
        <div className="mt-10 w-full max-w-2xl">
=======
      <Navbar />
<<<<<<< HEAD
      <main className="flex flex-col items-center mt-20 px-6">
        <ProgressRing percent={35} />
        <div className="mt-10 w-full max-w-3xl">
>>>>>>> cc6e118 (Add files via upload)
=======
      <main className="flex flex-col items-center mt-50 px-6">
        <ProgressRing percent={10} />
        <div className="mt-10 w-full max-w-2xl">
>>>>>>> dc323aa (nev and assessment)
          <LiveLogs />
        </div>
      </main>
    </>
  );
}
