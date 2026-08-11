'use client';

import { useState } from 'react';
import DemoFormModal from './DemoFormModal';

export default function FinalCTA() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="py-3xl px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="card-glass p-3xl rounded-3xl text-center space-y-xl bg-gradient-to-r from-surface-container-high to-surface-container-lowest border-primary/20 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 space-y-md">
              <h2 className="font-sora text-headline-lg md:text-display-lg text-on-surface">
                Pare de perder receita que já é sua.
              </h2>
              <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                A CRAI recupera o que você deixou na mesa — sem risco, sem
                contrato longo.
              </p>
              <div className="pt-lg">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="bg-primary-container text-on-primary font-bold px-3xl py-md rounded-lg text-headline-md hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  Ver demonstração
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoFormModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} planType="Geral" />
    </>
  );
}
