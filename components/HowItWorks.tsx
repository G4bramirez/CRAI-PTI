export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Conecte sua plataforma",
      description:
        "Integração nativa com Stripe, Vindi, Hotmart e os principais provedores de pagamento do Brasil.",
    },
    {
      number: "02",
      title: "IA aprende seu negócio",
      description:
        "Nossos modelos analisam seu histórico para entender o comportamento de pagamento e uso.",
    },
    {
      number: "03",
      title: "Agentes agem automaticamente",
      description:
        "A CRAI inicia as comunicações e tentativas de cobrança personalizadas para cada caso.",
    },
    {
      number: "04",
      title: "Você acompanha os resultados",
      description:
        "Dashboard em tempo real mostrando o NRR recuperado e o ROI da operação.",
    },
  ];

  return (
    <section className="py-3xl px-gutter relative" id="how-it-works">
      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <div className="text-center mb-3xl">
          <h2 className="font-sora text-headline-lg text-on-surface mb-md">
            Integre em menos de 48h
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Processo sem fricção para você focar no produto enquanto nós
            cuidamos da receita.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl relative">
          {steps.map((step, idx) => (
            <div key={idx} className="space-y-md relative group">
              <div className="text-display-lg opacity-10 font-bold group-hover:text-primary transition-colors font-sora">
                {step.number}
              </div>
              <h4 className="font-sora text-headline-md text-on-surface">
                {step.title}
              </h4>
              <p className="text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
