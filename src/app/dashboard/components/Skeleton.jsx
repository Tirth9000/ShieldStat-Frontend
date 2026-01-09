"use client";

import React from "react";

export const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-white/5 rounded ${className}`} />
);

export const SkeletonCard = () => (
    <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-1/2" />
    </div>
);

export const SkeletonTable = ({ rows = 3, cols = 4 }) => (
    <div className="space-y-4">
        <div className="flex gap-4">
            {Array(cols).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-3 flex-1" />
            ))}
        </div>
        {Array(rows).fill(0).map((_, i) => (
            <div key={i} className="flex gap-4">
                {Array(cols).fill(0).map((_, j) => (
                    <Skeleton key={j} className="h-8 flex-1" />
                ))}
            </div>
        ))}
    </div>
);
