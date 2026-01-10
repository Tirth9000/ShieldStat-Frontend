import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
const inter = Inter({ subsets: ["latin"] });
import 'material-symbols';

export const metadata = {
  title: "Cyberguard",
  description: "Cyber Reconnaissance & Risk Visibility Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased no-scrollbar bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
