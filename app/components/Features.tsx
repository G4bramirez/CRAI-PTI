"use client";

import { useApp } from "../context/AppContext";

function BrainIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3.5a2.5 2.5 0 0 0-2.45 2.03A2.5 2.5 0 0 0 5 8v.5A2.5 2.5 0 0 0 3.5 11 2.5 2.5 0 0 0 5 13.35V14a3 3 0 0 0 3 3 2.5 2.5 0 0 0 2.5 2.5V6A2.5 2.5 0 0 0 9.5 3.5Z" />
      <path d="M14.5 3.5a2.5 2.5 0 0 1 2.45 2.03A2.5 2.5 0 0 1 19 8v.5a2.5 2.5 0 0 1 1.5 2.5 2.5 2.5 0 0 1-1.5 2.35V14a3 3 0 0 1-3 3 2.5 2.5 0 0 1-2.5 2.5V6a2.5 2.5 0 0 1 2.5-2.5Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2M9 2h6" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const ICONS = [BrainIcon, ClockIcon, EyeIcon];

export default function Features() {
  const { t } = useApp();
  const items = t.features.items;

  return (
    <section id="diferenciais" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-amber">
            {t.features.eyebrow}
          </span>
          <h2 className="mt-3 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-ink dark:text-parchment text-balance">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base text-ink/65 dark:text-parchment/65 leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark p-7 transition-all duration-300 hover:border-amber/50 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(239,147,17,0.35)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/10 text-amber">
                  <Icon />
                </div>
                <span className="mt-5 block text-[11px] font-mono font-medium uppercase tracking-widest text-amber-light/90 dark:text-amber-light">
                  {item.tag}
                </span>
                <h3 className="mt-2 font-display font-semibold text-lg text-ink dark:text-parchment">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65 dark:text-parchment/65">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
