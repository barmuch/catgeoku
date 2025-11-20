# Troubleshooting Guide

Common issues and their solutions when working with catgeoku.

## Installation Issues

### ❌ "npm install" fails

**Symptoms**:
- Installation stops with errors
- Missing dependencies
- Permission errors

**Solutions**:

1. **Check Node.js version**
   ```bash
   node -v  # Should be 18+
   ```
   
2. **Clear npm cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission issues (Mac/Linux)**
   ```bash
   sudo npm install
   # OR fix npm permissions:
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   ```

4. **Windows permission issues**
   - Run Command Prompt as Administrator
   - Or use PowerShell with admin rights

---

## Development Server Issues

### ❌ "npm run dev" fails to start

**Symptoms**:
- Error: Port 3000 already in use
- Server crashes on start
- Cannot access localhost:3000

**Solutions**:

1. **Port already in use**
   
   Windows:
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   ```
   
   Mac/Linux:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
   
   Or use different port:
   ```bash
   PORT=3001 npm run dev
   ```

2. **Module not found errors**
   ```bash
   npm install
   ```

3. **Clear Next.js cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### ❌ Changes not appearing in browser

**Symptoms**:
- Edit files but browser doesn't update
- Hot reload not working
- Must manually refresh

**Solutions**:

1. **Hard refresh browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check Fast Refresh**
   - Ensure no syntax errors in console
   - Check terminal for errors

3. **Restart dev server**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

4. **Clear browser cache**
   - Open DevTools (F12)
   - Right-click refresh → Empty Cache and Hard Reload

---

## Build Issues

### ❌ Build fails with errors

**Symptoms**:
- `npm run build` exits with error
- Module resolution errors
- Type errors

**Solutions**:

1. **Check error message carefully**
   - Read the full error output
   - Note the file and line number

2. **Common fixes**
   ```bash
   # Clear everything
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

3. **Check for missing files**
   - Ensure all imported files exist
   - Verify paths are correct

4. **Environment variables**
   - Check .env.local exists if needed
   - Verify all required vars are set

---

### ❌ Image optimization errors

**Symptoms**:
- Build fails on image optimization
- "Invalid src prop" errors

**Solutions**:

1. **Add image domains to next.config.js**
   ```javascript
   images: {
     domains: ['images.unsplash.com', 'your-domain.com'],
   }
   ```

2. **Use placeholder for missing images**
   ```jsx
   <Image 
     src={image || '/placeholder.svg'}
     alt="Description"
   />
   ```

3. **Check image paths**
   - Ensure images are in public/ folder
   - Use absolute paths: `/images/photo.jpg`

---

## Styling Issues

### ❌ Tailwind CSS not working

**Symptoms**:
- Classes don't apply
- No styling visible
- CSS errors in console

**Solutions**:

1. **Verify Tailwind is installed**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **Check tailwind.config.js**
   - Ensure content paths are correct
   - Verify configuration is valid

3. **Restart dev server**
   ```bash
   # Tailwind requires restart for config changes
   npm run dev
   ```

4. **Check globals.css imports**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

---

### ❌ Dark mode not working

**Symptoms**:
- Toggle doesn't switch themes
- Dark classes don't apply
- Theme doesn't persist

**Solutions**:

1. **Check ThemeProvider wraps app**
   - Verify it's in app/layout.js
   - Ensure 'use client' directive is present

2. **Clear localStorage**
   ```javascript
   // In browser console:
   localStorage.clear()
   ```

3. **Check dark mode classes**
   ```jsx
   // Should use dark: prefix
   className="bg-white dark:bg-gray-900"
   ```

4. **Verify Tailwind config**
   ```javascript
   darkMode: 'class',
   ```

---

## Content Issues

### ❌ Blog posts not appearing

**Symptoms**:
- Posts don't show on homepage
- 404 on post pages
- Empty blog listing

**Solutions**:

1. **Check markdown files location**
   - Must be in `content/posts/`
   - Files must end with `.md`

2. **Verify frontmatter format**
   ```markdown
   ---
   title: "Post Title"
   date: "2024-11-20"
   category: "Geology"
   excerpt: "Description"
   ---
   ```

3. **Check for YAML errors**
   - No tabs (use spaces)
   - Proper quotes around strings
   - Valid date format

4. **Restart server after adding posts**
   ```bash
   npm run dev
   ```

---

### ❌ LaTeX equations not rendering

**Symptoms**:
- Math shows as plain text
- KaTeX errors
- Formulas not formatted

**Solutions**:

1. **Check KaTeX is installed**
   ```bash
   npm install katex rehype-katex remark-math
   ```

2. **Import KaTeX CSS**
   ```javascript
   // In post page
   import 'katex/dist/katex.min.css'
   ```

3. **Use correct syntax**
   ```markdown
   Inline: $E = mc^2$
   Block: $$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$$
   ```

4. **Escape special characters**
   - Use `\\` for backslash in formulas

---

## 3D Visualization Issues

### ❌ Plotly not rendering

**Symptoms**:
- Blank space where 3D plot should be
- Loading forever
- Console errors

**Solutions**:

1. **Ensure dynamic import with ssr: false**
   ```javascript
   const Plot = dynamic(() => import('react-plotly.js'), { 
     ssr: false 
   })
   ```

2. **Check data format**
   ```javascript
   // Data must be arrays
   x: [1, 2, 3],  // Not null or undefined
   y: [4, 5, 6],
   z: [7, 8, 9],
   ```

3. **Install dependencies**
   ```bash
   npm install plotly.js react-plotly.js
   ```

4. **Check browser console**
   - Look for specific error messages
   - Verify WebGL is supported

---

## Deployment Issues

### ❌ Vercel build fails

**Symptoms**:
- Build succeeds locally but fails on Vercel
- Environment variable errors
- Module not found

**Solutions**:

1. **Check build logs on Vercel**
   - Read full error message
   - Note which step failed

2. **Set environment variables**
   - Go to Vercel → Settings → Environment Variables
   - Add all required vars

3. **Match Node version**
   - Check package.json engines field
   - Ensure Vercel uses correct version

4. **Build locally with production settings**
   ```bash
   NODE_ENV=production npm run build
   ```

---

### ❌ Site loads but images missing

**Symptoms**:
- Site works but images don't show
- 404 on image URLs
- Broken image icons

**Solutions**:

1. **Check image paths**
   - Use absolute paths from public/
   - Example: `/images/photo.jpg`

2. **Add image domains**
   ```javascript
   // next.config.js
   images: {
     domains: ['images.unsplash.com'],
   }
   ```

3. **Verify images are committed**
   ```bash
   git status
   git add public/images/
   git commit -m "Add images"
   git push
   ```

---

## Performance Issues

### ❌ Slow page loads

**Symptoms**:
- Pages take long to load
- Poor Lighthouse scores
- Laggy interactions

**Solutions**:

1. **Optimize images**
   - Use Next/Image component
   - Compress images (tinypng.com)
   - Use appropriate formats (WebP, AVIF)

2. **Use dynamic imports**
   ```javascript
   const HeavyComponent = dynamic(() => 
     import('@/components/HeavyComponent'), 
     { loading: () => <Loading /> }
   )
   ```

3. **Check bundle size**
   ```bash
   npm run build
   # Review "First Load JS" column
   ```

4. **Remove unused dependencies**
   ```bash
   npm install -g depcheck
   depcheck
   ```

---

## SEO Issues

### ❌ Site not indexed by Google

**Symptoms**:
- site:yourdomain.com shows no results
- Not appearing in search

**Solutions**:

1. **Submit sitemap**
   - Go to Google Search Console
   - Submit https://yourdomain.com/sitemap.xml

2. **Check robots.txt**
   - Visit /robots.txt
   - Ensure it allows indexing

3. **Verify metadata**
   - Check meta tags in page source
   - Ensure no "noindex" directives

4. **Be patient**
   - Google indexing takes time (days to weeks)

---

## Common Error Messages

### "Cannot find module"
```bash
# Solution:
npm install
```

### "Port 3000 is already in use"
```bash
# Solution: Kill the process or use different port
PORT=3001 npm run dev
```

### "Invalid hook call"
```bash
# Solution: Check React versions match
npm install react@latest react-dom@latest
```

### "Hydration failed"
```bash
# Solution: Ensure server and client render same HTML
# Remove any browser-only code from initial render
```

### "Module parse failed"
```bash
# Solution: File type not supported
# Check file extension and webpack config
```

---

## Getting Help

If none of these solutions work:

1. **Check GitHub Issues**
   - Search for similar problems
   - Check Next.js GitHub issues

2. **Review Documentation**
   - README.md
   - Next.js documentation
   - Tailwind CSS documentation

3. **Enable Verbose Logging**
   ```bash
   npm run dev -- --verbose
   ```

4. **Ask for Help**
   - Include error message
   - Share relevant code
   - Describe steps to reproduce
   - Email: contact@catgeoku.com

---

## Prevention Tips

1. **Always test locally** before pushing
2. **Run `npm run build`** before deploying
3. **Keep dependencies updated** monthly
4. **Use version control** (Git)
5. **Document custom changes**
6. **Back up your content** regularly

---

*Keep this guide handy for quick troubleshooting!*
