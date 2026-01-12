"use client";

import React, { useEffect, useState } from "react";
import ExecutiveSummary from "./components/ExecutiveSummary";
import SimpleAssetCard from "./components/SimpleAssetCard";
import { MatrixContext } from "@/context/MatrixContext";

// Paste your FINAL DATA here
const FINAL_DATA = [
  {
    Scanner: "HTTPXFilter",
    Category: "HTTPX FilterScanner",
    Target: "allianzcloud.com",
    Data: {
      subdomain: "https://mail.xyzcloud.com",
      http_data: {
        Subdomain: "mail.xyzcloud.com",
        URL: "https://mail.allianzcloud.com",
        StatusCode: 200,
        Scheme: "https",
        Server: "",
        Technologies: ["Java", "Nginx", "Zimbra"],
        TLS: { Enabled: true },
        Metadata: {
          Title: "Zimbra Web Client Sign In",
          ResponseTimeMs: 1207.357667,
        },
      },
      ports: [
        { Port: 25, Protocol: "tcp" },
        { Port: 110, Protocol: "tcp" },
        { Port: 587, Protocol: "tcp" },
        { Port: 143, Protocol: "tcp" },
        { Port: 80, Protocol: "tcp" },
        { Port: 993, Protocol: "tcp" },
        { Port: 111, Protocol: "tcp" },
        { Port: 995, Protocol: "tcp" },
        { Port: 443, Protocol: "tcp" },
        { Port: 22, Protocol: "tcp" },
        { Port: 465, Protocol: "tcp" },
        { Port: 53, Protocol: "tcp" },
        { Port: 21, Protocol: "tcp" },
      ],
    },
    Severity: "info",
    Timestamp: "2026-01-12T16:35:20+05:30",
  },
  {
    Scanner: "HTTPXFilter",
    Category: "HTTPX FilterScanner",
    Target: "allianzcloud.com",
    Data: {
      subdomain: "https://hosting.xyzcloud.com",
      http_data: {
        Subdomain: "hosting.xyzcloud.com",
        URL: "https://hosting.xyzcloud.com",
        StatusCode: 200,
        Scheme: "https",
        Server: "",
        Technologies: ["Apache HTTP Server"],
        TLS: { Enabled: true },
        Metadata: {
          Title: "",
          ResponseTimeMs: 1630.750875,
        },
      },
      ports: [
        { Port: 25, Protocol: "tcp" },
        { Port: 110, Protocol: "tcp" },
        { Port: 587, Protocol: "tcp" },
        { Port: 143, Protocol: "tcp" },
        { Port: 80, Protocol: "tcp" },
        { Port: 993, Protocol: "tcp" },
        { Port: 111, Protocol: "tcp" },
        { Port: 995, Protocol: "tcp" },
        { Port: 443, Protocol: "tcp" },
        { Port: 22, Protocol: "tcp" },
        { Port: 465, Protocol: "tcp" },
        { Port: 53, Protocol: "tcp" },
        { Port: 21, Protocol: "tcp" },
      ],
    },
    Severity: "info",
    Timestamp: "2026-01-12T16:35:20+05:30",
  },
];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading briefly so the animation shows, then set final data
    const loadData = async () => {
      setTimeout(() => {
        setData(FINAL_DATA);
        setLoading(false);
      }, 800);
    };
    loadData();
  }, []);

  // Calculate Risk (Check inside the new structure: item.Data.ports)
  const riskyPorts = [22, 21, 3389, 3306, 5432];

  const riskyAssetsCount = data.filter((item) =>
    item.Data.ports?.some((p) => riskyPorts.includes(p.Port))
  ).length;

  const targetName = data.length > 0 ? data[0].Target : "Unknown Target";

  return (
    <MatrixContext>
      <main className="min-h-screen p-6 font-sans text-gray-100 mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <header className="mb-10 mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              ShieldStat Dashboard
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              Target Scope:
              <span className="font-mono text-sm font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded backdrop-blur-sm">
                {targetName}
              </span>
            </p>
          </header>

          {/* 1. Executive Summary */}
          <ExecutiveSummary
            totalAssets={data.length}
            riskyAssets={riskyAssetsCount}
            isLoading={loading}
          />

          {/* 2. Asset List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white/90">
                Subdomains Detected
              </h2>
              {!loading && (
                <span className="bg-white/10 border border-white/10 text-gray-200 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {data.length} Results
                </span>
              )}
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="text-blue-400 animate-pulse font-medium">
                  Scanning network...
                </div>
              </div>
            ) : (
              data.map((item, index) => (
                <SimpleAssetCard key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </main>
    </MatrixContext>
  );
}
