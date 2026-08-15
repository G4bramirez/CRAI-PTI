# CRAI — Landing Page

Landing page single-page (App Router) para a CRAI, um Retention OS de IA para SaaS B2B.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para build de produção:

```bash
npm run build
npm run start
```

> O projeto foi compilado e type-checado com sucesso neste ambiente (`next build`).
> A única parte não verificável no sandbox de desenvolvimento foi o download das
> fontes do Google Fonts (`next/font/google`), porque o sandbox não tem acesso a
> `fonts.googleapis.com`. Isso funciona normalmente em qualquer ambiente com
> internet (local, Vercel, etc.) — nenhuma mudança de código é necessária.

## Estrutura

```
app/
  layout.tsx              # fontes (Space Grotesk, Inter, IBM Plex Mono), dark mode padrão
  page.tsx                # server component, apenas monta <LandingPage />
  globals.css             # base styles, grão sutil, foco de teclado, reduced motion
  context/
    AppContext.tsx         # estado de tema (dark/light) e idioma (pt/en)
  lib/
    i18n.ts                 # dicionário PT/EN completo
  components/
    LandingPage.tsx         # composição da página, dentro do AppProvider
    Header.tsx               # header fixo, nav âncoras, toggles, CTA
    Hero.tsx                  # título, subtítulo, CTAs, terminal de decisões (elemento assinatura)
    Features.tsx               # 3 pilares: Decisão Agêntica, Payday Engine, Explicabilidade
    Pricing.tsx                  # planos Recuperação / Retenção + Insights
    Footer.tsx                    # logo, aviso LGPD, contato
tailwind.config.ts          # paleta de marca (#1A120A, #EF9311, #FFB86C) e tokens
public/logo_crai.png        # logo enviado
```

## Decisões de design

- **Paleta:** fundo `#1A120A` (espresso) com acentos âmbar `#EF9311` → `#FFB86C` em
  gradiente, conforme guia de identidade. Modo claro usa os mesmos tons como texto,
  invertendo o par bg/texto para manter a mesma "temperatura" quente nos dois modos.
- **Tipografia:** Space Grotesk (display, títulos), Inter (corpo) e IBM Plex Mono
  (dados, tags, o terminal de decisões e a fórmula de pricing) — o mono reforça a
  identidade "produto de dados/IA" nos pontos onde isso é o argumento central.
- **Elemento de assinatura:** o hero inclui um "terminal de decisões do agente" que
  cicla eventos simulados (falha detectada → análise via Payday Engine → decisão de
  canal/tom/horário → execução → resultado). Isso torna tangível o diferencial mais
  abstrato do produto (decisão agêntica autônoma e explicabilidade) em vez de um
  hero genérico de texto + imagem de estoque.
- **Dark mode:** padrão, com toggle persistido apenas em estado de sessão (sem
  localStorage, para manter o código simples de revisar); a classe `dark` é aplicada
  no `<html>` já no server render para evitar flash de tema claro.
- **i18n:** toggle PT/EN simples via Context + dicionário estático em
  `app/lib/i18n.ts` — sem biblioteca externa, fácil de estender com mais idiomas.

## Próximos passos sugeridos

- Trocar o link do LinkedIn e o e-mail de contato no rodapé pelos reais.
- Conectar o CTA "Agendar Demonstração" a um formulário ou link de agendamento
  (Calendly, HubSpot, etc.) em vez da âncora `#precos`.
- Adicionar analytics (ex. Plausible, PostHog) se for medir conversão do CTA.
