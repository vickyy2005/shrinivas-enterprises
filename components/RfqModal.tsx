'use client'

import React, { useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'

export function RfqModal({
  isOpen,
  onClose,
  initialProduct = '',
}: {
  isOpen: boolean
  onClose: () => void
  initialProduct?: string
}) {
  const [sent, setSent] = useState(false)
  const [productDetail, setProductDetail] = useState(initialProduct)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcd0] relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a7b70] hover:text-[#231b14] p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#231b14]">RFQ Received</h3>
            <p className="text-[#695546] text-sm mt-2 max-w-sm mx-auto">
              Thank you! Our technical sales engineers will review your bill of materials and respond with a formal quotation within 24 hours.
            </p>
            <button
              onClick={() => {
                setSent(false)
                onClose()
              }}
              className="mt-6 bg-[#85532a] hover:bg-[#6e431f] text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs font-bold text-[#85532a] tracking-wider uppercase bg-[#f5ede3] px-2.5 py-1 rounded-md border border-[#e2d5c3]">
              Request B2B Quote
            </span>
            <h3 className="text-2xl font-extrabold text-[#231b14] mt-2">
              Get Material Quotation
            </h3>
            <p className="text-[#786658] text-xs sm:text-sm mt-1">
              Send us your requirement details, size, schedule, quantity, or Bill of Materials.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="mt-6 space-y-4 text-left"
            >
              <div>
                <label className="block text-xs font-bold text-[#3d2b20] mb-1">
                  Full Name *
                </label>
                <input
                  required
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-lg px-3.5 py-2 text-sm text-[#231b14] focus:outline-none focus:ring-2 focus:ring-[#85532a] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3d2b20] mb-1">
                    Company Name
                  </label>
                  <input
                    placeholder="Company / Project"
                    className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-lg px-3.5 py-2 text-sm text-[#231b14] focus:outline-none focus:ring-2 focus:ring-[#85532a] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3d2b20] mb-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-lg px-3.5 py-2 text-sm text-[#231b14] focus:outline-none focus:ring-2 focus:ring-[#85532a] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3d2b20] mb-1">
                  Work Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-lg px-3.5 py-2 text-sm text-[#231b14] focus:outline-none focus:ring-2 focus:ring-[#85532a] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3d2b20] mb-1">
                  Requirement / BOM Details *
                </label>
                <textarea
                  required
                  rows={3}
                  defaultValue={initialProduct ? `Inquiry for: ${initialProduct}` : ''}
                  placeholder="Item name, material grade, size (e.g. CI D/F Reducer, DI Hydrant Tee, Seamless Carbon Steel Pipe), quantity..."
                  className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-lg px-3.5 py-2 text-sm text-[#231b14] focus:outline-none focus:ring-2 focus:ring-[#85532a] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#85532a] hover:bg-[#6e431f] text-white py-3 rounded-lg font-semibold text-sm shadow-md shadow-[#85532a]/20 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Submit Request for Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
