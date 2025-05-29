import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Receipt Generator for Lidl",
  description: "Generate Lidl receipts to get through those damn gates.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {/* Sticky back button */}
        <a
          href="https://a.rno.tt"
          className="fixed top-4 left-4 z-50 px-3 py-2 bg-green-400 hover:bg-green-300 text-black font-mono font-bold transition-colors rounded border border-green-400 text-sm"
        >
          ← BACK
        </a>
        
        {children}
      </body>
    </html>
  );
}