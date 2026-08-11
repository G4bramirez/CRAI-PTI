export default function SolutionSection() {
  const solutions = [
    {
      icon: "payments",
      title: "Recuperação de Pagamentos",
      description:
        "Combata o churn involuntário com precisão e automação total.",
      benefits: [
        "Retentativas Inteligentes (IA define o melhor momento)",
        "Fluxos de cobrança via WhatsApp e e-mail",
        "Atualização automática de cartões",
      ],
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: "person_search",
      title: "Retenção de Clientes",
      description: "Identifique o risco antes do churn voluntário acontecer.",
      benefits: [
        "Score de saúde preditivo por conta",
        "Alertas de baixo uso (Drop in Engagement)",
        "Playbooks automáticos de re-engajamento",
      ],
      iconBg: "bg-secondary-container/30",
      iconColor: "text-secondary",
    },
  ];

  return (
    <section
      className="py-3xl px-gutter bg-surface-container-lowest"
      id="product"
    >
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-md mb-2xl">
          <div className="max-w-2xl">
            <h2 className="font-sora text-headline-lg text-on-surface mb-md">
              CRAI — Retention OS completo para seu SaaS
            </h2>
            <p className="text-on-surface-variant">
              Uma camada inteligente de retenção que funciona em segundo plano,
              24/7.
            </p>
          </div>
          <div className="bg-primary/10 px-md py-sm rounded-lg flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary">
              auto_awesome
            </span>
            <span className="text-primary font-bold">Powered by AI</span>
          </div>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {solutions.map((solution, idx) => (
            <div
              key={idx}
              className="card-glass p-2xl rounded-2xl relative overflow-hidden group"
            >
              <div className="relative z-10 space-y-lg">
                <div className={`w-16 h-16 ${solution.iconBg} rounded-xl flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-3xl ${solution.iconColor}`}>
                    {solution.icon}
                  </span>
                </div>
                <h3 className="font-sora text-headline-lg md:text-headline-md">
                  {solution.title}
                </h3>
                <p className="text-on-surface-variant">{solution.description}</p>
                <ul className="space-y-md">
                  {solution.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-md">
                      <span className={`material-symbols-outlined text-sm ${solution.iconColor}`}>
                        check_circle
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
