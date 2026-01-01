import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catgeouku';

// Define schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  category: { type: String },
  tags: [{ type: String }],
  author: { type: String },
  published: { type: Boolean, default: false },
  featuredImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

// Seed data
const categories = [
  {
    name: 'Geology',
    slug: 'geology',
    description: 'Explore the fundamentals of geological engineering, earth sciences, structural analysis, and mineralogy.',
    icon: '🪨'
  },
  {
    name: 'Geophysics',
    slug: 'geophysics',
    description: 'Seismic analysis, electromagnetic methods, gravity surveys, and advanced geophysical data interpretation.',
    icon: '🌊'
  },
  {
    name: 'Drilling Engineering',
    slug: 'drilling-engineering',
    description: 'Drilling operations, well planning, completion techniques, and drilling optimization strategies.',
    icon: '⚙️'
  },
  {
    name: 'Petroleum Engineering',
    slug: 'petroleum-engineering',
    description: 'Reservoir engineering, production optimization, enhanced oil recovery, and field development.',
    icon: '🛢️'
  },
  {
    name: 'Science',
    slug: 'science',
    description: 'Scientific research, discoveries, interdisciplinary studies, and emerging technologies.',
    icon: '🔬'
  },
];

const articles = [
  // Geology Articles
  {
    title: '3D Geological Modeling with Python',
    slug: '3d-geological-modeling-python',
    excerpt: 'Learn how to create stunning 3D geological models using Python libraries like PyVista, Matplotlib, and NumPy.',
    content: `# 3D Geological Modeling with Python

## Introduction

3D geological modeling is a crucial skill for modern geologists and engineers. This comprehensive guide will walk you through creating interactive 3D models using Python.

## Why Python for Geological Modeling?

Python has become the go-to language for geological modeling due to its:

- **Rich ecosystem** of scientific libraries
- **Easy integration** with existing tools
- **Powerful visualization** capabilities
- **Open-source** nature

## Essential Libraries

### PyVista

PyVista is a powerful 3D plotting and mesh analysis library:

\`\`\`python
import pyvista as pv
import numpy as np

# Create a simple surface
x = np.arange(-10, 10, 0.5)
y = np.arange(-10, 10, 0.5)
x, y = np.meshgrid(x, y)
z = np.sin(np.sqrt(x**2 + y**2))

# Create mesh
grid = pv.StructuredGrid(x, y, z)
grid.plot()
\`\`\`

### Matplotlib 3D

For basic 3D visualization:

\`\`\`python
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x, y, z, c=z, cmap='viridis')
plt.show()
\`\`\`

## Advanced Techniques

### Stratigraphic Modeling

Create layered geological models:

\`\`\`python
def create_stratigraphy(layers, thickness):
    model = []
    z_base = 0
    
    for i, layer in enumerate(layers):
        z_top = z_base + thickness[i]
        model.append({
            'name': layer,
            'z_base': z_base,
            'z_top': z_top
        })
        z_base = z_top
    
    return model
\`\`\`

## Conclusion

Python provides powerful tools for 3D geological modeling. Start with basic visualizations and progressively add complexity to your models.`,
    category: 'Geology',
    tags: ['Python', 'Modeling', 'Visualization', '3D'],
    author: 'Dr. Sarah Johnson',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
    publishedAt: new Date('2025-12-15')
  },
  {
    title: 'Structural Geology Field Methods',
    slug: 'structural-geology-field-methods',
    excerpt: 'Master the essential field techniques for structural geology mapping and analysis.',
    content: `# Structural Geology Field Methods

## Introduction

Field work is the foundation of structural geology. This guide covers essential techniques for mapping and analyzing geological structures.

## Equipment Checklist

- Brunton compass
- Field notebook
- Geological hammer
- Hand lens
- GPS device
- Camera

## Measuring Strike and Dip

The strike and dip are fundamental measurements in structural geology:

1. Place compass on bedding plane
2. Level the compass
3. Read strike direction
4. Measure dip angle

## Fold Analysis

### Types of Folds

- Anticlines
- Synclines
- Monoclines
- Chevron folds

## Data Collection

Record detailed observations:

\`\`\`
Station: ST-001
Location: N 45°32'15" W 122°15'30"
Strike/Dip: N45E/30SE
Rock Type: Sandstone
Notes: Well-bedded, crossbedding visible
\`\`\`

## Conclusion

Systematic field measurements are crucial for understanding structural geology.`,
    category: 'Geology',
    tags: ['Field Work', 'Structural Geology', 'Mapping'],
    author: 'Prof. Michael Chen',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=1200',
    publishedAt: new Date('2025-12-10')
  },
  
  // Geophysics Articles
  {
    title: 'Seismic Interpretation Guide',
    slug: 'seismic-interpretation-guide',
    excerpt: 'A comprehensive guide to interpreting seismic data for oil and gas exploration.',
    content: `# Seismic Interpretation Guide

## Introduction to Seismic Data

Seismic interpretation is the art and science of extracting geological information from seismic reflection data.

## Basic Principles

### Seismic Waves

- **P-waves**: Primary compression waves
- **S-waves**: Secondary shear waves
- **Surface waves**: Travel along Earth's surface

## Seismic Resolution

The ability to distinguish between two features:

$$\\Delta t = \\frac{1}{2f}$$

Where:
- $\\Delta t$ is the minimum resolvable time
- $f$ is the dominant frequency

## Interpretation Workflow

1. **Data Quality Check**
2. **Horizon Picking**
3. **Fault Identification**
4. **Velocity Analysis**
5. **Depth Conversion**

## Horizon Picking

\`\`\`python
import numpy as np
from scipy.signal import hilbert

def calculate_envelope(trace):
    analytic_signal = hilbert(trace)
    envelope = np.abs(analytic_signal)
    return envelope
\`\`\`

## Seismic Attributes

Common attributes for interpretation:

- Amplitude
- Frequency
- Phase
- Coherence

## Best Practices

1. Work from large to small scale
2. Integrate with well data
3. Use multiple attributes
4. Quality control at each step

## Conclusion

Seismic interpretation requires practice and geological understanding.`,
    category: 'Geophysics',
    tags: ['Seismic', 'Interpretation', 'Oil & Gas'],
    author: 'Dr. Emily Rodriguez',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
    publishedAt: new Date('2025-12-12')
  },
  {
    title: 'Gravity and Magnetic Surveys',
    slug: 'gravity-magnetic-surveys',
    excerpt: 'Understanding gravity and magnetic survey methods for subsurface exploration.',
    content: `# Gravity and Magnetic Surveys

## Introduction

Gravity and magnetic surveys are passive geophysical methods used to map subsurface structures.

## Gravity Surveys

### Principle

Measures variations in Earth's gravitational field caused by density contrasts.

### Bouguer Anomaly

$$g_B = g_{obs} - g_n + \\delta g_{FA} - \\delta g_B + \\delta g_T$$

## Magnetic Surveys

Detects variations in Earth's magnetic field.

### Applications

- Basement mapping
- Mineral exploration
- Archaeological surveys

## Data Processing

\`\`\`python
def apply_reduction_to_pole(data, inclination, declination):
    # RTP transformation
    rtp_data = fft_rtp(data, inclination, declination)
    return rtp_data
\`\`\`

## Interpretation

Combine with other geophysical data for comprehensive understanding.`,
    category: 'Geophysics',
    tags: ['Gravity', 'Magnetic', 'Survey', 'Geophysics'],
    author: 'Dr. James Wilson',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    publishedAt: new Date('2025-12-08')
  },

  // Drilling Engineering Articles
  {
    title: 'Well Control Fundamentals',
    slug: 'well-control-fundamentals',
    excerpt: 'Essential principles and practices for maintaining well control during drilling operations.',
    content: `# Well Control Fundamentals

## Introduction

Well control is the most critical aspect of drilling operations. This guide covers essential concepts and procedures.

## Basic Principles

### Primary Well Control

Maintaining hydrostatic pressure greater than formation pressure:

$$P_h = 0.052 \\times MW \\times TVD$$

Where:
- $P_h$ = Hydrostatic pressure (psi)
- $MW$ = Mud weight (ppg)
- $TVD$ = True vertical depth (ft)

## Kick Detection

Early warning signs:

1. **Flow rate increase**
2. **Pit volume gain**
3. **Pump pressure decrease**
4. **Rate of penetration increase**

## Well Control Equipment

### Blowout Preventer (BOP) Stack

\`\`\`
Surface BOP Stack Components:
├── Annular preventer
├── Upper pipe rams
├── Middle pipe rams
├── Blind/shear rams
└── Lower pipe rams
\`\`\`

## Shut-in Procedures

### Driller's Method

1. Shut in the well
2. Record SIDPP and SICP
3. Calculate kill mud weight
4. Circulate kick out

\`\`\`python
def calculate_kill_mud_weight(original_mw, sidpp, tvd):
    kick_gradient = sidpp / (0.052 * tvd)
    kill_mw = original_mw + kick_gradient
    return kill_mw
\`\`\`

## Best Practices

- Regular BOP testing
- Crew training and drills
- Proper mud weight monitoring
- Maintain well control equipment

## Conclusion

Well control is non-negotiable in drilling operations. Proper training and procedures save lives.`,
    category: 'Drilling Engineering',
    tags: ['Well Control', 'Safety', 'Drilling', 'BOP'],
    author: 'John Anderson',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1504203700686-f21e703e5f1c?w=1200',
    publishedAt: new Date('2025-12-14')
  },
  {
    title: 'Directional Drilling Techniques',
    slug: 'directional-drilling-techniques',
    excerpt: 'Advanced techniques for planning and executing directional wells.',
    content: `# Directional Drilling Techniques

## Introduction

Directional drilling enables access to reservoirs not directly beneath the rig.

## Well Planning

### Build Rate Calculation

$$BR = \\frac{\\Delta I}{MD}$$

Where:
- BR = Build rate (°/100ft)
- ΔI = Inclination change
- MD = Measured depth interval

## Survey Calculations

### Minimum Curvature Method

Most accurate survey calculation method:

\`\`\`python
import numpy as np

def minimum_curvature(md1, inc1, azi1, md2, inc2, azi2):
    dl = np.sqrt((inc2-inc1)**2 + (np.sin(inc1)*(azi2-azi1))**2)
    rf = 2/dl * np.tan(dl/2)
    
    north = (md2-md1)/2 * (np.sin(inc1)*np.cos(azi1) + 
                           np.sin(inc2)*np.cos(azi2)) * rf
    east = (md2-md1)/2 * (np.sin(inc1)*np.sin(azi1) + 
                          np.sin(inc2)*np.sin(azi2)) * rf
    tvd = (md2-md1)/2 * (np.cos(inc1) + np.cos(inc2)) * rf
    
    return north, east, tvd
\`\`\`

## Bottomhole Assembly (BHA)

Common directional BHA configurations:

1. **Build Assembly**
   - Mud motor + bent sub
   - Rotary steerable system

2. **Hold Assembly**
   - Stabilizers
   - Pendulum effect

## Measurement While Drilling (MWD)

Real-time data transmission:

- Inclination
- Azimuth
- Tool face
- Gamma ray

## Conclusion

Directional drilling requires careful planning and execution.`,
    category: 'Drilling Engineering',
    tags: ['Directional Drilling', 'Well Planning', 'MWD'],
    author: 'Robert Martinez',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200',
    publishedAt: new Date('2025-12-11')
  },

  // Petroleum Engineering Articles
  {
    title: 'Reservoir Simulation Best Practices',
    slug: 'reservoir-simulation-best-practices',
    excerpt: 'Guidelines for building accurate and efficient reservoir simulation models.',
    content: `# Reservoir Simulation Best Practices

## Introduction

Reservoir simulation is a powerful tool for predicting reservoir performance and optimizing production strategies.

## Model Building Workflow

1. **Data Gathering**
2. **Geological Modeling**
3. **Grid Design**
4. **Property Distribution**
5. **Fluid Characterization**
6. **History Matching**
7. **Prediction**

## Grid Design

### Grid Types

- **Cartesian**: Simple, fast
- **Corner-point**: Flexible for faults
- **Unstructured**: Complex geometries

### Grid Refinement

\`\`\`python
def calculate_grid_size(reservoir_length, min_cell_size):
    nx = int(reservoir_length / min_cell_size)
    return nx
\`\`\`

## Property Distribution

### Permeability Modeling

Using geostatistical methods:

$$k = k_0 \\times e^{\\phi \\times c}$$

## Fluid Characterization

### Black Oil Model

Three-phase system:
- Oil
- Water  
- Gas

### Compositional Model

For gas condensate and volatile oil:

\`\`\`
Components:
├── C1 (Methane)
├── C2-C3 (Ethane-Propane)
├── C4-C6 (Butane-Hexane)
└── C7+ (Heptane plus)
\`\`\`

## History Matching

Adjust uncertain parameters:

1. Permeability distribution
2. Fault transmissibility
3. Relative permeability
4. Aquifer strength

## Performance Metrics

$$R^2 = 1 - \\frac{\\sum(y_i - \\hat{y}_i)^2}{\\sum(y_i - \\bar{y})^2}$$

## Conclusion

Good simulation requires integration of geology, engineering, and quality data.`,
    category: 'Petroleum Engineering',
    tags: ['Reservoir Simulation', 'Modeling', 'Production'],
    author: 'Dr. Lisa Thompson',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1200',
    publishedAt: new Date('2025-12-13')
  },
  {
    title: 'Enhanced Oil Recovery Methods',
    slug: 'enhanced-oil-recovery-methods',
    excerpt: 'Comprehensive overview of EOR techniques to maximize reservoir recovery.',
    content: `# Enhanced Oil Recovery Methods

## Introduction

Enhanced Oil Recovery (EOR) extends the productive life of oil fields beyond primary and secondary recovery.

## Recovery Stages

1. **Primary Recovery**: 5-15%
2. **Secondary Recovery**: 15-30%
3. **Tertiary Recovery (EOR)**: 30-60%

## EOR Methods

### Thermal Methods

#### Steam Injection

$$\\eta = \\frac{Q_{steam}}{Q_{oil}}$$

\`\`\`python
def calculate_steam_oil_ratio(steam_rate, oil_rate):
    sor = steam_rate / oil_rate
    return sor
\`\`\`

### Chemical Methods

- Polymer flooding
- Surfactant flooding
- Alkaline flooding

### Gas Injection

- CO₂ flooding
- Nitrogen injection
- Hydrocarbon gas injection

## Screening Criteria

| Method | Oil Gravity | Viscosity | Depth |
|--------|-------------|-----------|-------|
| Steam | 10-25 °API | >100 cp | <3000 ft |
| CO₂ | >25 °API | <10 cp | >2500 ft |
| Polymer | 20-35 °API | <100 cp | <9000 ft |

## Economic Evaluation

Net Present Value (NPV):

$$NPV = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t}$$

## Conclusion

Selecting the right EOR method requires detailed reservoir characterization.`,
    category: 'Petroleum Engineering',
    tags: ['EOR', 'Recovery', 'Production Optimization'],
    author: 'Dr. Ahmed Hassan',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    publishedAt: new Date('2025-12-09')
  },

  // Science Articles
  {
    title: 'Machine Learning in Petrophysics',
    slug: 'machine-learning-petrophysics',
    excerpt: 'Applying machine learning algorithms to petrophysical analysis and formation evaluation.',
    content: `# Machine Learning in Petrophysics

## Introduction

Machine learning is revolutionizing petrophysics by enabling automated analysis and prediction of rock properties.

## Applications

1. **Lithology Classification**
2. **Porosity Prediction**
3. **Permeability Estimation**
4. **Formation Evaluation**

## Data Preparation

### Feature Engineering

\`\`\`python
import pandas as pd
import numpy as np

def prepare_well_log_data(df):
    # Normalize logs
    df['GR_norm'] = (df['GR'] - df['GR'].min()) / (df['GR'].max() - df['GR'].min())
    
    # Create derived features
    df['NPHI_RHOB'] = df['NPHI'] * df['RHOB']
    df['DT_GR'] = df['DT'] / df['GR']
    
    return df
\`\`\`

## Classification Models

### Random Forest

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Train model
rf_model = RandomForestClassifier(n_estimators=100)
rf_model.fit(X_train, y_train)

# Predict
predictions = rf_model.predict(X_test)
\`\`\`

### Neural Networks

Deep learning for complex patterns:

\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])
\`\`\`

## Regression Models

### Porosity Prediction

$$\\phi = f(GR, RHOB, NPHI, DT)$$

## Model Evaluation

Metrics:
- Accuracy
- Precision
- Recall
- F1-Score
- R² Score

## Best Practices

1. Quality control input data
2. Use cross-validation
3. Feature selection
4. Hyperparameter tuning
5. Validate with blind wells

## Conclusion

ML in petrophysics improves efficiency and accuracy in formation evaluation.`,
    category: 'Science',
    tags: ['Machine Learning', 'Petrophysics', 'AI', 'Data Science'],
    author: 'Dr. Maria Garcia',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1200',
    publishedAt: new Date('2025-12-07')
  },
  {
    title: 'Carbon Capture and Storage',
    slug: 'carbon-capture-storage',
    excerpt: 'Understanding CCS technology for reducing greenhouse gas emissions.',
    content: `# Carbon Capture and Storage

## Introduction

Carbon Capture and Storage (CCS) is a critical technology for mitigating climate change.

## CCS Chain

1. **Capture**: Separate CO₂ from emission sources
2. **Transport**: Pipeline or ship
3. **Storage**: Underground geological formations

## Capture Technologies

### Post-Combustion

Most mature technology:

- Chemical absorption
- Physical adsorption
- Membrane separation

### Pre-Combustion

Gasification before combustion.

### Oxy-Fuel Combustion

Burn fuel in pure oxygen.

## Storage Options

### Geological Storage

- Depleted oil and gas reservoirs
- Deep saline aquifers
- Unmineable coal seams

### Capacity Calculation

$$M_{CO_2} = A \\times h \\times \\phi \\times \\rho_{CO_2} \\times E$$

## Monitoring

\`\`\`python
def calculate_storage_capacity(area, thickness, porosity, density, efficiency):
    capacity = area * thickness * porosity * density * efficiency
    return capacity
\`\`\`

## Environmental Impact

Benefits:
- Reduce emissions
- Utilize existing infrastructure
- Enable continued fossil fuel use during transition

## Global Projects

Leading CCS projects worldwide:
- Sleipner (Norway)
- Boundary Dam (Canada)
- Gorgon (Australia)

## Conclusion

CCS is essential for achieving net-zero emissions targets.`,
    category: 'Science',
    tags: ['CCS', 'Climate Change', 'Sustainability', 'Environment'],
    author: 'Dr. David Brown',
    published: true,
    featuredImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200',
    publishedAt: new Date('2025-12-06')
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Article.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      username: 'admin',
      email: 'admin@catgeoku.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Admin user created:', admin.email);

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create category map for reference
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Assign categoryId to articles
    console.log('📝 Creating articles...');
    const articlesWithCategoryId = articles.map(article => {
      const categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
      return {
        ...article,
        categoryId: categoryMap[categorySlug]
      };
    });

    const createdArticles = await Article.insertMany(articlesWithCategoryId);
    console.log(`✅ Created ${createdArticles.length} articles`);

    // Summary
    console.log('\n📊 Seeding Summary:');
    console.log('==================');
    console.log(`Users: 1`);
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Articles: ${createdArticles.length}`);
    console.log('\n✨ Database seeded successfully!');
    console.log('\n🔐 Admin Credentials:');
    console.log('Email: admin@catgeoku.com');
    console.log('Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
