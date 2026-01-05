import React from 'react';

export default function MetricsGrid({ score, riskLevel, lastScan, safetyStatus }) {
  
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* 1. MAIN SCORE CARD */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-400 transition-colors">Security Score</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold tracking-tight text-white">{score}</span>
              <span className="text-lg font-medium text-slate-500">/100</span>
            </div>
          </div>
          
          <div className="relative h-20 w-20">
            <svg className="h-full w-full -rotate-90 transform drop-shadow-lg" viewBox="0 0 100 100">
              {/* Define Gradient */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#1e293b" strokeWidth="6" />
              <circle 
                cx="50" cy="50" r={radius} fill="transparent" stroke="url(#scoreGradient)" strokeWidth="6"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400 animate-pulse">shield</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SAFETY STATUS */}
      <StatCard 
        label="Safety Status"
        value={safetyStatus}
        icon="health_and_safety"
        color="text-amber-400"
        gradient="from-amber-500/20 to-transparent"
        iconBg="bg-amber-500/10"
      />

      {/* 3. RISK LEVEL */}
      <StatCard 
        label="Risk Level"
        value={riskLevel}
        icon="warning_amber"
        color="text-orange-400"
        gradient="from-orange-500/20 to-transparent"
        iconBg="bg-orange-500/10"
      />

      {/* 4. LAST SCAN */}
      <StatCard 
        label="Last Scan"
        value={lastScan}
        icon="history"
        color="text-emerald-400"
        gradient="from-emerald-500/20 to-transparent"
        iconBg="bg-emerald-500/10"
      />

    </div>
  );
}

function StatCard({ label, value, icon, color, gradient, iconBg }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.07]">
      {/* Subtle Background Gradient on Hover */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl`} />

      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} border border-white/5`}>
          <span className={`material-symbols-outlined text-xl ${color}`}>{icon}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">{label}</p>
        <p className={`mt-1 text-xl font-bold text-slate-200 group-hover:text-white transition-colors`}>
          {value}
        </p>
      </div>
    </div>
  );
}