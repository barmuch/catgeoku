# Architecture Diagram - catgeoku Platform

## Overview
catgeoku adalah platform engineering modern yang dibangun dengan Next.js 14 (App Router), MongoDB, dan teknologi web modern lainnya untuk insinyur geologi, geofisika, drilling, dan petroleum.

---

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end

    subgraph "Next.js 14 App Router"
        subgraph "Public Pages"
            Home[Home Page<br/>app/page.js]
            Blog[Blog Listing<br/>app/blog/page.js]
            BlogPost[Blog Post<br/>app/blog/[slug]/page.js]
            Events[Events Listing<br/>app/events/page.js]
            EventDetail[Event Detail<br/>app/events/[slug]/page.js]
            Category[Category Pages<br/>app/[category]/page.js]
            About[About Page]
            Contact[Contact Page]
            Posts[Posts<br/>app/posts/[slug]/page.js]
        end

        subgraph "Admin Pages"
            AdminLogin[Admin Login<br/>app/admin/login/page.js]
            AdminDash[Dashboard<br/>app/admin/dashboard/page.js]
            AdminArticles[Articles Management<br/>app/admin/articles/page.js]
            AdminEvents[Events Management<br/>app/admin/events/page.js]
            AdminSettings[Settings<br/>app/admin/settings/page.js]
        end

        subgraph "API Routes"
            AuthAPI[Authentication API<br/>api/auth/*]
            AdminAPI[Admin API<br/>api/admin/*]
            PostsAPI[Posts API<br/>api/posts/*]
            EventsAPI[Events API<br/>api/events/*]
            CategoriesAPI[Categories API<br/>api/categories/*]
        end
    end

    subgraph "Components Layer"
        subgraph "Layout Components"
            Navbar[Navbar]
            Footer[Footer]
            ConditionalLayout[Conditional Layout]
        end

        subgraph "Home Components"
            Hero[Hero Section]
            FeaturedCat[Featured Categories]
            LatestArticles[Latest Articles]
            ToolsShowcase[Tools Showcase]
            Newsletter[Newsletter]
        end

        subgraph "3D Components"
            SpatialModel[Spatial Model Viewer<br/>Three.js/R3F]
            IDWVolume[IDW Volume Calculator<br/>Plotly.js]
        end

        subgraph "Admin Components"
            AdminSidebar[Admin Sidebar]
            RichTextEditor[Rich Text Editor<br/>React Quill]
        end

        subgraph "Common Components"
            ArticleContent[Article Content]
            LanguageSwitcher[Language Switcher]
        end
    end

    subgraph "Context Providers"
        ThemeProvider[Theme Provider<br/>Dark/Light Mode]
        LanguageProvider[Language Provider<br/>10 Languages]
        AuthContext[Auth Context<br/>JWT Authentication]
        AdminProvider[Admin Provider]
    end

    subgraph "Library Layer"
        Auth[auth.js<br/>JWT Auth Logic]
        MongoDB[mongodb.js<br/>Connection Manager]
        Markdown[markdown.js<br/>MD Parser]
        Posts[posts.js<br/>Posts Utilities]
        Translations[translations.js<br/>i18n Support]
        Utils[utils.js<br/>Helper Functions]
    end

    subgraph "Models Layer"
        UserModel[User Model<br/>Mongoose Schema]
        ArticleModel[Article Model<br/>Mongoose Schema]
        EventModel[Event Model<br/>Mongoose Schema]
        CategoryModel[Category Model<br/>Mongoose Schema]
    end

    subgraph "Database Layer"
        MongoDBCloud[(MongoDB Atlas<br/>Cloud Database)]
        LocalMongoDB[(MongoDB Local<br/>Development)]
    end

    subgraph "Content Storage"
        MDFiles[Markdown Files<br/>content/posts/*.md]
    end

    subgraph "Static Assets"
        PublicFiles[Public Directory<br/>Images, Icons, Assets]
    end

    %% Client connections
    Browser --> Home
    Browser --> Blog
    Browser --> Events
    Browser --> AdminLogin
    Mobile --> Home
    Mobile --> Blog

    %% Public pages to API
    Home --> PostsAPI
    Home --> CategoriesAPI
    Blog --> PostsAPI
    BlogPost --> PostsAPI
    Events --> EventsAPI
    EventDetail --> EventsAPI
    Category --> CategoriesAPI

    %% Admin pages to API
    AdminDash --> AdminAPI
    AdminArticles --> AdminAPI
    AdminEvents --> AdminAPI
    AdminLogin --> AuthAPI

    %% API to Models
    AuthAPI --> Auth
    AdminAPI --> Auth
    PostsAPI --> Posts
    EventsAPI --> MongoDB
    CategoriesAPI --> MongoDB

    %% Models to Database
    Auth --> UserModel
    Posts --> ArticleModel
    MongoDB --> UserModel
    MongoDB --> ArticleModel
    MongoDB --> EventModel
    MongoDB --> CategoryModel

    UserModel --> MongoDBCloud
    ArticleModel --> MongoDBCloud
    EventModel --> MongoDBCloud
    CategoryModel --> MongoDBCloud

    UserModel -.-> LocalMongoDB
    ArticleModel -.-> LocalMongoDB
    EventModel -.-> LocalMongoDB
    CategoryModel -.-> LocalMongoDB

    %% Content and Static
    Posts --> MDFiles
    BlogPost --> MDFiles
    Markdown --> MDFiles

    Home --> PublicFiles
    Blog --> PublicFiles
    Events --> PublicFiles

    %% Components usage
    Home --> Hero
    Home --> FeaturedCat
    Home --> LatestArticles
    Home --> ToolsShowcase
    Home --> Newsletter

    Blog --> Navbar
    Blog --> Footer
    Events --> Navbar
    Events --> Footer

    BlogPost --> ArticleContent
    BlogPost --> LanguageSwitcher

    AdminDash --> AdminSidebar
    AdminArticles --> AdminSidebar
    AdminArticles --> RichTextEditor

    %% 3D Components
    ToolsShowcase --> SpatialModel
    ToolsShowcase --> IDWVolume

    %% Providers wrapping
    ConditionalLayout --> ThemeProvider
    ConditionalLayout --> LanguageProvider
    ConditionalLayout --> AuthContext
    ConditionalLayout --> AdminProvider

    style Browser fill:#e3f2fd
    style Mobile fill:#e3f2fd
    style MongoDBCloud fill:#4caf50,color:#fff
    style LocalMongoDB fill:#81c784
    style MDFiles fill:#fff9c4
    style PublicFiles fill:#fff9c4
```

---

## Component Hierarchy Diagram

```mermaid
graph TD
    subgraph "Root Layout"
        RootLayout[app/layout.js]
    end

    subgraph "Providers Wrapper"
        ThemeP[ThemeProvider]
        LangP[LanguageProvider]
        AuthP[AuthContext]
        AdminP[AdminProvider]
    end

    subgraph "Layout Wrapper"
        CondLayout[ConditionalLayout]
        Nav[Navbar]
        Main[Main Content]
        Foot[Footer]
    end

    subgraph "Page Components"
        HomePage[Home Page]
        BlogPage[Blog Page]
        EventsPage[Events Page]
        AdminPage[Admin Pages]
    end

    subgraph "Feature Components"
        HeroC[Hero]
        CatC[Categories]
        ArticlesC[Articles]
        Tools[Tools Showcase]
        News[Newsletter]
        Editor[Rich Text Editor]
        3D[3D Visualizations]
    end

    RootLayout --> ThemeP
    ThemeP --> LangP
    LangP --> AuthP
    AuthP --> AdminP
    AdminP --> CondLayout
    
    CondLayout --> Nav
    CondLayout --> Main
    CondLayout --> Foot
    
    Main --> HomePage
    Main --> BlogPage
    Main --> EventsPage
    Main --> AdminPage
    
    HomePage --> HeroC
    HomePage --> CatC
    HomePage --> ArticlesC
    HomePage --> Tools
    HomePage --> News
    
    AdminPage --> Editor
    Tools --> 3D

    style RootLayout fill:#1976d2,color:#fff
    style CondLayout fill:#1976d2,color:#fff
    style ThemeP fill:#9c27b0,color:#fff
    style LangP fill:#9c27b0,color:#fff
    style AuthP fill:#9c27b0,color:#fff
    style AdminP fill:#9c27b0,color:#fff
```

---

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant NextJS as Next.js Server
    participant API as API Routes
    participant Auth as Auth Library
    participant Models as Mongoose Models
    participant DB as MongoDB

    Note over User,DB: Public Content Access Flow
    User->>Browser: Request Homepage
    Browser->>NextJS: GET /
    NextJS->>API: Fetch latest posts
    API->>Models: Query Articles
    Models->>DB: Find recent articles
    DB-->>Models: Return data
    Models-->>API: Articles data
    API-->>NextJS: JSON response
    NextJS-->>Browser: Rendered HTML + Data
    Browser-->>User: Display page

    Note over User,DB: Admin Authentication Flow
    User->>Browser: Submit login form
    Browser->>API: POST /api/auth/login
    API->>Auth: Validate credentials
    Auth->>Models: Find user by email
    Models->>DB: Query users collection
    DB-->>Models: User data
    Models-->>Auth: User object
    Auth->>Auth: Compare password hash
    Auth->>Auth: Generate JWT token
    Auth-->>API: Token + user data
    API-->>Browser: Set cookie + response
    Browser-->>User: Redirect to dashboard

    Note over User,DB: Admin Create Article Flow
    User->>Browser: Submit new article
    Browser->>API: POST /api/admin/articles
    API->>Auth: Verify JWT token
    Auth-->>API: User authorized
    API->>Models: Create new article
    Models->>DB: Insert document
    DB-->>Models: Document created
    Models-->>API: Article data
    API-->>Browser: Success response
    Browser-->>User: Show confirmation
```

---

## Technology Stack Diagram

```mermaid
graph LR
    subgraph "Frontend"
        React[React 18.3]
        NextJS[Next.js 14<br/>App Router]
        Tailwind[Tailwind CSS]
        Framer[Framer Motion]
    end

    subgraph "3D & Visualization"
        Three[Three.js]
        R3F[React Three Fiber]
        Plotly[Plotly.js]
    end

    subgraph "Content Processing"
        GrayMatter[Gray Matter]
        Remark[Remark]
        Rehype[Rehype]
        KaTeX[KaTeX<br/>Math Rendering]
        Highlight[Highlight.js<br/>Code Syntax]
    end

    subgraph "Backend"
        NodeJS[Node.js]
        MongoDB[MongoDB/Mongoose]
        JWT[JSON Web Tokens]
        Bcrypt[Bcrypt.js]
    end

    subgraph "UI Components"
        Lucide[Lucide Icons]
        Heroicons[Heroicons]
        ReactQuill[React Quill<br/>Rich Editor]
    end

    NextJS --> React
    NextJS --> Tailwind
    NextJS --> MongoDB
    React --> Framer
    React --> Three
    React --> R3F
    React --> Plotly
    React --> Lucide
    React --> Heroicons
    React --> ReactQuill
    NextJS --> GrayMatter
    GrayMatter --> Remark
    Remark --> Rehype
    Rehype --> KaTeX
    Rehype --> Highlight
    NodeJS --> JWT
    NodeJS --> Bcrypt
    NodeJS --> MongoDB

    style NextJS fill:#000,color:#fff
    style React fill:#61dafb,color:#000
    style MongoDB fill:#4caf50,color:#fff
    style Tailwind fill:#38bdf8,color:#000
```

---

## API Routes Structure

```mermaid
graph TD
    API[API Routes<br/>/api]

    subgraph "Authentication"
        Login[POST /api/auth/login<br/>User login]
        Register[POST /api/auth/register<br/>User registration]
        Logout[POST /api/auth/logout<br/>Clear session]
        Me[GET /api/auth/me<br/>Current user info]
    end

    subgraph "Public Endpoints"
        GetPosts[GET /api/posts<br/>List all posts]
        GetPost[GET /api/posts/[slug]<br/>Single post]
        GetEvents[GET /api/events<br/>List all events]
        GetEvent[GET /api/events/[slug]<br/>Single event]
        GetCategories[GET /api/categories<br/>List categories]
    end

    subgraph "Admin Endpoints (Protected)"
        AdminArticles[/api/admin/articles<br/>CRUD Articles]
        AdminArticleId[/api/admin/articles/[id]<br/>Single Article CRUD]
        AdminEvents[/api/admin/events<br/>CRUD Events]
        AdminEventId[/api/admin/events/[id]<br/>Single Event CRUD]
    end

    API --> Login
    API --> Register
    API --> Logout
    API --> Me
    API --> GetPosts
    API --> GetPost
    API --> GetEvents
    API --> GetEvent
    API --> GetCategories
    API --> AdminArticles
    API --> AdminArticleId
    API --> AdminEvents
    API --> AdminEventId

    style API fill:#ff9800,color:#fff
    style Login fill:#2196f3,color:#fff
    style Register fill:#2196f3,color:#fff
    style AdminArticles fill:#f44336,color:#fff
    style AdminEvents fill:#f44336,color:#fff
```

---

## Database Schema

```mermaid
erDiagram
    USER ||--o{ ARTICLE : creates
    USER ||--o{ EVENT : creates
    ARTICLE }o--|| CATEGORY : belongs_to
    
    USER {
        ObjectId _id PK
        string email UK
        string password
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }
    
    ARTICLE {
        ObjectId _id PK
        string title
        string slug UK
        string content
        string excerpt
        string coverImage
        ObjectId author FK
        string category
        array tags
        boolean published
        datetime publishedAt
        int views
        datetime createdAt
        datetime updatedAt
    }
    
    EVENT {
        ObjectId _id PK
        string title
        string slug UK
        string description
        string location
        datetime startDate
        datetime endDate
        string organizer
        string registrationUrl
        string image
        array tags
        boolean published
        datetime createdAt
        datetime updatedAt
    }
    
    CATEGORY {
        ObjectId _id PK
        string name UK
        string slug UK
        string description
        string icon
        int order
        datetime createdAt
        datetime updatedAt
    }
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        DevLocal[Local Development<br/>npm run dev]
        DevMongo[MongoDB Local]
    end

    subgraph "Version Control"
        Git[Git Repository<br/>GitHub/GitLab]
    end

    subgraph "CI/CD Pipeline"
        Build[Build Process<br/>npm run build]
        Test[Testing & Linting<br/>npm run lint]
        Deploy[Deployment]
    end

    subgraph "Production Environment"
        Vercel[Vercel Platform<br/>Next.js Hosting]
        MongoAtlas[(MongoDB Atlas<br/>Cloud Database)]
        CDN[Vercel CDN<br/>Static Assets]
    end

    subgraph "External Services"
        Email[Email Service<br/>Newsletter]
        Analytics[Analytics<br/>Optional]
    end

    DevLocal --> Git
    DevLocal -.-> DevMongo
    Git --> Build
    Build --> Test
    Test --> Deploy
    Deploy --> Vercel
    Vercel --> MongoAtlas
    Vercel --> CDN
    Vercel -.-> Email
    Vercel -.-> Analytics

    style Vercel fill:#000,color:#fff
    style MongoAtlas fill:#4caf50,color:#fff
    style Git fill:#f05032,color:#fff
```

---

## Feature Modules

### 1. **Authentication & Authorization**
- JWT-based authentication
- Bcrypt password hashing
- Protected admin routes
- Session management via cookies

### 2. **Content Management**
- Markdown file support (`.md` files in `content/posts/`)
- MongoDB database for dynamic content
- Rich text editor (React Quill) for admin
- Image upload and management

### 3. **Multi-Language Support**
- 10 languages supported
- Language detection and persistence
- Translation system via `lib/translations.js`

### 4. **3D Visualizations**
- Spatial Model Viewer (Three.js/React Three Fiber)
- IDW Volume Calculator (Plotly.js)
- Interactive geological modeling tools

### 5. **SEO Optimization**
- Dynamic metadata generation
- OpenGraph and Twitter cards
- Structured data (JSON-LD)
- Sitemap and robots.txt

### 6. **Admin Panel**
- Dashboard with analytics
- Article management (CRUD)
- Event management (CRUD)
- Settings configuration

---

## Security Measures

```mermaid
graph LR
    subgraph "Security Layers"
        JWT[JWT Authentication]
        Hash[Password Hashing<br/>Bcrypt]
        Env[Environment Variables<br/>.env]
        CORS[CORS Configuration]
        Validation[Input Validation]
    end

    subgraph "Protected Resources"
        AdminRoutes[Admin Routes]
        AdminAPI[Admin API]
        Database[Database Access]
    end

    JWT --> AdminRoutes
    JWT --> AdminAPI
    Hash --> Database
    Env --> Database
    CORS --> AdminAPI
    Validation --> AdminAPI
    Validation --> Database

    style JWT fill:#f44336,color:#fff
    style Hash fill:#f44336,color:#fff
    style Env fill:#ff9800,color:#fff
```

---

## Performance Optimizations

1. **Server Components** - Default to server components in Next.js 14
2. **Dynamic Imports** - Code splitting for 3D components
3. **Image Optimization** - Next.js Image component with lazy loading
4. **MongoDB Caching** - Connection pooling and caching
5. **Static Generation** - Pre-rendered pages where possible
6. **CDN Distribution** - Static assets via Vercel CDN

---

## File Structure Summary

```
📁 catgeouku/
├── 📁 app/              → Next.js App Router (Pages & API Routes)
├── 📁 components/       → Reusable React Components
├── 📁 content/          → Markdown Content Files
├── 📁 lib/              → Utility Libraries & Helpers
├── 📁 public/           → Static Assets
├── 📁 scripts/          → Database Seeding Scripts
├── 📄 .env              → Environment Variables
├── 📄 next.config.js    → Next.js Configuration
├── 📄 tailwind.config.js → Tailwind CSS Configuration
└── 📄 package.json      → Project Dependencies
```

---

## Key Dependencies

| Category | Libraries |
|----------|-----------|
| **Framework** | Next.js 14, React 18 |
| **Database** | MongoDB, Mongoose |
| **Styling** | Tailwind CSS, Framer Motion |
| **3D Graphics** | Three.js, React Three Fiber, Plotly.js |
| **Content** | Gray Matter, Remark, Rehype, KaTeX |
| **Authentication** | JWT, Bcrypt.js |
| **UI Components** | Lucide React, Heroicons, React Quill |
| **Code Highlighting** | Highlight.js |

---

## Environment Setup

Required environment variables in `.env`:

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/catgeouku
JWT_SECRET=your_super_secret_jwt_key_here
NEXT_PUBLIC_SITE_URL=https://catgeoku.com
```

---

## Conclusion

Arsitektur catgeoku dibangun dengan prinsip:
- ✅ **Modular** - Komponen dapat digunakan kembali
- ✅ **Scalable** - Mudah diperluas dengan fitur baru
- ✅ **Secure** - Autentikasi dan autorisasi yang kuat
- ✅ **Performant** - Optimasi di setiap layer
- ✅ **SEO-Friendly** - Metadata dan struktur yang optimal
- ✅ **User-Centric** - Pengalaman pengguna yang modern dan responsif
