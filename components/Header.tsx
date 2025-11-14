'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RPmonitus
          </Link>
          <span className="ml-3 medicare-badge">Medicare Approved</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">
            Benefits
          </Link>
          <Link href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
            FAQ
          </Link>
          <a href="tel:1-800-RPM-CARE" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <PhoneIcon className="h-4 w-4" />
            1-800-RPM-CARE
          </a>
          <Link
            href="/eligibility"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            Check Eligibility
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            <Link href="#how-it-works" className="block px-3 py-2 text-gray-700">
              How It Works
            </Link>
            <Link href="#benefits" className="block px-3 py-2 text-gray-700">
              Benefits
            </Link>
            <Link href="#faq" className="block px-3 py-2 text-gray-700">
              FAQ
            </Link>
            <a href="tel:1-800-RPM-CARE" className="block px-3 py-2 text-gray-700">
              📞 1-800-RPM-CARE
            </a>
            <Link
              href="/eligibility"
              className="block w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-center"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

