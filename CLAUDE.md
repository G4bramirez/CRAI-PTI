# Claude Context for CRAI Landing Page

## Project Overview

**Project Name:** CRAI Retention OS - Landing Page  
**Type:** Next.js 14 SaaS Landing Page  
**Status:** Production Ready  
**Last Updated:** 2026-07-21  

## Technology Stack

```
Frontend:  Next.js 14 + React 18 + TypeScript
Styling:   Tailwind CSS 3.3
Deployment: Vercel (recommended)
```

## Key Decision Records

### 1. Next.js 14 (not plain React)
**Why:** Static site generation + image optimization + built-in font optimization for SaaS landing pages. Vercel native support.

### 2. Tailwind CSS (not CSS Modules)
**Why:** Utility-first approach prevents naming conflicts. Custom color palette extracted from design system. Production bundle auto-purges unused classes.

### 3. TypeScript (not JavaScript)
**Why:** Type safety for team collaboration. Interfaces for component props. Self-documenting code.

## Code Style & Conventions

- **Exports:** Default exports only (one component per file)
- **Fonts:** Sora (600-700 weight) for headlines, Inter (400 weight) for body
- **Spacing:** 8px base unit (xs:4, sm:12, md:16, lg:24, xl:32, 2xl:48, 3xl:64)
- **Colors:** Use semantic color tokens, never hardcode hex values
- **Components:** Functional, no class components
- **Props:** Typed via TypeScript interfaces (no PropTypes)

## File Structure

```
app/
├── globals.css         ← Tailwind imports, base styles, .card-glass, .data-glow
├── layout.tsx          ← Root layout, metadata, fonts
└── page.tsx            ← Home page composition (imports all sections)

components/
├── Header.tsx          ← Fixed nav, logo, menu, CTA
├── Hero.tsx            ← Hero section with badge + headline + image
├── TrustBar.tsx        ← 4 stats grid (2x2 mobile, 1x4 desktop)
├── ProblemSection.tsx  ← 3 problem cards
├── SolutionSection.tsx ← 2 solution cards (Payments + Retention)
├── HowItWorks.tsx      ← 4-step process
├── Differentials.tsx   ← 5-card bento grid (1 card spans 2 rows)
├── PricingSection.tsx  ← Starter vs Pro plans (Pro highlighted)
├── FinalCTA.tsx        ← Large CTA section with gradient
├── Footer.tsx          ← 4 columns + newsletter form
└── Button.tsx          ← Reusable button component

tailwind.config.ts     ← Color palette, typography, spacing, rounded
postcss.config.js      ← PostCSS for Tailwind
next.config.js         ← Image remote patterns, Next.js options
tsconfig.json          ← TypeScript strict mode
```

## Design System Reference

### Colors

All extracted from `DESIGN.md`:

```
Primary:       #ffb86c (Sora orange)  / #ef9311 (Primary Container)
Background:    #1a120a (Dark brown)
Surface:       #141728 (Blue-black cards)
Tertiary:      #89ceff (Light blue accents)
Text:          #f0e0d2 (Light beige)
Text Variant:  #dac2ae (Muted beige)
Error:         #ffb4ab
Secondary:     #c3c5dc
```

Do NOT use: `#66CCFF` (mentioned in brief but different from `#89ceff` in design)

### Typography

- **Display Large:** Sora 48px, 700 weight, -0.02em letter-spacing
- **Headline Large:** Sora 32px, 600 weight, -0.01em letter-spacing
- **Headline Medium:** Sora 24px, 600 weight
- **Body Large:** Inter 18px, 400 weight
- **Body Medium:** Inter 16px, 400 weight
- **Label Medium:** Inter 14px, 500 weight
- **Label Small:** Inter 12px, 600 weight, +0.05em letter-spacing

### Responsive Breakpoints

```
Mobile:    < 768px    (4 columns, 16px margin)
Tablet:    768-1024px (8 columns, 24px margin)
Desktop:   1024px+    (12 columns, 24px gutter)
Max Width: 1440px
```

## Visual Hierarchy

1. **Hero:** Largest impact - display-lg headline, orange accent
2. **Section Heads:** headline-lg, centered, consistent
3. **Cards:** Contained sections with borders, hover effects
4. **Stats:** Large primary text, small labels
5. **Body Text:** on-surface-variant for secondary info

## Component Patterns

### Section Wrapper
```tsx
<section className="py-3xl px-gutter [bg-surface-container-low]">
  <div className="max-w-container-max mx-auto">
    {/* Content */}
  </div>
</section>
```

### Card
```tsx
<div className="card-glass p-xl rounded-xl">
  {/* Hover border + glow effect automatic via CSS */}
</div>
```

### Flex Layouts
```tsx
<div className="flex flex-col md:flex-row gap-lg">
  {/* Stacks vertically on mobile, horizontally on desktop */}
</div>
```

## Common Tasks

### Change a Color Everywhere

1. Edit `tailwind.config.ts` → `colors` object
2. Update `.card-glass` styles in `app/globals.css` if needed
3. Components using color classes (e.g., `text-primary`, `bg-primary-container`) auto-update

### Add New Section

1. Create new component file: `components/NewSection.tsx`
2. Add component to `app/page.tsx` import + JSX
3. Keep consistent spacing (py-3xl, px-gutter, max-w-container-max)
4. Use card-glass for cards, typography classes for text

### Change Text

Search component files directly. All copy is hardcoded (not i18n).

### Adjust Spacing

Use Tailwind classes. Never add inline styles or hardcode pixel values.

## Performance Notes

- ✅ Fonts: Loaded once, subsetting auto
- ✅ Styles: Tailwind purges unused CSS (~15KB gzipped)
- ✅ Images: Using Google's CDN (slow). Should replace with local `/public` + next/image
- ⚠️ Bundle: ~80-100KB JS (acceptable for landing page)

## Testing

No tests currently. To add:

```
npm install --save-dev jest @testing-library/react
npx create-next-app --example with-jest
```

## Deployment

### Vercel
```bash
vercel
```
Auto-detects Next.js, builds, deploys.

### Self-Hosted
```bash
npm run build
npm start  # Runs on port 3000
# Or use PM2: pm2 start "npm start"
```

## Known Issues & TODOs

- [ ] Replace Google CDN images with `/public` assets + `next/image`
- [ ] Add Google Analytics
- [ ] Add email form submission endpoint
- [ ] Add Dark/Light mode toggle (currently dark only)
- [ ] Add i18n for Portuguese/English
- [ ] Set up CI/CD pipeline (GitHub Actions)

## External Dependencies

- `next`: ^14.0.0
- `react`: ^18.2.0
- `tailwindcss`: ^3.3.0
- Google Fonts (Sora, Inter) - loaded via HTML link
- Material Symbols - loaded via HTML link

No custom packages. Keep minimal.

## Contact & Questions

For this project context, refer to:
- Design System: `DESIGN.md` (exported from Figma)
- Setup Guide: `SETUP.md`
- Implementation Notes: `IMPLEMENTATION_NOTES.md`

---

**When making changes, maintain:**
1. Pixel-perfect fidelity to original design
2. Semantic HTML structure
3. Responsive mobile-first approach
4. Accessibility best practices (alt text, ARIA labels)
5. No breaking changes to existing sections
