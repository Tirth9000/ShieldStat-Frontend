"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
<<<<<<< HEAD
import AssessmentReport from "./AssessmentReport/page";

import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  EyeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ChevronRightIcon,
=======
import Navbar from "@/components/Navbar";
import AssessmentReport from "./AssessmentReport/page"; 

import { 
  CalendarDaysIcon, 
  CheckCircleIcon, 
  ClipboardDocumentListIcon, 
  PlusIcon,
  EyeIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ChevronRightIcon
>>>>>>> dc323aa (nev and assessment)
} from "@heroicons/react/24/outline";

const DashboardHistory = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getHistory();
        setAssessments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  const handleViewReport = (id) => {
    setSelectedId(id);
<<<<<<< HEAD
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to get color classes based on risk level
  const getLevelColor = (grade) => {
    switch (grade) {
      case "A":
      case "Secure":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"; // Green

      case "B":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"; // Blue

      case "C":
      case "Moderate":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"; // Yellow

      case "D":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"; // Orange

      case "F":
      case "Critical":
        return "bg-red-500/10 text-red-400 border-red-500/20"; // Red

      default:
=======
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // === FIX: Handle BOTH Letters (New) and Words (Old) ===
  const getLevelColor = (grade) => {
    switch (grade) {
      case "A": 
      case "Secure": // Fix for old data
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"; // Green
        
      case "B": 
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";       // Blue
        
      case "C": 
      case "Moderate": // Fix for old data
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"; // Yellow
        
      case "D": 
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"; // Orange
        
      case "F": 
      case "Critical": // Fix for old data
        return "bg-red-500/10 text-red-400 border-red-500/20";           // Red
        
      default:  
>>>>>>> dc323aa (nev and assessment)
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

<<<<<<< HEAD
  // Function to get icon based on risk level
  const getLevelIcon = (grade) => {
    switch (grade) {
      case "A":
      case "Secure":
        return <ShieldCheckIcon className="w-5 h-5" />;

      case "B":
        return <CheckCircleIcon className="w-5 h-5" />;

      case "C":
      case "Moderate":
      case "D":
        return <ExclamationTriangleIcon className="w-5 h-5" />;

      case "F":
      case "Critical":
        return <XCircleIcon className="w-5 h-5" />;

      default:
=======
  // === FIX: Handle Icons for both formats ===
  const getLevelIcon = (grade) => {
    switch (grade) {
      case "A": 
      case "Secure": 
        return <ShieldCheckIcon className="w-5 h-5" />;
        
      case "B": 
        return <CheckCircleIcon className="w-5 h-5" />;
        
      case "C": 
      case "Moderate":
      case "D": 
        return <ExclamationTriangleIcon className="w-5 h-5" />;
        
      case "F": 
      case "Critical": 
        return <XCircleIcon className="w-5 h-5" />;
        
      default:  
>>>>>>> dc323aa (nev and assessment)
        return <ShieldCheckIcon className="w-5 h-5" />;
    }
  };

  return (
<<<<<<< HEAD
    <main className="bg-[#0f1115] pb-24 px-6 md:px-12 text-white font-sans border-t border-gray-800">
      <div className="pt-16 px-6 md:px-12 bg-[#0f1115]">
        <AssessmentReport id={selectedId} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center max-w-6xl mx-auto mb-8 mt-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
            Assessment History
          </h1>
          <p className="text-gray-400">
            View details of your past security assessments below.
          </p>
        </div>

        <button
          onClick={() => router.push("/assessments/SecurityAssessment")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-900/20"
        >
          <PlusIcon className="w-5 h-5" />
          New Assessment
        </button>
      </div>

      <div className="bg-[#16181c] rounded-xl border border-gray-800 overflow-hidden max-w-6xl mx-auto shadow-xl">
        {/* --- TABLE HEADER --- */}
        <div className="grid grid-cols-12 gap-6 p-4 border-b border-gray-800 text-gray-500 text-xs font-bold uppercase tracking-wider bg-[#1c1f24]/50">
          <div className="col-span-3 text-left">Date</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Grade</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-2 text-right pr-20">Actions</div>
        </div>

        {assessments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <ClipboardDocumentListIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              No History Found
            </h3>
            <p className="text-gray-500 max-w-sm mb-8">
              You haven&apos;t run any security assessments yet.
            </p>
            <button
              onClick={() => router.push("/assessments/SecurityAssessment")}
              className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-400 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              Start Assessment <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          assessments.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-6 p-4 border-b border-gray-800 items-center hover:bg-[#1c1f24] transition group ${
                selectedId === item._id
                  ? "bg-blue-900/10 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              {/* Date */}
              <div className="col-span-3 text-gray-300 text-sm flex items-center gap-3">
                <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                  <CalendarDaysIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="col-span-2 font-bold text-xl text-white text-center">
                {item.score}
              </div>

              {/* Grade Badge */}
              <div className="col-span-2 flex justify-center">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getLevelColor(
                    item.risk_level
                  )}`}
                >
                  {getLevelIcon(item.risk_level)}
                  <span className="font-bold">{item.risk_level}</span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-3 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-900/20 text-green-400 border border-green-900/30">
                  <CheckCircleIcon className="w-3.5 h-3.5" />
                  Completed
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 w-full md:w-auto flex justify-end items-center gap-2 mt-2 md:mt-0 pr-2">
                <button
                  onClick={() => handleViewReport(item._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white rounded-lg transition text-sm font-medium"
                >
                  View
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDownload(e, item._id)}
                  title="Download Report"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLine
                      join="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default DashboardHistory;
=======
    <>
      <Navbar />
      
      <div className="pt-16 px-6 md:px-12 bg-[#0f1115]">
          <AssessmentReport id={selectedId} /> 
      </div>

      <main className="bg-[#0f1115] pb-24 px-6 md:px-12 text-white font-sans border-t border-gray-800">
        
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center max-w-6xl mx-auto mb-8 mt-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <ClipboardDocumentListIcon className="w-8 h-8 text-blue-500" />
              Assessment History
            </h1>
            <p className="text-gray-400">
              View details of your past security assessments below.
            </p>
          </div>
          
          <button
            onClick={() => router.push("/assessments/SecurityAssessment")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-900/20"
          >
            <PlusIcon className="w-5 h-5" />
            New Assessment
          </button>
        </div>

        <div className="bg-[#16181c] rounded-xl border border-gray-800 overflow-hidden max-w-6xl mx-auto shadow-xl">
          
          {/* --- TABLE HEADER --- */}
          <div className="grid grid-cols-12 gap-6 p-4 border-b border-gray-800 text-gray-500 text-xs font-bold uppercase tracking-wider bg-[#1c1f24]/50">
            <div className="col-span-3 text-left">Date</div>       
            <div className="col-span-2 text-center">Score</div>    
            <div className="col-span-2 text-center">Grade</div>    
            <div className="col-span-3 text-center">Status</div>   
            <div className="col-span-2 text-right pr-4">Actions</div> 
          </div>

          {assessments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                <ClipboardDocumentListIcon className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No History Found</h3>
              <p className="text-gray-500 max-w-sm mb-8">
                You haven&apos;t run any security assessments yet.
              </p>
              <button
                onClick={() => router.push("/assessments/SecurityAssessment")}
                className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-400 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                Start Assessment <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            assessments.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-6 p-4 border-b border-gray-800 items-center hover:bg-[#1c1f24] transition group ${selectedId === item._id ? 'bg-blue-900/10 border-l-4 border-l-blue-500' : ''}`}
              >
                {/* Date */}
                <div className="col-span-3 text-gray-300 text-sm flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                    <CalendarDaysIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-2 font-bold text-xl text-white text-center">
                  {item.percentage}<span className="text-gray-600 text-sm font-normal">%</span>
                </div>

                {/* Grade Badge */}
                <div className="col-span-2 flex justify-center">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getLevelColor(item.risk_level)}`}>
                    {getLevelIcon(item.risk_level)}
                    <span className="font-bold">{item.risk_level}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-900/20 text-green-400 border border-green-900/30">
                    <CheckCircleIcon className="w-3.5 h-3.5" />
                    Completed
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end pr-4">
                  <button
                    onClick={() => handleViewReport(item._id)} 
                    title="View Report Details"
                    className="p-2 text-blue-400 hover:text-white hover:bg-blue-600 rounded-lg transition"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardHistory;
>>>>>>> dc323aa (nev and assessment)
