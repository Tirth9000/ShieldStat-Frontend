import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import 'material-symbols';

export const metadata = {
  title: "Cyberguard",
  description: "Cyber Reconnaissance & Risk Visibility Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={`${inter.className} bg-black text-white antialiased no-scrollbar`}
      >
        <AuthProvider>
          <Navbar />
          <Sidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
