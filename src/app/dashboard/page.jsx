// "use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Globe,
  ShieldAlert,
  Search,
  Box,
  Link2,
  Mail,
  Lock,
  Layers,
  CheckCircle2,
  Target,
  Download,
  Play,
  ChevronRight,
  Activity
} from "lucide-react";
import LoadingAnimation from "@/components/Loader";
import SectionCard from "./components/SectionCard";
import StatusBadge from "./components/StatusBadge";
import EmptyState from "./components/EmptyState";
import MetricsHeader from "./components/MetricsHeader";
import { Skeleton, SkeletonTable } from "./components/Skeleton";
=======
// import React, { useState, useEffect } from "react";
// import MetricsGrid from "./dashboardComponents/MetricsGrid";
// import ActionItems from "./dashboardComponents/ActionItems";
// import LoadingAnimation from "@/components/Loader";
>>>>>>> 5b1d0074a070132a10b2b79f1b0200ec1132a8eb

// export default function DashboardPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate real load feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      // We start with NO DATA (hollow/skeleton state)
      setData({});
      setLoading(false);
    };
    fetchData();
  }, []);
=======
//   // MOCK API
//   useEffect(() => {
//     const mockApiResponse = {
//       domain: "example.com",
//       stats: {
//         score: 85,
//         riskLabel: "Medium Risk",
//         lastScan: "Just now",
//         safetyStatus: "Needs Attention",
//       },
//       findings: [
//         {
//           id: 1,
//           title: "Exposed Database Port",
//           desc: "We found a database service (Port 3306) open to the internet.",
//           reason: "Attackers could try to guess your password and steal data.",
//           severity: "critical",
//           icon: "database",
//         },
//         {
//           id: 2,
//           title: "Test Subdomain Visible",
//           desc: "The subdomain 'test.example.com' is publicly accessible.",
//           reason: "Test sites often have weaker security and bugs.",
//           severity: "warning",
//           icon: "cloud_off",
//         },
//         {
//           id: 3,
//           title: "Email Identity Verified",
//           desc: "Your SPF and DKIM records are correctly configured.",
//           severity: "safe",
//           icon: "verified_user",
//         },
//       ],
//       recommendations: [
//         {
//           id: 1,
//           priority: "High Priority",
//           action: "Close Port 3306",
//           type: "critical",
//           link: true,
//         },
//         {
//           id: 2,
//           priority: "Medium Priority",
//           action: 'Hide "test" subdomain',
//           type: "warning",
//           link: true,
//         },
//         {
//           id: 3,
//           priority: "Maintenance",
//           action: "Set calendar reminder for SSL renewal",
//           type: "safe",
//           link: false,
//         },
//       ],
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       await new Promise((resolve) => setTimeout(resolve, 800)); // Slightly faster feel
//       setData(mockApiResponse);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);
>>>>>>> 5b1d0074a070132a10b2b79f1b0200ec1132a8eb

//   if (loading) return <LoadingAnimation />;

<<<<<<< HEAD
  // Component handles empty data gracefully
  const isLoading = !data || Object.keys(data).length === 0;

  return (
    <main className="min-h-screen bg-[#0a0c10] text-slate-200 p-6 md:p-10">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {isLoading ? (
                <Skeleton className="h-9 w-48" />
              ) : (
                <h1 className="text-3xl font-black text-white tracking-tight">{data.domain || "N/A"}</h1>
              )}
              {isLoading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                <StatusBadge status={data.riskLabel} text={data.riskLabel} className="py-1 px-3 !rounded-full !text-xs" />
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 pointer-events-none">
                <Activity className="w-3.5 h-3.5" />
                {isLoading ? <Skeleton className="h-3 w-40" /> : `Last scan completed: ${data.lastScan || "Never"}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-all">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/50 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
              <Play className="w-4 h-4 fill-current" /> Run New Scan
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <MetricsHeader data={data?.metrics} />

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">

            {/* Domain Identity */}
            <SectionCard title="Domain Identity" icon={Globe}>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-2 w-16 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5">Registrar</p>
                    <p className="text-sm font-bold text-white/90">{data?.identity?.registrar || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5">Created On</p>
                    <p className="text-sm font-bold text-white/90">{data?.identity?.createdOn || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5">Expires On</p>
                    <p className="text-sm font-bold text-white/90">{data?.identity?.expiresOn || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1.5">IP Address</p>
                    <p className="text-sm font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded">{data?.identity?.ipAddress || "0.0.0.0"}</p>
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Open Ports & Services */}
            <SectionCard
              title="Open Ports & Services"
              icon={ShieldAlert}
              headerAction={isLoading ? <Skeleton className="h-5 w-20" /> : <StatusBadge status="info" text={`${data?.ports?.length || 0} Total`} />}
            >
              <div className="overflow-x-auto">
                {isLoading ? (
                  <SkeletonTable rows={3} cols={5} />
                ) : data?.ports?.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 pb-2">
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Port</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Protocol</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Service</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Status</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Exposure</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.ports.map((p, i) => (
                        <tr key={i}>
                          <td className="py-4 text-sm font-medium text-white/90">{p.port}</td>
                          <td className="py-4 text-sm font-medium text-slate-400 uppercase">{p.protocol}</td>
                          <td className="py-4 text-sm font-medium text-white/90 flex items-center gap-2">
                            <Box className="w-4 h-4 text-slate-500" /> {p.service}
                          </td>
                          <td className="py-4"><StatusBadge status={p.status} text={p.status} /></td>
                          <td className="py-4">
                            <div className={`flex items-center gap-1.5 text-xs font-bold ${p.exposure === 'Critical' ? 'text-red-500' : 'text-yellow-500'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${p.exposure === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                              {p.exposure}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState message="No open ports detected" />
                )}
              </div>
            </SectionCard>

            {/* Subdomain Discovery */}
            <SectionCard title="Subdomain Discovery" icon={Search}>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <SkeletonTable rows={3} cols={5} />
                ) : data?.subdomains?.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 pb-2">
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Subdomain</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Status</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">IP Address</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Risk</th>
                        <th className="text-[10px] font-bold text-slate-500 uppercase py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.subdomains.map((s, i) => (
                        <tr key={i}>
                          <td className="py-4 text-sm font-medium text-white/80">{s.name}</td>
                          <td className="py-4"><StatusBadge status={s.status} text={s.status} /></td>
                          <td className="py-4 text-xs font-mono text-slate-400">{s.ip}</td>
                          <td className="py-4 text-xs font-bold text-yellow-500">{s.risk}</td>
                          <td className="py-4 text-xs text-slate-500">{s.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState message="No subdomains discovered" />
                )}
              </div>
              {!isLoading && (data?.subdomains?.length > 0) && (
                <button className="w-full mt-6 py-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center justify-center gap-1">
                  View all results <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </SectionCard>

            {/* Redirect Chain */}
            <SectionCard title="Redirect Chain" icon={Link2}>
              {isLoading ? (
                <div className="flex items-center gap-4 py-4">
                  <Skeleton className="h-10 w-32" />
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <Skeleton className="h-10 w-48 border-blue-500/50" />
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                  <Skeleton className="h-10 w-32" />
                </div>
              ) : data?.redirectChain?.length > 0 ? (
                <div className="flex items-center gap-4 py-4 overflow-x-auto no-scrollbar">
                  {data.redirectChain.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className={`flex-shrink-0 px-4 py-2 border rounded text-xs ${step.type === 'final' ? 'border-blue-500/50 bg-blue-500/10 font-bold text-blue-400' : 'border-white/10 bg-white/5 text-slate-400'
                        }`}>
                        {step.url} {step.status && <span className="opacity-50 ml-1">({step.status})</span>}
                      </div>
                      {i < data.redirectChain.length - 1 && <ChevronRight className="flex-shrink-0 w-4 h-4 text-slate-600" />}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <EmptyState message="No redirect chain available" />
              )}
            </SectionCard>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6">

            {/* Email Security */}
            <SectionCard title="Email Security" icon={Mail}>
              <div className="space-y-4">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-2 w-32" />
                      </div>
                      <Skeleton className="h-5 w-12" />
                    </div>
                  ))
                ) : data?.emailSecurity?.length > 0 ? (
                  data.emailSecurity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white/90">{item.name}</p>
                        <p className="text-[10px] text-slate-500">{item.detail}</p>
                      </div>
                      <StatusBadge status={item.status} text={item.status} />
                    </div>
                  ))
                ) : (
                  <EmptyState message="Email security data pending" />
                )}
              </div>
            </SectionCard>

            {/* SSL / TLS */}
            <SectionCard title="SSL / TLS" icon={Lock}>
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-9 h-9 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-2 w-48" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ) : data?.ssl ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-500/10 p-2 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/90">Certificate Valid</p>
                      <p className="text-[10px] text-slate-500">Issued by {data.ssl.issuer}</p>
                      <p className="text-[10px] text-slate-500">Expires in {data.ssl.expiry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-1">TLS VERSION</p>
                      <p className="text-sm font-bold text-white/80">{data.ssl.tlsVersions}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-1">CIPHER STRENGTH</p>
                      <p className="text-sm font-bold text-emerald-400">{data.ssl.cipherStrength}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState message="SSL information pending" />
              )}
            </SectionCard>

            {/* Tech Stack */}
            <SectionCard title="Tech Stack" icon={Layers}>
              {isLoading ? (
                <div className="flex flex-wrap gap-2">
                  {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-8 w-24" />)}
                </div>
              ) : data?.techStack?.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech, i) => {
                      const Icon = tech.icon;
                      return (
                        <span key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-md text-[10px] font-bold text-slate-300 border border-white/5 uppercase">
                          <Icon className="w-3 h-3" /> {tech.name}
                        </span>
                      );
                    })}
                  </div>
                  {data.stackAlert && (
                    <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                      <p className="text-[10px] font-bold text-yellow-500 flex items-center gap-1.5 mb-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Outdated Version Detected
                      </p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{data.stackAlert}</p>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState message="No technology fingerprint detected" />
              )}
            </SectionCard>

            {/* Remediation */}
            <SectionCard title="Remediation" icon={Target}>
              <div className="space-y-4">
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-1.5 h-1.5 rounded-full mt-2" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-2 w-full" />
                      </div>
                    </div>
                  ))
                ) : data?.remediation?.length > 0 ? (
                  data.remediation.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 ${item.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <div>
                        <p className="text-xs font-bold text-white/90">{item.title}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState message="No pending remediation actions" />
                )}
              </div>
              {!isLoading && (
                <button className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-bold text-white/80 transition-all uppercase tracking-wider">
                  View Full Action Plan
                </button>
              )}
            </SectionCard>

            {/* Threat Intelligence */}
            <SectionCard title="Threat Intelligence" icon={ShieldAlert}>
              <div className="space-y-4">
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-2 w-48" />
                      </div>
                      <Skeleton className="h-5 w-12" />
                    </div>
                  ))
                ) : data?.threatIntel?.length > 0 ? (
                  data.threatIntel.map((item, i) => (
                    <div key={i} className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-white/90">{item.title}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.detail}</p>
                      </div>
                      <StatusBadge status={item.risk} text={item.risk} />
                    </div>
                  ))
                ) : (
                  <EmptyState message="No active threats monitored" />
                )}
              </div>
            </SectionCard>

          </div>
        </div>

      </div>
    </main>
  );
}
=======
//   return (
//     <main className="relative min-h-screen w-full text-slate-200 font-sans  overflow-hidden m-10">

//       <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">

//         <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
//           <MetricsGrid
//             score={data.stats.score}
//             riskLevel={data.stats.riskLabel}
//             lastScan={data.stats.lastScan}
//             safetyStatus={data.stats.safetyStatus}
//           />
//         </section>

//         <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
//           <ActionItems
//             findings={data.findings}
//             recommendations={data.recommendations}
//           />
//         </section>
//       </div>
//     </main>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
>>>>>>> 5b1d0074a070132a10b2b79f1b0200ec1132a8eb
