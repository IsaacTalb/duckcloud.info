# Duck Cloud Website Development Guide

## Quick Start for Developers

### Setup

```bash
# Clone and install
git clone https://github.com/duck-cloud-info/duckcloud.info.git
cd duckcloud.info
npm install

# Start development
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Architecture

### Components Structure

```
components/
├── Navbar.tsx           - Top navigation with mobile menu
├── Footer.tsx           - Footer with links and social
└── sections/
    ├── Hero.tsx         - Landing hero section
    ├── Products.tsx     - Featured products grid
    ├── Features.tsx     - Why choose section
    ├── Tools.tsx        - Developer tools showcase
    ├── Community.tsx    - Community engagement
    ├── CTA.tsx          - Call to action banner
    ├── ProductDetail.tsx - Full products page
    ├── BlogList.tsx     - Blog posts listing
    └── Docs.tsx         - Documentation page
```

### Data Management

All static data is in `src/utils/data.ts`:
- `products` - Product list with details
- `features` - Feature highlights
- `tools` - Developer tools

Add new items here to update the website.

## Styling Guide

### Tailwind Classes

**Common patterns:**
- `card-dark` - Dark card component
- `btn-primary` - Primary button
- `btn-secondary` - Secondary button
- `text-gradient` - Gradient text effect
- `section-title` - Section heading
- `section-subtitle` - Section subheading

### Custom Colors

Access via Tailwind config:
```css
bg-primary      /* #FFD60A */
bg-accent       /* #FCA311 */
bg-dark         /* #0f172a */
text-primary
text-accent
```

## Animation Patterns

### Framer Motion Examples

```tsx
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Content
</motion.div>

// Staggered children
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
>
  {items.map(item => (
    <motion.div key={item} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Adding Features

### Add a New Page

1. Create file: `src/app/[slug]/page.tsx`
2. Add to Navbar: `src/components/Navbar.tsx`
3. Create layout if needed

### Add a New Product

1. Edit `src/utils/data.ts`
2. Add to `products` array:
   ```ts
   {
     id: 'unique-id',
     name: 'Product Name',
     description: 'Short description',
     longDescription: 'Full description',
     category: 'social' | 'news' | 'utility' | 'developer',
     icon: '🎯',
     url: 'https://...',
     image: '/products/...png',
     features: ['Feature 1', 'Feature 2'],
     status: 'active' | 'beta' | 'coming-soon',
     tags: ['tag1', 'tag2'],
   }
   ```

### Add a New Tool

1. Edit `src/utils/data.ts`
2. Add to `tools` array:
   ```ts
   {
     id: 'unique-id',
     name: 'Tool Name',
     description: 'Description',
     icon: '🔧',
     category: 'utilities',
     isPopular: true/false,
   }
   ```

## TypeScript Types

All types are in `src/types/index.ts`:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'social' | 'news' | 'utility' | 'developer';
  icon: string;
  url: string;
  image: string;
  features: string[];
  status: 'active' | 'beta' | 'coming-soon';
  tags: string[];
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isPopular: boolean;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}
```

## Common Tasks

### Update Navigation Links
Edit `src/components/Navbar.tsx` - `navItems` array

### Change Colors
Edit `tailwind.config.ts` - `colors` object

### Add Animations
Use `framer-motion` in components with `motion` prefix

### Format Code
```bash
npm run format
```

### Check Types
```bash
npm run type-check
```

### Build for Production
```bash
npm run build
npm start
```

## Best Practices

1. **Component Organization**
   - Keep components focused and small
   - Use meaningful names
   - Export as named exports

2. **Performance**
   - Use `'use client'` for interactive components
   - Lazy load images
   - Optimize animations

3. **Accessibility**
   - Add `aria-label` to buttons
   - Use semantic HTML
   - Test with keyboard navigation

4. **Code Quality**
   - Run lint: `npm run lint`
   - Format code: `npm run format`
   - Check types: `npm run type-check`

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Type errors
```bash
npm run type-check
```

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org)

## Need Help?

- Check existing components for patterns
- Review TypeScript types in `src/types/index.ts`
- Refer to `src/utils/data.ts` for data structure
- Check Tailwind classes in `tailwind.config.ts`
