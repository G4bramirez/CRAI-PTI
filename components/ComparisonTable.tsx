'use client';

import { useState } from 'react';

export default function ComparisonTable() {
  const [isOpen, setIsOpen] = useState(false);

  const comparisonData = [
    {
      category: "Preço & Modelo",
      items: [
        {
          feature: "Mensalidade Base",
          recovery: "R$ 0",
          retentionOS: "A partir de R$ 2.000",
          enterprise: "Sob consulta",
        },
        {
          feature: "Success Fee",
          recovery: "10% (valor recuperado)",
          retentionOS: "7% (valor recuperado)",
          enterprise: "5% (valor recuperado)",
        },
        {
          feature: "MRR Monitorado",
          recovery: "Até R$ 50k",
          retentionOS: "Ilimitado",
          enterprise: "Ilimitado",
        },
      ],
    },
    {
      category: "Cobertura de Churn",
      items: [
        {
          feature: "Churn Involuntário",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Churn Voluntário",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Análise Comportamental",
          recovery: "Básica",
          retentionOS: "Avançada",
          enterprise: "Fine-tunada nos seus dados",
        },
      ],
    },
    {
      category: "Canais de Comunicação",
      items: [
        {
          feature: "WhatsApp",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "E-mail",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "SMS",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Integrações Customizadas",
          recovery: "✗",
          retentionOS: "✗",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "Stack de Inteligência Artificial",
      items: [
        {
          feature: "Retry Inteligente",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Payday Inference Engine",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Autoencoder (Risco Comportamental)",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Multi-Armed Bandit",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Modelos Fine-tunados",
          recovery: "✗",
          retentionOS: "✗",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "Dashboard & Métricas",
      items: [
        {
          feature: "Dashboard Básico",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "NRR Preditivo",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Recovery Health Score",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "Relatórios Customizados",
          recovery: "✗",
          retentionOS: "✗",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "Suporte & Relacionamento",
      items: [
        {
          feature: "Suporte por E-mail",
          recovery: "✓",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "CSM Dedicado",
          recovery: "✗",
          retentionOS: "✓",
          enterprise: "✓",
        },
        {
          feature: "SLA Prioritário",
          recovery: "✗",
          retentionOS: "✗",
          enterprise: "✓",
        },
        {
          feature: "Onboarding Assistido",
          recovery: "✗",
          retentionOS: "✗",
          enterprise: "✓",
        },
      ],
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="font-inter text-tertiary font-bold underline hover:opacity-80 transition-opacity"
      >
        Ver tabela comparativa detalhada →
      </button>
    );
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter">
        <div className="card-glass rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto border-primary/30">
          {/* Header */}
          <div className="sticky top-0 bg-surface-container-high/95 backdrop-blur-sm p-2xl border-b border-outline-variant/20 flex justify-between items-center">
            <h2 className="font-sora text-headline-lg text-on-surface">
              Comparação Detalhada de Planos
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="material-symbols-outlined text-2xl text-on-surface-variant hover:text-primary cursor-pointer"
            >
              close
            </button>
          </div>

          {/* Content */}
          <div className="p-2xl space-y-3xl">
            {comparisonData.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="font-sora text-headline-md text-primary mb-lg uppercase">
                  {section.category}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/30">
                        <th className="text-left py-md px-md font-bold text-on-surface-variant text-label-md uppercase">
                          Recurso
                        </th>
                        <th className="text-center py-md px-md font-bold text-on-surface-variant text-label-md uppercase">
                          Recovery
                        </th>
                        <th className="text-center py-md px-md font-bold text-primary text-label-md uppercase">
                          Retention OS
                        </th>
                        <th className="text-center py-md px-md font-bold text-on-surface-variant text-label-md uppercase">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, itemIdx) => (
                        <tr
                          key={itemIdx}
                          className="border-b border-outline-variant/10 hover:bg-primary/5 transition-colors"
                        >
                          <td className="py-md px-md text-on-surface text-body-md font-medium">
                            {item.feature}
                          </td>
                          <td className="text-center py-md px-md">
                            {item.recovery === '✓' ? (
                              <span className="material-symbols-outlined text-tertiary">
                                check_circle
                              </span>
                            ) : item.recovery === '✗' ? (
                              <span className="material-symbols-outlined text-on-surface-variant/40">
                                cancel
                              </span>
                            ) : (
                              <span className="text-on-surface-variant text-sm">{item.recovery}</span>
                            )}
                          </td>
                          <td className="text-center py-md px-md bg-primary/5">
                            {item.retentionOS === '✓' ? (
                              <span className="material-symbols-outlined text-tertiary">
                                check_circle
                              </span>
                            ) : item.retentionOS === '✗' ? (
                              <span className="material-symbols-outlined text-on-surface-variant/40">
                                cancel
                              </span>
                            ) : (
                              <span className="text-on-surface text-sm font-bold">{item.retentionOS}</span>
                            )}
                          </td>
                          <td className="text-center py-md px-md">
                            {item.enterprise === '✓' ? (
                              <span className="material-symbols-outlined text-tertiary">
                                check_circle
                              </span>
                            ) : item.enterprise === '✗' ? (
                              <span className="material-symbols-outlined text-on-surface-variant/40">
                                cancel
                              </span>
                            ) : (
                              <span className="text-on-surface-variant text-sm">{item.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Close Button */}
            <div className="flex justify-center pt-2xl border-t border-outline-variant/20">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-primary text-on-primary font-bold px-3xl py-md rounded-lg hover:shadow-[0_0_30px_rgba(239,147,17,0.4)] transition-all"
              >
                Fechar Comparação
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
