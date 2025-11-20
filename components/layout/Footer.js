import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin, Mail, Youtube, ExternalLink } from 'lucide-react'

const footerLinks = {
  categories: [
    { name: 'Geology', href: '/geology' },
    { name: 'Geophysics', href: '/geophysics' },
    { name: 'Drilling Engineering', href: '/drilling-engineering' },
    { name: 'Petroleum Engineering', href: '/petroleum-engineering' },
    { name: 'Science', href: '/science' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  resources: [
    { name: '3D Visualization Tools', href: '/tools/3d-visualization' },
    { name: 'Petrophysics Calculator', href: '/tools/petrophysics' },
    { name: 'Log Quality Control', href: '/tools/log-qc' },
    { name: 'API Documentation', href: '/api-docs' },
  ],
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@catgeoku.com' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 dark:bg-primary-950 text-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/Logo_catgeoku-removebg-preview.png" 
                  alt="catgeoku Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold">
                <span style={{ color: '#1C1C1C', textShadow: '-0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0.5px 0.5px 0 white, -0.5px 0 0 white, 0.5px 0 0 white, 0 -0.5px 0 white, 0 0.5px 0 white' }} className="dark:text-[#1C1C1C]">cat</span>
                <span style={{ color: '#F06927' }} className="dark:text-[#F06927]">geoku</span>
              </span>
            </Link>
            <p className="text-primary-300 mb-6 max-w-md">
              Advanced engineering tools and knowledge platform for geological, geophysical, 
              drilling, and petroleum engineers. Transform your workflow with interactive 
              3D visualizations and comprehensive technical resources.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-primary-800 dark:bg-primary-900 rounded-lg hover:bg-accent-600 transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-primary-300 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-800 dark:border-primary-900">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-400 text-sm">
              © {new Date().getFullYear()} catgeoku. All rights reserved.
            </div>         
          </div>
        </div>
      </div>
    </footer>
  )
}
