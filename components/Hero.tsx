'use client';

import { useState } from 'react';
import DemoFormModal from './DemoFormModal';

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center px-gutter overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40"></div>
        <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-sm px-md py-xs bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                Retention OS para SaaS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sora text-display-lg text-on-surface leading-[1.1]">
              Seu SaaS está perdendo receita em{" "}
              <span className="text-primary">silêncio.</span>
            </h1>

            {/* Description */}
            <p className="font-inter text-body-lg text-on-surface-variant max-w-xl">
              A CRAI detecta pagamentos falhados e clientes em risco antes que
              você perceba — e age automaticamente para recuperar sua receita.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-md">
              <button
                onClick={() => setDemoOpen(true)}
                className="bg-primary-container text-on-primary font-bold px-3xl py-md rounded-lg text-body-md hover:shadow-[0_0_20px_rgba(239,147,17,0.4)] transition-all"
              >
                Ver demonstração
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-outline-variant/30 text-on-surface font-bold px-3xl py-md rounded-lg text-body-md hover:bg-surface-container-high transition-all"
              >
                Como funciona?
              </button>
            </div>
          </div>

        {/* Right Image */}
        <div className="relative" id="how-it-works">
          <div className="card-glass p-md rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <img
              className="w-full h-auto rounded-lg shadow-2xl relative z-10"
              alt="A highly detailed 3D abstract representation of a SaaS financial dashboard in a dark tech aesthetic. The interface features glowing amber data lines, radial orange light pulses, and clean minimalist card modules showing 'Revenue Recovered' charts."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw3OEHVnr767X3qu1fFaim404Pf3yADh30ArNVG8IVj6UrDEL5xisFdYsU9wPSDtI7AFvdBdcSDc1KPJkZJ9GT4Nbxl4BFSUYoLqHkW32xkOO_w7HFhZkTpHbkb609sYngd5Tq2QuhqdXZxl3uqEOGawiXO0PetiBrJfcZyZjlHPLwz5-o8hCgnXcSrtcfqdYOnCGAjSMYbmul0Py3CEdwh-nr46yVHn1On6SYtTiBnaNbB0GNJ3eWtGP6n6R2QcKOdFPHZNjhGYg"
            />
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>

      <DemoFormModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} planType="Geral" />
    </>
  );
}
