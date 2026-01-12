export default function LiveLogs() {
  return (
    <div className=" border backdrop-blur-sm rounded-xl p-4 font-mono text-sm text-gray-300 shadow-[0px_0px_300px_0px_rgba(61,128,254,0.2)]">
      <p>[INFO] Initializing reconnaissance modules...</p>
      <p>[EXEC] Running subfinder & assetfinder...</p>
      <p className="text-green-400">[SUCCESS] Found 1,423 subdomains</p>
      <p>[EXEC] Starting Nmap on top ports...</p>
    </div>
  );
}
