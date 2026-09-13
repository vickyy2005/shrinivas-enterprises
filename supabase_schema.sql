-- =========================================================
-- SHRINIVAS ENTERPRISES - SUPABASE DATABASE SCHEMA (IDEMPOTENT)
-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    code TEXT NOT NULL,
    badge TEXT DEFAULT 'INDUSTRIAL GRADE',
    spec TEXT NOT NULL,
    image TEXT NOT NULL,
    material TEXT NOT NULL,
    standards TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    points TEXT[] DEFAULT '{}',
    in_stock BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Quote Requests Table
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Closed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes for fast category & query filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quote_requests(status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Products (Drop first if exists to prevent duplicate error)
DROP POLICY IF EXISTS "Public read access for products" ON public.products;
CREATE POLICY "Public read access for products" 
    ON public.products FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Admin write access for products" ON public.products;
CREATE POLICY "Admin write access for products" 
    ON public.products FOR ALL 
    USING (auth.role() = 'authenticated' OR auth.role() = 'anon');

-- 6. RLS Policies for Quote Requests
DROP POLICY IF EXISTS "Public submit quote requests" ON public.quote_requests;
CREATE POLICY "Public submit quote requests" 
    ON public.quote_requests FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Admin access for quote requests" ON public.quote_requests;
CREATE POLICY "Admin access for quote requests" 
    ON public.quote_requests FOR ALL 
    USING (true);
