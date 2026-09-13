import React from 'react'
import Image from 'next/image'

export function BrandLogo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-[#c29b38]/60 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white">
        <Image
          src="/shrinivas-logo.png"
          alt="ShriNivas Enterprises Emblem Logo"
          fill
          className="object-contain p-0.5"
          priority
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className={`font-extrabold text-[1.15rem] md:text-[1.25rem] tracking-tight leading-none transition-colors ${
          dark ? 'text-white group-hover:text-amber-300' : 'text-[#231b14] group-hover:text-[#85532a]'
        }`}>
          SHRINIVAS ENTERPRISES
        </span>
        <span className={`text-[0.72rem] md:text-[0.78rem] font-semibold tracking-normal mt-1 leading-none ${
          dark ? 'text-amber-400' : 'text-[#85532a]'
        }`}>
          Heat Sinks &amp; Industrial Solutions
        </span>
      </div>
    </div>
  )
}
