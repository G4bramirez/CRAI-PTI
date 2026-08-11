export default function Differentials() {
  const differentials = [
    {
      icon: "public",
      title: "Brasil-Native",
      description:
        "Entendemos Pix, boletos e o comportamento do pagador brasileiro melhor que plataformas globais.",
      rowSpan: 1,
      bgGradient: false,
    },
    {
      icon: "smart_toy",
      title: "IA Agentiva",
      description:
        "Não é apenas regra de 'se-então'. Nossa IA toma decisões complexas baseadas em contextos individuais.",
      rowSpan: 2,
      bgGradient: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCCXIM-d0ERRXUgIuB7QRjl7pIMZ_LpmfRx7yBVrD3mmcaIQjS4GxYIYP7Qpy15lBcf1sz0IqBvlRoVekPqQ-EaCMCE6KKkzMu1IRy9b68ljAL0SG-uoIhFLUM2VRmVy91MPd7FGBVBX_p4jgL0_uvJfBn5pnRnE4EXqOdqIpDlrOppab8ubneEo0H8w23sTkAG0LfzKLIXRBQwTYKpOLiBL3IG4CmQYtEXaYq3ayUJmqP5iKP7VYXKPdN2sqihAMnhRVHYd-PUtnI",
    },
    {
      icon: "chat",
      title: "WhatsApp-First",
      description:
        "Onde seu cliente está. 95% de abertura em canais de comunicação direta.",
      rowSpan: 1,
      bgGradient: false,
    },
    {
      icon: "workspace_premium",
      title: "Outcome-as-a-Service",
      description:
        "Nós não vendemos software, vendemos receita recuperada na conta.",
      rowSpan: 1,
      bgGradient: false,
    },
    {
      icon: "shield",
      title: "LGPD-Native",
      description:
        "Segurança de nível enterprise com conformidade total às leis brasileiras.",
      rowSpan: 1,
      bgGradient: false,
    },
  ];

  return (
    <section
      className="py-3xl px-gutter bg-surface-container-low"
      id="differentials"
    >
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="text-center mb-2xl">
          <h2 className="font-sora text-headline-lg text-on-surface">
            Por que a CRAI é diferente
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-lg h-auto md:h-[600px]">
          {/* Card 1: Brasil-Native */}
          <div className="card-glass p-xl rounded-2xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-3xl">
              public
            </span>
            <div>
              <h4 className="font-sora text-headline-md text-on-surface mb-xs">
                Brasil-Native
              </h4>
              <p className="text-on-surface-variant text-sm">
                Entendemos Pix, boletos e o comportamento do pagador brasileiro
                melhor que gringos.
              </p>
            </div>
          </div>

          {/* Card 2: IA Agentiva (spans 2 rows) */}
          <div className="card-glass p-xl rounded-2xl flex flex-col justify-between md:row-span-2 bg-gradient-to-b from-surface-container-highest to-surface-container">
            <div>
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
              <div className="mt-lg">
                <h4 className="font-sora text-headline-md text-on-surface mb-xs">
                  IA Agentiva
                </h4>
                <p className="text-on-surface-variant">
                  Não é apenas regra de 'se-então'. Nossa IA toma decisões
                  complexas baseada em contextos individuais.
                </p>
              </div>
            </div>
            <div className="mt-lg border-t border-outline-variant/20 pt-lg">
              <img
                className="w-full h-32 object-cover rounded-lg opacity-60"
                alt="A macro close-up of a sleek, dark metallic AI chip with glowing orange circuitry paths."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCXIM-d0ERRXUgIuB7QRjl7pIMZ_LpmfRx7yBVrD3mmcaIQjS4GxYIYP7Qpy15lBcf1sz0IqBvlRoVekPqQ-EaCMCE6KKkzMu1IRy9b68ljAL0SG-uoIhFLUM2VRmVy91MPd7FGBVBX_p4jgL0_uvJfBn5pnRnE4EXqOdqIpDlrOppab8ubneEo0H8w23sTkAG0LfzKLIXRBQwTYKpOLiBL3IG4CmQYtEXaYq3ayUJmqP5iKP7VYXKPdN2sqihAMnhRVHYd-PUtnI"
              />
            </div>
          </div>

          {/* Card 3: WhatsApp-First */}
          <div className="card-glass p-xl rounded-2xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-3xl">
              chat
            </span>
            <div>
              <h4 className="font-sora text-headline-md text-on-surface mb-xs">
                WhatsApp-First
              </h4>
              <p className="text-on-surface-variant text-sm">
                Onde seu cliente está. 95% de abertura em canais de comunicação
                direta.
              </p>
            </div>
          </div>

          {/* Card 4: Outcome-as-a-Service */}
          <div className="card-glass p-xl rounded-2xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-3xl">
              workspace_premium
            </span>
            <div>
              <h4 className="font-sora text-headline-md text-on-surface mb-xs">
                Outcome-as-a-Service
              </h4>
              <p className="text-on-surface-variant text-sm">
                Nós não vendemos software, vendemos receita recuperada na
                conta.
              </p>
            </div>
          </div>

          {/* Card 5: LGPD-Native */}
          <div className="card-glass p-xl rounded-2xl flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-3xl">
              shield
            </span>
            <div>
              <h4 className="font-sora text-headline-md text-on-surface mb-xs">
                LGPD-Native
              </h4>
              <p className="text-on-surface-variant text-sm">
                Segurança de nível enterprise com conformidade total às leis
                brasileiras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
