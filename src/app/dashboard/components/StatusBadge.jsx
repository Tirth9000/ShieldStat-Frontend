"use client";

import React from "react";

const StatusBadge = ({ status, text, className = "" }) => {
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "pass":
            case "safe":
            case "success":
            case "secure":
            case "200 ok":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "warning":
            case "medium":
            case "medium risk":
            case "tls v1.2":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "critical":
            case "high":
            case "high risk":
            case "none":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            case "info":
            case "enabled":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "403 forbidden":
            case "404 not found":
                return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    return (
        <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(
                status || text
            )} ${className}`}
        >
            {text || status}
        </span>
    );
};

export default StatusBadge;
