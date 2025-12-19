<<<<<<< HEAD
export default function ProgressRing({ percent = 0 }) {
  const radius = 90;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-52 h-52 flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress ring */}
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center text */}
      <div className="absolute text-center">
        <div className="text-5xl font-bold text-white">
          {percent}%
        </div>
        <div className="text-sm text-purple-400 mt-1 tracking-wider">
          SCANNING...
        </div>
=======
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
>>>>>>> cc6e118 (Add files via upload)
      </div>
    </div>
  );
}
