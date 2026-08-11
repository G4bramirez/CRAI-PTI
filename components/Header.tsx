'use client';

import { useState } from 'react';
import Link from "next/link";
import DemoFormModal from "./DemoFormModal";

export default function Header() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            alt="CRAI Logo"
            className="h-10 w-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvQ5IYeQSfow5N1eP59ufCK_mqM3xZfnRpNSGYpYYUxQaB_YEMBwoOSf6fcfG8ADPF2aHamfsPBDCiSAaxxRsQQn52kWnJ3c-nSfGkfutNy_xnNo27qzcZxsUouIiDHyh-0DWTWKr_8JHbUu9_ZDB_kE1NuT5lsphUQfyXsd5ZIpWn59PbW06LBAdIg3Ctu2RlyeLN03ZPsgzQa3GUn5sMAqhTtZBcmubCqIH-RkWG-mtO1nSJwiY_3MMJMvqaT2rmwUN6zWHWza8"
          />
          <span className="font-sora text-headline-md font-bold text-primary tracking-tight">
            CRAI
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-xl">
          <Link
            href="#product"
            className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md"
          >
            Produto
          </Link>
          <Link
            href="#how-it-works"
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          >
            Como Funciona
          </Link>
          <Link
            href="#pricing"
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          >
            Preços
          </Link>
          <Link
            href="#contact"
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
          >
            Contato
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-md">
          <button
            onClick={() => setDemoOpen(true)}
            className="bg-primary-container text-on-primary font-bold px-lg py-sm rounded-lg hover:opacity-80 transition-all active:scale-95 duration-200 text-label-md"
          >
            Solicitar Demo
          </button>
        </div>
      </div>
    </nav>

      <DemoFormModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} planType="Geral" />
    </>
  );
}
