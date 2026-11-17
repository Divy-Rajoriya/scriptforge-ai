import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Video } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: "ScriptForge AI — Research-Backed Video Scripts",
  description: "AI-powered short-form video script generation with real-time web research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slateNight text-slate-50 antialiased">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,107,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(134,103,255,0.18),transparent_22%)]" />

          <header className="sticky top-0 z-50 border-b border-white/10 bg-slateNight/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accentSoft shadow-[0_0_30px_rgba(56,107,255,0.45)]">
                  <Video className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white md:text-base">
                  ScriptForge <span className="text-blue-300">AI</span>
                </div>
              </Link>

              <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                <Link href="/" className="transition hover:text-white">Platform</Link>
                <Link href="/create" className="transition hover:text-white">Generator</Link>
                <Link href="/create" className="transition hover:text-white">Research</Link>
              </nav>

              <div className="flex items-center gap-3">
                <span className="hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 sm:inline-flex">
                  Research Studio
                </span>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accentSoft px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110"
                >
                  Launch Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </header>

          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}