# Guia de Setup - CRAI Landing Page

## Requisitos do Sistema

- **Node.js:** 18.17.0 ou superior
- **npm:** 9.0.0 ou superior (ou yarn/pnpm)
- **Git:** Para versionamento

## Instalação Passo a Passo

### 1. Clonar o Repositório

```bash
git clone [seu-repositório]
cd crai-landing
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurar Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:

```env
NEXT_PUBLIC_API_URL=https://api.crai.com
NODE_ENV=development
NEXT_PUBLIC_HOST=localhost:3000
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000` em seu navegador.

## Estrutura de Diretórios

```
crai-landing/
├── app/                      # App Router do Next.js
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz (metadata, HTML)
│   └── page.tsx             # Página home
├── components/              # Componentes React reutilizáveis
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── TrustBar.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── HowItWorks.tsx
│   ├── Differentials.tsx
│   ├── PricingSection.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
├── public/                  # Arquivos estáticos (favicon, etc)
├── tailwind.config.ts       # Configuração do Tailwind
├── postcss.config.js        # PostCSS (required by Tailwind)
├── next.config.js           # Configuração do Next.js
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Dependências do projeto
└── README.md               # Documentação
```

## Componentes Principais

### Header (`components/Header.tsx`)
- Navegação fixa no topo
- Logo + menu (desktop)
- Botão CTA "Solicitar Demo"
- Responsivo (menu colapsível em mobile)

### Hero (`components/Hero.tsx`)
- Headline principal
- Subheadline
- Badge com indicador de status
- 2 CTAs (principal + secundária)
- Imagem/ilustração 3D

### TrustBar (`components/TrustBar.tsx`)
- 4 estatísticas principais
- Grid responsivo (2x2 mobile, 1x4 desktop)

### ProblemSection (`components/ProblemSection.tsx`)
- 3 cards de problemas
- Ícones Material Symbols
- Cores diferentes por card

### SolutionSection (`components/SolutionSection.tsx`)
- 2 cards de soluções principais
- Ícones grandes
- Listas de benefícios

### HowItWorks (`components/HowItWorks.tsx`)
- 4 passos numerados
- Grid responsivo

### Differentials (`components/Differentials.tsx`)
- Bento grid (5 cards)
- Layout complexo: um card com 2 linhas de altura
- Card com imagem

### PricingSection (`components/PricingSection.tsx`)
- 2 planos (Starter + Pro)
- Card destacado ("Recomendado")
- Listas de features com checkmarks

### FinalCTA (`components/FinalCTA.tsx`)
- Gradiente de fundo
- Texto grande
- CTA destaque

### Footer (`components/Footer.tsx`)
- 4 colunas (Brand, Product, Company, Newsletter)
- Links de footer
- Email subscribe
- Copyright

## Customização

### Cores

Todas as cores estão definidas em `tailwind.config.ts`:

```ts
colors: {
  primary: "#ffb86c",        // Laranja
  background: "#1a120a",     // Fundo escuro
  surface: "#141728",        // Cards
  tertiary: "#89ceff",       // Azul claro
  "on-surface": "#f0e0d2",   // Texto claro
  // ... mais cores
}
```

### Tipografia

Fontes Google já importadas em `app/globals.css`:
- **Sora** - Headlines (600-700 weight)
- **Inter** - Body text (400-600 weight)

### Spacing

Sistema de espaçamento 8px em `tailwind.config.ts`:
- `xs`: 4px
- `sm`: 12px
- `md`: 16px
- `base`: 8px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

## Build para Produção

### Compilar

```bash
npm run build
```

Isso cria otimizações e prepara para produção.

### Iniciar Servidor de Produção

```bash
npm start
```

Acesse em `http://localhost:3000`

### Verificar Performance

```bash
# Usar Next.js Analytics ou Vercel Web Vitals
npm run build
npm start
# Abrir DevTools (F12) > Lighthouse
```

## Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

Vercel detecta automaticamente que é Next.js e configura tudo.

### GitHub Pages

Não é adequado para Next.js SSR, recomenda-se Vercel ou outro host.

### Self-Hosted (VPS/Servidor Próprio)

```bash
# No servidor
git clone seu-repo
cd crai-landing
npm install
npm run build
npm start
```

Use PM2 ou similar para manter rodando:

```bash
npm install -g pm2
pm2 start "npm start" --name "crai-landing"
pm2 startup
pm2 save
```

## Troubleshooting

### Porta 3000 já em uso

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node modules corrompido

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de build

```bash
npm run build -- --debug
```

## Scripts npm Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de dev com hot reload |
| `npm run build` | Compila para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint |

## Monitoramento

### Verificar Bundle Size

```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Performance Insights

- Usar Vercel Analytics se deployado na Vercel
- Use Lighthouse no DevTools do navegador
- Monitorar Core Web Vitals

## Git Workflow

```bash
# Criar branch
git checkout -b feature/minha-feature

# Fazer commits
git add .
git commit -m "feat: adiciona nova seção"

# Push para remote
git push origin feature/minha-feature

# Criar Pull Request no GitHub
```

## Segurança

- ✅ Sem secrets ou credenciais em `.env`
- ✅ Use `.env.local` (no .gitignore)
- ✅ Next.js sanitiza HTML por padrão
- ✅ CSP headers recomendados em `next.config.js`

## Performance Checklist

- [ ] Lazy load images
- [ ] Usar Next.js `Image` component
- [ ] Minimizar JavaScript
- [ ] Cache headers configurados
- [ ] Gzip/Brotli habilitado
- [ ] Core Web Vitals otimizados

## Próximos Passos

1. Customizar imagens (substituir URLs de placeholder)
2. Integrar formulário de contato
3. Adicionar analytics (Google Analytics, Vercel Analytics)
4. Configurar domain customizado
5. Implementar i18n para múltiplas línguas

---

Para mais informações, consulte a [documentação oficial do Next.js](https://nextjs.org/docs).
