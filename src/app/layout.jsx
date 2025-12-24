import "./globals.css";
import { Inter } from "next/font/google";
<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cyberguard",
=======

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
<<<<<<< HEAD
  title: "iSecurify",
>>>>>>> cc6e118 (Add files via upload)
=======
  title: "Cyberguard",
>>>>>>> dc323aa (nev and assessment)
  description: "Cyber Reconnaissance & Risk Visibility Platform",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en" className="no-scrollbar">
      <body
        className={`${inter.className} bg-black text-white antialiased no-scrollbar`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
=======
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-white antialiased`}
      >
        {children}
>>>>>>> cc6e118 (Add files via upload)
      </body>
    </html>
  );
}
