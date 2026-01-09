"use client";

import React from "react";
import { Loader2 } from "lucide-react";

const EmptyState = ({ message = "Analyzing...", loading = false }) => {
    return (
        <div className="flex flex-col items-center justify-center py-8 opacity-40">
            {loading ? (
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-400" />
            ) : (
                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 mb-3" />
            )}
            <p className="text-xs font-medium text-slate-400">{message}</p>
        </div>
    );
};

export default EmptyState;
