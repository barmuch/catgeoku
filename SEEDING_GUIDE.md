# 🌱 Database Seeding Guide

## Quick Start

Populate your database with sample data in one command:

```bash
npm run seed
```

## What Gets Created

### 👤 Users (1)
- **Admin User**
  - Email: `admin@catgeoku.com`
  - Password: `admin123`
  - Role: `admin`

### 📁 Categories (5)
1. **Geology** 🪨 - Earth sciences and structural analysis
2. **Geophysics** 🌊 - Seismic and geophysical methods
3. **Drilling Engineering** ⚙️ - Drilling operations and techniques
4. **Petroleum Engineering** 🛢️ - Reservoir and production engineering
5. **Science** 🔬 - Research and emerging technologies

### 📝 Articles (10)

#### Geology (2)
- 3D Geological Modeling with Python
- Structural Geology Field Methods

#### Geophysics (2)
- Seismic Interpretation Guide
- Gravity and Magnetic Surveys

#### Drilling Engineering (2)
- Well Control Fundamentals
- Directional Drilling Techniques

#### Petroleum Engineering (2)
- Reservoir Simulation Best Practices
- Enhanced Oil Recovery Methods

#### Science (2)
- Machine Learning in Petrophysics
- Carbon Capture and Storage

## Verification

### Check Homepage
Visit `http://localhost:3000` - you should see 6 latest articles

### Check Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Login with admin@catgeoku.com / admin123
3. Navigate to Articles - you should see all 10 articles

### Check Categories
Visit category pages:
- `/geology`
- `/geophysics`
- `/drilling-engineering`
- `/petroleum-engineering`
- `/science`

Each should show 2 articles

## Re-seeding

To clear and re-seed the database:

```bash
npm run seed
```

⚠️ **Warning:** This will delete ALL existing data!

## Custom Seed Data

Edit `scripts/seed-mongodb.js` to customize:
- Add more articles
- Change categories
- Modify admin credentials
- Add more users

## Troubleshooting

### Connection Error
```
Error: MongooseError: Can't call `openUri()` on an active connection
```
**Solution:** Make sure MONGODB_URI in .env is correct

### Duplicate Key Error
```
Error: E11000 duplicate key error
```
**Solution:** Database already has data. Run seed again to clear and re-populate.

### Permission Error
```
Error: User is not authorized
```
**Solution:** Check MongoDB user permissions in Atlas

## Manual Database Access

### Using MongoDB Compass
1. Download MongoDB Compass
2. Connect using your MONGODB_URI
3. Browse collections: users, articles, categories

### Using MongoDB Shell
```bash
mongosh "your-mongodb-uri"
use catgeoku
db.articles.find().pretty()
db.categories.find().pretty()
```

---

**Ready to go!** Your database is now populated with sample content.
