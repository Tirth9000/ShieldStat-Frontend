"use client";

import Navbar from "@/components/Navbar";
import NewScan from "./new/page";
import { MatrixContext } from "@/context/MatrixContext";

export default function AssessmentPage() {
  return (
    <MatrixContext>
      <div className="min-h-screen w-ful transp text-whit">
        <Navbar />
        <main className="pt-24 px-6 backdrop-blur-none">
          <NewScan />
        </main>
      </div>
    </MatrixContext>
  );
}
