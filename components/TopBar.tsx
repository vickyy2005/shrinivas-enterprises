import React from 'react'
import Link from 'next/link'
import { Phone, Mail, ShieldCheck } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-[#1f1712] text-[#d6c7ba] text-xs py-2 px-4 border-b border-[#30241c]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Contact Info */}
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href="tel:+918286644929"
            className="flex items-center gap-2 hover:text-amber-300 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>+91 82866 44929</span>
          </a>
          <a
            href="mailto:sales@shrinivasenterprises.in"
            className="flex items-center gap-2 hover:text-amber-300 transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>sales@shrinivasenterprises.in</span>
          </a>
        </div>

        {/* Right Working Hours & Admin Link */}
        <div className="flex items-center gap-4 text-[#ab9b8e] text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Mon - Sun: 9:00 AM - 7:00 PM (IST)</span>
          </div>

          <span className="text-[#453428] hidden sm:inline">•</span>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[#ab9b8e] hover:text-amber-300 transition-colors font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
