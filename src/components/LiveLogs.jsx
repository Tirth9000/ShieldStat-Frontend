export default function LiveLogs() {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-300">
      <p>[INFO] Initializing reconnaissance modules...</p>
      <p>[EXEC] Running subfinder & assetfinder...</p>
      <p className="text-green-400">[SUCCESS] Found 1,423 subdomains</p>
      <p>[EXEC] Starting Nmap on top ports...</p>
    </div>
  );
}
