# ⚙️ GUIA RÁPIDO DE CUSTOMIZAÇÃO - PRICING CRAI

**Para quando você quiser mudar preços, features, ou comportamento sem quebrar nada.**

---

## 🎯 Customizações Mais Comuns

### 1. Mudar Preço de um Plano

**Arquivo:** `components/PricingSection.tsx`

**Procure por:**
```typescript
const plans = [
  {
    id: "recovery",
    monthlyBase: "R$ 0", // ← Mude aqui
    successFee: "10%",   // ← Ou aqui
  },
  {
    id: "retention-os",
    monthlyBase: "A partir de R$ 2.000", // ← Mude aqui
    successFee: "7%",
  },
  // ...
];
```

**Exemplo:** Aumentar Recovery de R$ 0 para "Começar com R$ 500/mês"
```typescript
monthlyBase: "Começar com R$ 500",
```

---

### 2. Mudar o Plano Destacado (Mais Popular)

**Arquivo:** `components/PricingSection.tsx`

**Código:**
```typescript
// Mude highlighted: true para o plano que quer destacar
{
  id: "recovery",
  highlighted: false, // ← Mude para true se quiser destacar Recovery
}
{
  id: "retention-os",
  highlighted: true, // ← Este é o atual (deixar true)
}
{
  id: "enterprise",
  highlighted: false, // ← Mude para true se quiser destacar Enterprise
}
```

**Nota:** Deixe apenas UM plano com `highlighted: true`

---

### 3. Adicionar Novo Recurso a um Plano

**Arquivo:** `components/PricingSection.tsx`

**Procure:**
```typescript
{
  category: "Foco de Atuação",
  items: [
    "Churn Involuntário (Recuperação de Pagamentos)",
    "Diagnóstico automático de falhas",
    // ← Adicione novo item aqui
  ],
}
```

**Exemplo:** Adicionar "Webhooks customizados" ao Retention OS
```typescript
{
  category: "Inteligência Artificial",
  items: [
    "Payday Inference Engine (IA prevê melhor horário)",
    "Autoencoder (detecta risco comportamental)",
    "Multi-Armed Bandit (otimiza estratégia de contato)",
    "Webhooks customizados", // ← Novo item
  ],
}
```

---

### 4. Alterar Texto do Botão CTA

**Arquivo:** `components/PricingSection.tsx`

**Procure:**
```typescript
cta: {
  text: "Começar com Risco Zero", // ← Mude aqui
  style: "secondary",
}
```

**Exemplo:** Mudar "Agendar Demonstração" para "Iniciar Teste Grátis"
```typescript
cta: {
  text: "Iniciar Teste Grátis",
  style: "primary",
}
```

---

### 5. Mudar Cor do Botão CTA

**Arquivo:** `components/PricingSection.tsx`

**Código:**
```typescript
cta: {
  text: "Agendar Demonstração",
  style: "primary", // ← Mude aqui (primary ou secondary)
}
```

**Opções:**
```
"primary"   = Fundo laranja (#ef9311) + texto preto
"secondary" = Borda laranja + texto laranja
```

---

### 6. Adicionar Link ao Botão CTA

**Arquivo:** `components/PricingSection.tsx`

**Localize o botão** (procure por "className=`w-full font-bold")

**Adicione um `<a>` ou implemente `onClick`:**

**Opção A - Link Simples:**
```typescript
<a
  href="https://calendly.com/crai/demo"
  className={`w-full font-bold py-md rounded-xl transition-all ${
    plan.cta.style === "primary"
      ? "bg-primary text-on-primary hover:shadow-[0_0_30px_rgba(239,147,17,0.4)]"
      : "border-2 border-primary text-primary hover:bg-primary/10"
  }`}
>
  {plan.cta.text}
</a>
```

**Opção B - Com evento JavaScript:**
```typescript
<button
  onClick={() => {
    if (plan.id === 'retention-os') {
      window.open('https://calendly.com/crai/demo', '_blank');
    }
  }}
  className={...}
>
  {plan.cta.text}
</button>
```

---

### 7. Atualizar Tabela Comparativa

**Arquivo:** `components/ComparisonTable.tsx`

**Procure por:**
```typescript
const comparisonData = [
  {
    category: "Preço & Modelo",
    items: [
      {
        feature: "Mensalidade Base",
        recovery: "R$ 0", // ← Mude aqui
        retentionOS: "A partir de R$ 2.000",
        enterprise: "Sob consulta",
      },
      // ... mais items
    ],
  },
];
```

**Exemplo:** Adicionar nova linha na seção "Preço & Modelo"
```typescript
{
  feature: "Contrato Mínimo",
  recovery: "Sem contrato",
  retentionOS: "1 mês",
  enterprise: "12 meses",
}
```

---

### 8. Remover um Recurso da Tabela

**Arquivo:** `components/ComparisonTable.tsx`

**Localize o item** e **remova a linha inteira:**

```typescript
// ❌ REMOVER ISTO:
{
  feature: "SMS",
  recovery: "✗",
  retentionOS: "✓",
  enterprise: "✓",
}
```

---

### 9. Adicionar Nova Seção à Tabela

**Arquivo:** `components/ComparisonTable.tsx`

**Adicione novo objeto ao array `comparisonData`:**
```typescript
{
  category: "Sua Nova Categoria", // ← Nome da seção
  items: [
    {
      feature: "Recurso 1",
      recovery: "✓",
      retentionOS: "✓",
      enterprise: "✓",
    },
    {
      feature: "Recurso 2",
      recovery: "✗",
      retentionOS: "✓",
      enterprise: "✓",
    },
  ],
}
```

---

## 🎨 Personalizações de Design

### Mudar Cor da Borda do Plano Destacado

**Arquivo:** `components/PricingSection.tsx`

**Procure:**
```typescript
className={`card-glass p-2xl rounded-2xl flex flex-col relative transition-all ${
  plan.highlighted
    ? "lg:scale-105 border-primary shadow-[0_0_60px_rgba(239,147,17,0.2)]..." // ← border-primary aqui
    : "border-outline-variant/30"
}`}
```

**Exemplos:**
```
border-primary      = Laranja (#ffb86c)
border-tertiary     = Azul claro (#89ceff)
border-secondary    = Lilás (#c3c5dc)
```

---

### Mudar Tamanho da Escala do Card Destacado

**Arquivo:** `components/PricingSection.tsx`

**Procure:**
```typescript
plan.highlighted
  ? "lg:scale-105 ..." // ← 105% = 5% maior
```

**Exemplos:**
```
lg:scale-100 = Sem escala (mesmo tamanho)
lg:scale-103 = 3% maior
lg:scale-105 = 5% maior (padrão)
lg:scale-110 = 10% maior (bem destacado)
```

---

### Mudar Intensidade do Glow

**Arquivo:** `components/PricingSection.tsx`

**Procure:**
```typescript
shadow-[0_0_60px_rgba(239,147,17,0.2)] // ← 60px, 0.2 opacity
```

**Exemplos:**
```
shadow-[0_0_40px_rgba(239,147,17,0.1)] = Glow sutil
shadow-[0_0_60px_rgba(239,147,17,0.2)] = Padrão (recomendado)
shadow-[0_0_80px_rgba(239,147,17,0.3)] = Glow intenso
```

---

## 🔧 Troubleshooting de Customização

### "Meu botão não está aparecendo"

1. Verifique se há erro de sintaxe TypeScript
2. Reinicie o servidor (`Ctrl+C` e `npm run dev`)
3. Verifique no DevTools (F12) se há erros no console

### "A tabela comparativa não abre"

1. Certifique-se de que `ComparisonTable` está importado
2. Verifique se há erro no componente
3. Teste no modo de navegador em incógnito

### "As cores estão diferentes"

1. Verifique se as cores existem em `tailwind.config.ts`
2. Se usou uma cor nova, adicione-a em `theme.extend.colors`
3. Reinicie o servidor para aplicar novas cores

### "O card não está escalando em mobile"

Isso é intencional (mobile não escala bem). Se quiser alterar:

```typescript
plan.highlighted
  ? "scale-105 md:scale-105 lg:scale-105 ..." // Adicione scale-105 sem breakpoint
```

---

## 📋 Template de Novo Plano

Se quiser adicionar um 4º plano, copie este template:

```typescript
{
  id: "seu-plano",
  name: "Nome do Plano",
  subtitle: "Proposição de valor",
  monthlyBase: "R$ X.XXX",
  successFee: "Y%",
  idealFor: "Descrição do público",
  priceNote: "Tipo de modelo",
  features: [
    {
      category: "Categoria 1",
      items: [
        "Feature 1",
        "Feature 2",
      ],
    },
    {
      category: "Categoria 2",
      items: [
        "Feature 3",
      ],
    },
  ],
  highlighted: false, // Mude para true se for destaque
  badge: "Opcional Badge",
  cta: {
    text: "Texto do Botão",
    style: "primary", // ou "secondary"
  },
}
```

**Não esqueça de:**
1. Mudar `grid-cols-1 lg:grid-cols-3` para `lg:grid-cols-4`
2. Adicionar novo plano à tabela comparativa também

---

## 🚀 Checklist Pós-Customização

- [ ] Código está sem erros de sintaxe
- [ ] Servidor foi reiniciado (`npm run dev`)
- [ ] Mudanças aparecem no navegador (http://localhost:3000)
- [ ] Testei em mobile (F12 > Toggle device toolbar)
- [ ] Botões CTAs funcionam (clicáveis)
- [ ] Tabela comparativa abre/fecha corretamente
- [ ] Cores estão corretas
- [ ] Sem erros no console (F12)

---

## 💡 Dicas Pro

1. **Use Find & Replace** (Ctrl+H no VS Code)
   - Procure por "7%" e mude para "6%" em todo o arquivo

2. **Copie estruturas inteiras**
   - Selecione um plano inteiro e duplique para criar novo

3. **Teste incrementalmente**
   - Faça uma mudança pequena, teste, depois próxima

4. **Git é seu amigo**
   - Faça commit antes de grandes mudanças
   - Se quebrar, volte com `git reset --hard`

5. **Mantenha a consistência**
   - Se adicionar feature em Recovery, considere adicionar em outros também

---

## 📞 Quando Chamar o Time de Devs

❌ Customizações que requerem ajuda:
- Conectar com API/Backend
- Adicionar novos componentes React complexos
- Integrar com ferramentas externas (Stripe, HubSpot, etc)
- Mudanças no design system da landing page

✅ Customizações que você faz sozinho:
- Mudar preços, textos, features
- Reorganizar planos
- Adicionar/remover itens da tabela
- Mudar cores e tamanhos

---

**Bom hack! 🚀**
