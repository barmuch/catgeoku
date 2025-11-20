import { Calendar, MapPin, Clock, Users, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Engineering Events & Conferences',
  description: 'Join upcoming engineering events, workshops, webinars, and conferences in geology, geophysics, drilling, and petroleum engineering.',
}

const upcomingEvents = [
  {
    id: 1,
    title: 'International Petroleum Technology Conference 2026',
    type: 'Conference',
    date: '2026-02-15',
    dateEnd: '2026-02-17',
    time: '09:00 AM',
    location: 'Bangkok, Thailand',
    locationType: 'In-Person',
    description: 'The premier event bringing together petroleum engineers, geoscientists, and industry leaders to explore cutting-edge technologies and innovations.',
    attendees: '2,500+',
    category: 'Petroleum Engineering',
    featured: true,
    image: '/events/iptc.jpg',
    price: 'Paid'
  },
  {
    id: 2,
    title: 'Geophysical Data Processing Workshop',
    type: 'Workshop',
    date: '2026-01-20',
    dateEnd: '2026-01-22',
    time: '10:00 AM',
    location: 'Houston, TX, USA',
    locationType: 'Hybrid',
    description: 'Hands-on workshop covering advanced seismic data processing techniques, machine learning applications, and modern interpretation workflows.',
    attendees: '150+',
    category: 'Geophysics',
    featured: false,
    image: '/events/geophysics.jpg',
    price: 'Paid'
  },
  {
    id: 3,
    title: '3D Geological Modeling Webinar Series',
    type: 'Webinar',
    date: '2025-12-10',
    dateEnd: '2025-12-10',
    time: '02:00 PM',
    location: 'Online',
    locationType: 'Virtual',
    description: 'Free webinar series exploring modern 3D geological modeling techniques, software tools, and real-world case studies from industry experts.',
    attendees: '500+',
    category: 'Geology',
    featured: false,
    image: '/events/3d-modeling.jpg',
    price: 'Free'
  },
  {
    id: 4,
    title: 'Drilling Automation & Optimization Summit',
    type: 'Conference',
    date: '2026-03-05',
    dateEnd: '2026-03-07',
    time: '08:30 AM',
    location: 'Abu Dhabi, UAE',
    locationType: 'In-Person',
    description: 'Explore the latest in drilling automation, AI-powered optimization, and digital twin technologies transforming the drilling industry.',
    attendees: '1,200+',
    category: 'Drilling Engineering',
    featured: true,
    image: '/events/drilling.jpg',
    price: 'Paid'
  },
  {
    id: 5,
    title: 'Reservoir Simulation Best Practices',
    type: 'Workshop',
    date: '2025-12-28',
    dateEnd: '2025-12-29',
    time: '09:00 AM',
    location: 'Calgary, AB, Canada',
    locationType: 'In-Person',
    description: 'Two-day intensive workshop on reservoir simulation workflows, history matching techniques, and production forecasting methods.',
    attendees: '80+',
    category: 'Petroleum Engineering',
    featured: false,
    image: '/events/reservoir.jpg',
    price: 'Paid'
  },
  {
    id: 6,
    title: 'AI in Petrophysics: Future Perspectives',
    type: 'Webinar',
    date: '2026-01-15',
    dateEnd: '2026-01-15',
    time: '11:00 AM',
    location: 'Online',
    locationType: 'Virtual',
    description: 'Discover how artificial intelligence and machine learning are revolutionizing petrophysical analysis and log interpretation.',
    attendees: '800+',
    category: 'Science',
    featured: false,
    image: '/events/ai-petro.jpg',
    price: 'Free'
  }
]

const eventTypes = [
  { name: 'All Events', count: upcomingEvents.length },
  { name: 'Conference', count: upcomingEvents.filter(e => e.type === 'Conference').length },
  { name: 'Workshop', count: upcomingEvents.filter(e => e.type === 'Workshop').length },
  { name: 'Webinar', count: upcomingEvents.filter(e => e.type === 'Webinar').length },
]

function formatDate(dateString, endDateString) {
  const start = new Date(dateString)
  const end = new Date(endDateString)
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  
  if (dateString === endDateString) {
    return start.toLocaleDateString('en-US', options)
  }
  
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`
}

function getEventStatus(dateString) {
  const eventDate = new Date(dateString)
  const today = new Date()
  const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return { text: 'Past', color: 'text-gray-500' }
  if (diffDays <= 7) return { text: 'This Week', color: 'text-red-600' }
  if (diffDays <= 30) return { text: 'This Month', color: 'text-orange-600' }
  return { text: 'Upcoming', color: 'text-green-600' }
}

export default function EventsPage() {
  const featuredEvent = upcomingEvents.find(e => e.featured) || upcomingEvents[0]
  const regularEvents = upcomingEvents.filter(e => e.id !== featuredEvent.id)

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-accent-600 dark:text-accent-400 mr-2" />
            <span className="text-sm font-semibold text-accent-700 dark:text-accent-300">
              Engineering Events & Conferences
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900 dark:from-primary-50 dark:via-accent-400 dark:to-primary-50 bg-clip-text text-transparent">
              Connect, Learn & Grow
            </span>
          </h1>
          
          <p className="text-xl text-primary-600 dark:text-primary-300 max-w-3xl mx-auto">
            Join industry-leading conferences, workshops, and webinars to stay ahead in geological, geophysical, drilling, and petroleum engineering.
          </p>
        </div>
      </section>

      {/* Event Type Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-primary-200 dark:border-primary-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {eventTypes.map((type) => (
              <button
                key={type.name}
                className="px-6 py-3 rounded-full bg-white dark:bg-primary-800 border-2 border-primary-200 dark:border-primary-700 hover:border-accent-500 dark:hover:border-accent-500 transition-all duration-300 group"
              >
                <span className="font-semibold text-primary-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400">
                  {type.name}
                </span>
                <span className="ml-2 text-sm text-primary-500 dark:text-primary-400">
                  ({type.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-accent-500 mr-4 rounded-full"></span>
            Featured Event
          </h2>
          
          <div className="relative card-hover overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-900/20 dark:from-accent-500/10 dark:to-primary-900/10"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge bg-accent-500 text-white">
                      {featuredEvent.type}
                    </span>
                    <span className="badge bg-primary-200 dark:bg-primary-700 text-primary-900 dark:text-white">
                      {featuredEvent.locationType}
                    </span>
                    <span className={`badge ${getEventStatus(featuredEvent.date).color} bg-opacity-10`}>
                      {getEventStatus(featuredEvent.date).text}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white mb-4">
                    {featuredEvent.title}
                  </h3>
                  
                  <p className="text-lg text-primary-600 dark:text-primary-300 mb-6">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <Calendar className="w-5 h-5 mr-3 text-accent-500" />
                      <span className="font-medium">
                        {formatDate(featuredEvent.date, featuredEvent.dateEnd)}
                      </span>
                    </div>
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <Clock className="w-5 h-5 mr-3 text-accent-500" />
                      <span className="font-medium">{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <MapPin className="w-5 h-5 mr-3 text-accent-500" />
                      <span className="font-medium">{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <Users className="w-5 h-5 mr-3 text-accent-500" />
                      <span className="font-medium">{featuredEvent.attendees} Expected Attendees</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/events/${featuredEvent.id}`}
                      className="btn-primary inline-flex items-center group"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="btn-outline">
                      Add to Calendar
                    </button>
                  </div>
                </div>
                
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-500 to-primary-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-32 h-32 text-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50/50 dark:bg-primary-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-primary-900 dark:text-white mb-8 flex items-center">
            <span className="w-1 h-8 bg-accent-500 mr-4 rounded-full"></span>
            Upcoming Events
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event) => (
              <div key={event.id} className="card-hover group">
                {/* Event Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-accent-500 to-primary-900 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/30" />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge bg-white/90 text-primary-900">
                      {event.type}
                    </span>
                    {event.price === 'Free' && (
                      <span className="badge bg-green-500 text-white">
                        Free
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-accent-500" />
                    <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-primary-600 dark:text-primary-300 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <Calendar className="w-4 h-4 mr-2 text-accent-500" />
                      <span>{formatDate(event.date, event.dateEnd)}</span>
                    </div>
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <MapPin className="w-4 h-4 mr-2 text-accent-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-primary-700 dark:text-primary-200">
                      <Users className="w-4 h-4 mr-2 text-accent-500" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center text-accent-600 dark:text-accent-400 font-semibold hover:gap-2 transition-all group"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-12 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-800/20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-lg text-primary-600 dark:text-primary-300 mb-8">
              Partner with catgeoku to reach thousands of engineering professionals worldwide.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center group">
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
