import Image from 'next/image'
import Link from 'next/link'
import { Target, Users, Lightbulb, Rocket, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About catgeoku',
  description: 'Learn about catgeoku - Advanced engineering tools and knowledge platform for geological, geophysical, drilling, and petroleum engineers.',
}

const values = [
  {
    icon: Target,
    title: 'Precision & Accuracy',
    description: 'We deliver scientifically accurate tools and content validated by industry experts.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by engineers, for engineers. Your feedback shapes our platform.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Leveraging cutting-edge technologies to solve complex engineering challenges.',
  },
  {
    icon: Rocket,
    title: 'Continuous Learning',
    description: 'Stay ahead with the latest research, techniques, and industry best practices.',
  },
]

const stats = [
  { value: '50,000+', label: 'Engineers Worldwide' },
  { value: '500+', label: 'Technical Articles' },
  { value: '15+', label: 'Interactive Tools' },
  { value: '100+', label: 'Countries Reached' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 dark:from-primary-950 dark:to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              About catgeoku
            </h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto leading-relaxed">
              Empowering engineers with advanced tools and knowledge to tackle 
              the most complex challenges in geological, geophysical, drilling, 
              and petroleum engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-primary-600 dark:text-primary-300 leading-relaxed mb-8">
            To democratize access to professional-grade engineering tools and 
            knowledge, making advanced computational methods and technical insights 
            accessible to engineers worldwide, regardless of their resources or location.
          </p>
          <p className="text-lg text-primary-600 dark:text-primary-300 leading-relaxed">
            We believe that every engineer deserves access to powerful tools that 
            enhance productivity, improve decision-making, and drive innovation in 
            the energy and natural resources sector.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-container bg-primary-50 dark:bg-primary-950">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-300 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="card p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-accent-600 dark:text-accent-400 mb-3">
                {stat.value}
              </div>
              <div className="text-primary-600 dark:text-primary-300 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="section-container bg-primary-50 dark:bg-primary-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 dark:text-white mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-lg text-primary-600 dark:text-primary-300 leading-relaxed">
            <p>
              catgeoku began as a passion project by a group of geoscientists and 
              petroleum engineers who saw a gap in the availability of modern, 
              accessible computational tools for the engineering community.
            </p>
            <p>
              What started as a simple blog sharing code snippets and technical 
              knowledge has evolved into a comprehensive platform serving tens of 
              thousands of engineers across the globe.
            </p>
            <p>
              Today, catgeoku combines cutting-edge web technologies with proven 
              engineering methodologies to deliver interactive tools, educational 
              content, and a vibrant community of professionals pushing the boundaries 
              of what&apos;s possible in our field.
            </p>
            <p>
              We&apos;re just getting started, and we&apos;re excited to have you join us on 
              this journey of continuous learning and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <div className="bg-gradient-to-br from-accent-500 to-accent-700 rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Explore our tools, read our articles, and join thousands of engineers 
            advancing their careers with catgeoku.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://catgeoku-analysis.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Try Our Tools
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </Link>
            <Link href="/blog" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-accent-600">
              Read Articles
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
