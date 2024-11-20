import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import Navigation from "@/components/Navigation";
import FeedbackWidget from "@/components/FeedbackWidget";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Benchmark Platform",
  description: "Compare and analyze AI model performance across various benchmarks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <Navigation />
          <main>{children}</main>
          <FeedbackWidget />
        </SessionProvider>
      </body>
    </html>
  );
}
