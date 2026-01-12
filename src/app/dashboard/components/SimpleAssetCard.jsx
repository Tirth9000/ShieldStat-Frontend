import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Server, Layers, Clock, Activity } from 'lucide-react';

const getServiceInfo = (port) => {
  const map = {
    80: { label: 'Web Server (HTTP)', risk: 'Medium' },
    443: { label: 'Web Server (Secure HTTPS)', risk: 'Low' },
    22: { label: 'Remote Admin (SSH)', risk: 'High' }, 
    21: { label: 'File Transfer (FTP)', risk: 'High' },
    25: { label: 'Email Server (SMTP)', risk: 'Medium' },
    53: { label: 'DNS Service', risk: 'Low' },
    3306: { label: 'MySQL Database', risk: 'High' },
    5432: { label: 'Postgres Database', risk: 'High' },
    3389: { label: 'Remote Desktop (RDP)', risk: 'High' },
    110: { label: 'POP3 Email', risk: 'Medium' },
    993: { label: 'IMAP (Secure)', risk: 'Low' },
    995: { label: 'POP3 (Secure)', risk: 'Low' },
  };

  return map[port] || { label: `Port ${port}`, risk: 'Medium' };
};

const SimpleAssetCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract Data from new structure
  const data = item.Data;
  const http = data.http_data || {};
  const ports = data.ports || [];
  
  const primaryName = http.Subdomain || data.subdomain;
  const pageTitle = http.Metadata?.Title || "No Title Detected";
  const statusCode = http.StatusCode || "N/A";
  const technologies = http.Technologies || [];
  const responseTime = http.Metadata?.ResponseTimeMs ? Math.round(http.Metadata.ResponseTimeMs) : 0;

  // Calculate Risk
  const hasHighRisk = ports.some((p) => getServiceInfo(p.Port).risk === 'High');

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg mb-4 hover:bg-white/10 transition-all duration-200">
      
      {/* Header Row */}
      <div 
        className="p-5 flex flex-col md:flex-row md:items-center justify-between cursor-pointer gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {/* Status Code Badge */}
          <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg border ${statusCode === 200 ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-gray-700/50 border-gray-600 text-gray-400'}`}>
            <span className="text-lg font-bold">{statusCode}</span>
            <span className="text-[10px] uppercase">Status</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {primaryName}
              <a href={http.URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300" onClick={(e) => e.stopPropagation()}>
                <Globe size={14} />
              </a>
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">
              {pageTitle}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
               <span className="flex items-center gap-1"><Layers size={12}/> {ports.length} Open Ports</span>
               <span className="flex items-center gap-1"><Clock size={12}/> {responseTime}ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-14 md:ml-0">
          {/* Technology Tags (New Data) */}
          <div className="hidden md:flex gap-2">
            {technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded">
                {tech}
              </span>
            ))}
            {technologies.length > 3 && <span className="text-xs text-gray-500">+{technologies.length - 3}</span>}
          </div>

          {hasHighRisk && (
            <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wide rounded-full shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Alert
            </span>
          )}
          
          <button className="text-gray-400 hover:text-white">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Details Section */}
      {isOpen && (
        <div className="bg-black/30 border-t border-white/5 p-5">
          
          {/* Tech Stack Mobile View */}
          {technologies.length > 0 && (
            <div className="mb-6 md:hidden">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                   <span key={i} className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-200 text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity size={14} /> Open Ports & Services
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ports.map((portObj, idx) => {
              const info = getServiceInfo(portObj.Port);
              let dotColor = 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
              if (info.risk === 'High') dotColor = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
              if (info.risk === 'Medium') dotColor = 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]';

              return (
                <div key={idx} className="flex items-center justify-between bg-white/5 p-3 rounded border border-white/5 hover:border-white/20 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-200 text-sm">{info.label}</span>
                    <span className="text-xs text-gray-500">{portObj.Protocol} / {portObj.Port}</span>
                  </div>
                  <span 
                    className={`w-2.5 h-2.5 rounded-full ${dotColor}`} 
                    title={`${info.risk} Risk`}
                  ></span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleAssetCard;