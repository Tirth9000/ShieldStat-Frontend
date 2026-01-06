"use client";

import React, { useState, useEffect } from "react";
import MetricsGrid from "./dashboardComponents/MetricsGrid";
import ActionItems from "./dashboardComponents/ActionItems";
import LoadingAnimation from "@/components/Loader";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // MOCK API
  useEffect(() => {
    const mockApiResponse = {
      domain: "example.com",
      stats: {
        score: 85,
        riskLabel: "Medium Risk",
        lastScan: "Just now",
        safetyStatus: "Needs Attention",
      },
      findings: [
        {
          id: 1,
          title: "Exposed Database Port",
          desc: "We found a database service (Port 3306) open to the internet.",
          reason: "Attackers could try to guess your password and steal data.",
          severity: "critical",
          icon: "database",
        },
        {
          id: 2,
          title: "Test Subdomain Visible",
          desc: "The subdomain 'test.example.com' is publicly accessible.",
          reason: "Test sites often have weaker security and bugs.",
          severity: "warning",
          icon: "cloud_off",
        },
        {
          id: 3,
          title: "Email Identity Verified",
          desc: "Your SPF and DKIM records are correctly configured.",
          severity: "safe",
          icon: "verified_user",
        },
      ],
      recommendations: [
        {
          id: 1,
          priority: "High Priority",
          action: "Close Port 3306",
          type: "critical",
          link: true,
        },
        {
          id: 2,
          priority: "Medium Priority",
          action: 'Hide "test" subdomain',
          type: "warning",
          link: true,
        },
        {
          id: 3,
          priority: "Maintenance",
          action: "Set calendar reminder for SSL renewal",
          type: "safe",
          link: false,
        },
      ],
    };

    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Slightly faster feel
      setData(mockApiResponse);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    <main className="relative min-h-screen w-full text-slate-200 font-sans  overflow-hidden m-10">

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">

        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <MetricsGrid
            score={data.stats.score}
            riskLevel={data.stats.riskLabel}
            lastScan={data.stats.lastScan}
            safetyStatus={data.stats.safetyStatus}
          />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <ActionItems
            findings={data.findings}
            recommendations={data.recommendations}
          />
        </section>
      </div>
    </main>
  );
}

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page