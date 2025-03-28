import type { Metadata } from "next";
import { Geist_Mono, Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Main font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Font for headings
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

// Keep Mono font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Learning Assistant AI Tool",
  description: "An AI-powered learning assistant application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <div className="relative z-10 min-h-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
