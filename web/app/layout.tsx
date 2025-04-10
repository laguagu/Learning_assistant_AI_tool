// app/layout.tsx
import HomeButton from "@/components/buttons";
import { getFeatureFlags } from "@/lib/features";
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
  metadataBase: new URL('https://upbeat-upbeat-apps.2.rahtiapp.fi/'),
  title: "Learning Assistant AI Tool",
  description: "UPBEAT - learning assistant",
  openGraph: {
    title: "Learning Assistant AI Tool",
    description: "UPBEAT - learning assistant",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Learning Assistant AI Tool Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get feature flags for server-side rendering
  const featureFlags = getFeatureFlags();

  // Set default values per your requirements
  featureFlags.components.chatAssistant =
    process.env.ENABLE_CHAT_ASSISTANT === "true" ? true : false;
  featureFlags.components.optionsMenu =
    process.env.ENABLE_OPTIONS_MENU === "true" ? true : false;

  return (
    <html
      lang="en "
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Inject feature flags for client-side access */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__FEATURE_FLAGS__ = ${JSON.stringify(
              featureFlags,
            )};`,
          }}
        />
      </head>
      <body className="antialiased">
        <HomeButton />
        <div className="relative z-10 min-h-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
