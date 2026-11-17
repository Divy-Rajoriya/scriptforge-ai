import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Live web research",
    description: "Search the internet, surface the right angles, and map the evidence before crafting a script.",
  },
  {
    icon: Cpu,
    title: "Gemini AI intelligence",
    description: "Turn raw findings into high-retention scripts with structured story pacing and engagement cues.",
  },
  {
    icon: ShieldCheck,
    title: "Source-backed content",
    description: "Every angle is grounded in traceable references so the final story stays credible and useful.",
  },
  {
    icon: Wand2,
    title: "Smart storytelling",
    description: "Build sharper hooks, tighter narratives, and stronger closing CTAs for short-form performance.",
  },
  {
    icon: FileText,
    title: "Multiple formats",
    description: "Adapt for explainers, news explainers, testimonials, listicles, and creator-first reels.",
  },
  {
    icon: Globe,
    title: "Research summaries",
    description: "Extract the biggest facts, reactions, and implications from live coverage in a clean snapshot.",
  },
];

const steps = ["Pick the story", "Shape the angle", "Generate the script"];

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-6 md:pt-10">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(16,24,39,0.92),rgba(10,14,22,0.94))] p-5 shadow-[0_30px_120px_rgba(8,13,25,0.8)] md:p-8 lg:p-10">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-12 bottom-8 h-80 w-80 rounded-full bg-violet-500/18 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,107,255,0.12),transparent_24%)]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered research studio
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-[-0.07em] text-white sm:text-5xl lg:text-[4.2rem] lg:leading-[0.95]">
                Turn Breaking News Into <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Stories Worth Watching.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                Research the internet, uncover the biggest angles, and transform verified information into compelling short-form video scripts.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(56,107,255,0.35)] transition hover:brightness-110"
                >
                  Launch Script Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                >
                  Explore Demo
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                {['Live web search', 'Research summaries', 'Source-backed output'].map((pill) => (
                  <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,14,22,0.96))] p-4 shadow-[0_30px_80px_rgba(5,8,20,0.8)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Research status</div>
                    <div className="mt-2 text-lg font-semibold text-white">AI script overview</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    live
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-white/8 bg-slate-900/80 p-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Hook</div>
                    <p className="mt-2 text-sm leading-6 text-slate-100">
                      “Why are global markets suddenly reacting to the latest AI shift?”
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
                    <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      <span>Verified sources</span>
                      <span>3</span>
                    </div>
                    <div className="space-y-2.5">
                      {['Market reaction', 'Analyst quote', 'Key implications'].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-800/80 p-2.5 text-sm text-slate-200">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
                    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      <span>Script preview</span>
                      <span>60 sec</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-200">
                      “Here’s what the headlines are missing… and why investors are watching this closely.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-[28px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.2)] transition duration-200 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-blue-300 ring-1 ring-blue-500/20">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200">Workflow</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white">From raw topic to polished video story</h2>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 md:flex">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            Built for speed
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-500 text-sm font-bold text-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {index === 0 && "Describe the event, trend, or story you want translated into a compelling short-form narrative."}
                {index === 1 && "Tune the angle, language, tone, and duration to fit your audience and platform."}
                {index === 2 && "Generate the hook, script, and source-backed narrative in one polished motion."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
