'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Check,
  Search,
  Filter,
  Layers,
  FileDown,
  ShieldCheck,
  CheckCircle2,
  Tag,
  X,
  Phone,
  PackageCheck,
  Factory,
  Zap,
  Sparkles,
  BadgeCheck,
  Eye,
  SlidersHorizontal,
  Cylinder,
  RotateCcw,
  Award,
  Clock,
} from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { RfqModal } from '@/components/RfqModal'

import { Product, useProductStore } from '@/lib/productStore'

export default function ProductsPage() {
  const { products } = useProductStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<Product | null>(null)
  const [rfqOpen, setRfqOpen] = useState(false)
  const [selectedForRfq, setSelectedForRfq] = useState('')

  const categories = [
    'All',
    'Heat Sink',
    'Perforated Flask',
    'Stainless Steel Flask',
    'Foundry Raw Material & Equipment'
  ]

  const categoryConfig = [
    { name: 'All', label: 'ALL', icon: Layers },
    { name: 'Heat Sink', label: 'Heat Sink', icon: Sparkles },
    { name: 'Perforated Flask', label: 'Perforated Flask', icon: ShieldCheck },
    { name: 'Stainless Steel Flask', label: 'Stainless Steel Flask', icon: Cylinder },
    { name: 'Foundry Raw Material & Equipment', label: 'Foundry Raw Material & Equipment', icon: Factory },
  ]

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'All' || p.category === category
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.spec.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase()) ||
        p.standards.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      return matchCat && matchQuery
    })
  }, [category, query, products])

  const openQuoteModal = (productName = '') => {
    setSelectedForRfq(productName)
    setRfqOpen(true)
  }

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length }
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [products])

  return (
    <main className="min-h-screen bg-[#faf6f0] text-[#231b14] font-sans">
      <TopBar />
      <Header onOpenRfq={() => openQuoteModal()} />

      {/* Page Header Banner - Warm Cream Studio Aesthetic */}
      <section className="bg-gradient-to-b from-[#faf6f0] via-[#f5eee4] to-[#ede4d6] text-[#231b14] py-12 lg:py-16 relative overflow-hidden border-b border-[#e8ded1]">
        {/* Subtle Engineering Studio Radial Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6c9b8_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* Ambient Atmospheric Lighting Orbs with Dynamic Animation */}
        <div className="absolute -top-24 -left-20 w-[520px] h-[520px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute -bottom-24 -right-20 w-[520px] h-[520px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[300px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          {/* Animated Glowing Verified Seller Pill */}
          <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md border border-[#e2d5c3] hover:border-[#85532a]/50 text-[#3d2b20] text-xs font-bold px-4 py-1.5 rounded-full shadow-xs hover:shadow-md transition-all duration-300 mb-5 group cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <BadgeCheck className="w-4 h-4 text-[#85532a] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[#3d2b20] tracking-wide font-semibold">TRADE INDIA VERIFIED SELLER</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#85532a] font-bold">ESTD. 2007 • DOMBIVLI</span>
          </div>

          {/* Master Heading with Vibrant Gradient & Ambient Glow */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-[#231b14] tracking-tight leading-[1.12] max-w-4xl">
            Precision Engineered{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85532a] via-[#a36836] to-[#b87842]">
                Product Catalog
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#85532a] via-[#a36836] to-[#b87842] rounded-full opacity-60" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-[#695546] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Direct manufacturer, distributor, and supplier of high-dissipation <strong>Grey Sunrise Heat Sinks</strong>, <strong>310 SS Perforated Flasks</strong>, and certified industrial piping infrastructure across India.
          </p>

          {/* 4 Animated Glassmorphic Metric Capsules with 3D Hover & Glowing Icons */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
            {/* Card 1 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#ebdcd0] shadow-md shadow-stone-200/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#85532a]/50 transition-all duration-300 group flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#85532a] to-[#5c371a] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#85532a]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-[#231b14] group-hover:text-[#85532a] transition-colors">18+ Years</div>
                <div className="text-[11px] text-[#786658] font-medium">Est. 2007 Legacy</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#ebdcd0] shadow-md shadow-stone-200/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-emerald-400 transition-all duration-300 group flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-[#231b14] group-hover:text-emerald-700 transition-colors">100% QA</div>
                <div className="text-[11px] text-[#786658] font-medium">IS / ASTM Certified</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#ebdcd0] shadow-md shadow-stone-200/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#85532a]/50 transition-all duration-300 group flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a36836] to-[#784824] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#a36836]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-[#231b14] group-hover:text-[#85532a] transition-colors">Custom BOM</div>
                <div className="text-[11px] text-[#786658] font-medium">Made to Drawing</div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#ebdcd0] shadow-md shadow-stone-200/40 hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-400 transition-all duration-300 group flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-[#231b14] group-hover:text-amber-700 transition-colors">7 Days</div>
                <div className="text-[11px] text-[#786658] font-medium">Fast Dispatch</div>
              </div>
            </div>
          </div>

          {/* High-Impact Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => openQuoteModal()}
              className="bg-gradient-to-r from-[#2a1b14] via-[#3a251b] to-[#2a1b14] hover:from-[#1b110c] hover:to-[#2b1911] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#2a1b14]/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 relative overflow-hidden group border border-[#85532a]/30"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
              <span>Request Wholesale B2B Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+917021003269"
              className="bg-white/90 hover:bg-white border border-[#ebdcd0] hover:border-[#85532a] text-[#3d2b20] hover:text-[#85532a] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 hover:scale-102 flex items-center gap-2 group"
            >
              <Phone className="w-4 h-4 text-[#85532a] group-hover:rotate-12 transition-transform duration-300" />
              <span>Call Direct Desk: +91 70210 03269</span>
            </a>
          </div>
        </div>
      </section>

      {/* Catalog Search & Filter Hub - Floating Warm Glassmorphic Sticky Toolbar */}
      <section className="py-3.5 bg-[#faf6f0]/90 backdrop-blur-2xl border-b border-[#e8ded1] sticky top-20 z-30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Horizontal Category Pills Track with Hover Elevate & Active Glow */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
              {categoryConfig.map((item) => {
                const active = category === item.name
                const count = categoryCounts[item.name] || 0
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => setCategory(item.name)}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 select-none group ${
                      active
                        ? 'bg-gradient-to-r from-[#85532a] to-[#6e431f] text-white shadow-md shadow-[#85532a]/30 scale-[1.03] ring-2 ring-[#85532a]/40'
                        : 'bg-white/90 hover:bg-white text-[#4d3b2f] hover:text-[#85532a] border border-[#ebdcd0] hover:border-[#85532a]/50 shadow-2xs hover:shadow-sm hover:-translate-y-0.5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'text-[#786658] group-hover:text-[#85532a]'}`} />
                    <span>{item.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold transition-colors ${
                        active
                          ? 'bg-white/25 text-white'
                          : 'bg-[#faf6f0] text-[#695546] border border-[#ebdcd0] group-hover:border-[#85532a]/40 group-hover:text-[#85532a]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}

              {/* Reset Filter Button */}
              {(category !== 'All' || query !== '') && (
                <button
                  onClick={() => {
                    setCategory('All')
                    setQuery('')
                  }}
                  className="shrink-0 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-100 border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer ml-1 active:scale-95 shadow-2xs hover:shadow-xs"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Glowing Search Box with Focus Accent & Live Item Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-full sm:w-64 md:w-80 group">
                <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-[#8a7b70] group-focus-within:text-[#85532a] transition-colors" />
                <input
                  type="text"
                  placeholder="Search products, grades, specs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white hover:bg-[#fcfaf7] focus:bg-white border border-[#ebdcd0] focus:border-[#85532a] rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none focus:ring-2 focus:ring-[#85532a]/20 transition-all shadow-inner"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-2.5 w-4 h-4 rounded-full bg-[#ebdcd0] hover:bg-[#d6c9b8] text-[#4d3b2f] flex items-center justify-center transition-colors cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f5ede3] border border-[#e2d5c3] text-[#85532a] text-xs font-bold whitespace-nowrap shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                <span>{filtered.length} of {products.length} Items</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Products Grid with Warm 3D Cards */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-[#faf6f0] via-[#f7f0e7] to-[#faf6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
              <span className="text-xs font-bold text-[#695546] uppercase tracking-wider">
                Showing {filtered.length} of {products.length} Products
              </span>
            </div>

            <button
              onClick={() => openQuoteModal()}
              className="text-xs font-bold text-[#85532a] hover:text-[#5c371a] flex items-center gap-1.5 cursor-pointer bg-[#f3ece2] hover:bg-[#ebdcd0] border border-[#e2d5c3] px-3.5 py-1.5 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#85532a]" />
              <span>Need custom specifications? Request B2B Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filtered.map((product) => (
              <article
                key={product.id}
                onClick={() => setSelected(product)}
                className="bg-white rounded-3xl border border-[#ebdcd0] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#85532a]/60 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
              >
                {/* Product Image Stage */}
                <div className="relative h-64 bg-gradient-to-b from-[#faf6f0] to-[#f3ece2] flex items-center justify-center p-6 border-b border-[#ebdcd0]/70 overflow-hidden">
                  {/* Spotlight Radial Background Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(133,83,42,0.06)_0%,_transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity" />

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs border border-[#ebdcd0] text-[#85532a] text-[10px] font-extrabold px-2.5 py-1 rounded-lg tracking-wider shadow-2xs">
                    {product.badge}
                  </div>

                  {/* Product Code */}
                  <div className="absolute top-3.5 right-3.5 bg-[#241a13]/85 backdrop-blur-xs text-[#e8ded5] text-[10px] font-mono px-2.5 py-1 rounded-lg">
                    {product.code}
                  </div>

                  {/* Ready Dispatch Status Chip */}
                  <div className="absolute bottom-3 left-3.5 bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#231b14] text-lg leading-snug group-hover:text-[#85532a] transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-[#786658] font-medium mt-1.5 line-clamp-2">
                      {product.spec}
                    </p>

                    {/* Standards Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {product.standards.map((st) => (
                        <span
                          key={st}
                          className="bg-[#faf6f0] text-[#4d3b2f] group-hover:bg-[#f5ede3] group-hover:text-[#85532a] group-hover:border-[#e2d5c3] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#ebdcd0] transition-colors"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-[#ebdcd0]/70 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelected(product)
                      }}
                      className="flex-1 bg-white border border-[#ebdcd0] hover:border-[#85532a] hover:text-[#85532a] text-[#4d3b2f] text-xs font-semibold py-2.5 px-3 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openQuoteModal(product.name)
                      }}
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

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#ebdcd0] shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-[#f5ede3] text-[#85532a] flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#231b14]">No matching products found</h3>
              <p className="text-[#786658] text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                No items match your search for &ldquo;{query}&rdquo;. Try adjusting your search keywords or reset filters.
              </p>
              <button
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                }}
                className="mt-4 bg-[#85532a] hover:bg-[#6e431f] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail & Specifications Modal (Exact Image 2 Layout) */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#ebdcd0] relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Product Header & Image Display */}
            <div className="p-6 sm:p-8 bg-white border-b border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Product Image Stage */}
                <div className="md:col-span-5 relative h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#faf6f0] to-[#f3ece2] border border-[#ebdcd0] overflow-hidden p-4 flex items-center justify-center">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-white/95 border border-[#ebdcd0] text-[#85532a] text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                    {selected.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#241a13]/85 text-[#e8ded5] text-[10px] font-mono px-2.5 py-1 rounded-lg">
                    {selected.code}
                  </div>
                </div>

                {/* Product Info & Pricing Summary (Matching Image 2 Top Section) */}
                <div className="md:col-span-7 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {selected.name}
                  </h2>

                  {/* Pricing & Min Order Quantity */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base sm:text-lg font-bold text-slate-900">
                        Price: {selected.price || '175 INR'} <span className="text-xs text-slate-500 font-normal">/ Piece</span>
                      </span>
                      <button
                        onClick={() => {
                          const sel = selected
                          setSelected(null)
                          openQuoteModal(sel.name)
                        }}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900 border border-blue-600 rounded-full px-3 py-0.5 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        Get Latest Price
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 font-medium">
                      Minimum Order Quantity : {selected.minQuantity || '10 Piece'}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>In Stock</span>
                    </div>
                  </div>

                  {/* Send Inquiry CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const sel = selected
                        setSelected(null)
                        openQuoteModal(sel.name)
                      }}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#356d93] hover:bg-[#2a5775] text-white text-xs sm:text-sm font-bold shadow-md shadow-slate-900/10 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                    >
                      <span>Send Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications Table (Exact Image 2 Table Layout) */}
            <div className="p-6 sm:p-8 space-y-7 bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  Product Specifications
                </h3>

                <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 w-1/3 border-r border-slate-200">Color</td>
                        <td className="py-2.5 px-4 text-slate-900">Silver</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Size</td>
                        <td className="py-2.5 px-4 text-slate-900">{selected.spec}</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Product Type</td>
                        <td className="py-2.5 px-4 text-slate-900">{selected.category}</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Material</td>
                        <td className="py-2.5 px-4 text-slate-900">{selected.material}</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Condition</td>
                        <td className="py-2.5 px-4 text-slate-900">New</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Supply Ability</td>
                        <td className="py-2.5 px-4 text-slate-900">25000 Per Week</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Delivery Time</td>
                        <td className="py-2.5 px-4 text-slate-900">1-3 Days</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Sample Available</td>
                        <td className="py-2.5 px-4 text-slate-900">Yes</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Sample Policy</td>
                        <td className="py-2.5 px-4 text-slate-900">Contact us for information regarding our sample policy</td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Packaging Details</td>
                        <td className="py-2.5 px-4 text-slate-900">Heavy Duty Export Box / Crate</td>
                      </tr>
                      <tr className="bg-slate-50/80">
                        <td className="py-2.5 px-4 font-semibold text-slate-700 border-r border-slate-200">Main Domestic Market</td>
                        <td className="py-2.5 px-4 text-slate-900">All India</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Overview Section (Matching Image 2 Bottom Section) */}
              <div className="pt-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
                  Product Overview
                </h3>
                
                <div className="text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 mb-1">Key Features</div>
                  <div><strong>Color :</strong> Silver / Metallic</div>
                  <div><strong>Grade :</strong> {selected.standards.join(' / ') || 'Industrial Grade'}</div>
                  <div><strong>Durable and Fine Finish</strong></div>
                  <div><strong>Material :</strong> {selected.material}</div>
                  <div><strong>Shape :</strong> Cylindrical / Precision Extruded</div>
                  
                  <div className="pt-3 leading-relaxed text-slate-600 border-t border-slate-100 mt-3">
                    {selected.description}
                  </div>

                  {selected.points.length > 0 && (
                    <div className="pt-2">
                      <div className="font-bold text-slate-900 mb-1.5">Additional Highlights:</div>
                      <ul className="space-y-1 list-disc list-inside text-slate-600">
                        {selected.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-200 flex gap-3 justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const sel = selected
                    setSelected(null)
                    openQuoteModal(sel.name)
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#85532a] hover:bg-[#6e431f] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RFQ Modal */}
      <RfqModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialProduct={selectedForRfq}
      />

      <WhatsAppButton />
      <Footer onOpenRfq={() => openQuoteModal()} />
    </main>
  )
}
