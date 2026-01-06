"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import Loader from "@/components/Loader";
import { api } from "@/services/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// convert in ABCDF
const getRiskColors = (risk) => {
  switch (risk) {
    case "A":
    case "Secure":
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500",
        border: "border-emerald-500/50 bg-emerald-500/10",
        hex: "#10b981", // Emerald Green
      };
    case "B":
      return {
        text: "text-blue-400",
        bg: "bg-blue-500",
        border: "border-blue-500/50 bg-blue-500/10",
        hex: "#3b82f6", // Blue
      };
    case "C":
    case "Moderate":
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-500",
        border: "border-yellow-500/50 bg-yellow-500/10",
        hex: "#eab308", // Yellow
      };
    case "D":
      return {
        text: "text-orange-400",
        bg: "bg-orange-500",
        border: "border-orange-500/50 bg-orange-500/10",
        hex: "#f97316", // Orange
      };
    case "F":
    case "Critical":
      return {
        text: "text-red-400",
        bg: "bg-red-500",
        border: "border-red-500/50 bg-red-500/10",
        hex: "#ef4444", // Red
      };
    default:
      return {
        text: "text-gray-400",
        bg: "bg-gray-600",
        border: "border-gray-600/50 bg-gray-600/10",
        hex: "#4b5563", // Gray
      };
  }
};

const AssessmentReport = ({ id: propId }) => {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use the propId if available (clicked from dashboard), otherwise use URL param
  const activeId = propId || params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getHistory();
        // Handle API response structure wrapper
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

  // for that if data is not exist
  if (!data) {
    return <></>;
  }

  const riskColors = getRiskColors(data.risk_level);

  const overallChartData = [
    { name: "Score Achieved", value: data.score },
    { name: "Gap", value: data.max_possible_score - data.score },
  ];

  return (
    <>
      <div
        className={`bg-[#0f1115] text-white font-sans ${
          propId ? "mb-10" : "min-h-screen p-6"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
            <div className="mt-4">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                Security Assessment Report
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Date: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <button
                className="bg-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                onClick={() => router.push("/assessments/SecurityAssessment/")}
              >
                Run New Assessment
              </button>
            </div>
          </div>

          {/* --- TOP SECTION: Score & Gauge --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-[#16181c] rounded-2xl border border-gray-800 p-8 flex flex-col md:flex-row items-center justify-around shadow-2xl">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Security Score</h2>
                <p className="text-gray-400 max-w-xs leading-relaxed">
                  Your current security posture based on the selected
                  assessment.
                </p>
              </div>

              {/* Chart Container */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span
                    className={`text-5xl font-black ${riskColors.text} drop-shadow-lg`}
                  >
                    {data.percentage}%
                  </span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">
                    Score
                  </span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={110}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={6}
                      paddingAngle={4}
                    >
                      {/* FIX: Use the calculated hex color */}
                      <Cell fill={riskColors.hex} />
                      <Cell fill="#272a30" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Side Stats Panel */}
            <div className="flex flex-col gap-4">
              <div
                className={`flex-1 rounded-2xl border p-6 flex flex-col justify-center items-center ${riskColors.border}`}
              >
                <h3 className="text-gray-300 text-xs font-bold uppercase tracking-widest mb-3">
                  Current Risk Level
                </h3>
                <div
                  className={`text-6xl font-black uppercase tracking-wide ${riskColors.text}`}
                >
                  {data.risk_level}
                </div>
              </div>

              <div className="flex-1 bg-[#16181c] rounded-2xl border border-gray-800 p-6 flex flex-col justify-center items-center">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
                  Total Points
                </h3>
                <div className="text-3xl font-bold text-white">
                  {data.score}{" "}
                  <span className="text-xl text-gray-600">
                    / {data.max_possible_score}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTTOM SECTION: Category Progress --- */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 rounded-full mr-3"></span>
              Category Performance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.category_scores &&
                data.category_scores.map((cat, index) => {
                  const catColors = getRiskColors(cat.risk);
                  return (
                    <div
                      key={index}
                      className="bg-[#16181c] rounded-2xl border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-5">
                        <h3 className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors">
                          {cat.category_name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${catColors.border} ${catColors.text}`}
                        >
                          {cat.risk}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mb-2">
                        <span
                          className={`text-3xl font-bold ${catColors.text}`}
                        >
                          {cat.percentage}%
                        </span>
                        <span className="text-sm text-gray-500 font-mono mb-1">
                          {cat.score}/{cat.max_score}
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
      </div>
    </>
  );
};

export default AssessmentReport;
