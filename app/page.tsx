'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Tag,
  FileText,
  CheckCircle2,
  Phone,
  Wrench,
  Gauge,
  Layers,
  Cylinder,
  Briefcase,
  Users,
  Award,
  CircleDollarSign,
  Calendar,
  CreditCard,
  BadgeCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { RfqModal } from '@/components/RfqModal'

type Product = {
  name: string
  category: string
  code: string
  spec: string
  image: string
  badge: string
  description: string
  points: string[]
}

const featuredProducts: Product[] = [
  {
    name: 'Grey Sunrise Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-GREY',
    badge: 'THERMAL MANAGEMENT',
    spec: 'Extruded Aluminum Alloy · Multi-Fin Heat Dissipation',
    image: '/products/grey-sunrise-heat-sink.jpg',
    description: 'High-performance extruded aluminum grey sunrise heat sink engineered for power electronics, motor drives, inverters, and high-heat industrial equipment.',
    points: [
      'High thermal dissipation density with optimized fin geometry',
      'Extruded from 6063-T5 high conductivity aluminum alloy',
      'Corrosion-resistant anodized grey sunrise finish',
      'Custom dimensions, mounting slots, and hole tapping available',
    ],
  },
  {
    name: 'Stainless Steel 310 Grade Perforated Flask',
    category: 'Stainless Steel Flask',
    code: 'SNE-FLK-310',
    badge: '310 SS HIGH TEMP',
    spec: '310 SS Grade · Without Flange · Heavy Duty Laboratory',
    image: '/products/ss-perforated-flask.jpg',
    description: 'Heavy-duty cylindrical perforated flask without flange crafted from 310 stainless steel. Specially engineered for high-temperature laboratory testing and investment casting.',
    points: [
      'AISI 310 Stainless Steel continuous service up to 1150°C',
      'Round cylindrical without flange build for furnace placement',
      'Precision punched uniform aperture perforation pattern',
      'Resistant to thermal distortion and thermal oxidation',
    ],
  },
  {
    name: 'CI D/F Reducer',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-CI-RED',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'CI Fittings as per IS: 1538.',
    image: '/products/ci-df-reducer.jpg',
    description: 'Heavy cast iron double flanged concentric pipe reducer engineered for water distribution, wastewater, and industrial pumping networks.',
    points: [
      'Manufactured as per IS: 1538 standard',
      'Class A / Class B working pressure rated',
      'Double flanged drilling to IS: 1538 / BS 10',
      'Anti-corrosive bitumen black coating',
    ],
  },
  {
    name: 'DI Hydrant Tee 2S=1F',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-DI-TEE',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'DI Fittings as per IS: 9523.',
    image: '/products/di-hydrant-tee.jpg',
    description: 'Ductile iron all-socket tee with flanged branch specifically designed for fire hydrant connections and municipal distribution mains.',
    points: [
      'Manufactured to IS: 9523 / ISO 2531 standards',
      'Two push-on Tyton socket ends + One flanged branch',
      'High tensile strength & elongation resistance',
      'Internal cement mortar lining available',
    ],
  },
]

const homeProfileStats = [
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
    value: 'Cash, Cheque, DD, Online Transfer',
    icon: CreditCard,
  },
]

const coreCategories = [
  {
    title: 'Heat Sink',
    pills: 'EXTRUDED ALUMINUM, GREY SUNRISE',
    description: 'High-efficiency extruded aluminum heat sinks with multi-fin architecture for electronics and industrial cooling.',
    highlighted: true,
    icon: Sparkles,
    categoryKey: 'Heat Sink',
  },
  {
    title: 'Perforated Flask',
    pills: 'UNIFORM PERFORATION, LAB GRADE',
    description: 'Precision perforated cylindrical flasks engineered for laboratory testing, filtration, and investment casting.',
    highlighted: true,
    icon: Cylinder,
    categoryKey: 'Perforated Flask',
  },
  {
    title: 'Stainless Steel Flask',
    pills: 'GRADE 310, ROUND CYLINDRICAL',
    description: 'Extreme-temperature cylindrical stainless steel flasks without flange engineered for laboratory and investment casting.',
    highlighted: true,
    icon: Cylinder,
    categoryKey: 'Stainless Steel Flask',
  },
  {
    title: 'Foundry Raw Material & Equipment',
    pills: 'FITTINGS, VALVES, PIPES & FLANGES',
    description: 'Full spectrum of cast iron, ductile iron, GI fittings, carbon steel pipes, industrial valves, and pipe flanges.',
    highlighted: true,
    icon: Layers,
    categoryKey: 'Foundry Raw Material & Equipment',
  },
]

export default function HomePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Product | null>(null)
  const [rfqOpen, setRfqOpen] = useState(false)
  const [selectedForRfq, setSelectedForRfq] = useState('')

  const heroSlides = [
    {
      src: '/hero-specialty-1.jpg',
      title: 'Heat Sinks & 310 SS Perforated Flasks',
      subtitle: 'Extruded Multi-Fin Aluminum & Cylindrical Perforated Flasks',
      badge: 'HEAT SINKS & SS FLASKS',
      accent: 'from-blue-600 via-sky-500 to-indigo-500',
    },
    {
      src: '/hero-specialty-2.jpg',
      title: 'Copper Heat Sinks & Precision Pipe Fittings',
      subtitle: 'Heavy-Duty Brass & Stainless Threaded Fittings & Adapters',
      badge: 'FITTINGS & THERMAL SOLUTIONS',
      accent: 'from-amber-500 via-orange-500 to-red-500',
    },
    {
      src: '/hero-specialty-3.jpg',
      title: 'Thermal Engineering & CNC Manufacture',
      subtitle: 'Radial Heat Sinks, Manifolds, Gears & Bespoke BOM Sizing',
      badge: 'DOMBIVLI PRECISION FACILITY',
      accent: 'from-sky-400 via-blue-500 to-indigo-600',
    },
  ]

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const openQuoteModal = (productName = '') => {
    if (productName) {
      router.push(`/contact?product=${encodeURIComponent(productName)}#rfq-form`)
    } else {
      router.push('/contact#rfq-form')
    }
  }

  return (
    <main className="min-h-screen bg-[#faf6f0] text-[#231b14] font-sans">
      {/* 1. TOP UTILITY BAR */}
      <TopBar />

      {/* 2. MAIN HEADER */}
      <Header onOpenRfq={() => openQuoteModal()} />

      {/* 3. HERO SECTION - Proportional Height, Natural Workshop Background, Left-Aligned Text */}
      <section id="top" className="relative text-slate-900 overflow-hidden py-18 sm:py-24 lg:py-28 min-h-[580px] sm:min-h-[640px] flex items-center border-b border-[#e8ded1]">
        
        {/* Natural Background Images (Continuous Cross-Fading, NO buttons, 100% crisp photography visible) */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentHeroSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover object-right md:object-center"
                sizes="100vw"
              />
            </div>
          ))}

          {/* Gentle warm ambient fade on the left to ensure dark typography pops crisply */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/80 via-amber-50/40 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content - Strictly Left-Aligned matching user's exact reference */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-xl text-left flex flex-col items-start">
            
            {/* Verified Seller Pill */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#2a1b14]/15 text-[#3d2b20] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <BadgeCheck className="w-3.5 h-3.5 text-[#85532a]" />
              <span className="font-semibold tracking-wide">TRADE INDIA VERIFIED SELLER</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#634832] font-bold">ESTD. 2007 • DOMBIVLI</span>
            </div>

            {/* Tagline / Eyebrow */}
            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#422e22] uppercase mb-2">
              PRECISION THERMAL SOLUTIONS
            </p>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1e130c] leading-[1.05]">
              ENGINEERED METALS
              <span className="block mt-1">
                FOR INDUSTRY
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-[#4a3528] font-normal leading-relaxed max-w-xl">
              Specialized manufacturing and direct supply of high-dissipation Heat Sinks, high-temperature 310 Grade Stainless Steel Cylindrical Perforated Flasks, and precision industrial piping solutions.
            </p>

            {/* Button */}
            <div className="mt-7 flex flex-wrap items-center gap-3 w-full">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#2a1b14] hover:bg-[#180f0a] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>VIEW PRODUCT CATALOG</span>
              </Link>

              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center justify-center bg-white/80 hover:bg-white text-[#2a1b14] border border-[#2a1b14]/30 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>REQUEST B2B QUOTE</span>
              </button>
            </div>

            {/* Credential Indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#3d2b20] font-semibold">
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md border border-[#2a1b14]/15 px-3 py-1.5 rounded-lg shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Grey Sunrise Heat Sinks</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md border border-[#2a1b14]/15 px-3 py-1.5 rounded-lg shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#85532a]" />
                <span>310 SS Perforated Flasks</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-md border border-[#2a1b14]/15 px-3 py-1.5 rounded-lg shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>7-Day Dispatch Pan-India</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION: OUR CORE PRODUCT CATEGORIES */}
      <section id="categories" className="py-20 bg-gradient-to-b from-[#faf6f0] via-[#f5eee4] to-[#faf6f0] border-b border-[#e8ded1] relative overflow-hidden">
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6c9b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#f3ece2] border border-[#e4d6c5] text-[#85532a] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#85532a]" />
              <span>COMMERCIAL OFFERINGS &amp; SPECIALTIES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#231b14] tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85532a] via-[#a36836] to-[#b87842]">Product Categories</span>
            </h2>

            <p className="text-[#695546] mt-4 text-sm sm:text-base leading-relaxed">
              Manufacturer and supplier of high-dissipation Heat Sinks, high-temperature 310 SS Perforated Flasks, and complete industrial flow systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreCategories.map((cat, idx) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.title}
                  className="rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between group relative hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-[#fbf8f3] to-[#f4ebe0] border-2 border-[#85532a]/60 shadow-lg shadow-[#85532a]/10"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs bg-[#85532a] text-white shadow-md shadow-[#85532a]/30">
                        <Icon className="w-6 h-6 stroke-[2]" />
                      </div>

                      <span className="text-[9.5px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tight truncate max-w-[170px] bg-[#85532a] text-white shadow-2xs">
                        {cat.pills}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-[#231b14] text-xl mt-6 tracking-tight group-hover:text-[#85532a] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-[#695546] text-xs sm:text-[13px] leading-relaxed mt-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-[#ebdcd0]/70 flex items-center justify-between">
                    <Link
                      href="/products"
                      className="text-xs sm:text-[13px] font-extrabold flex items-center gap-1.5 transition-colors text-[#85532a] hover:text-[#5c371a]"
                    >
                      <span>Explore Catalog</span>
                    </Link>

                    <Link
                      href="/products"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#85532a] text-white shadow-sm group-hover:scale-110"
                      aria-label={`View ${cat.title} specifications`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. SECTION: FEATURED INDUSTRIAL PRODUCTS */}
      <section id="featured" className="py-20 bg-[#fcfaf7] border-b border-[#e8ded1] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#f3ece2] border border-[#e4d6c5] text-[#85532a] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <Tag className="w-3.5 h-3.5 text-[#85532a]" />
                <span>POPULAR INDUSTRIAL CATALOG ITEMS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#231b14] tracking-tight">
                Featured <span className="text-[#85532a]">Specialties &amp; Products</span>
              </h2>
              <p className="text-[#695546] text-sm sm:text-base mt-2">
                Explore our signature Heat Sinks, 310 Grade Stainless Steel Perforated Flasks, and certified piping fittings.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white border border-[#e8ded1] text-[#4d3b2f] hover:border-[#85532a] hover:text-[#85532a] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all self-start md:self-auto hover:-translate-y-0.5 group"
            >
              <span>View All 10+ Products</span>
              <ArrowRight className="w-4 h-4 text-[#8a7b70] group-hover:text-[#85532a] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featuredProducts.map((product) => (
              <article
                key={product.name}
                className="bg-white rounded-3xl border border-[#ebdcd0] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#85532a]/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Product Image Stage */}
                <div className="relative h-60 bg-gradient-to-b from-[#faf6f0] to-[#f3ece2] flex items-center justify-center p-6 border-b border-[#ebdcd0]/70 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(133,83,42,0.06)_0%,_transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs border border-[#ebdcd0] text-[#85532a] text-[10px] font-extrabold px-2.5 py-1 rounded-lg tracking-wider shadow-2xs">
                    {product.badge}
                  </div>
                  <div className="absolute bottom-3 left-3.5 bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#231b14] text-lg leading-snug group-hover:text-[#85532a] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#786658] font-medium mt-1.5 line-clamp-2">
                      {product.spec}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#ebdcd0]/70 flex gap-2">
                    <button
                      onClick={() => setSelected(product)}
                      className="flex-1 bg-white border border-[#ebdcd0] hover:border-[#85532a] hover:text-[#85532a] text-[#4d3b2f] text-xs font-semibold py-2.5 px-3 rounded-xl shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <button
                      onClick={() => openQuoteModal(product.name)}
                      className="bg-[#85532a] hover:bg-[#6e431f] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md shadow-[#85532a]/20 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group/rfq active:scale-95"
                    >
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/rfq:translate-x-full transition-transform duration-700" />
                      <span>RFQ</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION: ABOUT SHRINIVAS ENTERPRISES (TRADE INDIA SELLER PROFILE) */}
      <section id="about" className="py-10 sm:py-14 bg-gradient-to-b from-[#faf6f0] via-[#f5eee4] to-[#f9f4ec] border-b border-[#e8ded1] relative overflow-hidden">
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 text-orange-800 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <BadgeCheck className="w-3.5 h-3.5 text-orange-600" />
                <span>TRADE INDIA VERIFIED SELLER PROFILE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231b14] tracking-tight">
                About <span className="text-[#85532a]">SHRINIVAS ENTERPRISES</span>
              </h2>
              <p className="text-[#695546] text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
                Established in 2007, <strong>SHRINIVAS ENTERPRISES</strong> is a verified manufacturer, distributor, and supplier of precision Heat Sinks, Stainless Steel 310 Grade Perforated Flasks, and complete industrial flow systems. Located in Dombivli, Maharashtra.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white border border-[#ebdcd0] hover:border-[#85532a] hover:text-[#85532a] text-[#4d3b2f] px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all self-start lg:self-auto hover:-translate-y-0.5 group shrink-0"
            >
              <span>Explore Full Profile &amp; Specs</span>
              <ArrowRight className="w-4 h-4 text-[#8a7b70] group-hover:text-[#85532a] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* 6 High-Impact 3D Metric Cards */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#ebdcd0] shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {homeProfileStats.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="bg-gradient-to-br from-white to-[#fcfaf7] hover:from-[#fffcf8] hover:to-[#fff7ed] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[#ebdcd0] hover:border-amber-400 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff7ed] to-[#fedec2] text-[#d97706] flex items-center justify-center shrink-0 border border-[#fedec2] shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[11px] uppercase font-bold text-[#8a7b70] tracking-wider group-hover:text-[#695546] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base font-extrabold text-[#231b14] mt-0.5 leading-snug group-hover:text-amber-800 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#ebdcd0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#695546]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#85532a] shrink-0" />
                <span>Headquarters: <strong>Dombivli, Maharashtra, India</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Specialties: <strong>Grey Sunrise Heat Sinks, 310 SS Perforated Flasks &amp; Industrial Piping</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open Monday – Sunday (7 Days)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION: NEED A CUSTOM, BULK-ORDER B2B QUOTE? */}
      <section className="py-8 sm:py-12 bg-[#faf6f0] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-[#241a13] rounded-2xl sm:rounded-3xl py-7 px-6 sm:py-9 sm:px-10 text-center border border-[#38281e] shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-[#36271c] border border-[#4d3727] text-[#d6c7ba] text-xs font-medium px-3.5 py-1 rounded-full mb-3">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>B2B Contract Pricing</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Need a Custom, Bulk-Order B2B Quote?
            </h2>

            <p className="text-[#d1c2b5] text-xs sm:text-sm leading-relaxed mt-2.5 max-w-2xl">
              Submit your Bill of Materials (BOM) or project drawings. We provide competitive wholesale contracts, project supply agreements, and custom fabrication quotes within 24 hours.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={() => openQuoteModal()}
                className="bg-[#85532a] hover:bg-[#6e431f] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#85532a]/30 transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              >
                <span>Submit an RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+918286644929"
                className="bg-[#36271c] hover:bg-[#453224] border border-[#4d3727] text-[#e8ded5] px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#6e4d36]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Sales Office</span>
              </a>
            </div>

            <a
              href="https://wa.me/918286644929?text=Hello%20ShriNivas%20Enterprises,%20I%20need%20a%20bulk-order%20B2B%20quote%20for%20industrial%20piping%20materials."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[#ab9b8e] hover:text-white text-xs font-medium transition-colors"
            >
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-[#25D366]">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.766.804 5.344 2.188 7.516L2.062 30l6.703-2.078A13.914 13.914 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.578c-2.344 0-4.547-.672-6.422-1.828l-.453-.281-4.75 1.469 1.484-4.609-.312-.484A11.536 11.536 0 0 1 4.422 16c0-6.391 5.188-11.578 11.578-11.578 6.391 0 11.578 5.188 11.578 11.578 0 6.391-5.188 11.578-11.578 11.578zm6.547-8.687c-.359-.187-2.125-1.047-2.453-1.172-.328-.125-.562-.187-.812.187-.234.359-.922 1.172-1.125 1.406-.203.234-.406.266-.766.078-.359-.187-1.516-.562-2.891-1.781-1.078-.969-1.812-2.156-2.016-2.516-.219-.359-.016-.547.156-.734.156-.156.359-.406.547-.609.188-.203.25-.359.375-.594.125-.234.062-.438-.031-.625-.094-.188-.812-1.953-1.109-2.672-.297-.703-.594-.609-.812-.609h-.688c-.234 0-.625.094-.953.438-.328.359-1.25 1.219-1.25 2.969s1.281 3.453 1.453 3.688c.188.234 2.516 3.844 6.094 5.391.859.375 1.531.594 2.062.766.875.281 1.672.234 2.297.141.703-.109 2.125-.875 2.422-1.719.312-.844.312-1.562.219-1.719-.094-.156-.328-.25-.688-.438z" />
              </svg>
              <span>Get instant stock checks on WhatsApp at <strong>+91 82866 44929</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer onOpenRfq={() => openQuoteModal()} />

      {/* 8. FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

      {/* 9. MODALS */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ebdcd0] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 bg-[#faf6f0] flex items-center justify-center p-6 border-b border-[#ebdcd0]/70">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-contain p-4"
              />
              <div className="absolute bottom-3 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                {selected.badge}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#231b14]">{selected.name}</h3>
              <p className="text-xs font-mono text-[#85532a] bg-[#f5ede3] border border-[#e2d5c3] px-2.5 py-1 rounded-md mt-2 inline-block font-semibold">
                {selected.spec}
              </p>
              <p className="text-[#695546] text-sm mt-4 leading-relaxed">
                {selected.description}
              </p>

              <div className="mt-5">
                <h4 className="text-xs font-bold text-[#231b14] uppercase tracking-wider mb-2.5">
                  Key Specifications
                </h4>
                <ul className="space-y-2">
                  {selected.points.map((pt) => (
                    <li key={pt} className="text-xs text-[#4d3b2f] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#85532a] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ebdcd0]/70 flex gap-3">
                <button
                  onClick={() => {
                    const sel = selected
                    setSelected(null)
                    openQuoteModal(sel.name)
                  }}
                  className="flex-1 bg-[#85532a] hover:bg-[#6e431f] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Request Quote for this item
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2.5 rounded-lg border border-[#ebdcd0] text-[#4d3b2f] hover:bg-[#faf6f0] text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <RfqModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialProduct={selectedForRfq}
      />
    </main>
  )
}
