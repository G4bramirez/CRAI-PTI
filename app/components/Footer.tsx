"use client";

import Image from "next/image";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="border-t border-border-light dark:border-border-dark px-5 sm:px-8 py-12">
      <div className="mx-auto max-w-7xl grid sm:grid-cols-[1.3fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/logo_crai.png"
              alt="CRAI"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="font-display font-semibold text-base text-ink dark:text-parchment">
              CRAI
            </span>
          </div>
          <p className="mt-3 text-sm text-ink/60 dark:text-parchment/60 max-w-sm">
            {t.footer.tagline}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink/45 dark:text-parchment/45 max-w-md">
            {t.footer.lgpd}
          </p>
        </div>

        <div className="sm:justify-self-end">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-ink/50 dark:text-parchment/50">
            {t.footer.contactTitle}
          </span>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${t.footer.email}`}
              className="text-ink/75 dark:text-parchment/75 hover:text-amber transition-colors"
            >
              {t.footer.email}
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/75 dark:text-parchment/75 hover:text-amber transition-colors"
            >
              {t.footer.linkedin}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border-light dark:border-border-dark text-xs text-ink/40 dark:text-parchment/40">
        © {new Date().getFullYear()} CRAI. {t.footer.rights}
      </div>
    </footer>
  );
}
