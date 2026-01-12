"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ExclamationTriangleIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import Loader from "@/components/Loader";
import { api } from "@/services/api";

// Helper for colors
const getRiskColors = (color) => {
  switch (color) {
    case "green":
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500",
        bgSoft: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        hex: "#10b981",
      };
    case "yellow":
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-500",
        bgSoft: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        hex: "#eab308",
      };
    case "red":
      return {
        text: "text-red-400",
        bg: "bg-red-500",
        bgSoft: "bg-red-500/10",
        border: "border-red-500/20",
        hex: "#ef4444",
      };
    default:
      return {
        text: "text-gray-400",
        bg: "bg-gray-600",
        bgSoft: "bg-gray-600/10",
        border: "border-gray-600/20",
        hex: "#4b5563",
      };
  }
};

const AssessmentReport = ({ id: propId }) => {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const activeId = propId || params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getHistory();
        const history = Array.isArray(res) ? res : res.data || [];
        const report = activeId
          ? history.find((item) => item._id === activeId)
          : history[0];
        setData(report);
      } catch (err) {
        console.error("Failed to load report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeId]);

  if (loading) return <Loader message="Loading Report Data..." />;
  if (!data) return <></>;

  // Get dynamic colors
  const riskColors = getRiskColors(data.summary.risk_color);

  // Chart Data
  const overallChartData = [
    { name: "Score", value: data.summary.score },
    {
      name: "Gap",
      value: data.summary.max_possible_score - data.summary.score,
    },
  ];

  return (
    <main
      className={` text-white font-sans ${
        propId ? "mb-10" : "min-h-screen p-6"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Security Assessment Report
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Generated on {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-900/20 flex items-center gap-2"
            onClick={() => router.push("/assessments/SecurityAssessment/")}
          >
            <span>Run New Assessment</span>
          </button>
        </div>

        {/* --- SECTION 1: HERO METRICS GRID (Top Left Focused) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* LEFT: Key Stats (Grade, Risk, Points) - Spans 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top Row: Grade & Risk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Card 1: Overall Grade */}
              <div
                className={`relative overflow-hidden rounded-2xl border ${riskColors.border} ${riskColors.bgSoft} p-6 flex flex-col justify-between group`}
              >
                <div className="flex justify-between items-start z-10">
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Overall Grade
                  </h3>
                  <TrophyIcon className={`w-6 h-6 ${riskColors.text}`} />
                </div>
                <div className="mt-4 z-10">
                  <span
                    className={`text-7xl font-black ${riskColors.text} drop-shadow-md`}
                  >
                    {data.summary.grade}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">Security Rating</p>
                </div>
                {/* Glow Background */}
                <div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 opacity-20 blur-3xl rounded-full ${riskColors.bg}`}
                ></div>
              </div>

              {/* Card 2: Risk Level */}
              <div className="bg-[#16181c] rounded-2xl border border-gray-800 p-6 flex flex-col justify-between hover:border-gray-600 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Risk Level
                  </h3>
                  <ExclamationTriangleIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="mt-4">
                  <span
                    className={`text-4xl font-black uppercase tracking-wide ${riskColors.text}`}
                  >
                    {data.summary.risk_level}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on vulnerability analysis
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Total Points */}
            <div className="bg-[#16181c] rounded-2xl border border-gray-800 p-6 flex items-center justify-between hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    Total Points
                  </h3>
                  <p className="text-sm text-gray-600">Weighted Score</p>
                </div>
              </div>
              <div className="text-4xl font-bold text-white flex items-baseline gap-1">
                {data.summary.score}
                <span className="text-xl text-gray-600 font-medium">
                  / {data.summary.max_possible_score}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Chart (Score) - Spans 5 cols */}
          <div className="lg:col-span-5 bg-[#16181c] rounded-2xl border border-gray-800 p-8 flex flex-col items-center justify-center relative shadow-2xl">
            <div className="absolute top-6 left-6">
              <h2 className="text-lg font-bold text-gray-200">
                Security Score
              </h2>
            </div>

            <div className="relative w-64 h-64 mt-4">
              {/* Centered Text in Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span
                  className={`text-5xl font-black ${riskColors.text} drop-shadow-lg`}
                >
                  {data.summary.percentage}%
                </span>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
                  Passed
                </span>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                    paddingAngle={5}
                  >
                    <Cell fill={riskColors.hex} />
                    <Cell fill="#272a30" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4 max-w-xs">
              Your organization has achieved{" "}
              <strong>{data.summary.percentage}%</strong> of the recommended
              security protocols.
            </p>
          </div>
        </div>

        {/* --- SECTION 2: CATEGORY BREAKDOWN --- */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
            Category Performance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.category_scores &&
              data.category_scores.map((cat, index) => {
                const catColors = getRiskColors(cat.color);
                return (
                  <div
                    key={index}
                    className="bg-[#16181c] rounded-2xl border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors">
                        {cat.category_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${catColors.border} ${catColors.text}`}
                      >
                        {cat.risk} ({cat.grade})
                      </span>
                    </div>

                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-3xl font-bold ${catColors.text}`}>
                        {cat.percentage}%
                      </span>
                      <span className="text-sm text-gray-500 font-mono mb-1">
                        {cat.score}/{cat.max_score} pts
                      </span>
                    </div>

                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${catColors.bg} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                        style={{
                          width: `${cat.percentage}%`,
                          boxShadow: `0 0 10px ${catColors.hex}`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssessmentReport;
