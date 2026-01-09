"use client";

import React from "react";
import { Shield, AlertTriangle, Bug, Zap } from "lucide-react";

import { Skeleton } from "./Skeleton";

const MetricCard = ({ title, icon: Icon, children, isLoading }) => (
    <div className={`bg-[#11141d] border border-white/5 rounded-xl p-5 flex items-center justify-between`}>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</span>
            </div>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            ) : children}
        </div>
        <div className="bg-white/5 p-3 rounded-lg flex-shrink-0">
            <Icon className="w-6 h-6 text-slate-400 opacity-60" />
        </div>
    </div>
);

const MetricsHeader = ({ data }) => {
    const isLoading = !data || Object.keys(data).length === 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Security Score */}
            <MetricCard title="Security Score" icon={Shield} isLoading={isLoading}>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{data?.score}</span>
                    <span className="text-xs font-bold text-emerald-400">+5% from last week</span>
                </div>
            </MetricCard>

            {/* Risk Level */}
            <MetricCard title="Risk Level" icon={AlertTriangle} isLoading={isLoading}>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">{data?.riskLevel}</span>
                    <span className="text-xs font-medium text-slate-400">Scan results pending</span>
                </div>
            </MetricCard>

            {/* Vulns Found */}
            <MetricCard title="Vulns Found" icon={Bug} isLoading={isLoading}>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">{data?.vulns?.total ?? 0} Total</span>
                    <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-bold text-red-500">{data?.vulns?.critical ?? 0} Critical</span>
                        <span className="text-[10px] font-bold text-orange-500">{data?.vulns?.high ?? 0} High</span>
                        <span className="text-[10px] font-bold text-yellow-500">{data?.vulns?.low ?? 0} Low</span>
                    </div>
                </div>
            </MetricCard>

            {/* Scan Time */}
            <MetricCard title="Scan Time" icon={Zap} isLoading={isLoading}>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">{data?.scanTime ?? "0s"}</span>
                    <span className="text-xs font-medium text-slate-400">Full surface scan completed</span>
                </div>
            </MetricCard>
        </div>
    );
};

export default MetricsHeader;
