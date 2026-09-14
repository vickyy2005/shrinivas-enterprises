'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Building2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  FileCheck,
  User,
  Layers,
  Sparkles,
  Loader2,
  FileText,
  BadgeCheck,
} from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { RfqModal } from '@/components/RfqModal'

export default function ContactPage() {
  const [rfqOpen, setRfqOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Products / BOM')

  return (
    <main className="min-h-screen bg-[#faf6f0] text-[#231b14] font-sans">
      <TopBar />
      <Header onOpenRfq={() => setRfqOpen(true)} />

      {/* Hero Banner - Warm Cream Studio Aesthetic */}
      <section className="bg-gradient-to-b from-[#faf6f0] via-[#f5eee4] to-[#ede4d6] text-[#231b14] py-14 lg:py-18 relative overflow-hidden border-b border-[#e8ded1]">
        {/* Subtle Engineering Studio Radial Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6c9b8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-35 pointer-events-none" />

        {/* Ambient Atmospheric Studio Lighting */}
        <div className="absolute -top-16 -left-16 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute -bottom-16 -right-16 w-[480px] h-[480px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-[#e2d5c3] text-[#3d2b20] text-xs font-bold px-4 py-1.5 rounded-full shadow-2xs mb-4 hover:border-[#85532a]/40 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Phone className="w-3.5 h-3.5 text-[#85532a]" />
            <span>DIRECT B2B SALES &amp; ENGINEERING DESK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#231b14] tracking-tight leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#85532a] via-[#a36836] to-[#b87842]">Our Team</span>
          </h1>

          <p className="mt-3 text-[#695546] max-w-2xl text-xs sm:text-sm leading-relaxed font-normal">
            Have a Bill of Materials (BOM), custom flask drawing, or urgent stock requirement? Connect directly with our commercial and technical desk in Dombivli, Maharashtra.
          </p>
        </div>
      </section>

      {/* Main Contact Grid & Neumorphic Form */}
      <section className="py-16 lg:py-24 neu-bg relative overflow-hidden">
        {/* Soft Ambient Floating Glow Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Contact Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-chip text-[#85532a] text-xs font-bold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231b14] tracking-tight">
                  Head Office &amp; Operations
                </h2>
                <p className="text-[#695546] text-sm sm:text-base mt-2.5 leading-relaxed">
                  Our commercial and technical dispatch team is ready to assist you with material pricing, test certificates, and delivery logistics.
                </p>
              </div>

              {/* Neumorphic Contact Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <div className="neu-card neu-card-hover rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl neu-icon-box text-[#85532a] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#231b14] text-sm">Direct Phone &amp; WhatsApp</h4>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Open 7 Days
                      </span>
                    </div>
                    <a
                      href="tel:+918286644929"
                      className="text-base font-bold text-[#85532a] hover:text-[#5c371a] block mt-0.5 transition-colors"
                    >
                      +91 82866 44929
                    </a>
                    <span className="text-xs text-[#786658] mt-0.5 block">
                      Monday – Sunday: 9:00 AM to 7:00 PM (IST)
                    </span>
                  </div>
                </div>

                {/* Email Card */}
                <div className="neu-card neu-card-hover rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl neu-icon-box text-[#85532a] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#231b14] text-sm">Official Sales Email</h4>
                      <span className="text-[10px] font-semibold text-[#85532a] bg-[#f5ede3] px-2 py-0.5 rounded-full">
                        &lt; 2h Response
                      </span>
                    </div>
                    <a
                      href="mailto:sales@shrinivasenterprises.in"
                      className="text-base font-bold text-[#85532a] hover:text-[#5c371a] block mt-0.5 transition-colors truncate"
                    >
                      sales@shrinivasenterprises.in
                    </a>
                    <span className="text-xs text-[#786658] mt-0.5 block">
                      Inquiries, RFQs &amp; CAD/Drawing submissions
                    </span>
                  </div>
                </div>

                {/* Registered Address Card */}
                <div className="neu-card neu-card-hover rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl neu-icon-box text-[#85532a] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#231b14] text-sm">Registered Office &amp; Dispatch</h4>
                      <span className="text-[10px] font-semibold text-[#695546] bg-[#f5ede3] px-2 py-0.5 rounded-full">
                        Maharashtra
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4d3b2f] mt-1 leading-relaxed">
                      R.K. Apt., C-Bldg., A-201, Talav Road, Bhayandar East, Dist Thane - 401105, Maharashtra, India
                    </p>
                    <span className="text-xs text-[#786658] mt-1 block">
                      Headquarters &amp; Dispatch Hub: Dombivli / Thane
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Card */}
              <div className="p-6 rounded-2xl bg-[#241a13] text-white border border-[#38281e] shadow-xl flex items-center justify-between gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Desk Active</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">Instant WhatsApp Stock Inquiry</h4>
                  <p className="text-xs text-[#d1c2b5] mt-0.5">Get live stock checks and fast quotation</p>
                </div>
                <a
                  href="https://wa.me/918286644929?text=Hello%20ShriNivas%20Enterprises,%20I%20have%20an%20inquiry%20regarding%20bulk%20orders."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/30 hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Now</span>
                </a>
              </div>
            </div>

            {/* Right Contact / RFQ Form (7 cols) - Full Neumorphic Treatment */}
            <div className="lg:col-span-7">
              <div className="neu-card rounded-3xl p-7 sm:p-10 relative overflow-hidden">
                {formSent ? (
                  <div className="text-center py-14 animate-in zoom-in-95 duration-400">
                    <div className="w-16 h-16 rounded-2xl neu-icon-box text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-lg">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Inquiry Received
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#231b14] mt-2">Message &amp; RFQ Sent!</h3>
                    <p className="text-[#695546] text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting <strong>ShriNivas Enterprises</strong>. Our commercial engineering team in Dombivli will review your specifications and reply with a formal quote within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="mt-6 neu-chip neu-chip-active text-[#85532a] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer hover:text-[#5c371a]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <span className="text-xs font-bold text-[#85532a] uppercase tracking-wider neu-chip px-3 py-1 rounded-full">
                        Online Inquiry Form
                      </span>
                      <span className="text-[11px] text-[#786658] font-medium">
                        Direct to Commercial Desk
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#231b14] tracking-tight mt-2">
                      Submit Your Bill of Materials / RFQ
                    </h3>
                    <p className="text-[#695546] text-xs sm:text-sm mt-1">
                      Fill out your material details below for competitive contract pricing and stock schedules.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setIsSubmitting(true)
                        setTimeout(() => {
                          setIsSubmitting(false)
                          setFormSent(true)
                        }, 600)
                      }}
                      className="mt-7 space-y-5"
                    >
                      {/* Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="text-xs font-bold text-[#3d2b20] mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#85532a]" />
                            <span>Your Full Name *</span>
                          </label>
                          <input
                            required
                            placeholder="e.g. Ramesh Patel"
                            className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#3d2b20] mb-1.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#85532a]" />
                            <span>Company / Organization *</span>
                          </label>
                          <input
                            required
                            placeholder="Company Name"
                            className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="text-xs font-bold text-[#3d2b20] mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#85532a]" />
                            <span>Work Email *</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="name@company.com"
                            className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-[#3d2b20] mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#85532a]" />
                            <span>Phone Number *</span>
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full neu-inset rounded-xl px-4 py-3 text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Interactive Neumorphic Category Chips */}
                      <div>
                        <label className="text-xs font-bold text-[#3d2b20] mb-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#85532a]" />
                          <span>Product Category Needed</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'All Products / BOM',
                            'Heat Sinks',
                            '310 SS Perforated Flasks',
                            'Industrial Pipes',
                            'Valves & Fittings',
                          ].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setSelectedCategory(cat)}
                              className={`text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                                selectedCategory === cat
                                  ? 'neu-chip-active text-[#85532a] font-bold scale-[1.02]'
                                  : 'neu-chip text-[#524134] hover:text-[#231b14]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Requirement Textarea */}
                      <div>
                        <label className="text-xs font-bold text-[#3d2b20] mb-1.5 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#85532a]" />
                          <span>Requirement / BOM Specifications *</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Paste your Bill of Materials (BOM), required flask diameters/height, heat sink dimensions, material grades (310 SS, ASTM, IS), quantities, or project delivery destination..."
                          className="w-full neu-inset rounded-xl p-4 text-sm text-[#231b14] placeholder:text-[#8a7b70] focus:outline-none leading-relaxed resize-y min-h-[110px]"
                        />
                      </div>

                      {/* Neumorphic 3D Submit Button with Shimmer */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full neu-button-primary text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        {/* Shimmer sweep overlay */}
                        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer-sweep pointer-events-none" />

                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                            <span>Send Material Inquiry &amp; Request Quote</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-[#786658] pt-1">
                        <span>🔒 100% Confidential Quotation</span>
                        <span>⚡ Response within 24 hours</span>
                      </div>
                    </form>
                  </div>
                )}
              </div>
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
