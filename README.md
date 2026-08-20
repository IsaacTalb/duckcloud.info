# 🦆 Duck Cloud Official Website

A modern, developer-friendly website showcasing all Duck Cloud products, tools, and software. Built with Next.js, React, Tailwind CSS, and TypeScript.

## 🚀 Features

- **Bold & Strong Design** - Eye-catching UI with golden yellow primary color (#FFD60A)
- **Dark Theme** - Developer-friendly dark interface
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion powered animations
- **Developer Tools Showcase** - Display products, tools, and utilities
- **Community Section** - Connect with Discord, GitHub, and support
- **Modern Stack** - Built with Next.js 14, React 18, and TypeScript
- **SEO Optimized** - Meta tags, Open Graph, and Twitter cards

## 📦 Products Showcased

- **News Platform** - Latest updates from Duck Cloud
- **TikTok Commenter** - Smart engagement automation
- **API Suite** - Developer APIs
- **Analytics Tool** - Advanced metrics and insights

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Language**: TypeScript
- **Code Quality**: ESLint, Prettier

## 📋 Project Structure

```
duckcloud.info/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── blog/
│   │   │   └── page.tsx        # Blog page
│   │   ├── products/
│   │   │   └── page.tsx        # Products page
│   │   └── docs/
│   │       └── page.tsx        # Documentation page
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer component
│   │   └── sections/
│   │       ├── Hero.tsx        # Hero section
│   │       ├── Products.tsx    # Products section
│   │       ├── Features.tsx    # Features section
│   │       ├── Tools.tsx       # Tools section
│   │       ├── Community.tsx   # Community section
│   │       ├── CTA.tsx         # Call to action
│   │       ├── ProductDetail.tsx
│   │       ├── BlogList.tsx
│   │       └── Docs.tsx
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── utils/
│       └── data.ts             # Static data
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── package.json                # Dependencies

```

## 🎨 Color Scheme

- **Primary**: `#FFD60A` (Gold)
- **Accent**: `#FCA311` (Orange)
- **Dark**: `#0f172a` (Navy)
- **Secondary**: `#1f2937` (Dark Gray)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/duck-cloud-info/duckcloud.info.git
   cd duckcloud.info
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## 📄 Pages

- **Home** (`/`) - Landing page with hero, products, features, tools, community
- **Products** (`/products`) - Detailed product showcase
- **Blog** (`/blog`) - News and updates
- **Docs** (`/docs`) - Documentation and guides

## 🔧 Configuration

### Tailwind CSS
Customize colors and theme in `tailwind.config.ts`

### Next.js
Configure Next.js settings in `next.config.js`

### TypeScript
Adjust TypeScript settings in `tsconfig.json`

## 📦 Adding New Products

Edit `src/utils/data.ts` to add new products:

```typescript
{
  id: 'product-id',
  name: 'Product Name',
  description: 'Short description',
  longDescription: 'Long description',
  category: 'social',
  icon: '🎯',
  url: 'https://product.duckcloud.info',
  image: '/products/product.png',
  features: ['Feature 1', 'Feature 2'],
  status: 'active',
  tags: ['tag1', 'tag2'],
}
```

## 🎯 Customization

### Update Colors
Edit `tailwind.config.ts` to change the color scheme

### Add New Sections
Create new components in `src/components/sections/` and import in `src/app/page.tsx`

### Modify Navigation
Edit `src/components/Navbar.tsx` to add/remove links

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Vercel auto-deploys on push

### Other Platforms

```bash
npm run build
npm start
```

### Cloudflare

The statically exported website supports Cloudflare Workers Static Assets alongside a separate
lookup API Worker. See [CLOUDFLARE.md](CLOUDFLARE.md) for the exact build, deploy, DNS, Worker-domain,
environment-variable, rate-limit, and sitemap settings.

## 📖 Documentation

For more information:
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Bug Reports

If you find a bug, please create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💬 Support

- **Discord**: Join our community server
- **GitHub Issues**: Report bugs and request features
- **Email**: contact@duckcloud.info

## 🎉 Credits

Built with ❤️ by the Duck Cloud Team

---

**Made with Next.js | React | Tailwind CSS | TypeScript**
