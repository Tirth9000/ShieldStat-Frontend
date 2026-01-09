"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
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
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

import { MatrixContext } from "@/context/MatrixContext";

// Helper for colors
const getRiskColors = (color) => {
  switch (color) {
    case "green":
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: <ShieldCheckIcon className="w-4 h-4" />,
      };
    case "yellow":
      return {
        badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        icon: <ExclamationTriangleIcon className="w-4 h-4" />,
      };
    case "red":
      return {
        badge: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: <XCircleIcon className="w-4 h-4" />,
      };
    default:
      return {
        badge: "bg-gray-500/10 text-gray-400 border-gray-500/20",
        icon: <ShieldCheckIcon className="w-4 h-4" />,
      };
  }
};

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
        console.error("Failed to fetch history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleViewReport = (id) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = async (_id) => {
    try {
      const pdfBlob = await api.downloadAssessmentPDF(_id);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assessment-${_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF");
    }
  };

  return (
    <MatrixContext>
      <main className="pb-24 px-6 md:px-12 text-white font-sans border-t border-gray-800">
        {/* TOP SECTION: ACTIVE REPORT */}
        <div className="pt-16 px-6 md:px-12">
          <AssessmentReport id={selectedId} />
        </div>

        <div className="max-w-7xl mx-auto mt-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4 pb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ClipboardDocumentListIcon className="w-7 h-7 text-blue-500" />
                Assessment History
              </h2>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                A comprehensive log of all your past security evaluations.
              </p>
            </div>

            <button
              onClick={() => router.push("/assessments/SecurityAssessment")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-900/20 text-sm"
            >
              <PlusIcon className="w-4 h-4" />
              New Assessment
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-[#16181c] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
            {/* --- TABLE HEADER --- */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#1c1f24] border-b border-gray-800 text-gray-500 text-xs font-bold uppercase tracking-wider items-center">
              <div className="col-span-4 pl-4">Date & Time</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-3 text-center">Grade</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-right pr-2">Actions</div>
            </div>

            {/* --- TABLE BODY --- */}
            <div className="divide-y divide-gray-800">
              {assessments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                    <ClipboardDocumentListIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-1">
                    No History Found
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Start your first security assessment today.
                  </p>
                  <button
                    onClick={() =>
                      router.push("/assessments/SecurityAssessment")
                    }
                    className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-400 rounded-full hover:bg-blue-600 hover:text-white transition text-sm"
                  >
                    Start Now <ChevronRightIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                assessments.map((item, index) => {
                  const style = getRiskColors(item.summary.risk_color);
                  const isSelected = selectedId === item._id;

                  return (
                    <div
                      key={index}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 group cursor-default
                      ${
                        isSelected
                          ? "bg-blue-900/10 border-l-4 border-l-blue-500" // Active State
                          : "hover:bg-[#1c1f24] border-l-4 border-l-transparent" // Default State (transparent border prevents jumping)
                      }
                    `}
                    >
                      {/* Date Column */}
                      <div className="col-span-4 flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isSelected
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                          }`}
                        >
                          <CalendarDaysIcon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-semibold ${
                              isSelected ? "text-blue-100" : "text-gray-200"
                            }`}
                          >
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Score Column */}
                      <div className="col-span-2 flex justify-center">
                        <span
                          className={`text-xl font-bold ${
                            isSelected ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {item.summary.score}
                        </span>
                      </div>

                      {/* Grade Column */}
                      <div className="col-span-3 flex justify-center">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm ${style.badge}`}
                        >
                          {style.icon}
                          <span className="text-xs font-bold uppercase tracking-wide">
                            {item.summary.grade}{" "}
                            <span className="opacity-60 mx-1">|</span>{" "}
                            {item.summary.risk_level}
                          </span>
                        </div>
                      </div>

                      {/* Status Column */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400">
                          <CheckCircleIcon className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Completed
                          </span>
                        </div>
                      </div>

                      {/* Actions Column */}
                      <div className="col-span-1 flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleViewReport(item._id)}
                          title="View Report"
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <div className="h-4 w-px bg-gray-700 mx-1"></div>{" "}
                        {/* Separator */}
                        <button
                          onClick={() => handleDownload(item._id)}
                          title="Download PDF"
                          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </MatrixContext>
  );
};

export default DashboardHistory;
