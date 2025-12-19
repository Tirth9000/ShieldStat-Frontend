"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-semibold
        transition-all duration-200
        bg-blue-600 hover:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-[0_0_25px_rgba(59,130,246,0.35)]
        ${className}
      `}
    >
      {children}
    </button>
  );
}
