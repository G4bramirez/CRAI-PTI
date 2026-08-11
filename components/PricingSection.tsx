'use client';

import { useState } from 'react';
import ComparisonTable from './ComparisonTable';
import DemoFormModal from './DemoFormModal';

export default function PricingSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const openDemo = (plan: string) => {
    setSelectedPlan(plan);
    setDemoOpen(true);
  };

  const plans = [
    {
      id: "recovery",
      name: "Recovery",
      subtitle: "Para começar sem risco",
      monthlyBase: "R$ 0",
      successFee: "A partir de 5%",
      idealFor: "Até R$ 50k de MRR monitorado",
      priceNote: "Modelo 100% Success Fee (conforme volume)",
      features: [
        {
          category: "Foco de Atuação",
          items: ["Churn Involuntário (Recuperação de Pagamentos)", "Diagnóstico automático de falhas"],
        },
        {
          category: "Canais de Contato",
          items: ["WhatsApp", "E-mail"],
        },
        {
          category: "Inteligência Artificial",
          items: ["Retry Inteligente (IA otimiza timing)", "Análise de Falha com XGBoost"],
        },
        {
          category: "Dashboard",
          items: ["Dashboard Básico", "Acompanhamento de recuperações em tempo real"],
        },
      ],
      highlighted: false,
      cta: {
        text: "Começar com Risco Zero",
        style: "secondary",
      },
    },
    {
      id: "retention-os",
      name: "Retention OS",
      subtitle: "Retenção completa, não só recuperação",
      monthlyBase: "A partir de R$ 2.000",
      successFee: "5–15%",
      idealFor: "MRR ilimitado (Foco em R$ 500k–R$ 5M)",
      priceNote: "Base + Success Fee (5–15% conforme volume e complexidade)",
      features: [
        {
          category: "Foco de Atuação",
          items: [
            "Churn Involuntário + Voluntário",
            "Análise comportamental preditiva",
            "Automatização de re-engajamento",
          ],
        },
        {
          category: "Canais de Contato",
          items: ["WhatsApp", "E-mail", "SMS"],
        },
        {
          category: "Inteligência Artificial",
          items: [
            "Payday Inference Engine (IA prevê melhor horário)",
            "Autoencoder (detecta risco comportamental)",
            "Multi-Armed Bandit (otimiza estratégia de contato)",
          ],
        },
        {
          category: "Dashboard & Suporte",
          items: [
            "Dashboard Completo com NRR Preditivo",
            "Recovery Health Score",
            "CSM dedicado (Gerente de Relacionamento)",
          ],
        },
      ],
      highlighted: true,
      badge: "Mais Popular",
      cta: {
        text: "Ver demonstração",
        style: "primary",
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "Retenção sob medida, na escala do seu negócio",
      monthlyBase: "Sob consulta",
      successFee: "5–15%",
      idealFor: "Contas estratégicas (MRR ilimitado + complexidade)",
      priceNote: "Modelo customizado (conforme volume)",
      features: [
        {
          category: "Tudo do Retention OS, mais:",
          items: [
            "Integrações customizadas (CRM, BI, webhooks)",
            "Modelos de IA fine-tunados nos seus dados",
            "Arquitetura sob medida para seu fluxo",
          ],
        },
        {
          category: "Suporte Prioritário",
          items: [
            "SLA de resposta garantido",
            "Onboarding assistido",
            "Contrato anual com dedicação de recursos",
          ],
        },
        {
          category: "Inteligência Avançada",
          items: [
            "Stack completo de modelos ML/IA",
            "Retreinamento contínuo com seus dados",
            "Consultoria estratégica de retenção",
          ],
        },
      ],
      highlighted: false,
      cta: {
        text: "Falar com Especialista",
        style: "secondary",
      },
    },
  ];

  return (
    <>
      <section className="py-3xl px-gutter relative overflow-hidden" id="pricing">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] data-glow -z-10 opacity-40"></div>

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <div className="text-center mb-3xl">
          <h2 className="font-sora text-headline-lg md:text-display-lg text-on-surface mb-md">
            Preços Claros, Modelo Transparente
          </h2>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Escolha o plano que combina com sua escala. Comece sem risco, cresça com inteligência.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card-glass p-2xl rounded-2xl flex flex-col relative transition-all ${
                plan.highlighted
                  ? "lg:scale-105 border-primary shadow-[0_0_60px_rgba(239,147,17,0.2)] bg-gradient-to-br from-surface-container-highest to-surface-container"
                  : "border-outline-variant/30"
              }`}
            >
              {/* Badge for Highlighted Plan */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-on-primary font-bold text-xs px-lg py-sm rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-2xl">
                <h3 className="font-sora text-headline-lg text-on-surface mb-xs">
                  {plan.name}
                </h3>
                <p className="font-inter text-body-md text-on-surface-variant mb-lg">
                  {plan.subtitle}
                </p>

                {/* Pricing */}
                <div className="space-y-xs">
                  <div className="flex items-baseline gap-xs">
                    <span className="font-sora text-display-lg font-bold text-primary">
                      {plan.monthlyBase}
                    </span>
                    <span className="text-on-surface-variant text-sm">/mês</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="font-inter text-body-md font-bold text-on-surface">
                      {plan.successFee} Success Fee
                    </span>
                    <span className="text-xs text-on-surface-variant italic">
                      (sobre valor recuperado)
                    </span>
                  </div>
                  <p className="text-label-sm text-on-surface-variant pt-xs">
                    {plan.priceNote}
                  </p>
                </div>

                {/* Ideal For */}
                <div className="mt-lg pt-lg border-t border-outline-variant/20">
                  <p className="text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    Ideal para
                  </p>
                  <p className="text-body-md text-on-surface mt-xs">{plan.idealFor}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-lg mb-2xl flex-grow">
                {plan.features.map((featureGroup, idx) => (
                  <div key={idx}>
                    <h4 className="font-inter font-bold text-label-md text-on-surface-variant uppercase tracking-wider mb-sm">
                      {featureGroup.category}
                    </h4>
                    <ul className="space-y-sm">
                      {featureGroup.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-sm text-body-md text-on-surface"
                        >
                          <span className="material-symbols-outlined text-base text-tertiary flex-shrink-0 mt-1">
                            check_circle
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => openDemo(plan.name)}
                className={`w-full font-bold py-md rounded-xl transition-all duration-200 ${
                  plan.cta.style === "primary"
                    ? "bg-primary text-on-primary hover:shadow-[0_0_30px_rgba(239,147,17,0.4)] active:scale-95"
                    : "border-2 border-primary text-primary hover:bg-primary/10 active:scale-95"
                }`}
              >
                {plan.cta.text}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Link */}
        <div className="text-center mt-3xl">
          <ComparisonTable />
          <p className="text-body-md text-on-surface-variant mt-md">
            Dúvidas? <a href="#" className="text-primary hover:underline">Fale com nossa equipe</a>
          </p>
        </div>
      </div>
    </section>

    <DemoFormModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} planType={selectedPlan} />
    </>
  );
}
