# Quick Start Guide - catgeoku

Welcome to catgeoku! This guide will get you up and running in 5 minutes.

## Step 1: Install Dependencies (1 minute)

```bash
cd catgeouku
npm install
```

This installs all required packages including Next.js, React, Tailwind CSS, and visualization libraries.

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Explore the Site (2 minutes)

Navigate through:
- **Homepage**: Hero section, featured categories, latest articles
- **Categories**: Geology, Geophysics, Drilling, Petroleum Engineering
- **Blog Posts**: Click any article to see full post with syntax highlighting
- **Dark Mode**: Toggle in the navbar
- **About & Contact**: Check out the static pages

## Step 4: Add Your First Blog Post (1 minute)

Create `content/posts/my-first-post.md`:

```markdown
---
title: "My First Engineering Article"
date: "2024-11-20"
category: "Geology"
excerpt: "This is my first article on catgeoku!"
coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"
author: "Your Name"
readTime: "5 min read"
tags: ["Engineering", "Tutorial"]
---

# Welcome!

This is my first article. Here's some **bold text** and *italic text*.

## Code Example

```python
def hello_world():
    print("Hello, catgeoku!")
```

## Math Equation

The quadratic formula: $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$
```

Save and refresh the homepage - your post appears!

## Step 5: Customize Branding (30 seconds)

Edit `app/layout.js` to change site title and description:

```javascript
export const metadata = {
  title: {
    default: 'Your Site Name — Your Tagline',
    template: '%s | Your Site Name'
  },
  description: 'Your site description here...',
}
```

## Next Steps

### Content
- Add more blog posts to `content/posts/`
- Update About page: `app/about/page.js`
- Customize contact form: `app/contact/page.js`

### Design
- Change colors: `tailwind.config.js`
- Update fonts: `app/layout.js`
- Modify components: `components/`

### Features
- Add newsletter integration
- Connect contact form to email service
- Implement comment system
- Add analytics (Google Analytics, Vercel Analytics)

### Deploy
- Push to GitHub
- Deploy to Vercel (see DEPLOYMENT.md)
- Connect custom domain

## Common Tasks

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    900: '#YOUR_COLOR',  // Dark navy
    // ... other shades
  },
}
```

### Change Accent Color

```javascript
colors: {
  accent: {
    500: '#YOUR_COLOR',  // Orange/brand color
    // ... other shades
  },
}
```

### Add New Category

1. Add to navbar: `components/layout/Navbar.js`
2. Create route: `app/[category]/page.js` (already dynamic!)
3. Add posts with matching category in frontmatter

### Customize Homepage

Edit sections in `components/home/`:
- `Hero.js` - Hero section
- `FeaturedCategories.js` - Category cards
- `LatestArticles.js` - Blog post grid
- `ToolsShowcase.js` - Tools section
- `Newsletter.js` - Newsletter signup

## Tips

1. **Hot Reload**: Changes appear instantly while dev server runs
2. **CSS Classes**: Use Tailwind utility classes throughout
3. **Images**: Use Next.js Image component for optimization
4. **Dark Mode**: Automatically handled - use `dark:` prefix
5. **Performance**: Build with `npm run build` to check bundle size

## Keyboard Shortcuts

- `Ctrl+C` - Stop dev server
- `Ctrl+Shift+R` - Hard refresh browser
- `Ctrl+/` - Comment code in editor

## Get Help

- Check README.md for full documentation
- Review DEPLOYMENT.md for deployment guide
- Email: contact@catgeoku.com

## Build for Production

```bash
npm run build
npm start
```

Test production build locally before deploying.

---

**You're ready to go!** 🎉

Start customizing and building your engineering platform.
