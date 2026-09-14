'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react'
import { BrandLogo } from '@/components/BrandLogo'

export function Footer({ onOpenRfq }: { onOpenRfq?: () => void }) {
  return (
    <footer id="contact" className="bg-gradient-to-b from-[#1c1511] via-[#140e0b] to-[#0a0705] text-[#d6c7bc] text-xs pt-16 pb-12 border-t border-[#3a281d] relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-[#36271c]">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <BrandLogo dark />
            </Link>

            <p className="text-[#c7b7aa] text-xs sm:text-[13px] leading-relaxed max-w-md mt-3">
              ShriNivas Enterprises is your trusted B2B manufacturer and distributor for High-Efficiency Heat Sinks, 310 SS Perforated Flasks, and complete industrial piping systems across India. Certified for Dombivli precision engineering.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 bg-[#281c15] border border-[#523927] text-amber-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Established 2007 • Trade India Verified Supplier</span>
              </span>
            </div>
          </div>

          {/* Column 2: PRODUCTS */}
          <div>
            <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-amber-500/20 inline-block">
              OUR PRODUCT CATEGORIES
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] font-medium">
              <li>
                <Link href="/products" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Heat Sink Profiles</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Perforated Flasks</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Stainless Steel Flasks</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Foundry Equipment &amp; Pipes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div>
            <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-amber-500/20 inline-block">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] font-medium">
              <li>
                <Link href="/" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>About ShriNivas</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 hover:translate-x-1">
                  <ArrowRight className="w-3 h-3 text-amber-400/70" />
                  <span>Contact Facility</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenRfq}
                  className="text-amber-300 hover:text-amber-200 font-bold transition-all flex items-center gap-1.5 hover:translate-x-1 cursor-pointer text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Request Wholesale Quote</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div>
            <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-4 pb-1.5 border-b border-amber-500/20 inline-block">
              DIRECT B2B CONTACT
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-[13px]">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-2xs">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <a href="tel:+918286644929" className="text-slate-100 font-bold hover:text-amber-300 transition-colors">
                  +91 82866 44929
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-2xs">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:sales@shrinivasenterprises.in" className="text-slate-200 hover:text-amber-300 transition-colors font-medium break-all">
                  sales@shrinivasenterprises.in
                </a>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-2xs">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-[#c7b7aa] leading-relaxed">
                  R.K. Apt., C-Bldg., A-201, Talav Road, Bhayandar East, Dist Thane - 401105, Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Certification Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#a39284] text-[11px] sm:text-xs">
          <p className="font-medium">&copy; {new Date().getFullYear()} ShriNivas Enterprises. All rights reserved.</p>
          <div className="flex items-center gap-3.5 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISO 9001:2015 B2B Manufacturer &amp; Supplier</span>
            </span>
            <span className="text-[#48372b] hidden sm:inline">•</span>
            <Link
              href="/admin"
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-400"
            >
              Staff Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
