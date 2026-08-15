"use client";

import { useState } from "react";
import Image from "next/image";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#solucao", label: t.nav.solution },
    { href: "#diferenciais", label: t.nav.differentials },
    { href: "#precos", label: t.nav.pricing },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border-light dark:border-border-dark bg-surface-cream/85 dark:bg-espresso/85 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo_crai.png"
            alt="CRAI"
            width={36}
            height={36}
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            priority
          />
          <span className="font-display font-semibold text-lg tracking-tight text-ink dark:text-parchment">
            CRAI
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 dark:text-parchment/70 hover:text-amber dark:hover:text-amber-light transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right-side controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="h-9 px-3 rounded-full text-xs font-mono font-medium border border-border-light dark:border-border-dark text-ink/70 dark:text-parchment/70 hover:border-amber hover:text-amber transition-colors"
          >
            {lang === "pt" ? "PT / EN" : "EN / PT"}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-ink/70 dark:text-parchment/70 hover:border-amber hover:text-amber transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="/login"
            className="h-9 px-4 rounded-full border border-border-light dark:border-border-dark text-ink dark:text-parchment text-sm font-medium flex items-center hover:border-amber hover:text-amber transition-colors"
          >
            {lang === "pt" ? "Login" : "Sign In"}
          </a>
          <a
            href="#precos"
            className="h-9 px-4 rounded-full bg-amber-gradient text-espresso text-sm font-semibold flex items-center hover:brightness-105 active:brightness-95 transition-all shadow-[0_0_0_0_rgba(239,147,17,0.4)]"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-ink/70 dark:text-parchment/70"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="h-9 w-9 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-ink dark:text-parchment"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark bg-surface-cream dark:bg-espresso px-5 py-4 flex flex-col gap-4 animate-rise">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-ink/80 dark:text-parchment/80"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="self-start h-9 px-3 rounded-full text-xs font-mono font-medium border border-border-light dark:border-border-dark text-ink/70 dark:text-parchment/70"
          >
            {lang === "pt" ? "PT / EN" : "EN / PT"}
          </button>
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="h-10 px-4 rounded-full border border-border-light dark:border-border-dark text-ink dark:text-parchment text-sm font-medium flex items-center justify-center hover:border-amber hover:text-amber transition-colors"
          >
            {lang === "pt" ? "Login" : "Sign In"}
          </a>
          <a
            href="#precos"
            onClick={() => setMenuOpen(false)}
            className="h-10 px-4 rounded-full bg-amber-gradient text-espresso text-sm font-semibold flex items-center justify-center"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}
