"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  Languages,
  Radio,
  Sparkles,
  Wand2,
} from "lucide-react";

const formatOptions = [
  "Anchor Script",
  "Instagram Reel",
  "Documentary Style",
  "Explainer Video",
];

const languageOptions = ["English", "Hinglish", "Hindi", "Bengali", "Tamil"];
const toneOptions = ["Professional News", "Conversational", "Energetic", "Cinematic", "Gen-Z"];
const durationOptions = [
  { label: "15 sec", value: 15 },
  { label: "30 sec", value: 30 },
  { label: "60 sec", value: 60 },
  { label: "90 sec", value: 90 },
];

const loadingSteps = [
  "Analyzing topic focus...",
  "Scanning live search results...",
  "Synthesizing research brief...",
  "Generating final narrative...",
];

export default function CreateScriptPage() {
  const [topic, setTopic] = useState("");
  const [scriptFormat, setScriptFormat] = useState("Anchor Script");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Professional News");
  const [duration, setDuration] = useState(60);

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1100);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, duration, language, tone, scriptFormat }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-6 md:px-6 lg:px-8">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,22,0.95),rgba(16,24,39,0.95))] shadow-[0_30px_100px_rgba(8,13,25,0.8)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-500 text-white shadow-[0_0_25px_rgba(56,107,255,0.5)]">
              <Radio className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">ScriptForge</div>
              <div className="text-sm font-semibold text-white">Research Studio</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            live pipeline
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)_360px]">
          <aside className="border-b border-white/10 p-5 md:p-6 xl:border-b-0 xl:border-r">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Input brief</div>
                <h2 className="mt-2 text-xl font-semibold text-white">Story brief</h2>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
                <Sparkles className="h-4 w-4 text-blue-300" />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Topic / headline
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={6}
                  placeholder="Example: AI chip market surge, inflation data, startup launch, climate policy shift..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Language
                  </label>
                  <div className="relative">
                    <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-3 text-sm text-slate-100 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {languageOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3 text-sm text-slate-100 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Style
                  </label>
                  <select
                    value={scriptFormat}
                    onChange={(e) => setScriptFormat(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3 text-sm text-slate-100 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {formatOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Presenter
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3 text-sm text-slate-100 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {toneOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(56,107,255,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Wand2 className="h-4 w-4" />
              {loading ? "Generating..." : "Generate Script"}
            </button>
          </aside>

          <main className="border-b border-white/10 p-5 md:p-6 xl:border-b-0 xl:border-r">
            {loading ? (
              <div className="flex h-full min-h-[500px] flex-col justify-center">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Research pipeline</div>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Gathering sources</h2>
                  </div>
                  <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-100">
                    {stepIndex + 1}/4
                  </div>
                </div>

                <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                    style={{ width: `${((stepIndex + 1) / loadingSteps.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-4">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                        index <= stepIndex
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-100"
                          : "border-white/10 bg-slate-900/50 text-slate-400"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                          index <= stepIndex ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Research brief</div>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{result.script.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5">
                        {result.script.estimated_duration_seconds}s target
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5">
                        {result.script.word_count} words
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5">
                        {language}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.script.script_content)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy script"}
                  </button>
                </div>

                <div className="rounded-[24px] border border-blue-500/20 bg-blue-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    Hook
                  </div>
                  <p className="text-base font-medium text-blue-50">“{result.script.hook}”</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Narration</div>
                      <Clock3 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="whitespace-pre-line text-sm leading-7 text-slate-200">{result.script.script_content}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Key findings</div>
                      <ul className="space-y-3 text-sm text-slate-200">
                        {result.sources?.slice(0, 3).map((src: any, idx: number) => (
                          <li key={idx} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                            <span>{src.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-slate-900/60 p-4">
                      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">CTA</div>
                      <p className="text-sm leading-6 text-slate-200">
                        Follow the story, check the sources, and tell us which angle you want unpacked next.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-slate-900/40 text-center">
                <FileText className="h-12 w-12 text-slate-500" />
                <p className="mt-4 max-w-md text-base text-slate-300">
                  Add a headline or topic, then generate a source-backed script with live research.
                </p>
              </div>
            )}
          </main>

          <aside className="p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Research</div>
                <h2 className="mt-2 text-xl font-semibold text-white">Sources</h2>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
                <Globe className="h-4 w-4 text-violet-300" />
              </div>
            </div>

            <div className="space-y-4">
              {result?.sources?.length ? (
                result.sources.slice(0, 5).map((src: any, idx: number) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-[22px] border border-white/10 bg-slate-900/60 p-3 transition hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-200">
                          {src.domain ? src.domain.slice(0, 2).toUpperCase() : "IN"}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-200">{src.domain || "Source"}</div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Verified</div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-slate-950/80 p-3">
                      <div className="text-sm font-medium text-white">{src.title}</div>
                      <div className="mt-2 text-xs leading-5 text-slate-400">{src.snippet}</div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="rounded-[22px] border border-dashed border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
                  Live sources appear here after generation.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
