import React from 'react';

export default function ActionItems({ findings, recommendations }) {
  
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical': return { 
        color: 'text-rose-500', 
        border: 'border-l-rose-500', 
        bg: 'bg-rose-500/5', 
        icon: 'gpp_bad',
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      };
      case 'warning': return { 
        color: 'text-amber-500', 
        border: 'border-l-amber-500', 
        bg: 'bg-amber-500/5', 
        icon: 'warning',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      };
      case 'safe': return { 
        color: 'text-emerald-500', 
        border: 'border-l-emerald-500', 
        bg: 'bg-emerald-500/5', 
        icon: 'verified',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      };
      default: return { 
        color: 'text-slate-400', 
        border: 'border-l-slate-600', 
        bg: 'bg-slate-800/50', 
        icon: 'help',
        badge: 'bg-slate-800 text-slate-400'
      };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
      
      {/* LEFT COLUMN: FINDINGS */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 xl:col-span-2 backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="material-symbols-outlined text-blue-500">manage_search</span>
              Security Findings
            </h3>
            <p className="text-sm text-slate-400 mt-1">Detailed breakdown of potential vulnerabilities.</p>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 border border-white/10">
            {findings.length} Detected
          </span>
        </div>

        <div className="space-y-4">
          {findings.map((item) => {
            const config = getSeverityConfig(item.severity);
            return (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden rounded-r-xl rounded-l-[4px] border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 border-l-[4px] ${config.border}`}
              >
                <div className="flex gap-5">
                  {/* Icon Box */}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                    <span className={`material-symbols-outlined text-2xl ${config.color}`}>{config.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      {item.severity !== 'safe' && (
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.badge}`}>
                          {item.severity}
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                    
                    {item.reason && (
                      <div className="mt-4 flex items-start gap-2 rounded-lg bg-black/20 p-3 text-xs text-slate-400">
                        <span className="material-symbols-outlined text-[16px] text-slate-500">info</span>
                        <span>
                          <span className="font-semibold text-slate-300">Why this matters:</span> {item.reason}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: RECOMMENDATIONS */}
      <div className="flex flex-col h-full">
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6 h-full">
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="material-symbols-outlined text-emerald-500">playlist_add_check</span>
              Action Plan
            </h3>
            <p className="text-sm text-slate-400 mt-1">Prioritized remediation steps.</p>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              // Custom logic for priority styling
              const isHigh = rec.priority.toLowerCase().includes('high');
              return (
                <div 
                  key={rec.id} 
                  className={`relative flex flex-col gap-3 rounded-xl border p-4 transition-all hover:border-slate-600 hover:bg-white/5
                    ${isHigh ? 'border-rose-500/20 bg-rose-500/[0.02]' : 'border-white/5 bg-transparent'}
                  `}
                >
                  <div className="flex items-center justify-between">
                     <span className={`text-[10px] font-bold uppercase tracking-wide
                        ${isHigh ? 'text-rose-400' : 'text-slate-500'}
                     `}>
                        Step {index + 1} • {rec.priority}
                     </span>
                  </div>
                  
                  <p className="text-sm font-medium text-slate-200">{rec.action}</p>
                  
                  {rec.link && (
                    <button className="group/btn mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/5 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600">
                      Fix Now 
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}