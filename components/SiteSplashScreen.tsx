'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export function SiteSplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [stage, setStage] = useState(0) // 0: start, 1: logo, 2: text, 3: exit
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Stage 1: Logo appears
    const timer1 = setTimeout(() => setStage(1), 100)

    // Stage 2: Text appears
    const timer2 = setTimeout(() => setStage(2), 650)

    // Smooth progress bar fill
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 4
      })
    }, 40)

    // Stage 3: Begin fade out screen
    const timer3 = setTimeout(() => setStage(3), 2100)

    // Stage 4: Unmount completely from DOM
    const timer4 = setTimeout(() => setIsVisible(false), 2700)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#140d08] text-white select-none overflow-hidden transition-all duration-700 ease-out ${
        stage === 3 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* LOGO WRAPPER */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            stage >= 1
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-75 translate-y-4'
          }`}
        >
          {/* Outer glowing ring animation */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-amber-600/30 blur-md animate-spin-slow" />
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#1e150e] border-2 border-[#d4af37]/80 shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center justify-center overflow-hidden p-1.5">
            <Image
              src="/shrinivas-logo.png"
              alt="ShriNivas Enterprises Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </div>

        {/* TEXT WRAPPER */}
        <div
          className={`mt-6 sm:mt-8 flex flex-col items-center transition-all duration-700 ease-out ${
            stage >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Brand Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-[#ffffff] via-[#fce6ca] to-[#e6b87d] bg-clip-text text-transparent drop-shadow-md">
            ShriNivas Enterprises
          </h1>

          {/* Tagline */}
          <p className="mt-2.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d6b794] flex items-center gap-2">
            <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#d6b794]" />
            <span>Heat Sinks &amp; Industrial Solutions</span>
            <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#d6b794]" />
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div
          className={`mt-10 w-48 sm:w-64 h-1 bg-[#2e2117] rounded-full overflow-hidden p-0.5 border border-[#453224] transition-all duration-500 ${
            stage >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full shadow-[0_0_12px_#d97706] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
