import logo from "../../public/assets/favicon.png"
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Image
          src={logo}
          alt="iSecurify Logo"
          width={28}
          height={28}
          priority
        />
        Cyberguard
      </div>

      <div className="flex gap-6 text-sm text-gray-300">
        <span>Dashboard</span>
        <span>Scans</span>
        <span>Reports</span>
        <span>Assessment</span>
      </div>

      <div className="flex items-center gap-4">
        😊😊😊
      </div>
    </nav>
  );
}
