export default function ProgressRing({ percent }) {
  return (
    <div className="relative w-52 h-52 flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border-[12px] border-white/10"></div>
      <div
        className="absolute w-full h-full rounded-full border-[12px] border-blue-500"
        style={{
          clipPath: `inset(${100 - percent}% 0 0 0)`
        }}
      />
      <div className="text-center">
        <div className="text-5xl font-bold">{percent}%</div>
        <div className="text-sm text-purple-400 mt-1">SCANNING...</div>
      </div>
    </div>
  );
}
