# catgeoku - Modern Engineering Platform

A high-performance, modern, SEO-optimized web application built with Next.js 14 (App Router) for geological, geophysical, drilling, and petroleum engineers.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design inspired by Vercel, Apple, and Medium
- **Interactive 3D Visualizations**: WebGL-powered geological modeling tools
- **SEO Optimized**: Comprehensive metadata, OpenGraph, structured data
- **Dark Mode**: Smooth theme switching with localStorage persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Blog System**: Markdown-based content with syntax highlighting and LaTeX support
- **Performance**: Optimized images, dynamic imports, server components

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Plotly.js, React Three Fiber
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Markdown**: Gray Matter, Remark, Rehype
- **Math**: KaTeX
- **Code Highlighting**: Highlight.js

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
catgeouku/
├── app/                      # Next.js App Router pages
│   ├── [category]/          # Dynamic category pages
│   ├── posts/[slug]/        # Dynamic blog post pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── layout.js            # Root layout with SEO
│   ├── page.js              # Homepage
│   ├── globals.css          # Global styles
│   ├── robots.js            # Robots.txt generation
│   └── sitemap.js           # Sitemap generation
├── components/              # React components
│   ├── 3d/                  # 3D visualization components
│   ├── home/                # Homepage sections
│   ├── layout/              # Navigation & footer
│   └── providers/           # Context providers
├── content/                 # Content files
│   └── posts/               # Blog posts (Markdown)
├── lib/                     # Utility functions
│   ├── posts.js             # Post management
│   └── markdown.js          # Markdown processing
├── public/                  # Static assets
├── styles/                  # Additional styles
├── package.json             # Dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── jsconfig.json            # Path aliases
```

## 🎨 Design System

### Colors

- **Primary**: Deep navy (#0F172A)
- **Accent**: Orange (#F97316)
- **Background**: Light gray (#F8FAFC)
- **Text**: Dark navy (#0F172A)

### Typography

- **Display**: Poppins (headings)
- **Body**: Inter (paragraphs)
- **Code**: JetBrains Mono

### Components

All components follow modern design principles with:
- Rounded corners (lg: 12px, xl: 16px, 2xl: 24px)
- Soft shadows
- Smooth transitions (300ms)
- Hover states with scale/translate effects
- Micro-interactions

## 📝 Content Management

### Adding Blog Posts

Create Markdown files in `content/posts/`:

```markdown
---
title: "Your Article Title"
date: "2024-11-20"
category: "Geology"
excerpt: "Brief description"
coverImage: "https://image-url.jpg"
author: "Author Name"
readTime: "10 min read"
tags: ["tag1", "tag2"]
---

# Your Content Here

Your article content with **markdown** formatting.
```

### LaTeX Support

Use KaTeX for mathematical equations:

```markdown
Inline math: $E = mc^2$

Block math:
$$
\frac{\partial u}{\partial t} = \alpha \nabla^2 u
$$
```

## 🔧 Customization

### Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... },
      accent: { ... },
    }
  }
}
```

### SEO Metadata

Update `app/layout.js` for global metadata:

```javascript
export const metadata = {
  title: { default: '...', template: '...' },
  description: '...',
  // ... more metadata
}
```

## 🚀 Deployment to Vercel

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Production Deploy

```bash
vercel --prod
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://catgeoku.com
```

### Automatic Deployments

1. Push to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Deploy automatically on push

## 📊 3D Visualization Tools

### Spatial Model Viewer

```javascript
import SpatialModelViewer from '@/components/3d/SpatialModelViewer'

const data = {
  x: [...],
  y: [...],
  z: [...],
  values: [...],
}

<SpatialModelViewer data={data} title="My Model" />
```

### IDW Volume Calculator

```javascript
import IDWVolumeCalculator from '@/components/3d/IDWVolumeCalculator'

<IDWVolumeCalculator />
```

## 🎯 Performance Optimization

- **Image Optimization**: Using Next/Image with AVIF/WebP
- **Code Splitting**: Dynamic imports for heavy components
- **Server Components**: Render on server where possible
- **Font Optimization**: Subset fonts, display swap
- **CSS Purging**: Tailwind removes unused styles

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

Copyright © 2024 catgeoku. All rights reserved.

## 🆘 Support

- **Email**: contact@catgeoku.com
- **Documentation**: [catgeoku.com/docs](https://catgeoku.com/docs)
- **Issues**: [GitHub Issues](https://github.com/catgeoku/catgeoku/issues)

## 🗺️ Roadmap

- [ ] User authentication system
- [ ] Comments section for articles
- [ ] Advanced search functionality
- [ ] API for programmatic access
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration tools
- [ ] AI-powered recommendations

---

Built with ❤️ by the catgeoku team
