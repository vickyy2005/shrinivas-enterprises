'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/BrandLogo'

export function Header({ onOpenRfq }: { onOpenRfq?: () => void }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf6f0]/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-[#e8ded1]/80 shadow-[0_8px_32px_0_rgba(42,27,20,0.06)]'
          : 'bg-[#fcfaf7]/85 backdrop-blur-xl backdrop-saturate-150 border-b border-[#eee5d8]/80 shadow-[0_4px_20px_0_rgba(42,27,20,0.03)]'
      }`}
    >
      {/* Subtle Specular Top Glass Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <BrandLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors py-1 ${
                  active
                    ? 'text-[#85532a] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#85532a] after:rounded-full'
                    : 'text-[#2e2119] hover:text-[#85532a]'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Header Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRfq}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#2a1b14] via-[#3a251b] to-[#2a1b14] hover:from-[#1b110c] hover:to-[#2b1911] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#2a1b14]/25 hover:shadow-lg hover:shadow-[#2a1b14]/35 border border-[#85532a]/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Request B2B Quote</span>
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-[#2e2119] hover:bg-[#f3ece2] backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown with Frosted Glassmorphism */}
      {mobileOpen && (
        <div className="md:hidden bg-[#faf6f0]/95 backdrop-blur-2xl border-b border-[#e8ded1] px-5 py-4 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#f3ede3] text-[#85532a] border border-[#e2d5c3] font-bold'
                    : 'text-[#2e2119] hover:bg-[#f3ede3]/60 hover:text-[#85532a]'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileOpen(false)
                if (onOpenRfq) onOpenRfq()
              }}
              className="w-full text-center bg-gradient-to-r from-[#2a1b14] to-[#422c20] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#2a1b14]/25 cursor-pointer"
            >
              Request B2B Quote &gt;
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
