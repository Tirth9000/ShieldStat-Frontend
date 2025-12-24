import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cyberguard",
  description: "Cyber Reconnaissance & Risk Visibility Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
