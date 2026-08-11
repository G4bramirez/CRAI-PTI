# ⚡ Quick Start - CRAI Landing Page

## 🚀 Em 3 Passos (5 minutos)

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Rodar Localmente
```bash
npm run dev
```

### 3️⃣ Abrir no Navegador
```
http://localhost:3000
```

---

## 📁 Arquivos Principais

```
app/
  └── globals.css       ← Estilos globais
  └── layout.tsx        ← HTML root + metadata
  └── page.tsx          ← Página home (importa todos os componentes)

components/
  ├── Header.tsx        ← Navegação
  ├── Hero.tsx          ← Seção hero
  ├── TrustBar.tsx      ← Estatísticas
  ├── ProblemSection.tsx ← 3 problemas
  ├── SolutionSection.tsx ← 2 soluções
  ├── HowItWorks.tsx    ← 4 passos
  ├── Differentials.tsx ← 5 diferenciais
  ├── PricingSection.tsx ← Preços
  ├── FinalCTA.tsx      ← CTA final
  └── Footer.tsx        ← Rodapé

tailwind.config.ts     ← Cores + Tipografia
next.config.js         ← Configuração Next.js
```

---

## 🎨 Cores Principais

```
Laranja:   #ffb86c, #ef9311
Escuro:    #1a120a, #141728
Azul:      #89ceff
Texto:     #f0e0d2
```

---

## 📱 Responsividade

```
Mobile:  < 768px
Tablet:  768-1024px
Desktop: 1024px+
```

---

## 🔧 Comandos Úteis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build produção
npm start        # Rodar produção
npm run lint     # Verificar código
```

---

## 📚 Documentação

| Arquivo | Para quê? |
|---------|-----------|
| `README.md` | Overview do projeto |
| `SETUP.md` | Instalação detalhada |
| `IMPLEMENTATION_NOTES.md` | Notas técnicas |
| `CLAUDE.md` | Contexto para IA |
| `DELIVERABLES.md` | O que foi entregue |

---

## ✅ Status

```
✅ Pixel-perfect design
✅ Responsivo (mobile + desktop)
✅ Acessível (WCAG A+)
✅ TypeScript + Next.js 14
✅ Tailwind CSS
✅ Pronto para produção
```

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Outras Plataformas
- Netlify
- AWS Amplify
- DigitalOcean
- Seu próprio servidor

---

## ❓ Problemas?

1. Porta 3000 em uso? Mudar com: `npm run dev -- -p 3001`
2. Node modules quebrado? Rodar: `rm -rf node_modules && npm install`
3. Problema de build? Rodar: `npm run build -- --debug`

---

## 📞 Contato

Para questões técnicas, consulte:
- `SETUP.md` - Troubleshooting
- `IMPLEMENTATION_NOTES.md` - Debugging

---

**Pronto para começar!** 🎉
