# NPM Scripts Guide

This document explains all available npm scripts and when to use them.

## Development Scripts

### `npm run dev`
**Purpose**: Start the development server with hot reload

**When to use**: 
- During active development
- When making changes and want to see them instantly
- Testing features locally

**What it does**:
- Starts Next.js dev server on http://localhost:3000
- Enables Fast Refresh (instant updates)
- Shows detailed error messages
- Source maps for debugging

**Example**:
```bash
npm run dev
```

---

## Build Scripts

### `npm run build`
**Purpose**: Create optimized production build

**When to use**:
- Before deploying to production
- To test production build locally
- To check bundle size
- Before committing major changes

**What it does**:
- Compiles and optimizes all code
- Generates static pages
- Optimizes images
- Creates production bundles
- Shows build warnings/errors

**Example**:
```bash
npm run build
```

**Output**:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                  Size     First Load JS
┌ ○ /                       5.2 kB     95.3 kB
├ ○ /about                  1.8 kB     93.9 kB
└ ○ /contact                2.1 kB     94.2 kB
```

---

### `npm start`
**Purpose**: Run production build locally

**When to use**:
- After running `npm run build`
- To test production version before deploying
- To verify optimizations work correctly

**What it does**:
- Serves the production build
- No hot reload (must rebuild for changes)
- Uses production optimizations

**Example**:
```bash
npm run build
npm start
```

---

## Linting Scripts

### `npm run lint`
**Purpose**: Check code for errors and style issues

**When to use**:
- Before committing code
- To find potential bugs
- To maintain code quality

**What it does**:
- Runs ESLint on all files
- Shows warnings and errors
- Suggests fixes

**Example**:
```bash
npm run lint
```

**Auto-fix errors**:
```bash
npm run lint -- --fix
```

---

## Additional Useful Commands

### Check for outdated packages
```bash
npm outdated
```

### Update all packages
```bash
npm update
```

### Check for security vulnerabilities
```bash
npm audit
```

### Fix security vulnerabilities
```bash
npm audit fix
```

### Clean install (fresh start)
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check bundle size
```bash
npm run build
# Look for the "First Load JS" column in output
```

---

## Development Workflow

### Typical Daily Workflow

1. **Start development**
   ```bash
   npm run dev
   ```

2. **Make changes**
   - Edit files
   - Changes appear instantly in browser

3. **Check for errors**
   ```bash
   npm run lint
   ```

4. **Test production build**
   ```bash
   npm run build
   npm start
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

---

## Pre-Deployment Workflow

Before deploying to production:

```bash
# 1. Ensure all dependencies are installed
npm install

# 2. Run linter
npm run lint

# 3. Build for production
npm run build

# 4. Test production build locally
npm start

# 5. If everything works, deploy
vercel --prod
# OR push to Git (auto-deploys on Vercel)
```

---

## Troubleshooting

### Dev server won't start
```bash
# Kill any process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev
```

### Build fails
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Module not found errors
```bash
# Reinstall dependencies
npm install

# Check for missing packages
npm install <package-name>
```

### Out of memory during build
```bash
# Increase Node memory (on build)
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## Performance Optimization

### Analyze bundle size
```bash
npm run build
```

Look for large bundles and consider:
- Dynamic imports for large components
- Code splitting
- Removing unused dependencies

### Check for unused dependencies
```bash
npm install -g depcheck
depcheck
```

---

## Environment-Specific Commands

### Development
```bash
NODE_ENV=development npm run dev
```

### Production
```bash
NODE_ENV=production npm run build
NODE_ENV=production npm start
```

---

## Quick Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm install` | Install dependencies | First time setup, after pulling changes |
| `npm run dev` | Development server | Active development |
| `npm run build` | Production build | Before deployment |
| `npm start` | Serve production | Test production locally |
| `npm run lint` | Check code quality | Before committing |
| `npm update` | Update packages | Weekly/monthly maintenance |
| `npm audit` | Security check | Before deployment |

---

## Tips

1. **Always test builds locally** before deploying
2. **Run lint** before committing
3. **Keep dependencies updated** (monthly)
4. **Monitor bundle sizes** to maintain performance
5. **Use `npm ci`** for reproducible builds in CI/CD

---

## Resources

- [Next.js CLI Documentation](https://nextjs.org/docs/api-reference/cli)
- [npm Documentation](https://docs.npmjs.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

*Keep this file as a reference for all npm commands!*
