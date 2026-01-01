# catgeoku - Complete Documentation

This document consolidates all project documentation into a single reference file.

---

## Table of Contents

1. [Project Overview & README](#project-overview)
2. [Architecture](#architecture)
3. [Quick Start Guide](#quick-start)
4. [Project Summary](#project-summary)
5. [Backend Quick Start](#backend-quick-start)
6. [Deployment Guide](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [NPM Scripts](#npm-scripts)
9. [Launch Checklist](#launch-checklist)
10. [Admin Panel Guide](#admin-panel)
11. [API Documentation](#api-documentation)
12. [MongoDB Integration](#mongodb-integration)

---

<a name="project-overview"></a>
# Project Overview & README

## catgeoku - Modern Engineering Platform

A high-performance, modern, SEO-optimized web application built with Next.js 14 (App Router) for geological, geophysical, drilling, and petroleum engineers.

### 🚀 Features

- **Modern UI/UX**: Clean, professional design inspired by Vercel, Apple, and Medium
- **Interactive 3D Visualizations**: WebGL-powered geological modeling tools
- **SEO Optimized**: Comprehensive metadata, OpenGraph, structured data
- **Dark Mode**: Smooth theme switching with localStorage persistence
- **Multi-Language Support**: 10 languages with auto-detection and localStorage persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Blog System**: Markdown-based content with syntax highlighting and LaTeX support
- **Admin Panel**: Full CMS for managing articles, events, and settings
- **Performance**: Optimized images, dynamic imports, server components

### 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS
- **3D Graphics**: Plotly.js, React Three Fiber
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Markdown**: Gray Matter, Remark, Rehype
- **Math**: KaTeX
- **Code Highlighting**: Highlight.js

### 🛠️ Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

# Seed database with sample data
npm run seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 📁 Project Structure

```
catgeouku/
├── app/                      # Next.js App Router pages
│   ├── [category]/          # Dynamic category pages
│   ├── posts/[slug]/        # Dynamic blog post pages
│   ├── admin/               # Admin panel pages
│   │   ├── login/          # Admin login
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── articles/       # Article management
│   │   ├── events/         # Event management
│   │   └── settings/       # Admin settings
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── admin/          # Admin API endpoints
│   │   ├── categories/     # Category endpoints
│   │   └── posts/          # Post endpoints
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── events/              # Events page
│   ├── layout.js            # Root layout with SEO
│   ├── page.js              # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── 3d/                  # 3D visualization components
│   ├── home/                # Homepage sections
│   ├── layout/              # Navigation & footer
│   ├── common/              # Shared components
│   └── providers/           # Context providers
├── lib/                     # Utility functions
│   ├── mongodb.js           # MongoDB connection
│   ├── models/              # Mongoose models
│   │   ├── User.js         # User model
│   │   ├── Article.js      # Article model
│   │   ├── Category.js     # Category model
│   │   └── Event.js        # Event model
│   ├── auth.js              # Authentication utilities
│   ├── posts.js             # Post management
│   ├── markdown.js          # Markdown processing
│   └── translations.js      # Multi-language support
├── content/                 # Content files
│   └── posts/               # Blog posts (Markdown)
├── public/                  # Static assets
├── package.json             # Dependencies
├── next.config.js           # Next.js configuration
└── tailwind.config.js       # Tailwind configuration
```

---

<a name="architecture"></a>
# Architecture

## System Architecture

### Database Layer (MongoDB)

```
MongoDB Atlas Cloud Database
├── Collections
│   ├── users           # User accounts and authentication
│   ├── articles        # Blog posts and content
│   ├── categories      # Content categories
│   └── events          # Events and webinars
```

### Models

#### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date,
  updatedAt: Date
}
```

#### Article Model
```javascript
{
  title: String (required),
  slug: String (required, unique),
  content: String (required),
  excerpt: String,
  categoryId: ObjectId (ref: Category),
  category: String,
  tags: [String],
  author: String,
  published: Boolean,
  featuredImage: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

#### Category Model
```javascript
{
  name: String (required),
  slug: String (required, unique),
  description: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Event Model
```javascript
{
  title: String (required),
  slug: String (required, unique),
  description: String (required),
  date: Date (required),
  location: String,
  image: String,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### API Routes

#### Authentication
- POST /api/auth/login - User login
- POST /api/auth/register - User registration
- POST /api/auth/logout - User logout
- GET /api/auth/me - Get current user

#### Admin Articles
- GET /api/admin/articles - List all articles
- POST /api/admin/articles - Create article
- PUT /api/admin/articles/[id] - Update article
- DELETE /api/admin/articles/[id] - Delete article

#### Admin Categories
- GET /api/admin/categories - List all categories
- POST /api/admin/categories - Create category
- PUT /api/admin/categories/[id] - Update category
- DELETE /api/admin/categories/[id] - Delete category

#### Admin Events
- GET /api/admin/events - List all events
- POST /api/admin/events - Create event
- PUT /api/admin/events/[id] - Update event
- DELETE /api/admin/events/[id] - Delete event

#### Public
- GET /api/categories - Get all categories
- GET /api/posts - Get all published posts
- GET /api/posts/[slug] - Get post by slug

---

<a name="quick-start"></a>
# Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Install Dependencies (1 minute)

```bash
cd catgeouku
npm install
```

### Step 2: Configure Environment (1 minute)

Create `.env` file:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/catgeoku?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 3: Seed Database (30 seconds)

```bash
npm run seed
```

This will create:
- **1 Admin user** (admin@catgeoku.com / admin123)
- **5 Categories** (Geology, Geophysics, Drilling Engineering, Petroleum Engineering, Science)
- **10 Sample articles** (2 per category)

### Step 4: Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 5: Access Admin Panel

1. Navigate to `/admin/login`
2. Email: admin@catgeoku.com
3. Password: admin123
4. Manage articles, categories, and events

---

<a name="project-summary"></a>
# Project Summary

## What Has Been Built

A **completely modernized, production-ready Next.js 14 application** with MongoDB backend for managing engineering content.

### Core Features Implemented

1. **Full MongoDB Integration**
   - Mongoose models for all data
   - Connection pooling and caching
   - CRUD operations for all entities

2. **JWT Authentication**
   - Secure login/logout
   - Token-based authentication
   - Role-based access control

3. **Admin Panel**
   - Article management
   - Category management
   - Event management
   - User-friendly interface

4. **Public-Facing Website**
   - Dynamic blog posts
   - Category pages
   - SEO optimization
   - Responsive design

---

<a name="backend-quick-start"></a>
# Backend Quick Start

## MongoDB Setup

1. Create MongoDB Atlas account at mongodb.com
2. Create a new cluster
3. Get connection string
4. Add to `.env` file

## Seeding Database

The project includes a seed script that populates the database with:

### Sample Data Included:

**Categories (5):**
- Geology 🪨
- Geophysics 🌊
- Drilling Engineering ⚙️
- Petroleum Engineering 🛢️
- Science 🔬

**Articles (10 total, 2 per category):**

**Geology:**
1. 3D Geological Modeling with Python
2. Structural Geology Field Methods

**Geophysics:**
3. Seismic Interpretation Guide
4. Gravity and Magnetic Surveys

**Drilling Engineering:**
5. Well Control Fundamentals
6. Directional Drilling Techniques

**Petroleum Engineering:**
7. Reservoir Simulation Best Practices
8. Enhanced Oil Recovery Methods

**Science:**
9. Machine Learning in Petrophysics
10. Carbon Capture and Storage

### Running the Seed:

```bash
npm run seed
```

### Manual Seeding:

```bash
node scripts/seed-mongodb.js
```

## Authentication Setup

### Creating Admin User

The seed script automatically creates an admin user:

**Email:** admin@catgeoku.com  
**Password:** admin123

⚠️ **Important:** Change this password after first login!

### Manual Admin Creation

If needed, you can create admin manually in MongoDB:

```javascript
import bcrypt from 'bcryptjs';
import connectDB from './lib/mongodb.js';
import User from './lib/models/User.js';

async function createAdmin() {
  await connectDB();
  
  const hashedPassword = await bcrypt.hash('your-password', 10);
  
  const admin = await User.create({
    username: 'admin',
    email: 'admin@catgeoku.com',
    password: hashedPassword,
    role: 'admin'
  });
  
  console.log('Admin created:', admin);
}

createAdmin();
```

---

<a name="deployment"></a>
# Deployment Guide

## Vercel Deployment (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NEXT_PUBLIC_API_URL
4. Deploy

## Environment Variables

Required for production:
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=strong-random-secret-key
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

---

<a name="troubleshooting"></a>
# Troubleshooting

## Common Issues

### MongoDB Connection Failed
- Check MONGODB_URI in .env
- Verify network access in MongoDB Atlas
- Check if IP address is whitelisted

### Authentication Not Working
- Verify JWT_SECRET is set
- Check token expiration
- Clear browser cookies/localStorage

### Articles Not Showing
- Check if articles are published
- Verify MongoDB connection
- Check API routes are working

---

<a name="npm-scripts"></a>
# NPM Scripts

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",       // Build for production
  "start": "next start",       // Start production server
  "lint": "next lint"          // Run ESLint
}
```

---

<a name="launch-checklist"></a>
# Launch Checklist

## Pre-Launch

- [ ] Environment variables configured
- [ ] MongoDB connection tested
- [ ] Admin user created
- [ ] Test articles created
- [ ] Categories set up
- [ ] Images optimized
- [ ] SEO metadata configured
- [ ] Analytics integrated
- [ ] Forms tested
- [ ] Mobile responsiveness verified

## Post-Launch

- [ ] Monitor error logs
- [ ] Check MongoDB usage
- [ ] Verify API endpoints
- [ ] Test authentication
- [ ] Monitor performance
- [ ] Backup database regularly

---

<a name="admin-panel"></a>
# Admin Panel Guide

## Accessing Admin Panel

URL: `/admin/login`

## Features

### Dashboard
- Overview statistics
- Recent articles
- Quick actions

### Article Management
- Create new articles
- Edit existing articles
- Delete articles
- Publish/unpublish
- Rich text editor
- Image uploads
- Tag management

### Category Management
- Create categories
- Edit categories
- Delete categories
- Assign icons

### Event Management
- Create events
- Edit events
- Delete events
- Set dates and locations

---

<a name="api-documentation"></a>
# API Documentation

## Authentication Endpoints

### POST /api/auth/login
Login user and return JWT token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "username",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### POST /api/auth/register
Register new user

**Request:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
```

### GET /api/auth/me
Get current authenticated user

**Headers:**
```
Authorization: Bearer <token>
```

## Article Endpoints

### GET /api/posts
Get all published articles

**Response:**
```json
[
  {
    "slug": "article-slug",
    "title": "Article Title",
    "excerpt": "Brief description",
    "category": "Geology",
    "author": "Author Name",
    "date": "2024-01-01",
    "coverImage": "/images/cover.jpg"
  }
]
```

### GET /api/posts/[slug]
Get single article by slug

### GET /api/categories
Get all categories

**Response:**
```json
[
  {
    "name": "Geology",
    "slug": "geology",
    "count": 10,
    "description": "Geological articles"
  }
]
```

## Admin Endpoints (Require Authentication)

### GET /api/admin/articles
List all articles (published and unpublished)

### POST /api/admin/articles
Create new article

**Request:**
```json
{
  "title": "New Article",
  "content": "Article content...",
  "excerpt": "Brief description",
  "category": "Geology",
  "tags": ["tag1", "tag2"],
  "published": false
}
```

### PUT /api/admin/articles/[id]
Update article

### DELETE /api/admin/articles/[id]
Delete article

---

<a name="mongodb-integration"></a>
# MongoDB Integration

## Connection Setup

MongoDB connection is handled in `lib/mongodb.js` with connection pooling and caching for optimal performance.

## Models

All models are defined using Mongoose schemas in `lib/models/`:
- User.js
- Article.js
- Category.js
- Event.js

## Usage Examples

### Creating a Document
```javascript
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';

await connectDB();
const article = await Article.create({
  title: 'New Article',
  slug: 'new-article',
  content: 'Content here...',
  published: true
});
```

### Querying Documents
```javascript
// Find all published articles
const articles = await Article.find({ published: true })
  .sort({ createdAt: -1 })
  .limit(10);

// Find by slug
const article = await Article.findOne({ slug: 'article-slug' });
```

### Updating Documents
```javascript
await Article.findByIdAndUpdate(id, {
  title: 'Updated Title',
  updatedAt: new Date()
});
```

### Deleting Documents
```javascript
await Article.findByIdAndDelete(id);
```

---

## Support

For issues or questions, please refer to the troubleshooting section or check the API documentation.

---

**Last Updated:** January 2026
**Version:** 2.0.0 (MongoDB Edition)
