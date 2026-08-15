export type Lang = "pt" | "en";

export interface Dictionary {
  nav: {
    solution: string;
    differentials: string;
    pricing: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metric1Value: string;
    metric1Label: string;
    metric2Value: string;
    metric2Label: string;
    terminalLabel: string;
  };
  terminal: { time: string; text: string; tag: string }[];
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { tag: string; title: string; description: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formula: string;
    plan1: {
      name: string;
      subtitle: string;
      description: string;
      features: string[];
      badge: string;
    };
    plan2: {
      name: string;
      subtitle: string;
      description: string;
      features: string[];
      badge: string;
    };
    note: string;
  };
  footer: {
    tagline: string;
    lgpd: string;
    contactTitle: string;
    email: string;
    linkedin: string;
    rights: string;
  };
}

export const dictionary: Record<Lang, Dictionary> = {
  pt: {
    nav: {
      solution: "Solução",
      differentials: "Diferenciais",
      pricing: "Preços",
      cta: "Agendar Demonstração",
    },
    hero: {
      eyebrow: "Retention OS para SaaS B2B",
      title: "Transforme perdas em receita com nosso Retention OS",
      subtitle:
        "Um agente de IA autônomo monitora cada cobrança da sua base, identifica falhas de pagamento em tempo real e decide sozinho o melhor canal, momento e tom para recuperar o cliente — sem playbook engessado, sem régua fixa.",
      ctaPrimary: "Agendar Demonstração",
      ctaSecondary: "Ver o agente em ação",
      metric1Value: "Sem limite mínimo",
      metric1Label: "Qualquer tamanho de empresa",
      metric2Value: "0",
      metric2Label: "Cobrado adiantado — só success fee",
      terminalLabel: "Feed de decisões do agente · ao vivo",
    },
    terminal: [
      { time: "14:32:07", text: "Falha de pagamento detectada — Cliente #4482", tag: "EVENTO" },
      { time: "14:32:08", text: "Consultando Payday Engine — inferindo próxima janela de liquidez", tag: "ANÁLISE" },
      { time: "14:32:09", text: "Perfil: sensível a cobrança direta. Tom recomendado: empático", tag: "ANÁLISE" },
      { time: "14:32:10", text: "Decisão: WhatsApp, em 2 dias, tom empático — motivo anexado", tag: "DECISÃO" },
      { time: "14:32:11", text: "Ação executada. Aguardando resposta do cliente", tag: "EXECUÇÃO" },
      { time: "14:34:52", text: "Cliente respondeu — pagamento regularizado", tag: "RESULTADO" },
    ],
    features: {
      eyebrow: "Diferenciais",
      title: "Não é uma régua de cobrança. É um agente que decide.",
      subtitle:
        "Três capacidades que separam a CRAI de qualquer automação de cobrança tradicional.",
      items: [
        {
          tag: "Autônomo",
          title: "Decisão Agêntica Autônoma",
          description:
            "Nada de fluxos pré-programados. O agente lê o contexto de cada cliente — histórico, canal preferido, risco de churn — e decide sozinho o próximo passo, sem esperar por regras que alguém precisou prever.",
        },
        {
          tag: "Preditivo",
          title: "Payday Engine",
          description:
            "Motor de inferência de liquidez que estima quando cada cliente costuma ter caixa disponível, e agenda a tentativa de cobrança para o momento com maior chance real de sucesso.",
        },
        {
          tag: "Transparente",
          title: "Explicabilidade via SHAP",
          description:
            "Toda decisão do agente vem com a razão anexada: quais variáveis pesaram, o quanto pesaram, e por quê. Sem caixa-preta — sua equipe audita cada cobrança e cada mensagem enviada.",
        },
      ],
    },
    pricing: {
      eyebrow: "Preços",
      title: "Você só paga pelo que a CRAI recupera de verdade",
      subtitle:
        "Modelo 100% performance. Sem mensalidade fixa, sem setup caro — a success fee incide unicamente sobre o ganho incremental comprovado.",
      formula: "Success Fee = % × Receita Efetivamente Recuperada",
      plan1: {
        name: "Recuperação",
        subtitle: "Churn involuntário",
        description:
          "Foco total em falhas de pagamento — cartão recusado, boleto vencido, saldo insuficiente. O agente detecta, decide e recupera automaticamente.",
        features: [
          "Monitoramento de falhas de pagamento em tempo real",
          "Recuperação multicanal (WhatsApp, e-mail, SMS)",
          "Payday Engine para timing de cobrança",
          "Success fee somente sobre valor recuperado",
        ],
        badge: "Comece por aqui",
      },
      plan2: {
        name: "Retenção + Insights",
        subtitle: "Churn voluntário",
        description:
          "Além de recuperar cobranças, o agente identifica sinais de intenção de cancelamento e age proativamente — com um painel de insights sobre saúde da base.",
        features: [
          "Tudo do plano Recuperação",
          "Detecção de sinais de risco de cancelamento",
          "Reengajamento proativo pré-churn",
          "Painel de insights sobre saúde da carteira",
          "Success fee sobre MRR retido comprovado",
        ],
        badge: "Mais completo",
      },
      note: "Nenhum dos dois planos cobra mensalidade fixa. A CRAI só ganha quando você ganha.",
    },
    footer: {
      tagline: "Retention OS para SaaS B2B brasileiro.",
      lgpd:
        "A CRAI trata dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). Dados de cobrança são usados exclusivamente para fins de recuperação de receita e retenção, mediante contrato com o cliente SaaS.",
      contactTitle: "Contato",
      email: "contato@crai.ai",
      linkedin: "LinkedIn",
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      solution: "Solution",
      differentials: "Why CRAI",
      pricing: "Pricing",
      cta: "Book a Demo",
    },
    hero: {
      eyebrow: "Retention OS for B2B SaaS",
      title: "Turn losses into revenue with our Retention OS",
      subtitle:
        "An autonomous AI agent watches every charge across your customer base, spots payment failures in real time, and decides on its own the best channel, moment, and tone to win the customer back — no rigid playbook, no fixed dunning schedule.",
      ctaPrimary: "Book a Demo",
      ctaSecondary: "See the agent in action",
      metric1Value: "No minimum limit",
      metric1Label: "Any size company",
      metric2Value: "0",
      metric2Label: "Upfront cost — success fee only",
      terminalLabel: "Agent decision feed · live",
    },
    terminal: [
      { time: "14:32:07", text: "Payment failure detected — Customer #4482", tag: "EVENT" },
      { time: "14:32:08", text: "Querying Payday Engine — inferring next liquidity window", tag: "ANALYSIS" },
      { time: "14:32:09", text: "Profile: sensitive to direct dunning. Recommended tone: empathetic", tag: "ANALYSIS" },
      { time: "14:32:10", text: "Decision: WhatsApp, in 2 days, empathetic tone — reasoning attached", tag: "DECISION" },
      { time: "14:32:11", text: "Action executed. Awaiting customer reply", tag: "EXECUTION" },
      { time: "14:34:52", text: "Customer replied — payment resolved", tag: "OUTCOME" },
    ],
    features: {
      eyebrow: "Why CRAI",
      title: "Not a dunning sequence. An agent that decides.",
      subtitle:
        "Three capabilities that set CRAI apart from any traditional billing automation.",
      items: [
        {
          tag: "Autonomous",
          title: "Autonomous Agentic Decisions",
          description:
            "No pre-programmed flows. The agent reads each customer's context — history, preferred channel, churn risk — and decides the next step on its own, without waiting for someone to have foreseen the rule.",
        },
        {
          tag: "Predictive",
          title: "Payday Engine",
          description:
            "A liquidity-inference engine that estimates when each customer typically has cash available, and schedules the charge attempt for the moment with the real highest odds of success.",
        },
        {
          tag: "Transparent",
          title: "SHAP-based Explainability",
          description:
            "Every decision ships with its reasoning attached: which variables mattered, how much, and why. No black box — your team can audit every charge and every message sent.",
        },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "You only pay for what CRAI actually recovers",
      subtitle:
        "A 100% performance-based model. No fixed monthly fee, no costly setup — the success fee applies solely to the proven incremental gain.",
      formula: "Success Fee = % × Revenue Actually Recovered",
      plan1: {
        name: "Recovery",
        subtitle: "Involuntary churn",
        description:
          "Full focus on payment failures — declined cards, overdue invoices, insufficient funds. The agent detects, decides, and recovers automatically.",
        features: [
          "Real-time payment-failure monitoring",
          "Multichannel recovery (WhatsApp, email, SMS)",
          "Payday Engine for charge timing",
          "Success fee only on recovered revenue",
        ],
        badge: "Start here",
      },
      plan2: {
        name: "Retention + Insights",
        subtitle: "Voluntary churn",
        description:
          "Beyond recovering charges, the agent spots cancellation-intent signals and acts proactively — with a dashboard of insights on portfolio health.",
        features: [
          "Everything in Recovery",
          "Cancellation-risk signal detection",
          "Proactive pre-churn re-engagement",
          "Portfolio health insights dashboard",
          "Success fee on proven retained MRR",
        ],
        badge: "Most complete",
      },
      note: "Neither plan charges a fixed monthly fee. CRAI only wins when you win.",
    },
    footer: {
      tagline: "Retention OS for Brazilian B2B SaaS.",
      lgpd:
        "CRAI processes personal data in compliance with Brazil's General Data Protection Law (LGPD, Law No. 13,709/2018). Billing data is used exclusively for revenue recovery and retention purposes, under contract with the SaaS client.",
      contactTitle: "Contact",
      email: "contato@crai.ai",
      linkedin: "LinkedIn",
      rights: "All rights reserved.",
    },
  },
};
