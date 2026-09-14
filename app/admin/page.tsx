'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutGrid,
  Package,
  FileText,
  Plus,
  Search,
  Trash2,
  Edit3,
  Check,
  X,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Menu,
  Copy,
  CopyCheck,
  TrendingUp,
  Layers,
  Grid,
  List,
  Eye,
  Send,
  PhoneCall,
  Mail,
  RefreshCw,
  Zap,
  Tag,
  ArrowUpRight,
  LogIn,
  LogOut,
  Database,
  ShieldAlert,
  KeyRound,
} from 'lucide-react'
import { Product, useProductStore } from '@/lib/productStore'
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient'

// Quote request interface
interface QuoteRequest {
  id: string
  customerName: string
  phone: string
  email: string
  productName: string
  quantity: string
  date: string
  status: 'Pending' | 'Contacted' | 'Closed'
  message: string
}

const defaultQuotes: QuoteRequest[] = [
  {
    id: 'RFQ-802',
    customerName: 'Rajesh Sharma (Apex Engineering)',
    phone: '+91 98201 44512',
    email: 'rajesh@apexeng.in',
    productName: 'Grey Sunrise Heat Sink',
    quantity: '500 Pcs',
    date: '9/12/2026',
    status: 'Pending',
    message: 'Need urgent wholesale quotation for 500 pcs extruded aluminum heat sinks with custom CNC mounting holes.'
  },
  {
    id: 'RFQ-801',
    customerName: 'Sunil Verma (Sun Metallurgy)',
    phone: '+91 97110 33290',
    email: 'verma@sunmetal.com',
    productName: 'Stainless Steel 310 Grade Cylindrical Perforated Flask',
    quantity: '50 Pcs',
    date: '9/10/2026',
    status: 'Contacted',
    message: 'Looking for 310 SS grade perforated flasks without flange for furnace laboratory testing.'
  },
  {
    id: 'RFQ-800',
    customerName: 'Karan Patel (Patel Plumbing Supplies)',
    phone: '+91 99044 12876',
    email: 'kpatel@patelpipe.co.in',
    productName: 'CI D/F Reducer',
    quantity: '120 Pcs',
    date: '9/08/2026',
    status: 'Closed',
    message: 'Requesting bulk price list for IS: 1538 CI flanged reducers and bends.'
  }
]

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    resetToDefaults,
    isSupabaseConnected,
  } = useProductStore()

  // Supabase Auth state
  const [userSession, setUserSession] = useState<any>(null)
  const [localAdminBypass, setLocalAdminBypass] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    // Restore local session if active
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('sne_admin_auth')
      if (savedAuth === 'true') {
        setLocalAdminBypass(true)
      }
    }

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUserSession(session.user)
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUserSession(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    const pwd = authPassword.trim()
    const email = authEmail.trim()

    // Master passcode bypass check
    if (pwd === 'shrinivas2026' || pwd === 'admin123' || pwd === 'admin') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('sne_admin_auth', 'true')
      }
      setLocalAdminBypass(true)
      setAuthModalOpen(false)
      showToast('Welcome to ShriNivas Admin Portal!', 'success')
      return
    }

    if (supabase) {
      setAuthLoading(true)
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: pwd,
        })
        setAuthLoading(false)
        if (error) {
          setAuthError(error.message)
          showToast(error.message, 'danger')
        } else if (data.user) {
          setUserSession(data.user)
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('sne_admin_auth', 'true')
          }
          setAuthModalOpen(false)
          showToast('Signed in successfully with Supabase Auth!', 'success')
        }
      } catch (err: any) {
        setAuthLoading(false)
        setAuthError(err.message || 'An unexpected authentication error occurred')
      }
    } else {
      setAuthError('Invalid Admin Passcode or Credentials. Please try again.')
      showToast('Invalid Admin Credentials', 'danger')
    }
  }

  const handleSupabaseLogout = async () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('sne_admin_auth')
    }
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUserSession(null)
    setLocalAdminBypass(false)
    showToast('Signed out of Admin Panel', 'info')
  }

  // Navigation tab state
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'quotes' | 'add_product' | 'edit_product'>('products')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Products List View options
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [stockFilter, setStockFilter] = useState<'All' | 'inStock' | 'madeToOrder'>('All')
  const [viewLayout, setViewLayout] = useState<'table' | 'grid'>('table')
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'category'>('newest')

  // Form & Edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null)
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)
  const [copiedSku, setCopiedSku] = useState<string | null>(null)

  // Image source mode in Add/Edit form
  const [imageSourceTab, setImageSourceTab] = useState<'upload' | 'preset'>('upload')

  // Quote Requests state
  const [quotes, setQuotes] = useState<QuoteRequest[]>(defaultQuotes)
  const [quoteFilter, setQuoteFilter] = useState<'All' | 'Pending' | 'Contacted' | 'Closed'>('All')

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'danger' | 'info'>('success')

  const showToast = (message: string, type: 'success' | 'danger' | 'info' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Omit<Product, 'id'> & { id?: string }>({
    name: '',
    category: 'Heat Sink',
    code: '',
    spec: '',
    badge: 'INDUSTRIAL GRADE',
    image: '/products/grey-sunrise-heat-sink.jpg',
    description: '',
    material: '',
    standards: ['ISO 9001:2015'],
    points: ['High precision industrial manufacturing', 'Tested and verified quality standards'],
    inStock: true,
  })

  // Gallery presets list
  const imagePresets = [
    { label: 'Grey Sunrise Heat Sink', path: '/products/grey-sunrise-heat-sink.jpg' },
    { label: '25 x 30 mm Heat Sink', path: '/products/25-x-30-Heat-Sink.jpg' },
    { label: 'K4 Heat Sink Profile', path: '/products/K4-Heat-Sink.jpg' },
    { label: 'Standard Heat Sink', path: '/products/Heat-Sink.jpg' },
    { label: 'Cylindrical Heat Sink', path: '/products/Cylindrical-Heat-Sink.jpg' },
    { label: '80AD Heavy Extrusion Heat Sink', path: '/products/80AD-Length-Heat-Sink.jpg' },
    { label: '57 x 34 Top Slot Heat Sink', path: '/products/57-x-34-Top-Slot-Heat-Sink.jpg' },
    { label: '42 x 204 High Density Heat Sink', path: '/products/42-x-204-Heat-Sink.jpg' },
    { label: '42 x 100 Medium Extrusion Heat Sink', path: '/products/42-x-100-Heat-Sink.jpg' },
    { label: '40 x 50 Modular Heat Sink', path: '/products/40-x-50-Heat-Sink.jpg' },
    { label: '40 mm Round Cylindrical Heat Sink', path: '/products/40-Round-Heat-Sink.jpg' },
    { label: '33 x 196 Multi-Fin Heat Sink', path: '/products/33-x-196-Heat-Sink.jpg' },
    { label: '20 x 182.5 Wide Profile Heat Sink', path: '/products/20-x-182-5-Heat-Sink.jpg' },
    { label: '20 x 130 Compact Ribbed Heat Sink', path: '/products/20-x-130-Heat-Sink.jpg' },
    { label: '14 x 35 mm Small Channel Heat Sink', path: '/products/14-x-35mm-Heat-Sink.jpg' },
    { label: '6 x 40 Micro Fin Heat Sink', path: '/products/6x40-Heat-Sink.jpg' },
    { label: 'P-I-48 Industrial Flanged Heat Sink', path: '/products/P-I-48-Heat-Sink.jpg' },
    { label: 'Steel Perforated Flask', path: '/products/Steel-Perforated-Flask.jpg' },
    { label: 'Stainless Steel Perforated Flask', path: '/products/Stainless-Steel-Perforated-Flask.jpg' },
    { label: 'SS Precision Cylindrical Perforated Flask', path: '/products/SS-Perforated-Flask.jpg' },
    { label: 'Standard Perforated Flask', path: '/products/Perforated-Flask.jpg' },
    { label: 'Mild Steel Perforated Flask', path: '/products/Mild-Steel-Perforated-Flask.jpg' },
    { label: 'SS Round Cylindrical Flask (Without Flange)', path: '/products/stainless-steel-silver-round-cylindrical-perforated-flask-without-flange-906.jpg' },
    { label: 'Cylindrical SS Jewelry Perforated Flask', path: '/products/cylindrical-stainless-steel-jewelry-perforated-flask-877.jpg' },
    { label: 'SS Cylindrical Perforated Flask (With Flange)', path: '/products/stainless-steel-silver-cylindrical-perforated-flask-with-flange-889.jpg' },
    { label: 'Foundry SS Silver Perforated Flask (Without Flange)', path: '/products/stainless-steel-silver-perforated-flask-without-flange-916.jpg' },
    { label: 'Foundry Steel Heavy Perforated Flask', path: '/products/steel-perforated-flask-911.jpg' },
    { label: '310 SS Perforated Flask', path: '/products/ss-perforated-flask.jpg' },
    { label: 'Cast Iron Reducer', path: '/products/ci-df-reducer.jpg' },
    { label: 'Cast Iron Bend', path: '/products/ci-df-bend.jpg' },
    { label: 'Hydrant Tee', path: '/products/di-hydrant-tee.jpg' },
    { label: 'GI Pipe Fittings', path: '/products/gi-fittings.jpg' },
  ]

  // File Upload from Device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'danger')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, image: event.target!.result as string }))
          showToast('Image loaded from device!', 'success')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Clipboard Paste Image Listener
  const handlePasteImage = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile()
          if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
              if (event.target?.result) {
                setFormData(prev => ({ ...prev, image: event.target!.result as string }))
                showToast('Image pasted from clipboard!', 'success')
              }
            }
            reader.readAsDataURL(file)
          }
        }
      }
    }
  }

  // Drag & Drop Image Handler
  const handleDropImage = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, image: event.target!.result as string }))
          showToast('Image dropped successfully!', 'success')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Generate SKU Code
  const handleGenerateSku = () => {
    const prefix = formData.category.split(' ').map(w => w[0]).join('').toUpperCase() || 'SNE'
    const rand = Math.floor(100 + Math.random() * 900)
    setFormData(prev => ({ ...prev, code: `SNE-${prefix}-${rand}` }))
    showToast('Generated new SKU code', 'info')
  }

  // Open Add View
  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Heat Sink',
      code: `SNE-HS-${Math.floor(100 + Math.random() * 900)}`,
      spec: '',
      badge: 'INDUSTRIAL GRADE',
      image: '/products/grey-sunrise-heat-sink.jpg',
      description: '',
      material: '',
      standards: ['ISO 9001:2015'],
      points: ['High precision industrial manufacturing', 'Direct factory wholesale supply from Dombivli'],
      inStock: true,
    })
    setCurrentView('add_product')
  }

  // Open Edit View
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      code: product.code,
      spec: product.spec,
      badge: product.badge,
      image: product.image,
      description: product.description,
      material: product.material,
      standards: product.standards,
      points: product.points,
      inStock: product.inStock ?? true,
    })
    setCurrentView('edit_product')
  }

  // Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    const duplicatePayload = {
      ...product,
      id: undefined,
      name: `${product.name} (Copy)`,
      code: `${product.code}-COPY`,
    }
    addProduct(duplicatePayload)
    showToast(`Duplicated "${product.name}" as new item`, 'success')
  }

  // Save Product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      showToast('Product name cannot be empty', 'danger')
      return
    }

    const payload: Product = {
      id: formData.id || editingProduct?.id || '',
      name: formData.name.trim(),
      category: formData.category,
      code: formData.code.trim() || `SNE-${Math.floor(100 + Math.random() * 900)}`,
      spec: formData.spec.trim() || `${formData.category} Specification`,
      badge: formData.badge || formData.category.toUpperCase(),
      image: formData.image || '/products/grey-sunrise-heat-sink.jpg',
      description: formData.description.trim() || `${formData.name} manufactured under strict standards at Dombivli facility.`,
      material: formData.material.trim() || 'Industrial Grade Material',
      standards: formData.standards && formData.standards.length > 0 ? formData.standards : ['ISO 9001:2015'],
      points: formData.points && formData.points.length > 0 ? formData.points : ['Quality certified industrial item'],
      inStock: formData.inStock ?? true,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, payload)
      showToast(`Updated "${formData.name}" successfully!`, 'success')
    } else {
      addProduct(payload)
      showToast(`Added "${formData.name}" to catalog!`, 'success')
    }

    setCurrentView('products')
  }

  // Copy SKU to clipboard
  const handleCopySku = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSku(code)
    showToast(`Copied SKU "${code}" to clipboard`, 'info')
    setTimeout(() => setCopiedSku(null), 2000)
  }

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteCandidate) return
    deleteProduct(deleteCandidate.id)
    showToast(`Deleted "${deleteCandidate.name}" from catalog`, 'danger')
    setDeleteCandidate(null)
  }

  // Update Quote Status
  const handleUpdateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q))
    showToast(`Updated quote status to ${status}`, 'info')
  }

  // Categories list
  const categories = [
    'All',
    'Heat Sink',
    'Perforated Flask',
    'Stainless Steel Flask',
    'Foundry Raw Material & Equipment'
  ]

  // Filtered & Sorted products list
  const filteredProducts = useMemo(() => {
    const list = products.filter(p => {
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter
      const matchStock =
        stockFilter === 'All' ||
        (stockFilter === 'inStock' && p.inStock) ||
        (stockFilter === 'madeToOrder' && !p.inStock)
      const q = query.toLowerCase()
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q)
      return matchCat && matchStock && matchQuery
    })

    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sortBy === 'category') {
      return [...list].sort((a, b) => a.category.localeCompare(b.category))
    }
    return list
  }, [products, categoryFilter, stockFilter, query, sortBy])

  // Category Badge Color
  const getCategoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'Heat Sink':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
      case 'Perforated Flask':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'Stainless Steel Flask':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'Foundry Raw Material & Equipment':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/20'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  // Count active stock
  const inStockCount = useMemo(() => products.filter(p => p.inStock).length, [products])
  const customOrderCount = products.length - inStockCount

  // Supabase & Master Admin Auth Lock Screen
  if (!userSession && !localAdminBypass) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background glow graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-slate-950/80 relative z-10 text-slate-100 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/60 bg-white shadow-xl shadow-amber-500/20 shrink-0">
              <Image
                src="/shrinivas-logo.png"
                alt="ShriNivas Enterprises Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <h2 className="font-black text-lg text-white tracking-tight">SHRINIVAS ENTERPRISES</h2>
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected Admin Control Portal</span>
              </p>
            </div>
          </div>

          <div className="mb-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-xs text-slate-300 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" />
              <span>Admin Authentication Portal</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Enter your registered Supabase Admin email &amp; password, or your Master Admin Passcode (e.g. <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-[11px]">shrinivas2026</code>) to sign in.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <div>Authentication Failed</div>
                <div className="text-[11px] font-normal text-rose-300/80 mt-0.5">{authError}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSupabaseLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email Address (Optional for Passcode)</label>
              <input
                type="email"
                placeholder="shrinivasw107f@gmail.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Password / Admin Passcode</label>
              <input
                type="password"
                required
                placeholder="Enter password or passcode (e.g. shrinivas2026)"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5 text-center">
            <Link
              href="/products"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5 font-medium mt-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a]/5 text-slate-900 font-sans flex relative overflow-x-hidden">
      
      {/* 1. ULTRA-MODERN DARK SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/60 bg-white shadow-md shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/shrinivas-logo.png"
                  alt="ShriNivas Enterprises Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span>SHRINIVAS CORP</span>
                </div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Control Hub</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => {
                setCurrentView('dashboard')
                setMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('products')
                setMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'products' || currentView === 'add_product' || currentView === 'edit_product'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
              <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => {
                setCurrentView('quotes')
                setMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === 'quotes'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Quote Requests</span>
              {quotes.filter(q => q.status === 'Pending').length > 0 && (
                <span className="ml-auto bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                  {quotes.filter(q => q.status === 'Pending').length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Footer Quick Controls */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Catalog Defaults</span>
          </button>

          <Link
            href="/products"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-700/60 hover:border-blue-500/40 group"
          >
            <span>View Public Store</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] bg-slate-50/80">
        
        {/* Top Header Controls Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="text-slate-400">Admin</span>
              <span>/</span>
              <span className="text-slate-900 font-bold uppercase">{currentView.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border ${
              isSupabaseConnected 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabaseConnected ? 'Supabase Connected' : 'Local Storage Mode'}</span>
            </div>

            {/* Supabase Auth User Button */}
            {userSession ? (
              <button
                onClick={handleSupabaseLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                title={`Logged in as ${userSession.email}`}
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span className="max-w-[100px] truncate">{userSession.email?.split('@')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-400" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={handleOpenAdd}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Container */}
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">

          {/* VIEW 1: PRODUCTS LIST VIEW (MATCHING SAMPLE SCREENSHOT 1) */}
          {currentView === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                    <span>Products</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {filteredProducts.length} Items
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Manage your product catalog and live inventory
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenAdd}
                    className="bg-[#0f386d] hover:bg-[#0b2a52] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Controls Toolbar (Search, Filter Chips, Stock Dropdown & Layout Switcher) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Search Box */}
                <div className="relative w-full lg:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search product name, SKU, spec..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl pl-10 pr-9 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none transition-all"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Middle: Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none flex-1">
                  {categories.map((cat) => {
                    const active = categoryFilter === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-blue-600 text-white shadow-2xs scale-[1.02]'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>

                {/* Right: Stock Filter & View Switcher */}
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="inStock">Active In Stock</option>
                    <option value="madeToOrder">Custom / Made to Order</option>
                  </select>

                  <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewLayout('table')}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        viewLayout === 'table'
                          ? 'bg-white text-blue-600 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                      title="High Density Table"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewLayout('grid')}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                        viewLayout === 'grid'
                          ? 'bg-white text-blue-600 shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                      title="3D Card Grid"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRODUCT LISTINGS (TABLE OR GRID) */}
              {viewLayout === 'table' ? (
                /* High-Density Data Table (Matching Screenshot 1) */
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-4 px-5">Product</th>
                          <th className="py-4 px-5">Category</th>
                          <th className="py-4 px-5">Status</th>
                          <th className="py-4 px-5">SKU Code</th>
                          <th className="py-4 px-5">Created</th>
                          <th className="py-4 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors group">
                            
                            {/* Product Column */}
                            <td className="py-3.5 px-5 flex items-center gap-3.5">
                              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 relative shrink-0 overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                                <Image
                                  src={p.image || '/products/grey-sunrise-heat-sink.jpg'}
                                  alt={p.name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="50px"
                                  unoptimized={p.image.startsWith('data:')}
                                />
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                                  {p.name}
                                </div>
                                <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                                  {p.spec}
                                </div>
                              </div>
                            </td>

                            {/* Category Badge Column */}
                            <td className="py-3.5 px-5">
                              <span className={`inline-block border px-3 py-1 rounded-full text-[11px] font-extrabold ${getCategoryBadgeStyle(p.category)}`}>
                                {p.category}
                              </span>
                            </td>

                            {/* Status Pill Column */}
                            <td className="py-3.5 px-5">
                              <button
                                onClick={() => {
                                  toggleStock(p.id)
                                  showToast(`Toggled stock status for "${p.name}"`, 'info')
                                }}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-all ${
                                  p.inStock
                                    ? 'bg-[#0f386d] text-white hover:bg-[#0b2a52]'
                                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                                }`}
                                title="Click to toggle status"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
                                <span>{p.inStock ? 'Active' : 'Custom BOM'}</span>
                              </button>
                            </td>

                            {/* SKU Code Column */}
                            <td className="py-3.5 px-5">
                              <button
                                onClick={() => handleCopySku(p.code)}
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
                                title="Click to copy SKU"
                              >
                                <span>{p.code}</span>
                                {copiedSku === p.code ? <CopyCheck className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                              </button>
                            </td>

                            {/* Created Date Column */}
                            <td className="py-3.5 px-5 text-slate-500 text-xs font-mono">
                              8/6/2026
                            </td>

                            {/* Action Buttons Column */}
                            <td className="py-3.5 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDuplicateProduct(p)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                                  title="Duplicate Item"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteCandidate(p)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                      <div className="p-12 text-center text-slate-400 text-xs">
                        No products match your criteria.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* 3D Card Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      <div className="relative h-44 bg-slate-50 p-4 flex items-center justify-center border-b border-slate-100">
                        <Image
                          src={p.image || '/products/grey-sunrise-heat-sink.jpg'}
                          alt={p.name}
                          fill
                          className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                          unoptimized={p.image.startsWith('data:')}
                        />
                        <span className={`absolute top-3 left-3 border text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${getCategoryBadgeStyle(p.category)}`}>
                          {p.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400">{p.code}</div>
                          <h3 className="font-extrabold text-slate-900 text-sm mt-0.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {p.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.spec}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteCandidate(p)}
                            className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* VIEW 2: DEDICATED ADD / EDIT PRODUCT VIEW (MATCHING SAMPLE SCREENSHOT 2) */}
          {(currentView === 'add_product' || currentView === 'edit_product') && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300" onPaste={handlePasteImage}>
              
              {/* Back to Products Link */}
              <div>
                <button
                  onClick={() => setCurrentView('products')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Products</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentView === 'edit_product' ? 'Edit Product' : 'Add Product'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Update product details
                </p>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6">
                
                {/* CARD 1: BASIC INFORMATION */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5 shadow-2xs">
                  <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
                    Basic Information
                  </h3>

                  {/* Row 1: Name & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CI D/F Reducer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer font-semibold"
                      >
                        <option value="Heat Sink">Heat Sink</option>
                        <option value="Perforated Flask">Perforated Flask</option>
                        <option value="Stainless Steel Flask">Stainless Steel Flask</option>
                        <option value="Foundry Raw Material & Equipment">Foundry Raw Material & Equipment</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. CI Fittings as per IS: 1538."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
                    />
                  </div>

                  {/* Row 3: Product Image Source */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Product Image Source
                    </label>

                    {/* Source Tab Switcher */}
                    <div className="inline-flex p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setImageSourceTab('upload')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          imageSourceTab === 'upload'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageSourceTab('preset')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          imageSourceTab === 'preset'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Choose Preset / URL
                      </button>
                    </div>

                    {/* Image Options */}
                    {imageSourceTab === 'upload' ? (
                      <div className="space-y-3" onDragOver={(e) => e.preventDefault()} onDrop={handleDropImage}>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shadow-2xs active:scale-95">
                            <ImageIcon className="w-4 h-4" />
                            <span>Choose Image File from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>

                          <span className="text-xs text-slate-400 font-medium">or paste image using Ctrl+V or Drag & Drop</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <select
                          value={imagePresets.some(p => p.path === formData.image) ? formData.image : ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              setFormData({ ...formData, image: e.target.value })
                            }
                          }}
                          className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none cursor-pointer font-medium"
                        >
                          <option value="">-- Select from gallery list --</option>
                          {imagePresets.map(preset => (
                            <option key={preset.path} value={preset.path}>
                              {preset.label} ({preset.path})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Large Crisp Image Preview Box (Matching Screenshot 2) */}
                    <div className="mt-4 w-full max-w-sm h-64 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                      {formData.image ? (
                        <Image
                          src={formData.image}
                          alt="Product Preview"
                          fill
                          className="object-contain p-4"
                          unoptimized={formData.image.startsWith('data:')}
                        />
                      ) : (
                        <div className="text-center text-slate-400 text-xs">
                          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                          <span>No Image Selected</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active Status Radio / Checkbox */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Active Status
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={formData.inStock === true}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>Product is visible on the website</span>
                    </label>
                  </div>

                </div>

                {/* CARD 2: SPECIFICATIONS & SKU CODE */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
                  <h3 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
                    Specifications &amp; SKU
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>SKU Code *</span>
                        <button
                          type="button"
                          onClick={handleGenerateSku}
                          className="text-[10px] text-blue-600 font-bold hover:underline"
                        >
                          Generate
                        </button>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SNE-CI-RED"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Specification Summary
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CI Fittings as per IS: 1538."
                        value={formData.spec}
                        onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Material Grade / Alloy
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cast Iron (IS 210 Gr. FG 200)"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer mt-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Specification</span>
                  </button>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-[#0f386d] hover:bg-[#0b2a52] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    {currentView === 'edit_product' ? 'Update Product' : 'Add Product'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView('products')}
                    className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* VIEW 3: ADVANCED DASHBOARD SUMMARY VIEW */}
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Overview of products, live stock availability, and buyer inquiries
                </p>
              </div>

              {/* KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden group hover:border-blue-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Products</span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-3">{products.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Catalog active on live website</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden group hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active In Stock</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-emerald-600 mt-3">{inStockCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Dispatched in 24–48h</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden group hover:border-amber-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom / MTO</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-amber-600 mt-3">{customOrderCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1.5">
                    Fabricated to drawing BOM
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden group hover:border-purple-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quote Inquiries</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-purple-600 mt-3">{quotes.length}</div>
                  <div className="text-[11px] text-purple-600 font-bold mt-1.5">
                    {quotes.filter(q => q.status === 'Pending').length} Pending response
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Summary */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-slate-900 text-sm">Quick Catalog Overview</h3>
                  <button
                    onClick={() => setCurrentView('products')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Manage all products</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {products.slice(0, 5).map(p => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 relative shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.category}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit Item
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW 4: ADVANCED QUOTE REQUESTS VIEW */}
          {currentView === 'quotes' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Quote Requests
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Manage buyer RFQs received from the public website
                  </p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                  {(['All', 'Pending', 'Contacted', 'Closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setQuoteFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        quoteFilter === st
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-4 px-5">ID &amp; Customer</th>
                        <th className="py-4 px-5">Product Requested</th>
                        <th className="py-4 px-5">Quantity</th>
                        <th className="py-4 px-5">Date</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5 text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotes
                        .filter(q => quoteFilter === 'All' || q.status === quoteFilter)
                        .map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-5">
                              <div className="font-mono text-[10px] text-blue-600 font-bold">{q.id}</div>
                              <div className="font-extrabold text-slate-900 text-sm mt-0.5">{q.customerName}</div>
                              <div className="text-slate-400 text-[11px] font-mono mt-0.5">{q.phone} • {q.email}</div>
                              <div className="text-slate-500 text-xs italic mt-1.5 bg-slate-50 p-2 rounded-lg border border-slate-200/60 max-w-md">
                                "{q.message}"
                              </div>
                            </td>

                            <td className="py-4 px-5">
                              <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                                {q.productName}
                              </span>
                            </td>

                            <td className="py-4 px-5 font-mono text-slate-700 font-bold">
                              {q.quantity}
                            </td>

                            <td className="py-4 px-5 text-slate-400 font-mono">
                              {q.date}
                            </td>

                            <td className="py-4 px-5">
                              <select
                                value={q.status}
                                onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                                  q.status === 'Pending'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : q.status === 'Contacted'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(q.customerName)},%20thank%20you%20for%20your%20quote%20request%20for%20${encodeURIComponent(q.productName)}.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                                  title="Send WhatsApp message"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${q.phone}`}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                                  title="Call phone"
                                >
                                  <PhoneCall className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Delete Product?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove <strong>"{deleteCandidate.name}"</strong>?
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET FACTORY CATALOG CONFIRMATION MODAL */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Reset Catalog to Factory Defaults?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This will restore all default products and categories. Custom added items will be replaced.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults()
                  showToast('Catalog reset to factory defaults!', 'info')
                  setResetConfirmOpen(false)
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Restore Factory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUPABASE AUTH LOGIN MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-left animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-200">
              <KeyRound className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg">Supabase Admin Authentication</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Sign in with your registered Supabase Admin credentials to manage catalog data and user permissions.
            </p>

            <form onSubmit={handleSupabaseLogin} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  placeholder="shrinivasw107f@gmail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {authLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>

            {!isSupabaseConfigured && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Supabase environment variables are missing in <code>.env.local</code>. The system is currently running in local storage fallback mode.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold text-white ${
            toastType === 'danger'
              ? 'bg-rose-600 border-rose-500 shadow-rose-900/20'
              : toastType === 'info'
              ? 'bg-amber-600 border-amber-500 shadow-amber-900/20'
              : 'bg-emerald-600 border-emerald-500 shadow-emerald-900/20'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  )
}
