# 🚀 Duck Cloud Official Website - Setup & Deployment Guide

## 📋 Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: For version control
- **Code Editor**: VS Code (recommended)

## 🛠️ Installation Steps

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

This will install all required packages:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- React Icons
- TypeScript
- ESLint & Prettier

### Step 2: Start Development Server

```bash
npm run dev
```

The website will start at `http://localhost:3000`

### Step 3: Open in Browser

Navigate to `http://localhost:3000` and see your changes in real-time!

## 📁 Project Structure

```
duckcloud.info/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (/)
│   │   ├── globals.css         # Global styles
│   │   ├── error.tsx           # Error page
│   │   ├── not-found.tsx       # 404 page
│   │   ├── blog/
│   │   │   └── page.tsx        # Blog page (/blog)
│   │   ├── products/
│   │   │   └── page.tsx        # Products page (/products)
│   │   └── docs/
│   │       └── page.tsx        # Docs page (/docs)
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   └── sections/           # Page sections
│   │       ├── Hero.tsx        # Hero section
│   │       ├── Products.tsx    # Products section
│   │       ├── Features.tsx    # Features section
│   │       ├── Tools.tsx       # Tools section
│   │       ├── Community.tsx   # Community section
│   │       ├── CTA.tsx         # Call to action
│   │       ├── ProductDetail.tsx
│   │       ├── BlogList.tsx
│   │       └── Docs.tsx
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── utils/                  # Utility functions
│   │   ├── data.ts             # Static data
│   │   └── helpers.ts          # Helper functions
│   └── hooks/                  # Custom React hooks
│       └── useCustom.ts
├── public/                     # Static assets
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── package.json                # Dependencies
├── README.md                   # Project README
├── DEVELOPMENT.md              # Developer guide
└── SETUP.md                    # This file
```

## 🎨 Key Features & Customization

### Color Scheme

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#FFD60A',      // Gold
  secondary: '#1f2937',    // Dark Gray
  dark: '#0f172a',         // Navy
  accent: '#FCA311',       // Orange
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Amber
  danger: '#ef4444',       // Red
}
```

### Products & Tools

Edit `src/utils/data.ts` to add/remove products and tools:

```typescript
export const products: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    description: 'Short desc',
    longDescription: 'Long description',
    category: 'social',
    icon: '🎯',
    url: 'https://product.duckcloud.info',
    image: '/products/image.png',
    features: ['Feature 1', 'Feature 2'],
    status: 'active',
    tags: ['tag1', 'tag2'],
  },
];
```

### Navigation

Edit `src/components/Navbar.tsx`:

```typescript
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  // Add more items here
];
```

## 📝 Available Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# All together
npm run lint && npm run format && npm run type-check
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect GitHub to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository

2. **Configure Settings**
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Deploy**
   - Click "Deploy"
   - Vercel auto-deploys on git push

### Self-Hosted (VPS, AWS, DigitalOcean, etc.)

```bash
# Build the project
npm run build

# Start the server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "duckcloud" -- start
pm2 startup
pm2 save
```

### Docker (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t duckcloud .
docker run -p 3000:3000 duckcloud
```

## 🔒 Environment Variables

Create `.env.local`:

```bash
# API endpoints
NEXT_PUBLIC_API_URL=https://api.duckcloud.info

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Other
NEXT_PUBLIC_SITE_URL=https://duckcloud.info
```

## 📊 SEO Optimization

- Meta tags in `layout.tsx`
- Open Graph images
- Twitter cards
- Sitemap (auto-generated by Next.js)
- robots.txt (create in `public/robots.txt`)

## 🎯 Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ CSS minification (Tailwind)
- ✅ JavaScript minification
- ✅ Caching strategies
- ✅ Font optimization (Google Fonts)

## 🧪 Testing

Add test files:

```bash
# Create test file
touch src/components/Hero.test.tsx
```

Install testing libraries:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## 🔍 Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Console Debugging

```typescript
console.log('Debug:', variable);
console.warn('Warning:', message);
console.error('Error:', error);
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🆘 Troubleshooting

### Port 3000 already in use

```bash
npm run dev -- -p 3001
```

### Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build failures

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Type errors

```bash
npm run type-check
```

### CSS not applying

- Restart dev server
- Clear browser cache (Ctrl+Shift+Delete)
- Check Tailwind configuration

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push: `git push origin feature/your-feature`
4. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 💬 Support

- **Discord**: [Join Server]
- **GitHub Issues**: [Report Bug]
- **Email**: contact@duckcloud.info

---

**Happy coding! 🚀**
