# Deployment Guide - catgeoku

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

## Local Development

### 1. Install Dependencies

```bash
cd catgeouku
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### 3. Build and Test Locally

```bash
npm run build
npm start
```

## Deploy to Vercel (Recommended)

### Method 1: Vercel Dashboard (Easiest)

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Configure project:
     - **Framework Preset**: Next.js
     - **Root Directory**: ./
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next` (auto-detected)
     - **Install Command**: `npm install`

3. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~2 minutes at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod
```

## Custom Domain Setup

### On Vercel

1. Go to Project Settings → Domains
2. Add your domain: `catgeoku.com`
3. Add DNS records at your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for DNS propagation (up to 48 hours, usually minutes)

## Environment Variables

### Production Variables

Set in Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_SITE_URL=https://catgeoku.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Local Development

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify dark mode toggle works
- [ ] Check 3D visualizations render
- [ ] Test responsive design on mobile
- [ ] Verify blog posts display correctly
- [ ] Check contact form (if backend connected)
- [ ] Test SEO metadata (use Google Search Console)
- [ ] Validate sitemap at `/sitemap.xml`
- [ ] Check robots.txt at `/robots.txt`
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test OpenGraph images on social media

## Performance Optimization

### After Deployment

1. **Enable Analytics**
   - Vercel Analytics: Enable in project settings
   - Google Analytics: Add tracking ID to env variables

2. **Configure Caching**
   - Vercel automatically handles caching
   - Adjust `next.config.js` for specific needs

3. **Monitor Performance**
   - Use Vercel Analytics dashboard
   - Set up error tracking (Sentry recommended)

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches

### Branch Protection (Recommended)

```bash
# Only deploy to production from main branch
# All other branches create preview deployments
```

## Troubleshooting

### Build Fails

**Check Node version:**
```bash
node --version  # Should be 18+
```

**Clear build cache:**
```bash
rm -rf .next
npm run build
```

### Images Not Loading

Ensure image domains are allowed in `next.config.js`:

```javascript
images: {
  domains: ['images.unsplash.com', 'your-cdn.com'],
}
```

### Dark Mode Not Persisting

Check that `ThemeProvider` wraps app in `layout.js`.

### 3D Visualizations Not Working

Ensure dynamic imports are used:
```javascript
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })
```

## Alternative Deployment Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### AWS Amplify

1. Connect Git repository
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t catgeoku .
docker run -p 3000:3000 catgeoku
```

## Monitoring & Maintenance

### Weekly Tasks
- Review analytics
- Check for broken links
- Monitor error logs

### Monthly Tasks
- Update dependencies: `npm update`
- Review and respond to user feedback
- Add new content

### Quarterly Tasks
- Security audit: `npm audit`
- Performance review
- SEO optimization review

## Backup Strategy

### Content Backup
- Blog posts are in Git (automatic backup)
- Database (if added): Use automated backups

### Media Backup
- Use CDN with backup (Cloudinary, Imgix)
- Keep local copies of critical images

## Support

If you encounter issues:
1. Check [Vercel documentation](https://vercel.com/docs)
2. Review [Next.js documentation](https://nextjs.org/docs)
3. Contact: contact@catgeoku.com

---

**Ready to deploy!** 🚀

Your modern engineering platform will be live in minutes.
