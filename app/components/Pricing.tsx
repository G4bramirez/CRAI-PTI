"use client";

import { useApp } from "../context/AppContext";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Pricing() {
  const { t } = useApp();
  const { plan1, plan2 } = t.pricing;

  const plans = [
    { data: plan1, featured: false },
    { data: plan2, featured: true },
  ];

  return (
    <section id="precos" className="px-5 sm:px-8 py-20 sm:py-28 bg-surface-cream dark:bg-espresso">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-amber">
            {t.pricing.eyebrow}
          </span>
          <h2 className="mt-3 font-display font-semibold text-3xl sm:text-4xl tracking-tight text-ink dark:text-parchment text-balance">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-base text-ink/65 dark:text-parchment/65 leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Formula device — makes the performance-only model concrete */}
        <div className="mt-8 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-amber/25 bg-amber/[0.07] px-5 py-3.5 font-mono text-[13px] sm:text-sm text-ink dark:text-parchment">
          {t.pricing.formula}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {plans.map(({ data, featured }) => (
            <div
              key={data.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                featured
                  ? "border-2 border-amber bg-white dark:bg-surface-dark shadow-[0_20px_50px_-20px_rgba(239,147,17,0.4)]"
                  : "border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark"
              }`}
            >
              <span
                className={`self-start rounded-full px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider ${
                  featured
                    ? "bg-amber-gradient text-espresso"
                    : "bg-ink/5 dark:bg-parchment/10 text-ink/60 dark:text-parchment/60"
                }`}
              >
                {data.badge}
              </span>

              <h3 className="mt-5 font-display font-semibold text-2xl text-ink dark:text-parchment">
                {data.name}
              </h3>
              <p className="mt-1 text-sm font-mono text-amber">{data.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/65 dark:text-parchment/65">
                {data.description}
              </p>

              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {data.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-parchment/80">
                    <span className="text-amber"><CheckIcon /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#top"
                className={`mt-8 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  featured
                    ? "bg-amber-gradient text-espresso hover:brightness-105"
                    : "border border-border-light dark:border-border-dark text-ink dark:text-parchment hover:border-amber hover:text-amber"
                }`}
              >
                {t.nav.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink/55 dark:text-parchment/55">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
