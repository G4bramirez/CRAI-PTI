# CRAI Retention OS - Landing Page

Uma landing page pixel-perfect e responsiva para a CRAI, plataforma SaaS/FinTech focada em recuperação de pagamentos e redução de churn involuntário.

## Stack Tecnológico

- **Next.js 14** - React framework moderno
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Material Symbols** - Iconografia

## Características

✅ **Pixel-Perfect Design** - Fidelidade visual 100% ao design fornecido  
✅ **Responsivo** - Adaptável para mobile, tablet e desktop  
✅ **Performante** - Otimizado com Next.js 14  
✅ **Acessível** - Semântica HTML e boas práticas WCAG  
✅ **Bem Estruturado** - Componentes reutilizáveis e limpos  

## Estrutura do Projeto

```
crai-landing/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Página principal
├── components/
│   ├── Header.tsx           # Navegação fixa
│   ├── Hero.tsx             # Seção Hero
│   ├── TrustBar.tsx         # Barra de estatísticas
│   ├── ProblemSection.tsx   # Seção de problemas
│   ├── SolutionSection.tsx  # Seção de soluções
│   ├── HowItWorks.tsx       # Seção como funciona
│   ├── Differentials.tsx    # Grid de diferenciais
│   ├── PricingSection.tsx   # Tabela de preços
│   ├── FinalCTA.tsx         # CTA final
│   └── Footer.tsx           # Rodapé
├── tailwind.config.ts       # Configuração Tailwind
├── postcss.config.js        # PostCSS config
├── next.config.js           # Next.js config
├── tsconfig.json            # TypeScript config
└── package.json             # Dependências
```

## Cores Principais

- **Primary:** `#ffb86c` / `#ef9311` (Laranja vibrante)
- **Background:** `#1a120a` (Marrom escuro)
- **Surface:** `#141728` (Azul-preto)
- **Tertiary:** `#89ceff` (Azul claro)
- **Text:** `#f0e0d2` (Bege claro)

## Tipografia

- **Headlines:** Sora (600-700 weight)
- **Body:** Inter (400 weight)

## Instalação

### Pré-requisitos

- Node.js 18+ ou superior
- npm ou yarn

### Passos

```bash
# 1. Clonar ou navegar para o projeto
cd crai-landing

# 2. Instalar dependências
npm install

# 3. Rodar servidor de desenvolvimento
npm run dev

# 4. Abrir no navegador
# Acesse http://localhost:3000
```

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Constrói para produção
npm start        # Inicia servidor de produção
npm run lint     # Executa linter ESLint
```

## Responsividade

A landing page é totalmente responsiva com breakpoints:

- **Mobile:** < 768px (4 colunas)
- **Tablet:** 768px - 1024px (6 colunas)
- **Desktop:** 1024px+ (12 colunas)

## Deploy

A aplicação pode ser deployada em qualquer plataforma que suporte Next.js:

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Outras Plataformas

- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

## Customização

### Alterar Cores

Edite `tailwind.config.ts` na seção `colors`:

```ts
theme: {
  extend: {
    colors: {
      primary: "#seu-cor-aqui",
      // ...
    },
  },
}
```

### Adicionar Fontes

Edite `app/globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=SuaFonte:wght@400;600;700&display=swap");
```

## Performance

- ⚡ Next.js Image Optimization
- 🎯 Code Splitting automático
- 📦 Font subsetting
- 🚀 Static site generation pronto

## Suporte a Navegadores

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contato

Para dúvidas sobre o desenvolvimento desta landing page, entre em contato com o time de tecnologia da CRAI.

---

**© 2026 CRAI Retention OS. Todos os direitos reservados.**
