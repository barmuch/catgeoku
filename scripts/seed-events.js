// Seed script for events
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catgeouku';

// Connect to MongoDB
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

// Define Event Schema
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  description: { type: String },
  date: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  image: { type: String },
  featuredImage: { type: String },
  tags: [{ type: String }],
  author: { type: String },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date },
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

const sampleEvents = [
  {
    title: 'Geological Data Science Workshop',
    slug: 'geological-data-science-workshop',
    excerpt: 'Learn how to apply machine learning and data science techniques to geological datasets.',
    content: `<h2>About This Workshop</h2>
<p>Join us for an intensive 2-day workshop on applying modern data science techniques to geological data analysis. This hands-on workshop is designed for geoscientists who want to leverage Python and machine learning for their research.</p>

<h3>What You'll Learn</h3>
<ul>
  <li>Python fundamentals for geoscience applications</li>
  <li>Data preprocessing and visualization with pandas and matplotlib</li>
  <li>Machine learning for lithology prediction</li>
  <li>Time series analysis for seismic data</li>
  <li>Clustering techniques for well log correlation</li>
</ul>

<h3>Prerequisites</h3>
<p>Basic understanding of geology and some programming experience (any language) is recommended but not required.</p>

<h3>What to Bring</h3>
<ul>
  <li>Your laptop with Python 3.8+ installed</li>
  <li>Jupyter Notebook or VS Code</li>
  <li>Enthusiasm for learning!</li>
</ul>

<p><strong>Limited seats available. Register early!</strong></p>`,
    date: new Date('2026-02-15T09:00:00'),
    endDate: new Date('2026-02-16T17:00:00'),
    location: 'Jakarta Convention Center, Indonesia',
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    tags: ['workshop', 'data-science', 'machine-learning', 'python'],
    author: 'Dr. Sarah Chen',
    published: true,
    publishedAt: new Date(),
  },
  {
    title: 'Indonesia Petroleum Conference 2026',
    slug: 'indonesia-petroleum-conference-2026',
    excerpt: 'Annual gathering of petroleum geoscientists and engineers to discuss the latest trends and technologies.',
    content: `<h2>IPC 2026: Shaping the Future of Energy</h2>
<p>The Indonesia Petroleum Conference 2026 brings together industry leaders, researchers, and innovators to discuss the evolving landscape of petroleum exploration and production.</p>

<h3>Conference Highlights</h3>
<ul>
  <li><strong>Keynote Speakers:</strong> Industry experts from major oil companies</li>
  <li><strong>Technical Sessions:</strong> Latest research in reservoir characterization, drilling technology, and EOR</li>
  <li><strong>Exhibition:</strong> Cutting-edge technologies and services</li>
  <li><strong>Networking Events:</strong> Connect with peers and potential collaborators</li>
</ul>

<h3>Key Topics</h3>
<ol>
  <li>Carbon Capture and Storage (CCS)</li>
  <li>Digital Transformation in Oil & Gas</li>
  <li>Reservoir Simulation and Modeling</li>
  <li>Unconventional Resources</li>
  <li>Energy Transition Strategies</li>
</ol>

<h3>Who Should Attend</h3>
<p>Geoscientists, petroleum engineers, reservoir engineers, geophysicists, and industry professionals interested in the latest developments in petroleum technology.</p>

<blockquote>
  <p>"IPC is where innovation meets opportunity" - Conference Chair</p>
</blockquote>`,
    date: new Date('2026-03-20T08:00:00'),
    endDate: new Date('2026-03-22T18:00:00'),
    location: 'Shangri-La Hotel, Jakarta',
    featuredImage: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200',
    tags: ['conference', 'petroleum', 'oil-gas', 'networking'],
    author: 'IPC Committee',
    published: true,
    publishedAt: new Date(),
  },
  {
    title: 'Seismic Interpretation Masterclass',
    slug: 'seismic-interpretation-masterclass',
    excerpt: 'Advanced techniques in seismic data interpretation for exploration and production.',
    content: `<h2>Master the Art of Seismic Interpretation</h2>
<p>This intensive 5-day masterclass covers advanced seismic interpretation techniques used by leading oil and gas companies worldwide.</p>

<h3>Course Curriculum</h3>
<h4>Day 1: Fundamentals Review</h4>
<ul>
  <li>Seismic acquisition and processing refresher</li>
  <li>Basic interpretation principles</li>
  <li>Understanding seismic attributes</li>
</ul>

<h4>Day 2-3: Structural Interpretation</h4>
<ul>
  <li>Fault interpretation and mapping</li>
  <li>Horizon picking best practices</li>
  <li>3D visualization techniques</li>
  <li>Depth conversion methods</li>
</ul>

<h4>Day 4: Stratigraphic Interpretation</h4>
<ul>
  <li>Seismic geomorphology</li>
  <li>Sequence stratigraphy from seismic</li>
  <li>Channel and reservoir identification</li>
</ul>

<h4>Day 5: Advanced Topics</h4>
<ul>
  <li>Quantitative interpretation (QI)</li>
  <li>AVO analysis</li>
  <li>Machine learning in seismic interpretation</li>
</ul>

<h3>Instructor</h3>
<p><strong>Dr. Michael Rodriguez</strong> - 25 years of experience in seismic interpretation with Chevron and Shell. Published author of "Modern Seismic Interpretation Techniques".</p>

<p><em>Certificate of completion will be provided.</em></p>`,
    date: new Date('2026-04-10T08:30:00'),
    endDate: new Date('2026-04-14T17:00:00'),
    location: 'Online (Zoom)',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    tags: ['training', 'seismic', 'interpretation', 'geophysics'],
    author: 'GeoTraining Institute',
    published: true,
    publishedAt: new Date(),
  },
  {
    title: 'Reservoir Modeling Symposium',
    slug: 'reservoir-modeling-symposium',
    excerpt: 'Explore the latest advances in reservoir modeling and simulation technologies.',
    content: `<h2>Reservoir Modeling Symposium 2026</h2>
<p>Join reservoir engineers and geoscientists for a day of presentations and discussions on cutting-edge reservoir modeling techniques.</p>

<h3>Program Overview</h3>
<table>
  <tr>
    <th>Time</th>
    <th>Session</th>
  </tr>
  <tr>
    <td>08:00 - 09:00</td>
    <td>Registration & Coffee</td>
  </tr>
  <tr>
    <td>09:00 - 10:30</td>
    <td>Keynote: AI in Reservoir Modeling</td>
  </tr>
  <tr>
    <td>10:30 - 12:00</td>
    <td>Session 1: Geostatistical Methods</td>
  </tr>
  <tr>
    <td>12:00 - 13:00</td>
    <td>Lunch & Networking</td>
  </tr>
  <tr>
    <td>13:00 - 15:00</td>
    <td>Session 2: Uncertainty Quantification</td>
  </tr>
  <tr>
    <td>15:00 - 17:00</td>
    <td>Session 3: Case Studies</td>
  </tr>
</table>

<h3>Featured Presentations</h3>
<ul>
  <li>Deep Learning for Facies Modeling - Dr. Lisa Wang, Stanford University</li>
  <li>Ensemble-based History Matching - Dr. Ahmed Hassan, KAUST</li>
  <li>Integrated Reservoir Characterization - Industry Panel</li>
  <li>Cloud Computing for Large-Scale Simulations - Tech Demo</li>
</ul>

<h3>Why Attend?</h3>
<ol>
  <li>Learn from industry and academic experts</li>
  <li>Network with reservoir modeling professionals</li>
  <li>Discover new software and tools</li>
  <li>Earn CPD credits</li>
</ol>`,
    date: new Date('2026-05-08T08:00:00'),
    endDate: new Date('2026-05-08T18:00:00'),
    location: 'Kuala Lumpur Convention Centre, Malaysia',
    featuredImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200',
    tags: ['symposium', 'reservoir', 'modeling', 'simulation'],
    author: 'SPE Malaysia Section',
    published: true,
    publishedAt: new Date(),
  },
  {
    title: 'Young Professionals Networking Night',
    slug: 'young-professionals-networking-night',
    excerpt: 'An evening of networking for early-career geoscientists and engineers.',
    content: `<h2>Connect, Learn, Grow</h2>
<p>Join fellow young professionals in the geoscience industry for an evening of networking, knowledge sharing, and career development.</p>

<h3>Event Format</h3>
<p>This is an informal networking event designed to help early-career professionals build connections and learn from each other's experiences.</p>

<h3>Activities</h3>
<ul>
  <li><strong>Speed Networking:</strong> Meet as many people as possible in structured 5-minute conversations</li>
  <li><strong>Panel Discussion:</strong> Career paths in geoscience - hear from professionals at different career stages</li>
  <li><strong>Q&A Session:</strong> Ask anything about career development, technical skills, or industry trends</li>
  <li><strong>Open Networking:</strong> Casual conversations over food and drinks</li>
</ul>

<h3>Who Should Come?</h3>
<p>This event is perfect for:</p>
<ul>
  <li>Recent graduates entering the geoscience field</li>
  <li>Professionals with 0-5 years of experience</li>
  <li>Anyone looking to expand their professional network</li>
  <li>Those interested in mentorship opportunities</li>
</ul>

<h3>What to Bring</h3>
<ul>
  <li>Business cards (if you have them)</li>
  <li>Your enthusiasm and curiosity</li>
  <li>Questions for the panel</li>
</ul>

<p><strong>Dress code:</strong> Smart casual</p>
<p><strong>Food & beverages provided</strong></p>

<p><em>Free for YP members, $10 for non-members</em></p>`,
    date: new Date('2026-06-05T18:00:00'),
    endDate: new Date('2026-06-05T21:00:00'),
    location: 'The Social House, Jakarta',
    featuredImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200',
    tags: ['networking', 'young-professionals', 'career', 'social'],
    author: 'AAPG YP Committee',
    published: true,
    publishedAt: new Date(),
  },
  {
    title: 'Field Trip: Geological Mapping in Central Java',
    slug: 'field-trip-geological-mapping-central-java',
    excerpt: 'Hands-on geological mapping experience in the volcanic terrain of Central Java.',
    content: `<h2>Explore Central Java's Geology</h2>
<p>Experience geological mapping first-hand in one of Indonesia's most geologically diverse regions. This 3-day field trip combines theoretical knowledge with practical application.</p>

<h3>Trip Itinerary</h3>

<h4>Day 1: Yogyakarta - Merapi Volcano</h4>
<ul>
  <li>Morning briefing and safety orientation</li>
  <li>Visit to Merapi Volcano Museum</li>
  <li>Observation of recent volcanic deposits</li>
  <li>Stratigraphic section measuring</li>
  <li>Evening: Discussion and data review</li>
</ul>

<h4>Day 2: Sedimentary Formations</h4>
<ul>
  <li>Study of Tertiary sedimentary rocks</li>
  <li>Fossil identification and collection</li>
  <li>Structural geology observations</li>
  <li>Outcrop photography and documentation</li>
  <li>Evening: Group mapping exercise</li>
</ul>

<h4>Day 3: Coastal Geology</h4>
<ul>
  <li>Beach and coastal processes</li>
  <li>Carbonate platforms study</li>
  <li>Final mapping project completion</li>
  <li>Presentation of findings</li>
</ul>

<h3>Learning Objectives</h3>
<ol>
  <li>Master basic geological mapping techniques</li>
  <li>Identify and describe rock types in the field</li>
  <li>Use geological compass and GPS</li>
  <li>Document observations systematically</li>
  <li>Work effectively in field teams</li>
</ol>

<h3>What's Included</h3>
<ul>
  <li>Transportation from Jakarta</li>
  <li>Accommodation (2 nights)</li>
  <li>All meals</li>
  <li>Field equipment (compass, hammer, GPS)</li>
  <li>Geological maps and guidebook</li>
  <li>Professional field geologist guide</li>
</ul>

<h3>What to Bring</h3>
<ul>
  <li>Sturdy hiking boots</li>
  <li>Sun protection (hat, sunscreen)</li>
  <li>Personal field notebook</li>
  <li>Camera</li>
  <li>Personal medications</li>
  <li>Reusable water bottle</li>
</ul>

<p><strong>Physical fitness required:</strong> Moderate hiking involved</p>
<p><strong>Maximum participants:</strong> 20 people</p>`,
    date: new Date('2026-07-15T06:00:00'),
    endDate: new Date('2026-07-17T20:00:00'),
    location: 'Central Java, Indonesia (Depart from Jakarta)',
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    tags: ['field-trip', 'mapping', 'geology', 'indonesia'],
    author: 'Indonesian Geological Society',
    published: true,
    publishedAt: new Date(),
  },
];

async function seedEvents() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert sample events
    const events = await Event.insertMany(sampleEvents);
    console.log(`Successfully seeded ${events.length} events:`);
    events.forEach(event => {
      console.log(`  - ${event.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
}

seedEvents();
