export default function ProblemSection() {
  const problems = [
    {
      icon: "credit_card_off",
      title: "Churn Involuntário",
      description:
        "Cartões vencidos, saldo insuficiente ou erros de processador. Você perde clientes que queriam continuar pagando.",
      color: "error",
      borderColor: "border-t-error/30",
    },
    {
      icon: "trending_down",
      title: "Churn Voluntário",
      description:
        "Clientes que param de usar o produto e 'esfriam'. Quando você percebe o cancelamento, já é tarde demais para salvá-los.",
      color: "primary",
      borderColor: "border-t-primary/30",
    },
    {
      icon: "visibility_off",
      title: "Sem visibilidade",
      description:
        "Dificuldade em prever quais contas irão cancelar, resultando em ações lentas e erosão contínua do MRR.",
      color: "secondary",
      borderColor: "border-t-secondary/30",
    },
  ];

  return (
    <section className="py-3xl px-gutter" id="problem">
      <div className="max-w-container-max mx-auto">
        {/* ICP Badge */}
        <div className="text-center mb-2xl">
          <span className="inline-block bg-primary/10 text-primary font-bold text-label-md px-lg py-sm rounded-full mb-md">
            Feito para SaaS brasileiros com MRR entre R$500k e R$5M
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center mb-2xl">
          <h2 className="font-sora text-headline-lg text-on-surface mb-md">
            Churn custa mais do que você imagina
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Ignorar as pequenas rachaduras no seu MRR pode levar seu SaaS ao
            colapso financeiro antes que você consiga agir.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className={`card-glass p-xl rounded-xl space-y-md ${problem.borderColor}`}
            >
              <span
                className={`material-symbols-outlined text-4xl text-${problem.color}`}
              >
                {problem.icon}
              </span>
              <h3 className="font-sora text-headline-md text-on-surface">
                {problem.title}
              </h3>
              <p className="text-on-surface-variant">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
