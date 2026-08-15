"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import DemoModal from "./DemoModal";

const TAG_COLOR: Record<string, string> = {
  EVENTO: "text-parchment-muted dark:text-parchment-muted",
  EVENT: "text-parchment-muted dark:text-parchment-muted",
  ANÁLISE: "text-amber-light",
  ANALYSIS: "text-amber-light",
  DECISÃO: "text-amber",
  DECISION: "text-amber",
  EXECUÇÃO: "text-amber",
  EXECUTION: "text-amber",
  RESULTADO: "text-emerald-400",
  OUTCOME: "text-emerald-400",
};

function DecisionTerminal() {
  const { t } = useApp();
  const lines = t.terminal;
  const [visibleCount, setVisibleCount] = useState(1);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion.current) {
      setVisibleCount(lines.length);
      return;
    }

    setVisibleCount(1);
    const interval = setInterval(() => {
      setVisibleCount((prev) => (prev >= lines.length ? 1 : prev + 1));
    }, 1700);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const shown = lines.slice(0, visibleCount);

  return (
    <div className="relative rounded-2xl border border-border-dark bg-surface-darkRaised shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 h-10 border-b border-border-dark bg-black/10">
        <span className="h-2.5 w-2.5 rounded-full bg-parchment-muted/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-parchment-muted/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-parchment-muted/30" />
        <span className="ml-2 text-[11px] font-mono text-parchment-muted uppercase tracking-wider">
          {t.hero.terminalLabel}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-glow" />
        </span>
      </div>

      <div className="px-4 sm:px-5 py-5 min-h-[260px] flex flex-col justify-end gap-2.5 font-mono text-[12.5px] sm:text-[13px] leading-relaxed">
        {shown.map((line, i) => {
          const isLast = i === shown.length - 1;
          return (
            <div
              key={`${line.time}-${i}`}
              className={`flex gap-2.5 ${!reduceMotion.current ? "animate-rise" : ""}`}
            >
              <span className="text-parchment-muted/60 shrink-0">{line.time}</span>
              <span
                className={`shrink-0 font-semibold ${TAG_COLOR[line.tag] ?? "text-amber-light"}`}
              >
                [{line.tag}]
              </span>
              <span className="text-parchment/90">
                {line.text}
                {isLast && <span className="inline-block w-[7px] h-[13px] bg-amber ml-1 align-middle animate-blink" />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-5 sm:px-8 overflow-hidden"
      >
      {/* ambient warm glow, kept subtle */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-[420px] bg-ember-radial dark:opacity-100 opacity-40" />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-xs font-mono font-medium text-amber tracking-wide">
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-6 font-display font-semibold text-[2.15rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-[3.15rem] lg:leading-[1.08] tracking-tight text-ink dark:text-parchment text-balance">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-ink/70 dark:text-parchment/75 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-12 px-6 rounded-full bg-amber-gradient text-espresso font-semibold text-sm flex items-center hover:brightness-105 active:brightness-95 transition-all cursor-pointer"
            >
              {t.hero.ctaPrimary}
            </button>
            <a
              href="#diferenciais"
              className="h-12 px-6 rounded-full border border-border-light dark:border-border-dark text-ink dark:text-parchment font-semibold text-sm flex items-center hover:border-amber hover:text-amber transition-colors"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-11 grid grid-cols-2 gap-6 max-w-md">
            <div className="border-l-2 border-amber/40 pl-4">
              <div className="font-display font-semibold text-xl sm:text-2xl text-ink dark:text-parchment">
                {t.hero.metric1Value}
              </div>
              <div className="mt-1 text-xs text-ink/60 dark:text-parchment/60 leading-snug">
                {t.hero.metric1Label}
              </div>
            </div>
            <div className="border-l-2 border-amber/40 pl-4">
              <div className="font-display font-semibold text-xl sm:text-2xl text-ink dark:text-parchment">
                {t.hero.metric2Value}
              </div>
              <div className="mt-1 text-xs text-ink/60 dark:text-parchment/60 leading-snug">
                {t.hero.metric2Label}
              </div>
            </div>
          </div>
        </div>

        {/* Right: signature element */}
        <div>
          <DecisionTerminal />
        </div>
      </div>
      </section>

      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
