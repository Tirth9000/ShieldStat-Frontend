import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ExecutiveSummary = ({ totalAssets, riskyAssets, isLoading }) => {
  if (isLoading) {
    return <div className="p-6 bg-white/5 rounded-xl animate-pulse h-32 mb-8 border border-white/10"></div>;
  }

  const isSafe = riskyAssets === 0;

  const containerClass = isSafe 
    ? 'bg-green-500/10 border-l-4 border-green-500 backdrop-blur-md' 
    : 'bg-red-500/10 border-l-4 border-red-500 backdrop-blur-md';

  const iconBgClass = isSafe
    ? 'bg-green-500/20 text-green-400'
    : 'bg-red-500/20 text-red-400';

  return (
    <div className={`p-6 rounded-r-xl shadow-lg mb-8 ${containerClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${isSafe ? 'text-green-400' : 'text-red-400'}`}>
            {isSafe ? 'System Healthy' : 'Action Required'}
          </h2>
          <p className="text-gray-300 max-w-xl leading-relaxed">
            {isSafe 
              ? `All ${totalAssets} scanned subdomains appear secure.`
              : `We found ${riskyAssets} subdomains with potentially dangerous services (like SSH, FTP, or Databases) exposed.`
            }
          </p>
        </div>
        <div className={`p-4 rounded-full ${iconBgClass} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
          {isSafe ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;