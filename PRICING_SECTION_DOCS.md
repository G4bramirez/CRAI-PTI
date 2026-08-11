# 📊 DOCUMENTAÇÃO - SEÇÃO DE PRICING CRAI

**Última Atualização:** 21 de julho de 2026  
**Status:** ✅ Implementado e Pronto para Produção  
**Componentes:** `PricingSection.tsx` + `ComparisonTable.tsx`  

---

## 🎯 Visão Geral

A seção de Pricing da CRAI implementa um modelo híbrido transparente com 3 planos escalonados:

1. **Recovery** — Porta de entrada (Risco Zero)
2. **Retention OS** — Carro-chefe (Mais Popular)
3. **Enterprise** — Contas estratégicas (Sob Consulta)

Cada plano explicita claramente:
- **Mensalidade Base** (fixa mensal)
- **Success Fee** (% sobre valor recuperado)
- **Recursos incluídos** (com ícones de checagem)
- **Canais de contato** (WhatsApp, E-mail, SMS)
- **Stack de IA** (modelos específicos por plano)
- **Suporte & SLA** (CSM, onboarding, etc)

---

## 📁 Estrutura de Arquivos

```
components/
├── PricingSection.tsx          ← Componente principal (3 cards)
└── ComparisonTable.tsx         ← Modal comparativo (tabela linha a linha)
```

### Tamanho e Performance

| Arquivo | Linhas | Tamanho Aprox |
|---------|--------|---------------|
| PricingSection.tsx | 280 | 12 KB |
| ComparisonTable.tsx | 320 | 14 KB |
| **Total** | 600 | **26 KB** |

---

## 🎨 Design Visual

### Paleta de Cores

```
Primary (Laranja):     #ffb86c, #ef9311
Tertiary (Azul):       #89ceff
Background:            #1a120a
Surface:               #141728
Text:                  #f0e0d2
Text Variant:          #dac2ae
```

### Destaque do Plano "Retention OS"

**Desktop (lg breakpoint):**
- `scale-105` — Card 5% maior
- `border-primary` — Borda laranja
- `shadow-[0_0_60px_rgba(...)]` — Glow de 60px
- `bg-gradient-to-br` — Gradiente sutil
- **Badge "Mais Popular"** — Badge laranja no topo

**Mobile (sem escala):**
- Mantém border e badge (escala de 5% é muito em telas pequenas)
- Responsividade garantida

### Tipografia

| Elemento | Font | Size | Weight | Color |
|----------|------|------|--------|-------|
| Título Plan | Sora | 24px (headline-lg) | 600 | on-surface |
| Subtítulo | Inter | 16px (body-md) | 400 | on-surface-variant |
| Preço Base | Sora | 48px (display-lg) | 700 | primary |
| Success Fee | Inter | 16px (body-md) | 700 | on-surface |
| Feature Label | Inter | 14px (label-md) | 500 | on-surface-variant |
| Feature Item | Inter | 16px (body-md) | 400 | on-surface |

### Ícones

```
✓ check_circle (checkmarks azuis #89ceff)
✗ cancel (ícones vazios, 40% opacity)
↳ Material Symbols (Google Fonts)
```

---

## 🔧 Estrutura de Dados dos Planos

### Objeto Plan

```typescript
interface Plan {
  id: string;                    // Identificador único
  name: string;                  // Nome do plano (Recovery, Retention OS, Enterprise)
  subtitle: string;              // Proposição de valor
  monthlyBase: string;           // Preço base (ex: "R$ 0", "A partir de R$ 2.000")
  successFee: string;            // % Success Fee (10%, 7%, 5%)
  idealFor: string;              // Faixa de MRR recomendado
  priceNote: string;             // Modelo de precificação (ex: "100% Success Fee")
  features: FeatureGroup[];      // Agrupado por categoria
  highlighted: boolean;          // Se é o plano destaque (true = Retention OS)
  badge?: string;                // Badge no topo (ex: "Mais Popular")
  cta: {
    text: string;               // Texto do botão (ex: "Começar com Risco Zero")
    style: "primary" | "secondary"; // Estilo do botão
  };
}

interface FeatureGroup {
  category: string;             // Categoria (ex: "Foco de Atuação")
  items: string[];              // Lista de recursos
}
```

### Exemplo de Plano (Recovery)

```javascript
{
  id: "recovery",
  name: "Recovery",
  subtitle: "Para começar sem risco",
  monthlyBase: "R$ 0",
  successFee: "10%",
  idealFor: "Até R$ 50k de MRR monitorado",
  priceNote: "Modelo 100% Success Fee",
  features: [
    {
      category: "Foco de Atuação",
      items: [
        "Churn Involuntário (Recuperação de Pagamentos)",
        "Diagnóstico automático de falhas"
      ],
    },
    // ... mais categorias
  ],
  highlighted: false,
  cta: {
    text: "Começar com Risco Zero",
    style: "secondary",
  },
}
```

---

## 📱 Responsividade

### Desktop (lg: 1024px+)

```
[Recovery Card]   [Retention OS Card*]   [Enterprise Card]
                  (* scale-105, destaque)
Largura: 33% cada = 1/3 do container
Gap: xl (32px entre cards)
```

### Tablet (md: 768px - 1023px)

```
[Recovery Card]
[Retention OS Card]
[Enterprise Card]
Largura: 100% (empilhado)
Gap: xl (32px)
```

### Mobile (< 768px)

```
[Recovery Card]
[Retention OS Card]
[Enterprise Card]
Largura: 100% com px-gutter (espaçamento)
Gap: xl (32px)
```

---

## 🎛️ CTAs por Plano

### Recovery
```
Botão: "Começar com Risco Zero"
Estilo: Secundário (border + outline)
Ação: Deveria levar para formulário de cadastro self-service
URL Sugerida: /register?plan=recovery
```

### Retention OS (Destaque)
```
Botão: "Agendar Demonstração"
Estilo: Primário (filled laranja)
Ação: Deveria abrir formulário de agendamento ou Calendly
URL Sugerida: /demo ou https://calendly.com/crai/demo
```

### Enterprise
```
Botão: "Falar com Especialista"
Estilo: Secundário (border + outline)
Ação: Deveria abrir chat ou formulário de contato
URL Sugerida: /contact?plan=enterprise
```

---

## 🔄 Fluxo de Integração

### 1. Componente Pai
```typescript
// Na página principal (app/page.tsx)
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      {/* ... outros componentes ... */}
      <PricingSection />
    </>
  );
}
```

### 2. PricingSection Interna
- Renderiza grid de 3 planos
- Cada plano é um card com dados estruturados
- Importa `ComparisonTable` para o link comparativo

### 3. ComparisonTable (Modal Interativa)
- Usa `useState` para controlar abertura/fechamento
- Modal com overlay backdrop
- Renderiza tabela comparativa em HTML puro
- Responsiva com `overflow-x-auto`

---

## 🧩 Customização e Manutenção

### Alterar Preços

```typescript
// Em PricingSection.tsx, no array plans[]
{
  monthlyBase: "A partir de R$ 3.000", // Alterar aqui
  successFee: "6%", // Alterar aqui
}
```

### Adicionar/Remover Recursos

```typescript
features: [
  {
    category: "Foco de Atuação",
    items: [
      "Churn Involuntário",
      // Adicionar novo item aqui
      "Novo Recurso X",
    ],
  },
]
```

### Mudar Plano Destacado

```typescript
// Trocar highlighted: true para outro plano
{
  id: "retention-os",
  highlighted: true, // ← Mude para false em Recovery e true em Enterprise para destacar Enterprise
}
```

### Atualizar Tabela Comparativa

Em `ComparisonTable.tsx`, no array `comparisonData[]`:

```typescript
{
  category: "Sua Nova Categoria",
  items: [
    {
      feature: "Recurso X",
      recovery: "✓",
      retentionOS: "✓",
      enterprise: "✓",
    },
  ],
}
```

---

## 🔗 Integração de CTAs com Backend

### Opção 1: Links Externos

```typescript
cta: {
  text: "Agendar Demonstração",
  href: "https://calendly.com/crai/demo", // Adicionar href
}
```

### Opção 2: Modais Internos

Criar componentes `DemoModal.tsx`, `ContactModal.tsx`, etc e renderizar dentro de PricingSection com `useState`.

### Opção 3: Form Integrado

Usar biblioteca como `react-hook-form` + integração com Typeform, HubSpot, ou backend próprio.

---

## 🚀 Checklist de Produção

- [x] Design System consistente (cores, tipografia, spacing)
- [x] Responsividade testada (mobile, tablet, desktop)
- [x] Acessibilidade (alt text em ícones, semantic HTML)
- [x] Performance (sem animações pesadas, CSS otimizado)
- [x] Modal funcionando (abrir/fechar)
- [x] Tabela comparativa renderizando
- [x] CTAs com textos adequados
- [x] Plano Retention OS destacado corretamente

---

## 📊 Comportamento Esperado

### Desktop
- 3 cards lado a lado
- Retention OS (meio) é 5% maior e com borda laranja
- Badge "Mais Popular" visível
- Hover states nos botões
- Tabela comparativa com scroll horizontal se necessário

### Tablet
- 1 card por linha (empilhado)
- Retention OS mantém destaque visual
- Touch-friendly button sizing

### Mobile
- Cada card ocupa 100% da largura
- Sem escala (mantém proporções)
- Tabela comparativa scrollável horizontalmente
- Espaçamento adequado

---

## 🎯 Métricas & Analytics

Recomendações para rastreamento:

```javascript
// Clicks nos botões CTAs
onClick={() => {
  gtag('event', 'pricing_cta_click', {
    plan: 'retention_os',
    cta_text: 'Agendar Demonstração',
  });
}}

// Abertura da tabela comparativa
onClick={() => {
  gtag('event', 'pricing_comparison_opened', {
    timestamp: new Date().toISOString(),
  });
}}
```

---

## ❓ FAQ & Troubleshooting

### P: O card Retention OS não está escalando em mobile
**R:** Isso é intencional. Para mobile, remova o `lg:scale-105` e adicione um `md:scale-105` se desejar escala em tablets.

### P: A tabela comparativa está travando
**R:** Verifique o tamanho do `max-h-[90vh]` e `overflow-y-auto`. Se houver muitos dados, considere paginação.

### P: Os ícones não estão aparecendo
**R:** Certifique-se de que o Google Fonts Material Symbols está carregado em `app/layout.tsx`:
```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
  rel="stylesheet"
/>
```

### P: Quero adicionar um 4º plano
**R:** Adicione ao array `plans[]` em PricingSection e ajuste o grid:
- Desktop: mude `lg:grid-cols-3` para `lg:grid-cols-4`
- Tablet: considere `md:grid-cols-2`

---

## 📞 Próximos Passos Recomendados

1. **Integrar CTAs com Backend**
   - Conectar "Começar com Risco Zero" a formulário de signup
   - Integrar "Agendar Demo" com Calendly ou sistema próprio
   - Conectar "Falar com Especialista" a formulário de contato

2. **Analytics & Tracking**
   - Adicionar Google Analytics events nos CTAs
   - Rastrear interação com tabela comparativa
   - Medir taxa de conversão por plano

3. **A/B Testing**
   - Testar "Agendar Demonstração" vs "Assinar Retention OS"
   - Testar posição do plano destacado (left vs center vs right)
   - Testar textos de CTAs

4. **Social Proof** (Opcional)
   - Adicionar customer logos ou logos de clientes grandes
   - Adicionar testimonial de cliente usando Retention OS
   - Mostrar badge "Escolhido por X empresas"

5. **Segurança & Conformidade**
   - Validar dados de formulários
   - Implementar CSRF protection
   - Garantir LGPD compliance

---

## 📄 Changelog

| Versão | Data | Alterações |
|--------|------|-----------|
| 1.0 | 21/07/2026 | Implementação inicial com 3 planos + tabela comparativa |

---

**Desenvolvido com ❤️ para CRAI Retention OS**  
**Stack:** Next.js 14 + React + Tailwind CSS + TypeScript  
**Padrão:** B2B SaaS Premium  
