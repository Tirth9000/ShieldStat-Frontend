"use client";

import React from "react";

const SectionCard = ({ title, icon: Icon, children, className = "", headerAction }) => {
    return (
        <div className={`bg-white dark:bg-[#11141d] border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300 ${className}`}>
            <div className="px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
                    <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-white/90">{title}</h3>
                </div>
                {headerAction && <div>{headerAction}</div>}
            </div>
            <div className="p-5">
                {children}
            </div>
        </div>
    );
};

export default SectionCard;
