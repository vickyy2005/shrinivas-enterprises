'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Users,
  Award,
  CircleDollarSign,
  Calendar,
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  BadgeCheck,
  Clock,
  ExternalLink,
  Star,
  Target,
  Eye,
  Factory,
  Zap,
  PackageCheck,
  FileCheck,
  Truck,
} from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { RfqModal } from '@/components/RfqModal'

export default function AboutPage() {
  const [rfqOpen, setRfqOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'reviews'>('profile')

  const profileStats = [
    {
      title: 'Business Type',
      value: 'Manufacturer, Distributor, Supplier',
      icon: Briefcase,
    },
    {
      title: 'Employee Count',
      value: '12',
      icon: Users,
    },
    {
      title: 'Establishment',
      value: '2007',
      icon: Award,
    },
    {
      title: 'Annual Turnover',
      value: 'Rs 10 Crores',
      icon: CircleDollarSign,
    },
    {
      title: 'Working Days',
      value: 'Monday - Sunday',
      icon: Calendar,
    },
    {
      title: 'Payment Mode',
      value: 'Cash, Cheque, DD, Credit Card, Online (NEFT/RTGS)',
      icon: CreditCard,
    },
  ]

  const coreValues = [
    {
      icon: ShieldCheck,
      title: '310 SS & Certified Quality',
      desc: 'Dimensional accuracy, alloy spectrometer testing, and genuine mill test certificates (MTC) with complete batch traceability.',
    },
    {
      icon: Truck,
      title: 'Pan-India Express Dispatch',
      desc: 'Strategically headquartered in Dombivli, Maharashtra, ensuring quick fulfillment and freight connectivity across India.',
    },
    {
      icon: Factory,
      title: 'Custom Sizing & Fabrication',
      desc: 'Bespoke cylindrical diameters, wall thicknesses, and perforation patterns engineered to exact customer drawing specifications.',
    },
    {
      icon: FileCheck,
      title: 'Direct Wholesale Pricing',
      desc: 'Manufacturer and distributor supply capacity providing competitive volume pricing, flexible commercial terms, and BOM reviews.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#faf6f0] text-[#231b14] font-sans">
      <TopBar />
      <Header onOpenRfq={() => setRfqOpen(true)} />

      {/* Hero Banner - High-End Architectural Metallurgy Studio */}
      <section className="relative bg-gradient-to-b from-[#faf6f0] via-[#f5eee4] to-[#ede4d6] text-[#231b14] py-12 lg:py-16 border-b border-[#e8ded1] overflow-hidden">
        {/* Subtle Engineering Studio Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6c9b8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        {/* Ambient Atmospheric Studio Lighting */}
        <div className="absolute -top-20 -left-16 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute -bottom-20 -right-16 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Narrative, Identity & Action Hub */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Trust Badge with Trade India Verification */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#e2d5c3] text-[#3d2b20] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs mb-4 hover:border-[#85532a]/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <BadgeCheck className="w-4 h-4 text-[#85532a]" />
                <span className="text-[#695546] font-semibold">TRADE INDIA VERIFIED SELLER</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#85532a] font-bold">ESTD. 2007 • DOMBIVLI</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#85532a] rounded-full inline-block" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#85532a] uppercase">
                  PRECISION METALLURGICAL SOLUTIONS
                </span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e130c] tracking-tight leading-[1.1]">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85532a] via-[#a36836] to-[#b87842]">SHRINIVAS ENTERPRISES</span>
              </h1>

              {/* Detailed Description */}
              <p className="mt-3.5 text-[#5c4738] text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl font-normal">
                Manufacturer, Distributor &amp; Supplier of precision-engineered Heat Sinks, Stainless Steel 310 Grade Perforated Flasks, and Industrial Piping Solutions in India since 2007. Based in Dombivli, Maharashtra, supplying high-performance metallurgical solutions across India.
              </p>

              {/* Action Buttons Row */}
              <div className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setRfqOpen(true)}
                  className="bg-[#241a13] hover:bg-[#140e0a] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#241a13]/25 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 group active:scale-[0.98] border border-[#85532a]/30"
                >
                  <span>Request B2B Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="tel:+917021003269"
                  className="bg-white/95 hover:bg-[#faf6f0] border border-[#ebdcd0] hover:border-[#85532a] text-[#4d3b2f] hover:text-[#85532a] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#85532a]" />
                  <span>+91 70210 03269</span>
                </a>
                <a
                  href="https://wa.me/917021003269?text=Hello%20ShriNivas%20Enterprises,%20I%20have%20an%20inquiry%20regarding%20heat%20sinks%20and%20perforated%20flasks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50/90 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Trust Badges Row */}
              <div className="mt-6 pt-5 border-t border-[#ebdcd0]/80 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#695546]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Trade India Verified</span>
                </div>
                <span className="text-[#d6c9b8]">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#85532a]" />
                  <span>Custom CAD Fabrication</span>
                </div>
                <span className="text-[#d6c9b8]">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fast Pan-India Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): 2x2 Bento Grid of Elevated Metric Cards */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Metric 1: Establishment */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#ebdcd0] shadow-md shadow-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ESTD.
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#786658] font-bold">ESTABLISHMENT</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#231b14] tracking-tight mt-0.5">2007</div>
                  <div className="text-xs font-bold text-[#85532a] mt-1">18+ Years Experience</div>
                  <div className="text-[11px] text-[#786658] mt-0.5 leading-snug">Foundry &amp; thermal heritage</div>
                </div>

                {/* Metric 2: Annual Turnover */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#ebdcd0] shadow-md shadow-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CircleDollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      VOLUME
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#786658] font-bold">ANNUAL TURNOVER</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#231b14] tracking-tight mt-0.5">Rs 10 Crores</div>
                  <div className="text-xs font-bold text-emerald-700 mt-1">High-Volume Capacity</div>
                  <div className="text-[11px] text-[#786658] mt-0.5 leading-snug">Continuous commercial supply</div>
                </div>

                {/* Metric 3: Workforce */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#ebdcd0] shadow-md shadow-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5ede3] border border-[#e2d5c3] text-[#85532a] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#85532a] bg-[#ebdcd0]/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      TEAM
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#786658] font-bold">WORKFORCE</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#231b14] tracking-tight mt-0.5">12 Specialists</div>
                  <div className="text-xs font-bold text-[#85532a] mt-1">Technical Engineering Desk</div>
                  <div className="text-[11px] text-[#786658] mt-0.5 leading-snug">Machining, drafting &amp; QA</div>
                </div>

                {/* Metric 4: Working Days */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#ebdcd0] shadow-md shadow-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-800 bg-orange-100/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      DISPATCH
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#786658] font-bold">WORKING DAYS</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#231b14] tracking-tight mt-0.5">Mon – Sun</div>
                  <div className="text-xs font-bold text-orange-700 mt-1">7 Days Continuous Dispatch</div>
                  <div className="text-[11px] text-[#786658] mt-0.5 leading-snug">Rapid turnarounds from Dombivli</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Profile & Story Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#faf6f0] via-[#f7f0e7] to-[#faf6f0] border-b border-[#e8ded1] relative overflow-hidden">
        {/* Ambient Decorative Lighting Orbs */}
        <div className="absolute top-12 right-12 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-12 left-12 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Official Profile Tab Bar */}
          <div className="mb-10 flex items-center justify-start">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#ebdcd0]/70 border border-[#d6c9b8] shadow-inner gap-1.5 backdrop-blur-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#85532a] shadow-md border border-[#ebdcd0] scale-[1.02]'
                    : 'text-[#695546] hover:text-[#231b14]'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Seller Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'reviews'
                    ? 'bg-white text-[#85532a] shadow-md border border-[#ebdcd0] scale-[1.02]'
                    : 'text-[#695546] hover:text-[#231b14]'
                }`}
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Trade India Verification &amp; Reviews</span>
              </button>
            </div>
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* About SHRINIVAS ENTERPRISES Executive Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-10 border border-slate-200/80 shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors pointer-events-none" />

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 text-orange-700 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>AUTHENTICATED TRADE INDIA SELLER • ESTD. 2007</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231b14] tracking-tight">
                  About <span className="text-[#85532a]">SHRINIVAS ENTERPRISES</span>
                </h2>

                <div className="mt-4 space-y-3.5 text-[#524134] leading-relaxed text-sm sm:text-base max-w-5xl">
                  <p>
                    Established in 2007, <strong>SHRINIVAS ENTERPRISES</strong> has made a name for itself in the list of top suppliers of Heat Sinks, Perforated Flasks, and Stainless Steel Flasks in India. The supplier company is located in Dombivli, Maharashtra and is one of the leading sellers of listed products.
                  </p>
                  <p>
                    <strong>SHRINIVAS ENTERPRISES</strong> is listed in Trade India&apos;s list of verified sellers offering supreme quality of Grey Sunrise Heat Sink, Silver Perforated Flask, Stainless Steel Silver Round Cylindrical Perforated Flask Without Flange - 310 SS Grade, Durable Design | Custom Size, Ideal for Laboratory Applications etc.
                  </p>
                </div>

                {/* Ambient Quote Highlight */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-l-4 border-amber-600 text-xs sm:text-sm font-semibold text-[#3d2b20] flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Buy Heat Sinks, Perforated Flasks, and Stainless Steel Flasks in bulk from us for certified quality, high temperature resistance, and direct factory dispatch.</span>
                </div>
              </div>

              {/* 6 Key Highlights Cards (Authentic Trade India Layout with 3D Hover & Glowing Badges) */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#ebdcd0] shadow-lg relative overflow-hidden">
                <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-5 bg-amber-600 rounded-full" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#695546]">
                      Verified Seller Information
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Trade India Verified Profile
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileStats.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.title}
                        className="bg-gradient-to-br from-white to-[#fcfaf7] hover:from-[#fffcf8] hover:to-[#fff7ed] rounded-2xl p-5 border border-[#ebdcd0] hover:border-amber-400 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 group cursor-default"
                      >
                        {/* Peach/Amber 3D circular icon container */}
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#fff7ed] to-[#fedec2] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fedec2] shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs uppercase font-bold text-[#8a7b70] tracking-wider group-hover:text-[#695546] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-base sm:text-lg font-extrabold text-[#231b14] mt-1 leading-snug group-hover:text-amber-800 transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Location & Commercial Confidence Banner with Micro-Lift */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-[#85532a]/50 hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#85532a] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-[#85532a]/20">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#85532a] bg-[#f5ede3] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Logistics Corridor
                    </span>
                  </div>
                  <h4 className="font-bold text-[#231b14] text-sm sm:text-base">Strategic Location</h4>
                  <p className="text-xs text-[#695546] mt-1.5 leading-relaxed">
                    Headquartered in Dombivli, Maharashtra with direct transport corridors connecting major industrial, laboratory, and refinery clusters across India.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Authentic Vendor
                    </span>
                  </div>
                  <h4 className="font-bold text-[#231b14] text-sm sm:text-base">Verified Credentials</h4>
                  <p className="text-xs text-[#695546] mt-1.5 leading-relaxed">
                    Listed as a verified seller on Trade India, guaranteeing authenticated business legitimacy, registered GST compliance, and product standard compliance.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open 7 Days
                    </span>
                  </div>
                  <h4 className="font-bold text-[#231b14] text-sm sm:text-base">7-Day Active Dispatch</h4>
                  <p className="text-xs text-[#695546] mt-1.5 leading-relaxed">
                    Operating Monday through Sunday to serve urgent project turnarounds, plant shutdown supplies, and bulk wholesale logistics requests without delays.
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-10 border border-[#ebdcd0] shadow-md">
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>CLIENT TESTIMONIALS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231b14] tracking-tight">
                  Trade India Verification &amp; Reviews
                </h2>
                <p className="text-[#695546] text-xs sm:text-sm mt-2 max-w-3xl">
                  ShriNivas Enterprises is recognized in Trade India&apos;s verified seller network with a long-standing track record of reliability, quality assurance, and on-schedule dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-105 transition-transform" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Verified Order
                      </span>
                    </div>
                    <h4 className="font-bold text-[#231b14] text-sm">Consistent Quality on 310 SS Flasks</h4>
                    <p className="text-xs text-[#695546] mt-2 leading-relaxed">
                      &ldquo;We regularly procure customized cylindrical 310 grade stainless steel perforated flasks for laboratory applications from ShriNivas Enterprises. The dimensions and temperature resistance are top-notch.&rdquo;
                    </p>
                  </div>
                  <span className="block mt-4 pt-3 border-t border-[#ebdcd0]/70 text-[11px] font-semibold text-[#8a7b70]">
                    Industrial Lab Procurement • Maharashtra
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-105 transition-transform" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Verified Order
                      </span>
                    </div>
                    <h4 className="font-bold text-[#231b14] text-sm">Fast Turnaround on Heat Sinks</h4>
                    <p className="text-xs text-[#695546] mt-2 leading-relaxed">
                      &ldquo;Grey sunrise heat sinks delivered in bulk right on time. Great pricing and professional communication. Their Dombivli dispatch center handled logistics smoothly.&rdquo;
                    </p>
                  </div>
                  <span className="block mt-4 pt-3 border-t border-[#ebdcd0]/70 text-[11px] font-semibold text-[#8a7b70]">
                    Electronics Manufacturer • Gujarat
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-2xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-105 transition-transform" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Verified Order
                      </span>
                    </div>
                    <h4 className="font-bold text-[#231b14] text-sm">7-Day Weekend Emergency Support</h4>
                    <p className="text-xs text-[#695546] mt-2 leading-relaxed">
                      &ldquo;When we had an urgent Sunday project requirement for replacement piping fittings, ShriNivas Enterprises was responsive and arranged prompt stock dispatch.&rdquo;
                    </p>
                  </div>
                  <span className="block mt-4 pt-3 border-t border-[#ebdcd0]/70 text-[11px] font-semibold text-[#8a7b70]">
                    Infrastructure Contractor • Karnataka
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Corporate Commitments & Quality Standards */}
      <section className="py-14 sm:py-18 bg-[#faf6f0] border-b border-[#e8ded1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Quality Standards */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#f5ede3] border border-[#e2d5c3] text-[#85532a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#85532a]" />
                <span>Engineering Integrity &amp; Quality</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231b14] tracking-tight leading-tight">
                Commitment to Quality &amp; Precision Engineering
              </h2>

              <p className="text-[#695546] mt-4 leading-relaxed text-sm sm:text-base">
                At <strong>ShriNivas Enterprises</strong>, we believe engineering confidence is founded on uncompromised material validation and disciplined dispatch. Every consignment leaves our facility with strict QA/QC verification and certified compliance.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#f5ede3] text-[#85532a] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#231b14]">100% Material Grade Validation &amp; MTC</h4>
                    <p className="text-xs text-[#695546] mt-0.5">Genuine mill test certificates, chemical spectrometer analysis, and heat number batch traceability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#231b14]">Hydrostatic &amp; Dimensional Precision</h4>
                    <p className="text-xs text-[#695546] mt-0.5">Calibrated micrometers and pressure rigs verifying wall thickness, tolerance, and flange alignments.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#231b14]">Trade India Verified Authenticity</h4>
                    <p className="text-xs text-[#695546] mt-0.5">Officially authenticated vendor credentials guaranteeing transparent commercial transactions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mission & Vision Card */}
            <div className="lg:col-span-5 bg-[#241a13] rounded-3xl p-7 sm:p-8 text-white border border-[#38281e] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl font-bold text-white mb-6">
                Our Corporate Commitments
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#38281e] text-amber-400 border border-[#523c2d] flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Our Mission</h4>
                    <p className="text-xs sm:text-sm text-[#d1c2b5] mt-1 leading-relaxed">
                      To deliver certified heat sinks, customized 310 SS perforated flasks, and heavy-duty industrial piping materials with total dimensional accuracy, competitive pricing, and dependable on-schedule delivery.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#38281e] text-amber-400 border border-[#523c2d] flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">Our Vision</h4>
                    <p className="text-xs sm:text-sm text-[#d1c2b5] mt-1 leading-relaxed">
                      To be recognized across India as the single-source partner of choice for precision thermal management, specialized laboratory equipment, and heavy industrial flow systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#38281e] flex items-center justify-between text-xs text-[#a8988b]">
                <span>Dombivli, Maharashtra, India</span>
                <span className="text-amber-400 font-semibold">Verified Supplier Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-14 sm:py-18 bg-[#fcfaf7] border-b border-[#e8ded1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#85532a] uppercase tracking-wider bg-[#f5ede3] px-3 py-1 rounded-full border border-[#e2d5c3]">
              Strategic Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#231b14] mt-3 tracking-tight">
              The ShriNivas Advantage
            </h2>
            <p className="text-[#695546] text-xs sm:text-sm mt-2">
              Key operational and technical strengths that set us apart for industrial and laboratory procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl border border-[#ebdcd0] p-6 shadow-2xs hover:shadow-lg hover:border-[#85532a]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#f5ede3] text-[#85532a] flex items-center justify-center mb-4 border border-[#e2d5c3] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#231b14] text-base">
                      {val.title}
                    </h3>
                    <p className="text-[#695546] text-xs sm:text-sm mt-2 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* B2B Quote CTA Banner */}
      <section className="py-14 sm:py-18 bg-[#faf6f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 bg-[#241a13] rounded-3xl text-white text-center border border-[#38281e] shadow-2xl flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-80 h-32 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-[#36271c] border border-[#4d3727] text-[#d6c7ba] text-xs font-semibold px-3.5 py-1 rounded-full mb-4">
              <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>B2B CONTRACT &amp; BULK INQUIRIES</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need a Custom Fabrication or Project Price Estimate?
            </h3>
            <p className="text-[#d1c2b5] text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed">
              Submit your Bill of Materials (BOM), custom flask dimensions, or piping specifications. Our commercial sales desk in Dombivli, Maharashtra responds with verified quotations within 24 hours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5 justify-center">
              <button
                onClick={() => setRfqOpen(true)}
                className="bg-[#85532a] hover:bg-[#6e431f] text-white px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-[#85532a]/20 transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+917021003269"
                className="bg-[#36271c] hover:bg-[#453224] border border-[#4d3727] text-[#e8ded5] px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call +91 70210 03269</span>
              </a>
              <a
                href="https://wa.me/917021003269?text=Hello%20ShriNivas%20Enterprises,%20I%20have%20an%20inquiry%20regarding%20bulk%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            <div className="mt-8 pt-5 border-t border-[#38281e] text-xs text-[#a8988b] flex flex-wrap items-center justify-center gap-6">
              <span>✓ Mill Test Certificates Provided</span>
              <span>•</span>
              <span>✓ Custom Dimensional Drawings Accepted</span>
              <span>•</span>
              <span>✓ Rapid Pan-India Logistics</span>
            </div>
          </div>
        </div>
      </section>

      <RfqModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} />
      <WhatsAppButton />
      <Footer onOpenRfq={() => setRfqOpen(true)} />
    </main>
  )
}
