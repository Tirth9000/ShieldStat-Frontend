"use client";

import React from "react";

const SectionCard = ({ title, icon: Icon, children, className = "", headerAction }) => {
    return (
        <div className={`bg-[#11141d] border border-white/5 rounded-xl overflow-hidden ${className}`}>
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-blue-400" />}
                    <h3 className="font-bold text-sm tracking-tight text-white/90">{title}</h3>
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
