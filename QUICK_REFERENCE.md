# Duck Cloud Website - Quick Reference Card

## 🚀 Quick Start (60 seconds)

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
```

## 📁 File Locations

| What | Where |
|------|-------|
| Products | `src/utils/data.ts` |
| Tools | `src/utils/data.ts` |
| Features | `src/utils/data.ts` |
| Colors | `tailwind.config.ts` |
| Navigation | `src/components/Navbar.tsx` |
| Footer Links | `src/components/Footer.tsx` |
| Home Page | `src/app/page.tsx` |
| Styles | `src/app/globals.css` |
| Types | `src/types/index.ts` |
| Helpers | `src/utils/helpers.ts` |
| Hooks | `src/hooks/useCustom.ts` |

## 🎨 Design Tokens

```
Primary:    #FFD60A (Gold)
Accent:     #FCA311 (Orange)
Dark:       #0f172a (Navy)
Secondary:  #1f2937 (Gray)
Success:    #10b981 (Green)
Warning:    #f59e0b (Amber)
Danger:     #ef4444 (Red)
```

## 📄 Pages

| Page | URL | File |
|------|-----|------|
| Home | `/` | `src/app/page.tsx` |
| Products | `/products` | `src/app/products/page.tsx` |
| Blog | `/blog` | `src/app/blog/page.tsx` |
| Docs | `/docs` | `src/app/docs/page.tsx` |
| 404 | `*` | `src/app/not-found.tsx` |
| Error | `*` | `src/app/error.tsx` |

## 🧩 Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Navbar | `src/components/Navbar.tsx` | Navigation |
| Footer | `src/components/Footer.tsx` | Footer |
| Hero | `src/components/sections/Hero.tsx` | Landing |
| Products | `src/components/sections/Products.tsx` | Product grid |
| Features | `src/components/sections/Features.tsx` | Benefits |
| Tools | `src/components/sections/Tools.tsx` | Tools gallery |
| Community | `src/components/sections/Community.tsx` | Engagement |
| CTA | `src/components/sections/CTA.tsx` | Call to action |
| ProductDetail | `src/components/sections/ProductDetail.tsx` | Product page |
| BlogList | `src/components/sections/BlogList.tsx` | Blog listing |
| Docs | `src/components/sections/Docs.tsx` | Documentation |

## 🎬 Common Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run linter
npm run format           # Format code
npm run type-check       # Check types
```

## ✏️ Adding a Product

Edit `src/utils/data.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Short description',
  longDescription: 'Full description',
  category: 'social' | 'news' | 'utility' | 'developer',
  icon: '🎯',
  url: 'https://link.duckcloud.info',
  image: '/products/image.png',
  features: ['Feature 1', 'Feature 2'],
  status: 'active' | 'beta' | 'coming-soon',
  tags: ['tag1', 'tag2'],
}
```

## 🛠️ Adding a Tool

Edit `src/utils/data.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Tool Name',
  description: 'Description',
  icon: '🔧',
  category: 'utilities',
  isPopular: true,
}
```

## 🎯 CSS Classes

```
.card-dark              # Dark card component
.btn-primary            # Primary button
.btn-secondary          # Secondary button
.text-gradient          # Gradient text
.section-title          # Section heading
.section-subtitle       # Section subheading
.animate-glow           # Glow animation
.animate-float          # Float animation
.gradient-primary       # Primary gradient background
.gradient-dark          # Dark gradient background
```

## 🔄 Component Template

```tsx
'use client';

import { motion } from 'framer-motion';

export const ComponentName = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Title</h2>
          <p className="section-subtitle">Subtitle</p>
        </motion.div>
      </div>
    </section>
  );
};
```

## 🌐 Deployment URLs

- **Development**: `http://localhost:3000`
- **Production**: `https://duckcloud.info`
- **News**: `https://news.duckcloud.info`
- **TikTok Commenter**: `https://tiktok.duckcloud.info`
- **API**: `https://api.duckcloud.info`
- **Analytics**: `https://analytics.duckcloud.info`

## 📚 Documentation Files

- `README.md` - Project overview
- `DEVELOPMENT.md` - Developer guide
- `SETUP.md` - Setup and deployment
- `PROJECT_SUMMARY.md` - Project summary
- This file - Quick reference

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | `npm run dev -- -p 3001` |
| Module not found | `rm -rf node_modules && npm install` |
| Build fails | `rm -rf .next && npm run build` |
| Types error | `npm run type-check` |
| CSS not loading | Restart dev server |

## 📦 Key Dependencies

- `next` - React framework
- `react` - UI library
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `react-icons` - Icons
- `typescript` - Type checking
- `eslint` - Code quality
- `prettier` - Code formatting

## 🔑 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://api.duckcloud.info
NEXT_PUBLIC_SITE_URL=https://duckcloud.info
NEXT_PUBLIC_GA_ID=your-analytics-id
```

## 📞 Important Links

- **GitHub**: https://github.com/duck-cloud-info/duckcloud.info
- **Website**: https://duckcloud.info
- **Discord**: [Join Server]
- **Email**: contact@duckcloud.info

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org)

---

**Last Updated**: November 11, 2025
**Status**: ✅ Production Ready
