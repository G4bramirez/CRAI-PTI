# CRAI Landing Page — Quick Start

## 🚀 Start in 30 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## ✅ What's Working Right Now

- ✅ Full landing page (Hero, Features, Pricing, Footer)
- ✅ Dark/Light mode toggle
- ✅ Portuguese/English switch
- ✅ Lead capture form with validation
- ✅ Form submission to `/api/leads` endpoint
- ✅ Mobile-responsive design
- ✅ Console logging of leads

## 📋 Quick Tests

### Test Theme Toggle
1. Click sun/moon icon in header
2. Page switches between dark and light mode

### Test Language Toggle
1. Click "PT / EN" button in header
2. Page text changes language

### Test Lead Form
1. Click "Agendar Demonstração" button
2. Fill out form:
   - Name: Any name
   - Email: valid@email.com
   - Company: Any company
   - MRR: Pick one
3. Click submit
4. See success message
5. Modal closes automatically

### Check Console Logs
```bash
# Open DevTools (F12)
# Go to Console tab
# Submit a form
# See logged lead data:
# "New lead received: { timestamp, data, hubspotPayload }"
```

## 🔗 Enable HubSpot CRM (Optional)

### If you have a HubSpot account:

1. **Get API Key**
   ```
   Go to: https://app.hubspot.com/l/developer/settings/api-keys
   Create a new private app
   Copy the API key
   ```

2. **Add to .env.local**
   ```bash
   echo 'HUBSPOT_API_KEY=your_key_here' > .env.local
   ```

3. **Enable Integration**
   - Open `app/api/leads/route.ts`
   - Find lines 26-42 (commented HubSpot code)
   - Uncomment them
   - Save file

4. **Restart Server**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

5. **Test**
   - Submit form
   - Check HubSpot for new lead in "crai_recovery" pipeline

## 📂 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page entry |
| `app/components/Hero.tsx` | Hero + modal trigger |
| `app/components/DemoModal.tsx` | Form modal |
| `app/api/leads/route.ts` | API endpoint |
| `app/lib/schemas.ts` | Form validation |
| `app/lib/i18n.ts` | Translations |
| `tailwind.config.ts` | Colors & spacing |

## 🎨 Customize

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  espresso: "#1A120A",      // Dark background
  amber: { DEFAULT: "#EF9311" }, // Primary accent
}
```

### Change Text
Edit `app/lib/i18n.ts`:
```typescript
pt: {
  hero: {
    title: "Your new title here"
  }
}
```

### Change Fonts
Edit `app/layout.tsx`:
```typescript
const spaceGrotesk = Space_Grotesk({ /* ... */ })
const inter = Inter({ /* ... */ })
```

## 📊 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deploy

### Option A: Vercel (Easiest)
```bash
npm install -g vercel
vercel
# Follow prompts
```

### Option B: Docker
```bash
docker build -t crai-landing .
docker run -p 3000:3000 crai-landing
```

### Option C: Traditional Server
```bash
npm run build
npm start
# Server runs on port 3000
```

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles not loading
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Form not sending
1. Check console (F12)
2. Check network tab
3. Look for `/api/leads` request
4. See BACKEND_API.md for details

## 📚 Full Documentation

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** — What was built
- **[BACKEND_API.md](./BACKEND_API.md)** — API details
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** — Deployment options
- **[CLAUDE.md](./CLAUDE.md)** — Design system & guidelines

## 💬 Questions?

1. **Frontend issues** → Check `app/components/`
2. **Backend issues** → Check `app/api/`
3. **Styling issues** → Check `tailwind.config.ts`
4. **Form issues** → Check `app/components/DemoModal.tsx`

---

**Status:** ✅ Production Ready  
**Last Updated:** 2026-08-15
