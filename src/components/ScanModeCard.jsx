export default function ScanModeCard({ title, desc, active }) {
  return (
    <div
      className={`p-6 rounded-xl border transition
        ${active
          ? "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
          : "border-white/10 hover:border-white/20"
        }`}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
