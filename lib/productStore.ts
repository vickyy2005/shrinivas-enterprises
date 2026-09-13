'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  isSupabaseConfigured,
  fetchProductsFromSupabase,
  saveProductToSupabase,
  deleteProductFromSupabase
} from './supabaseClient'

export interface Product {
  id: string
  name: string
  category: string
  code: string
  spec: string
  badge: string
  image: string
  description: string
  points: string[]
  standards: string[]
  material: string
  price?: string
  minQuantity?: string
  inStock?: boolean
  featured?: boolean
  updatedAt?: string
}

export function normalizeCategory(category: string): string {
  if (category === 'Heat Sinks' || category === 'Heat Sink') return 'Heat Sink'
  if (category === 'Perforated Flask') return 'Perforated Flask'
  if (category === 'SS Flasks' || category === 'Stainless Steel Flask') return 'Stainless Steel Flask'
  if (category === 'Foundry Raw Material & Equipment') return 'Foundry Raw Material & Equipment'
  return 'Foundry Raw Material & Equipment'
}

export const defaultProducts: Product[] = [
  {
    id: 'grey-sunrise-heat-sink',
    name: 'Grey Sunrise Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-GREY',
    badge: 'THERMAL MANAGEMENT',
    spec: 'Extruded Aluminum Alloy · Multi-Fin Dissipation',
    image: '/products/grey-sunrise-heat-sink.jpg',
    material: 'High Thermal Conductivity Aluminum Alloy (6063-T5 / 6061)',
    standards: ['RoHS Compliant', 'ISO 9001:2015', 'ASTM B221'],
    description: 'High-performance extruded aluminum grey sunrise heat sink engineered for high thermal dissipation efficiency, electronics thermal management, inverters, and heavy industrial power equipment.',
    points: [
      'High thermal conductivity alloy with maximized multi-fin dissipation surface',
      'Extruded from virgin 6063-T5 structural aluminum',
      'Corrosion-resistant grey sunrise anodized surface finish',
      'Custom width, length, fin height, and CNC mounting holes to drawing',
      'Direct manufacturer wholesale supply with rapid dispatch nationwide'
    ],
    inStock: true,
    featured: true
  },
  {
    id: '25-x-30-heat-sink',
    name: '25 x 30 mm Extruded Aluminum Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-2530',
    badge: 'EXTRUDED ALUMINUM',
    spec: '25 x 30 mm Profile · Multi-Fin Heat Dissipation',
    image: '/products/25-x-30-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['RoHS Compliant', 'ISO 9001:2015'],
    description: 'Compact 25 x 30 mm extruded aluminum heat sink designed for high-density power electronics, PCB thermal management, and LED cooling.',
    points: [
      '25 x 30 mm compact profile with optimized surface fin area',
      'High thermal conductivity 6063-T5 aluminum',
      'Corrosion-resistant anodized surface',
      'Custom lengths and CNC mounting holes available'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'k4-heat-sink',
    name: 'K4 Heavy-Duty Extruded Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-K4',
    badge: 'HEAVY DUTY',
    spec: 'K4 Standard Profile · High Thermal Capacity',
    image: '/products/K4-Heat-Sink.jpg',
    material: 'High Thermal Conductivity Aluminum Alloy (6063-T5)',
    standards: ['RoHS Compliant', 'ISO 9001:2015', 'ASTM B221'],
    description: 'K4 profile extruded aluminum heat sink for power inverters, industrial motor drives, and high-wattage power supplies.',
    points: [
      'K4 heavy-duty profile design',
      'Maximized thermal dissipation surface fins',
      'Superior structural rigidity for industrial mounting',
      'Direct factory wholesale supply from Dombivli'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'industrial-heat-sink-std',
    name: 'High Dissipation Industrial Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-IND',
    badge: 'THERMAL MANAGEMENT',
    spec: 'Multi-Fin Structural Profile · High Thermal Density',
    image: '/products/Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'High-dissipation industrial extruded heat sink optimized for heavy power equipment, motor drives, and high-voltage transformers.',
    points: [
      'High efficiency fin geometry',
      'Engineered for forced & convection cooling',
      'Corrosion-resistant anodized finish',
      'Precision CNC machining to customer drawing'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'cylindrical-heat-sink',
    name: 'Cylindrical Round Aluminum Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-CYL',
    badge: 'ROUND PROFILE',
    spec: 'Radial Cylindrical Fin Geometry · 360° Dissipation',
    image: '/products/Cylindrical-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'ASTM B221'],
    description: 'Cylindrical round aluminum heat sink featuring 360-degree radial fins for uniform thermal dissipation in spotlights, LED arrays, and circular enclosures.',
    points: [
      '360° omnidirectional radial fin dissipation',
      'Ideal for circular enclosures & LED luminaires',
      'Machined core mounting face',
      'Custom diameter and fin length available'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '80ad-length-heat-sink',
    name: '80AD Profile Heavy-Duty Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-80AD',
    badge: '80AD PROFILE',
    spec: '80AD Heavy Extrusion · Multi-Channel Cooling',
    image: '/products/80AD-Length-Heat-Sink.jpg',
    material: 'High Thermal Conductivity Aluminum Alloy (6063-T5)',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '80AD heavy profile extruded aluminum heat sink with multi-channel cooling capacity for power converters, welding machines, and traction drives.',
    points: [
      '80AD heavy structural extrusion profile',
      'Multi-channel convection fin layout',
      'Excels in continuous high-wattage thermal service',
      'Custom lengths supplied to exact BOM'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '57-x-34-top-slot-heat-sink',
    name: '57 x 34 mm Top Slot Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-5734',
    badge: 'TOP SLOT DESIGN',
    spec: '57 x 34 mm Profile · Top Mounting Channel',
    image: '/products/57-x-34-Top-Slot-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '57 x 34 mm top slot extruded heat sink featuring a integrated mounting T-slot for easy installation in industrial electrical panels.',
    points: [
      'Integrated top slot channel for rapid mounting',
      '57 x 34 mm engineered cross-section',
      'High surface area to volume dissipation ratio',
      'Precision anodized surface finish'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '42-x-204-heat-sink',
    name: '42 x 204 mm High Capacity Power Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-42204',
    badge: 'HIGH CAPACITY',
    spec: '42 x 204 mm Wide Profile · Heavy Fin Matrix',
    image: '/products/42-x-204-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'ASTM B221'],
    description: 'Wide 42 x 204 mm power heat sink engineered for multi-IGBT power modules, solar inverters, and heavy-duty industrial amplifiers.',
    points: [
      '204 mm wide dissipation base plate',
      'Accommodates multiple semiconductor devices',
      'Heavy-gauge fin matrix for maximum heat transfer',
      'Flat milled mounting surface'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '42-x-204-heat-sink-fin',
    name: '42 x 204 mm Heavy Fin Matrix Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-42204B',
    badge: 'HEAVY FIN MATRIX',
    spec: '42 x 204 mm Enhanced Surface Area',
    image: '/products/42-x-204-Heat-Sink (1).jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'Enhanced 42 x 204 mm heavy fin matrix heat sink featuring dense fin spacing for maximum forced-air cooling in high-power enclosures.',
    points: [
      'Dense multi-fin matrix for forced-air cooling',
      '204 mm wide mounting face',
      'Low thermal resistance junction-to-ambient',
      'Available in custom lengths'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '42-x-100-heat-sink',
    name: '42 x 100 mm Medium Power Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-42100',
    badge: 'MEDIUM POWER',
    spec: '42 x 100 mm Profile · Versatile Industrial Build',
    image: '/products/42-x-100-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '42 x 100 mm extruded aluminum heat sink ideal for motor controllers, power supplies, and general industrial thermal management.',
    points: [
      '42 x 100 mm profile dimension',
      'Balanced natural and forced convection cooling',
      'High mechanical strength aluminum alloy',
      'Custom drilling and tapping available'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '40-x-50-heat-sink',
    name: '40 x 50 mm Modular Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-4050',
    badge: 'MODULAR PROFILE',
    spec: '40 x 50 mm Profile · Compact Power Electronics',
    image: '/products/40-x-50-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '40 x 50 mm modular aluminum heat sink engineered for compact power electronics, solid-state relays (SSR), and DC-DC converters.',
    points: [
      '40 x 50 mm modular cross-section',
      'Designed for SSR and power transistor mounting',
      'Low thermal resistance design',
      'Corrosion-resistant finish'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '40-round-heat-sink',
    name: '40 mm Round Cylindrical Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-40RND',
    badge: 'ROUND RADIAL',
    spec: '40 mm Diameter · Radial Fin Architecture',
    image: '/products/40-Round-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '40 mm round cylindrical aluminum heat sink featuring radial fins for omnidirectional heat transfer in compact cylindrical housings.',
    points: [
      '40 mm outer diameter with radial fin layout',
      '360° heat dissipation profile',
      'Machined center core for thermal interface placement',
      'Compact and lightweight'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '33-x-196-heat-sink',
    name: '33 x 196 mm High Surface Area Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-33196',
    badge: 'HIGH SURFACE AREA',
    spec: '33 x 196 mm Profile · Multi-Fin Heat Spreader',
    image: '/products/33-x-196-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'ASTM B221'],
    description: '33 x 196 mm high surface area aluminum heat sink designed for linear power supplies, audio amplifiers, and industrial controllers.',
    points: [
      '196 mm wide heat dissipation plate',
      'Slim 33 mm height profile for tight enclosures',
      'High thermal conduction across base plate',
      'Pre-drilled mounting options'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '20-x-182-5-heat-sink',
    name: '20 x 182.5 mm Low-Profile Multi-Fin Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-20182',
    badge: 'LOW PROFILE',
    spec: '20 x 182.5 mm Slim Profile · Extended Fin Spread',
    image: '/products/20-x-182-5-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'Ultra low-profile 20 x 182.5 mm multi-fin aluminum heat sink engineered for rackmount equipment, thin industrial PCs, and LED strips.',
    points: [
      'Low 20 mm height profile for slim equipment',
      '182.5 mm wide extended fin spread',
      'Excellent natural convection cooling',
      'Precision extruded aluminum'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '20-x-130-heat-sink',
    name: '20 x 130 mm Compact Slim Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-20130',
    badge: 'COMPACT SLIM',
    spec: '20 x 130 mm Profile · Low Thermal Resistance',
    image: '/products/20-x-130-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '20 x 130 mm compact slim aluminum heat sink providing efficient thermal cooling for PCB power stages and industrial electronics.',
    points: [
      '20 x 130 mm compact footprint',
      'High thermal dissipation efficiency',
      'Easy panel or PCB attachment',
      'Durable anodized protection'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '14-x-35mm-heat-sink',
    name: '14 x 35 mm Micro Precision Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-1435',
    badge: 'MICRO PRECISION',
    spec: '14 x 35 mm Profile · PCB Level Cooling',
    image: '/products/14-x-35mm-Heat-Sink.jpg',
    material: '6063-T5 High Conductivity Aluminum',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: '14 x 35 mm micro precision heat sink engineered for board-level component cooling, IC packages, micro-inverters, and robotics.',
    points: [
      'Micro 14 x 35 mm dimensions for tight PCB layout',
      'Rapid thermal transfer from ICs and MOSFETs',
      'Lightweight precision extrusion',
      'Available in bulk tape/tray packaging'
    ],
    inStock: true,
    featured: false
  },
  {
    id: '6x40-heat-sink',
    name: '6 x 40 mm Ultra-Slim Heat Sink Strip',
    category: 'Heat Sink',
    code: 'SNE-HS-640',
    badge: 'ULTRA SLIM',
    spec: '6 x 40 mm Strip · Flat Thermal Interface',
    image: '/products/6x40-Heat-Sink.jpg',
    material: '6063-T5 High Conductivity Aluminum',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'Ultra-slim 6 x 40 mm aluminum heat sink strip designed for space-critical electronic enclosures, memory modules, and linear LED bars.',
    points: [
      'Ultra-thin 6 mm depth profile',
      '40 mm dissipation width',
      'Flat milled thermal contact surface',
      'High volume wholesale availability'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'p-i-48-heat-sink',
    name: 'P-I-48 Heavy Industrial Power Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-PI48',
    badge: 'HEAVY INDUSTRIAL',
    spec: 'P-I-48 Profile · Maximum Power Rating',
    image: '/products/P-I-48-Heat-Sink.jpg',
    material: 'High Thermal Conductivity Aluminum Alloy (6063-T5)',
    standards: ['ISO 9001:2015', 'ASTM B221', 'RoHS Compliant'],
    description: 'P-I-48 heavy industrial power heat sink built for high-capacity semiconductor stacks, industrial thyristors, and heavy substation power converters.',
    points: [
      'P-I-48 heavy industrial extrusion specification',
      'Engineered for high-current semiconductor stacks',
      'Maximized thermal inertia and conduction channel',
      'Full factory test certificate supplied'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'sunrise-heat-sink',
    name: 'Sunrise Aluminum Heat Sink',
    category: 'Heat Sink',
    code: 'SNE-HS-SUN',
    badge: 'SUNRISE PROFILE',
    spec: 'Radial Sunrise Fin Dissipation Geometry',
    image: '/products/Sunrise-Heat-Sink.jpg',
    material: '6063-T5 Structural Aluminum Alloy',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'Sunrise aluminum heat sink with multi-channel sunrise fin geometry for maximized convection thermal cooling.',
    points: [
      'Sunrise fin channel pattern for optimized heat spread',
      '6063-T5 high conductivity structural alloy',
      'Smooth anodized protective surface',
      'Direct factory wholesale supply'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'ss-310-perforated-flask',
    name: 'Stainless Steel 310 Grade Cylindrical Perforated Flask',
    category: 'Stainless Steel Flask',
    code: 'SNE-FLK-310',
    badge: '310 SS HIGH TEMP',
    spec: '310 SS Grade · Without Flange · Heavy Duty',
    image: '/products/ss-perforated-flask.jpg',
    material: 'Stainless Steel AISI 310 (Extreme High Temperature Grade)',
    standards: ['ASTM A240', 'AISI 310', 'ISO 9001:2015'],
    description: 'Heavy-duty cylindrical perforated flask without flange crafted from AISI 310 stainless steel. Specially engineered for extreme heat resistance, durability, laboratory testing, and investment casting applications.',
    points: [
      'Grade 310 Stainless Steel for continuous thermal service up to 1150°C',
      'Round cylindrical without flange build for seamless furnace placement',
      'Precision punched uniform aperture perforation pattern',
      'High resistance against thermal oxidation, distortion, and thermal shock',
      'Bespoke diameters, heights, and perforation pitches manufactured to customer BOM'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'silver-perforated-flask',
    name: 'Silver Perforated Cylindrical Flask',
    category: 'Perforated Flask',
    code: 'SNE-FLK-SLV',
    badge: 'LABORATORY GRADE',
    spec: 'Precision Silver Finish · Uniform Micro-Apertures',
    image: '/products/ss-perforated-flask.jpg',
    material: 'Stainless Steel SS 304 / 316 with Silver Passivated Finish',
    standards: ['ASTM A240', 'ISO 9001:2015'],
    description: 'Precision silver finished cylindrical perforated flask crafted with uniform apertures for specialized laboratory filtration, testing, and investment casting.',
    points: [
      'Uniform precision micro-hole perforations with deburred smooth interior',
      'High circular concentricity and structural rigidity',
      'Chemically passivated surface resisting corrosive lab reagents',
      'Custom diameters, heights, and wall thicknesses available in bulk',
      'Ideal for laboratory research, investment casting, and dental metallurgy'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'ci-df-reducer',
    name: 'CI D/F Reducer',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-CI-RED',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'CI Fittings as per IS: 1538.',
    image: '/products/ci-df-reducer.jpg',
    material: 'Cast Iron (IS 210 Gr. FG 200/220)',
    standards: ['IS: 1538', 'BS: 10 Table D/E', 'ISO: 2531'],
    description: 'Heavy cast iron double flanged concentric pipe reducer engineered for water distribution, wastewater, and industrial pumping networks.',
    points: [
      'Manufactured strictly as per IS: 1538 specification',
      'Class A / Class B working pressure rated for heavy municipal duty',
      'Double flanged drilling conforming to IS: 1538 / BS 10',
      'Anti-corrosive bitumen black protective coating inside and out',
      'Hydrostatically tested up to 25 kg/cm² prior to dispatch'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'ci-df-bend',
    name: 'CI D/F Bend',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-CI-BND',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'CI Fittings as per IS: 1538.',
    image: '/products/ci-df-bend.jpg',
    material: 'Cast Iron (IS 210 Gr. FG 220)',
    standards: ['IS: 1538', 'BS EN 545', 'IS: 7181'],
    description: 'High-strength cast iron 90-degree double flanged elbow bend for municipal water supply, slurry handling, and pumping main lines.',
    points: [
      'Conforms strictly to IS: 1538 specification',
      'Smooth internal curvature reducing hydraulic friction loss',
      'High resistance against hydraulic shock & water hammer',
      'Machined flange faces with parallel sealing ridges',
      'Supplied with full dimension inspection sheet'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'di-hydrant-tee',
    name: 'DI Hydrant Tee 2S=1F',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-DI-TEE',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'DI Fittings as per IS: 9523.',
    image: '/products/di-hydrant-tee.jpg',
    material: 'Ductile Iron (GGG 50 / 500-7)',
    standards: ['IS: 9523', 'ISO: 2531', 'BS EN 545'],
    description: 'Ductile iron all-socket tee with flanged branch specifically designed for fire hydrant connections and municipal distribution mains.',
    points: [
      'Manufactured to IS: 9523 / ISO 2531 standards',
      'Two push-on Tyton socket ends + One flanged branch',
      'High tensile strength & elongation resistance (>10%)',
      'Internal cement mortar lining available for potable water',
      'Supplied with high-grade EPDM rubber gaskets'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'gi-fittings-set',
    name: 'GI Malleable Pipe Fittings',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-GI-SET',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'GI Fittings as per IS: 1239.',
    image: '/products/gi-fittings.jpg',
    material: 'Malleable Cast Iron (Hot-Dip Galvanized)',
    standards: ['IS: 1239 (Part 2)', 'BS: 143', 'ASTM A197'],
    description: 'Malleable galvanized iron threaded pipe fittings including elbows, tees, unions, sockets, nipples, and caps for plumbing and steam lines.',
    points: [
      'Manufactured as per IS: 1239 (Part 2) standard',
      'Heavy hot-dip galvanized coating minimum 400 g/m²',
      'Accurate precision NPT / BSPT leak-proof threading',
      'Class 150 & Class 300 pressure classes',
      'Ready stock available across 1/2" to 6" nominal sizes'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'seamless-cs-pipes',
    name: 'Seamless Carbon Steel Pipes',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-CS-001',
    badge: 'FOUNDRY RAW MATERIAL',
    spec: 'ASTM A106 Gr. B · SCH 40 / 80 / 160',
    image: '/industrial-pipes.png',
    material: 'ASTM A106 Gr. B / API 5L Gr. B',
    standards: ['ASTM A106', 'ASTM A53', 'API 5L', 'ASME B36.10'],
    description: 'High-pressure seamless carbon steel pipes engineered for oil, gas, chemical refineries, thermal power, and process steam applications.',
    points: [
      '1/2” to 24” diameter availability across all wall schedules',
      'Supplied in Single Random (SRL) and Double Random (DRL) lengths',
      'EN 10204 3.1 Mill test certificates with heat number traceability',
      '100% Eddy Current / Ultrasonic NDT inspected',
      'Bevelled ends with protective plastic end caps'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'stainless-ball-valves',
    name: 'Stainless Steel Ball Valves',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-VL-204',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'SS 316 / 304 · Class 150 / 300 / 800',
    image: '/industrial-valves.png',
    material: 'ASTM A351 CF8M / CF8 (SS316 / SS304)',
    standards: ['ASME B16.34', 'API 6D', 'API 607', 'BS 5351'],
    description: 'Precision-machined two-piece & three-piece stainless steel ball valves providing leak-tight shut-off and superior corrosion resistance.',
    points: [
      'Investment cast body with mirror-polished solid stainless steel ball',
      'Full bore & reduced bore port design for low pressure drop',
      'Fire-safe design tested and certified to API 607',
      'Virgin PTFE / RPTFE seat seals for zero fugitive emissions',
      'Locking lever handle and ISO 5211 direct actuator mounting pad'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'forged-gate-valves',
    name: 'Forged Steel Gate & Globe Valves',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-VL-309',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'ASTM A105N / F316 · Class 800 / 1500',
    image: '/industrial-valves.png',
    material: 'ASTM A105N / A182 F316 / F11 / F22',
    standards: ['API 602', 'ASME B16.34', 'BS 5352', 'API 598'],
    description: 'Heavy-duty forged gate and globe valves built for demanding high-temperature, high-pressure steam, oil, and hydrocarbon lines.',
    points: [
      'Bolted bonnet and welded bonnet options with rising stem',
      'Stellite hard-faced wedge/disc and seat rings for wear resistance',
      'Available in Socket Weld (SW), Threaded (NPT), and Flanged ends',
      'Pressure tested to API 598 shell and seat standards',
      'Supplied with handwheel operation and graphite packing'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'industrial-pipe-flanges',
    name: 'ASME Industrial Pipe Flanges',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-FL-055',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'ASME B16.5 · Class 150 - 2500 · SS & CS',
    image: '/industrial-fittings.png',
    material: 'ASTM A105N, A182 F304L, F316L, A350 LF2',
    standards: ['ASME B16.5', 'ASME B16.47', 'DIN 2527', 'BS 4504'],
    description: 'Forged slip-on, weld neck, blind, and socket weld flanges with serrated spiral gasket finish for critical pipeline joints.',
    points: [
      'Weld Neck (WN), Slip-On (SO), Blind (BL), Threaded (TH)',
      'RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)',
      '125-250 AARH serrated spiral gasket finish',
      'Sizes 1/2" NB through 48" NB in stock',
      'Complete PMI and 3.1 MTR test certificates supplied'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'steel-perforated-flask',
    name: 'Steel Perforated Casting Flask',
    category: 'Perforated Flask',
    code: 'SNE-PF-STL',
    badge: 'STEEL CASTING',
    spec: 'Heavy-Duty Steel Construction · High Temp Resistance',
    image: '/products/Steel-Perforated-Flask.jpg',
    material: 'High-Tensile Carbon & Alloy Steel',
    standards: ['ISO 9001:2015', 'ASTM A36', 'Foundry Grade'],
    description: 'Industrial-grade steel perforated flask engineered for high-pressure investment casting, metal pouring, and vacuum dewaxing processes.',
    points: [
      'Precision laser-cut perforations for optimum gas evacuation',
      'Heavy-wall steel shell prevents thermal deformation',
      'Suitable for brass, bronze, and aluminum foundry operations',
      'Reinforced base flange for secure mounting'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'stainless-steel-perforated-flask',
    name: 'Stainless Steel Perforated Investment Casting Flask',
    category: 'Perforated Flask',
    code: 'SNE-PF-SS316',
    badge: 'STAINLESS STEEL 316/304',
    spec: 'SS 316 / 304 Grade · Corrosion Resistant · Vacuum Dewaxing',
    image: '/products/Stainless-Steel-Perforated-Flask.jpg',
    material: 'AISI 304 / 316 Grade Stainless Steel',
    standards: ['ISO 9001:2015', 'ASTM A240', 'RoHS Compliant'],
    description: 'Premium stainless steel perforated flask designed for investment casting foundries, jewelry casting, and high-precision furnace applications.',
    points: [
      'Superior oxidation and scaling resistance at high temperatures',
      'Uniform micro-perforation pattern for burnout efficiency',
      'High thermal shock resistance prevents distortion',
      'Available with welded or heavy-duty machined rim options'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'ss-perforated-flask',
    name: 'SS Precision Cylindrical Perforated Flask',
    category: 'Perforated Flask',
    code: 'SNE-PF-CYL',
    badge: 'PRECISION SS',
    spec: 'Cylindrical Heavy-Wall Profile · Investment Casting',
    image: '/products/SS-Perforated-Flask.jpg',
    material: 'AISI 304 Stainless Steel',
    standards: ['ISO 9001:2015', 'DIN 1.4301'],
    description: 'Heavy-wall SS perforated flask engineered for precision jewelry and industrial investment casting molds with optimal airflow.',
    points: [
      'Precision CNC perforated body for fast vacuum draw',
      'Seamless cylindrical construction for uniform cooling',
      'Tested under extreme burnout thermal cycles',
      'Smooth internal bore for easy investment mold release'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'standard-perforated-flask',
    name: 'Industrial Perforated Investment Flask',
    category: 'Perforated Flask',
    code: 'SNE-PF-STD',
    badge: 'FOUNDRY STANDARD',
    spec: 'Multipurpose Perforated Design · Universal Flange',
    image: '/products/Perforated-Flask.jpg',
    material: 'Foundry Grade Alloy Steel / Stainless Steel',
    standards: ['ISO 9001:2015', 'Foundry Spec'],
    description: 'Standard perforated flask designed for versatile foundry casting, slurry coating, and thermal dewaxing applications.',
    points: [
      'Optimized perforation density for gas and slurry drainage',
      'Compatible with standard vacuum casting equipment',
      'Heavy-duty construction for extended service life',
      'Factory direct supply from Dombivli manufacturing plant'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'mild-steel-perforated-flask',
    name: 'Mild Steel Heavy-Duty Perforated Flask',
    category: 'Perforated Flask',
    code: 'SNE-PF-MS',
    badge: 'MILD STEEL',
    spec: 'IS 2062 MS Construction · High Impact Resistance',
    image: '/products/Mild-Steel-Perforated-Flask.jpg',
    material: 'IS 2062 Grade E250 Mild Steel',
    standards: ['IS 2062', 'ISO 9001:2015'],
    description: 'Cost-effective mild steel perforated flask built for heavy sand casting, mold flasks, and industrial metal pouring processes.',
    points: [
      'High impact and mechanical wear resistance',
      'Sturdy welded steel construction with anti-warp ribbing',
      'Ideal for aluminum, iron, and brass foundry operations',
      'Custom sizes and hole patterns available on request'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'ss-silver-round-flask-without-flange',
    name: 'SS Round Cylindrical Perforated Flask (Without Flange)',
    category: 'Stainless Steel Flask',
    code: 'SNE-SSF-906',
    badge: 'WITHOUT FLANGE',
    spec: 'SS 304 / 316 Grade · Non-Flanged Design · Burnout Spec',
    image: '/products/stainless-steel-silver-round-cylindrical-perforated-flask-without-flange-906.jpg',
    material: 'AISI 304 / 316 Stainless Steel',
    standards: ['ISO 9001:2015', 'ASTM A240', 'Jewelry Foundry Spec'],
    description: 'Silver cylindrical stainless steel perforated flask designed without top flange for smooth fitment inside specialized burnout furnaces and investment casting chambers.',
    points: [
      'Straight non-flanged cylindrical body for maximum furnace space utilization',
      'High-grade stainless steel construction prevents scaling and oxidation',
      'Precision uniform perforations for efficient vacuum suction',
      'Suitable for precious metal casting (gold, silver, platinum)'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'cylindrical-ss-jewelry-perforated-flask',
    name: 'Cylindrical Stainless Steel Jewelry Perforated Flask',
    category: 'Stainless Steel Flask',
    code: 'SNE-SSF-877',
    badge: 'JEWELRY CASTING',
    spec: 'Precision Micro-Perforated · High Polish Finish',
    image: '/products/cylindrical-stainless-steel-jewelry-perforated-flask-877.jpg',
    material: 'AISI 316L Stainless Steel',
    standards: ['ISO 9001:2015', 'RoHS Compliant'],
    description: 'High-precision stainless steel cylindrical flask tailored specifically for jewelry manufacturing, micro-detail investment casting, and dental alloys.',
    points: [
      'Engineered for ultra-smooth surface finish on fine jewelry molds',
      'Resists repeated thermal cycling up to 1000°C',
      'Uniform air drainage minimizes porosity in casted metal',
      'Easy cleaning and investment mold release'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'ss-silver-cylindrical-flask-with-flange',
    name: 'SS Cylindrical Perforated Flask (With Top Flange)',
    category: 'Stainless Steel Flask',
    code: 'SNE-SSF-889',
    badge: 'WITH FLANGE',
    spec: 'Machined Heavy Flange · Industrial Investment Flask',
    image: '/products/stainless-steel-silver-cylindrical-perforated-flask-with-flange-889.jpg',
    material: 'AISI 304 / 316 Grade Stainless Steel',
    standards: ['ISO 9001:2015', 'ASTM A240'],
    description: 'Silver cylindrical stainless steel perforated flask featuring a heavy-duty welded top flange for secure mounting on vacuum casting machines.',
    points: [
      'Precision machined top flange creates airtight rubber gasket seal',
      'Reinforced cylindrical wall prevents vacuum implode under pressure',
      'Corrosion-resistant silver polished finish',
      'Widely used in industrial foundries and jewelry casting houses'
    ],
    inStock: true,
    featured: false
  },
  {
    id: 'ss-silver-perforated-flask-without-flange-916',
    name: 'Foundry SS Silver Perforated Flask (Without Flange)',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-FND-916',
    badge: 'FOUNDRY EQUIPMENT',
    spec: 'Non-Flanged SS Construction · Heavy Duty Burnout',
    image: '/products/stainless-steel-silver-perforated-flask-without-flange-916.jpg',
    material: 'AISI 304 / 316 Grade Stainless Steel',
    standards: ['ISO 9001:2015', 'Foundry Grade'],
    description: 'Industrial foundry grade stainless steel perforated flask without top flange, designed for heavy furnace investment casting and vacuum slurry drainage.',
    points: [
      'Straight non-flanged cylindrical body for maximum furnace chamber efficiency',
      'High-grade heat-resistant stainless alloy prevents thermal warp',
      'Optimal hole perforation arrangement for rapid degassing',
      'Factory direct supply from Dombivli manufacturing facility'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'steel-perforated-flask-911',
    name: 'Foundry Steel Heavy Perforated Flask',
    category: 'Foundry Raw Material & Equipment',
    code: 'SNE-FND-911',
    badge: 'FOUNDRY RAW MAT',
    spec: 'High Impact Steel Body · High Temperature Casting',
    image: '/products/steel-perforated-flask-911.jpg',
    material: 'High-Tensile Structural Carbon Steel',
    standards: ['ISO 9001:2015', 'IS 2062'],
    description: 'Heavy-duty foundry steel perforated flask built to withstand extreme mechanical impact, high-temperature molten metal pouring, and vacuum investment casting.',
    points: [
      'Heavy structural steel wall for maximum durability and strength',
      'Precision laser-perforated drainage layout for clean casting',
      'Resists warping and distortion under repetitive heat cycles',
      'Ideal for iron, steel, brass, and aluminum foundry casting'
    ],
    inStock: true,
    featured: true
  }
]

const STORAGE_KEY = 'shrinivas_products_v7'
const UPDATE_EVENT = 'shrinivas_products_updated'

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return defaultProducts
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts))
      return defaultProducts
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      const normalized = parsed.map(p => ({
        ...p,
        category: normalizeCategory(p.category)
      }))
      return normalized
    }
    return defaultProducts
  } catch {
    return defaultProducts
  }
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: products }))
  } catch (err) {
    console.error('Failed to save products to localStorage:', err)
  }
}

export function useProductStore() {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(isSupabaseConfigured)

  const reload = useCallback(async () => {
    const items = getStoredProducts()
    setProducts(items)
    setIsLoaded(true)

    if (isSupabaseConfigured) {
      const remoteProducts = await fetchProductsFromSupabase()
      if (remoteProducts && remoteProducts.length > 0) {
        setProducts(remoteProducts)
        saveStoredProducts(remoteProducts)
        setIsSupabaseConnected(true)
      }
    }
  }, [])

  useEffect(() => {
    reload()

    const handleUpdate = () => {
      const items = getStoredProducts()
      setProducts(items)
    }
    window.addEventListener(UPDATE_EVENT, handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [reload])

  const addProduct = useCallback((newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const current = getStoredProducts()
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`
    const productToAdd: Product = {
      ...newProduct,
      id,
      inStock: newProduct.inStock ?? true,
      updatedAt: new Date().toISOString()
    }
    const updated = [productToAdd, ...current]
    saveStoredProducts(updated)

    if (isSupabaseConfigured) {
      saveProductToSupabase(productToAdd)
    }

    return productToAdd
  }, [])

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    const current = getStoredProducts()
    const updated = current.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p)
    saveStoredProducts(updated)

    const updatedTarget = updated.find(p => p.id === id)
    if (updatedTarget && isSupabaseConfigured) {
      saveProductToSupabase(updatedTarget)
    }
  }, [])

  const deleteProduct = useCallback((id: string) => {
    const current = getStoredProducts()
    const updated = current.filter(p => p.id !== id)
    saveStoredProducts(updated)

    if (isSupabaseConfigured) {
      deleteProductFromSupabase(id)
    }
  }, [])

  const toggleStock = useCallback((id: string) => {
    const current = getStoredProducts()
    const updated = current.map(p => p.id === id ? { ...p, inStock: !p.inStock, updatedAt: new Date().toISOString() } : p)
    saveStoredProducts(updated)

    const updatedTarget = updated.find(p => p.id === id)
    if (updatedTarget && isSupabaseConfigured) {
      saveProductToSupabase(updatedTarget)
    }
  }, [])

  const resetToDefaults = useCallback(() => {
    saveStoredProducts(defaultProducts)
    if (isSupabaseConfigured) {
      defaultProducts.forEach(p => saveProductToSupabase(p))
    }
  }, [])

  return {
    products,
    isLoaded,
    isSupabaseConnected,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    resetToDefaults,
  }
}
