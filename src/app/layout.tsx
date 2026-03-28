import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const bodyFont = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equal",
  description: "Fairness-first rostering and scheduling workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppProviders>
          <AppShell>{children}</AppShell>
          <Analytics />
        </AppProviders>
      </body>
    </html>
  );
}
