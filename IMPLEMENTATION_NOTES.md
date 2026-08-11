# Notas de Implementação - CRAI Landing Page

## Visão Geral

Este documento contém notas técnicas, decisões arquiteturais e guias de manutenção para a landing page CRAI.

## Stack Tecnológico - Justificativa

### Por que Next.js 14?

✅ **Renderização Otimizada** - App Router com Server Components para performance
✅ **Image Optimization** - `next/image` automático com lazy loading
✅ **Font Optimization** - Google Fonts carregadas eficientemente
✅ **API Routes** - Fácil integração com backend
✅ **Static Site Generation** - Pode ser pre-renderizado para máxima velocidade
✅ **Vercel Native** - Deploy simplificado

### Por que Tailwind CSS?

✅ **Utility-First** - Estilos inline sem conflitos CSS
✅ **Type-Safe** - Integração com TypeScript para autocomplete
✅ **Performance** - Apenas classes usadas são incluídas no bundle
✅ **Customizable** - Paleta de cores exatamente como design

### Por que TypeScript?

✅ **Type Safety** - Erros detectados em tempo de desenvolvimento
✅ **Better DX** - Autocomplete e documentação inline
✅ **Manutenibilidade** - Código mais seguro para equipe grande

## Estrutura de Componentes

### Padrão de Componentes

Cada componente segue o padrão:

```tsx
// ✅ DEFAULT EXPORT
export default function NomeComponente() {
  return (
    <section className="...">
      {/* Conteúdo */}
    </section>
  );
}
```

**Benefícios:**
- Lazy loading automático com Next.js
- Tree-shaking eficiente
- Imports simples

### Nomeação

- **Componentes:** PascalCase (`Header.tsx`, `HeroSection.tsx`)
- **Arquivos:** PascalCase (match com component name)
- **Props:** camelCase
- **Classes:** lowercase com hífens (Tailwind default)

## Paleta de Cores Explicada

### Hierarquia Visual

```
Background (#1a120a)
├── Surface (#141728)      - Cards, containers
│   ├── Surface High       - Hover states
│   └── Surface Low        - Subtle backgrounds
└── Primary (#ffb86c)      - Actions, highlights
    └── Primary Container  - Strong CTAs (#ef9311)

Text Hierarchy
├── On Surface (#f0e0d2)        - Primary text
├── On Surface Variant (#dac2ae) - Secondary text
└── On Surface Variant (lower)   - Tertiary text
```

### Quando Usar Cada Cor

| Cor | Uso |
|-----|-----|
| `primary` | Links, ícones, accents |
| `primary-container` | Buttons principais |
| `surface` | Fundo de cards |
| `surface-container-low` | Seções alternadas |
| `tertiary` | Accents secundários |
| `error` | Alertas/erros |
| `secondary` | Status, badges |

## Tipografia

### Escala de Fontes

```
Display Large (48px)
├── Headlines (32px)
├── Headline Medium (24px)
│   └── Mobile Headlines (24px)
├── Body Large (18px)
└── Body Medium (16px)
    └── Label Medium (14px)
        └── Label Small (12px)
```

### Usar Corretamente

```tsx
// ✅ CORRETO
<h1 className="font-sora text-display-lg">Título</h1>
<p className="font-inter text-body-lg">Parágrafo</p>

// ❌ EVITAR
<div className="text-3xl font-bold">Título</div>
<div className="text-base">Parágrafo</div>
```

## Sistema de Spacing

Base: 8px

```
xs  = 4px   (0.25rem)
sm  = 12px  (0.75rem)
md  = 16px  (1rem)
base= 8px   (0.5rem)
lg  = 24px  (1.5rem)
xl  = 32px  (2rem)
2xl = 48px  (3rem)
3xl = 64px  (4rem)
```

### Matemática

Todos os espaçamentos seguem múltiplos de 4px:

```
4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 44px, 48px, 52px, 56px, 60px, 64px
```

## Responsive Design

### Breakpoints Tailwind

```
sm   = 640px
md   = 768px
lg   = 1024px
xl   = 1280px
2xl  = 1536px
```

### Mobile-First Approach

```tsx
// ✅ CORRETO
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 coluna por padrão, 2 em md+, 3 em lg+ */}
</div>

// ❌ EVITAR
<div className="hidden md:block">
  {/* Esconder em mobile */}
</div>
```

## Padrões de Componentes

### Card Pattern

```tsx
<div className="card-glass p-xl rounded-xl space-y-md">
  {/* Conteúdo */}
</div>
```

**Definição CSS:**
```css
.card-glass {
  background: #141728;
  border: 1px solid rgba(239, 147, 17, 0.15);
  transition: all 0.3s ease;
}

.card-glass:hover {
  border-color: rgba(239, 147, 17, 0.4);
  box-shadow: 0 0 20px rgba(239, 147, 17, 0.1);
}
```

### Button Pattern

Use o componente reutilizável `Button.tsx`:

```tsx
import Button from "@/components/Button";

<Button variant="primary" size="lg">
  Clique aqui
</Button>
```

### Section Pattern

```tsx
<section className="py-3xl px-gutter">
  <div className="max-w-container-max mx-auto">
    {/* Conteúdo com max width de 1440px */}
  </div>
</section>
```

## Performance Otimizações

### Já Implementadas

✅ **Image Optimization**
- Material Symbols inline (source: Google Fonts)
- Imagens remotas com lazy loading

✅ **Font Optimization**
- Sora + Inter carregadas uma vez
- Subsetting automático

✅ **Code Splitting**
- Cada componente em arquivo separado
- Next.js faz dynamic import automático

✅ **CSS**
- Tailwind CSS purga classes não usadas
- Apenas classes necessárias no bundle final

### Próximas Otimizações

⚠️ **Imagens Substituir URLs**
```tsx
// Atual (Google Cloud)
src="https://lh3.googleusercontent.com/..."

// Deveria Ser
import Image from "next/image";
import heroImage from "@/public/hero.png";

<Image src={heroImage} alt="..." />
```

## Integrações

### Adicionar Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Adicionar Formulário de Contato

```tsx
'use client'; // Componente cliente para interatividade

import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar para API
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Adicionar API Route

```tsx
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  // Enviar email ou salvar em DB
  console.log('Email recebido:', email);

  return NextResponse.json({ success: true });
}
```

## Manutenção

### Atualizando Dependências

```bash
# Verificar atualizações
npm outdated

# Atualizar tudo
npm update

# Atualizar Next.js especificamente
npm install next@latest
```

### Limpando Unused Code

```bash
# Analisar bundle
ANALYZE=true npm run build

# Procurar imports não usados
npm run lint
```

## SEO

### Já Implementado

✅ Metadata em `app/layout.tsx`:
- Title
- Description
- Open Graph tags

✅ Semântica HTML:
- `<header>`, `<main>`, `<section>`, `<footer>`
- `<h1>` -> `<h2>` hierarchy

✅ Accessibility:
- Alt text em imagens
- ARIA labels onde necessário
- Contraste de cores (WCAG AA)

### Adicionar Sitemap

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://crai.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### Adicionar Robots.txt

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://crai.com/sitemap.xml
```

## Debugging

### Next.js Debug Mode

```bash
DEBUG=next:* npm run dev
```

### Browser DevTools

```tsx
// Usar console.log() em Client Components
'use client';
useEffect(() => {
  console.log('Component mounted');
}, []);
```

## CI/CD

### GitHub Actions Example

```yaml
# .github/workflows/build.yml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run build
```

## Troubleshooting Comum

### Cores não aparecem

✅ Checar se está usando class names do Tailwind
✅ Não usar inline styles
✅ Rodar `npm run build` para verificar purge

### Imagens quebradas

✅ Verificar URL
✅ Usar `next/image` para imagens otimizadas
✅ Adicionar `remotePatterns` em `next.config.js`

### Responsividade quebrada

✅ Mobile-first: `sm:`, `md:`, `lg:`
✅ Testar em DevTools (F12 > Toggle device toolbar)
✅ Verificar `max-w-container-max`

### Lento no build

✅ Rodar `npm run build -- --debug`
✅ Analisar bundle: `ANALYZE=true npm run build`
✅ Verificar imagens grandes

## Próximos Passos Sugeridos

1. **Substituir Imagens**
   - Hospedar logos em `/public`
   - Usar Next.js `Image` component
   - Otimizar compressão

2. **Adicionar Formulários**
   - Email form no hero
   - Newsletter footer
   - Validação com zod

3. **Integração Analytics**
   - Google Analytics
   - Vercel Web Vitals
   - Hotjar (optional)

4. **Multi-idioma**
   - Next.js i18n
   - PT-BR default
   - EN fallback

5. **Dark/Light Mode**
   - next-themes
   - Respeitar preferência do OS

## Referências

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

**Última atualização:** 2026-07-21
**Versão:** 1.0.0
**Status:** Production Ready
