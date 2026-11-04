"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { VEHICLE_MODELS, VehicleModel } from "@/data/vehicles";
import { ACCESSORIES_DATA, AccessoryItem } from "@/data/accessories";
import {
  Zap,
  Truck,
  ShieldCheck,
  Package,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Filter,
  ArrowRight,
  Layers,
  BatteryCharging,
  Gauge,
  Users,
  Box,
  CreditCard,
  ShoppingBag,
  ExternalLink
} from "lucide-react";

type ProductCategory = "all" | "passenger" | "cargo" | "accessories" | "spares";

interface CargoItem {
  id: string;
  name: string;
  series: string;
  badge: string;
  tagline: string;
  specs: {
    capacity: string;
    material: string;
    compatibility: string;
    shipping: string;
  };
  highlights: string[];
}

const CARGO_CARRIERS: CargoItem[] = [
  {
    id: "heavy-flatbed-box",
    name: "Heavy-Duty Corrugated Flatbed Cargo Box",
    series: "Cargo Fleet Hardware",
    badge: "Industrial Grade",
    tagline: "Reinforced drop-side corrugated steel cargo bed engineered for market hauling, wholesale crates, and building materials.",
    specs: {
      capacity: "650 kg Commercial Rating",
      material: "High-Tensile Cold-Rolled Steel",
      compatibility: "Apsara Loader / Max Moter Chassis",
      shipping: "Shippable PAN India (Flatpack Assembly)",
    },
    highlights: [
      "Three-sided drop-down hinged panels with commercial spring latch locks",
      "Corrosion-resistant anti-rust zinc phosphate primer with automotive topcoat",
      "Reinforced rib structure resisting heavy localized floor puncture",
    ],
  },
  {
    id: "passenger-roof-carrier",
    name: "Commercial Passenger Roof Luggage Carrier",
    series: "Touring & Commuter Hardware",
    badge: "High Capacity",
    tagline: "Heavy-gauge tubular steel roof rack providing extra luggage space for passenger bags, cartons, and local transit freight.",
    specs: {
      capacity: "120 kg Roof Payload",
      material: "Welded Tubular Steel with Powder Coating",
      compatibility: "Max Moter Elite, Apsara Comfort & Universal Fits",
      shipping: "Shippable PAN India (Disassembled Freight)",
    },
    highlights: [
      "Aerodynamic low-drag wind deflector integrated with front bracket",
      "Pre-drilled mounting slots for taxi roof lights and flagpoles",
      "All-weather powder coated black finish with rubber dampening pads",
    ],
  },
  {
    id: "reinforced-crash-guard",
    name: "Heavy-Duty Front Bumper & Full Cabin Crash Guard",
    series: "Vehicle Armor Hardware",
    badge: "Maximum Protection",
    tagline: "Rugged tubular steel bullbar and wraparound side guard protecting front cowls, headlamps, and driver footwells from road impacts.",
    specs: {
      capacity: "Heavy Impact Absorbing Structure",
      material: "42mm High-Gauge Seamless Pipe",
      compatibility: "Compatible with ARAI E-Rickshaw Chassis",
      shipping: "Shippable PAN India",
    },
    highlights: [
      "Protects expensive front fiberglass cowls and steering linkages",
      "Dual mounting brackets for auxiliary fog lights and dynamic strobes",
      "Bolt-on direct installation without chassis drilling or welding",
    ],
  },
];

const SPARE_POWER_SYSTEMS = [
  {
    id: "smart-charger-48v",
    name: "Smart Automatic Microcontroller Battery Charger (48V / 60V)",
    tagline: "Intelligent pulse-width modulated fast charger with auto-cutoff and reverse polarity protection.",
    rating: "48V 15A / 60V 18A Multi-Mode",
    shipping: "Shippable PAN India",
  },
  {
    id: "heavy-bldc-controller",
    name: "High-Torque 24-Tube Intelligent BLDC Electronic Controller",
    tagline: "Waterproof solid-state speed controller with regenerative braking and anti-rollback hill assist.",
    rating: "1200W – 1500W Heavy Duty",
    shipping: "Shippable PAN India",
  },
  {
    id: "lead-acid-powerpack",
    name: "Heavy-Duty E-Rickshaw Deep-Cycle Tubular Battery Pack",
    tagline: "High-density lead-acid powerpack engineered for maximum daily fare cycles in Northeast climate.",
    rating: "48V 140Ah (4 x 12V 140Ah Set)",
    shipping: "Showroom Delivery / Regional Cargo Only",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Showroom Product Enquiry");
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleOpenEnquiry = (productName?: string, category?: string) => {
    if (productName) {
      setSelectedProduct(productName);
      setSelectedInterest(`Product: ${productName} (${category || "Showroom Catalog"})`);
    } else {
      setSelectedProduct("");
      setSelectedInterest("General Products Showroom Enquiry");
    }
    setEnquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 selection:bg-[#00FF9D] selection:text-[#030508]">
      {/* Top Navbar */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />

      <main className="pt-28 sm:pt-32 pb-24">
        {/* Breadcrumb & Header Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-400">Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Commercial Catalog</span>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>Kritika Micro Foundation Showroom Catalog • 2026 Fleet</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Electric Vehicles, Cargo Loaders &amp; Genuine Accessories
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Explore Assam&apos;s most reliable commercial passenger e-rickshaws, heavy-duty flatbed cargo carriers, and certified accessories. Engineered for high mileage, rugged terrain resilience, and fast daily return on investment.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ARAI Regulated 25 km/h Commercial EV Fleet</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <CreditCard className="w-4 h-4" />
                  <span>Financing Assistance: Chola Finance, Bajaj &amp; In-House</span>
                </div>
                <div className="flex items-center gap-2 text-violet-400">
                  <Truck className="w-4 h-4" />
                  <span>Showroom Pickup (Vehicles) + PAN India (Accessories)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CRITICAL LOGISTICS & SHIPPING NOTICE BANNER               */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12" id="pickup">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-500/[0.08] via-cyan-500/[0.06] to-transparent border border-emerald-500/30 text-slate-200 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold font-heading text-white">
                      Territorial Shipping &amp; Showroom Delivery Guideline
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Official Policy
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    <strong>Complete Assembled E-Rickshaws &amp; Cargo Loaders:</strong> We do <u>not</u> ship completely assembled E-Rickshaws to out-of-station addresses unless we have an outlet at a nearby address. Complete assembled E-Rickshaws are available <strong>exclusively for showroom pickup or authorized local delivery</strong> at our flagship showroom:
                  </p>
                  <p className="text-xs font-mono font-bold text-emerald-300">
                    📍 Rittika Enterprise, Pegu Bazaar, Dhemaji – 787057, Assam, India.
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    <strong>Tangible Feasible Accessories, Loaders &amp; Hardware:</strong> All vehicle accessories, roof taxi lights, audio sound packages, carriers, chargers, and spares are sold and dispatched <strong>PAN India</strong> via certified express logistics.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleOpenEnquiry("Logistics & Delivery Query")}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  Verify Delivery Route
                </button>
                <Link
                  href="/refunds-cancellations#shipping"
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Shipping Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CATEGORY TABS                                */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: "all", label: "All Products", count: VEHICLE_MODELS.length + ACCESSORIES_DATA.length + CARGO_CARRIERS.length + SPARE_POWER_SYSTEMS.length },
                { id: "passenger", label: "Passenger E-Rickshaws", count: 2 },
                { id: "cargo", label: "Cargo Loaders & Carriers", count: CARGO_CARRIERS.length + 1 },
                { id: "accessories", label: "Tangible Accessories (PAN India)", count: ACCESSORIES_DATA.length },
                { id: "spares", label: "Spares & Power Systems", count: SPARE_POWER_SYSTEMS.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as ProductCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-transparent text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === tab.id
                      ? "bg-cyan-400/20 text-cyan-300"
                      : "bg-white/10 text-slate-400"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Showroom Stock Ready • Dhemaji</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: PASSENGER & CARGO COMMERCIAL E-RICHAW FLEET   */}
        {/* ========================================================= */}
        {(selectedCategory === "all" || selectedCategory === "passenger" || selectedCategory === "cargo") && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="fleet">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  Commercial Fleet Models
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  Commercial E-Rickshaws &amp; Heavy Loaders
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Available for pickup or delivery from our Dhemaji showroom facility.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {VEHICLE_MODELS.filter((v) => {
                if (selectedCategory === "passenger") return v.id !== "apsara-loader";
                if (selectedCategory === "cargo") return v.id === "apsara-loader";
                return true;
              }).map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="rounded-3xl bg-[#070C18] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-cyan-500/10 group"
                >
                  {/* Top Image Preview Card */}
                  <div className="relative h-64 w-full bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col justify-between overflow-hidden">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
                        {vehicle.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                        {vehicle.series}
                      </span>
                    </div>

                    {/* Centered Vehicle Image */}
                    <div className="relative w-full h-44 my-auto flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        width={300}
                        height={200}
                        className="object-contain max-h-full w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                      />
                    </div>

                    {/* Showroom Pickup Badge */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Dhemaji Showroom Handover</span>
                      </span>
                      <span className="text-slate-400">{vehicle.colorName}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between border-t border-white/10">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {vehicle.tagline}
                      </p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-2.5 my-4 pt-3 border-t border-white/5 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>Powertrain Motor</span>
                          </span>
                          <span className="text-white font-bold block">{vehicle.specs.motor}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <BatteryCharging className="w-3 h-3 text-cyan-400" />
                            <span>Battery Powerpack</span>
                          </span>
                          <span className="text-white font-bold block">{vehicle.specs.battery}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Gauge className="w-3 h-3 text-violet-400" />
                            <span>Operational Range</span>
                          </span>
                          <span className="text-emerald-400 font-bold block">{vehicle.specs.range}</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Users className="w-3 h-3 text-amber-400" />
                            <span>Seating / Capacity</span>
                          </span>
                          <span className="text-white font-bold block">{vehicle.specs.seating}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                        {vehicle.highlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <button
                        onClick={() => handleOpenEnquiry(vehicle.name, "Commercial Fleet")}
                        className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enquire Showroom Allocation</span>
                      </button>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                        <span>Financing Available: Chola / Bajaj</span>
                        <Link href="/terms#financing" className="text-cyan-400 hover:underline">
                          Credit Terms
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 2: HEAVY CARGO LOADERS & COMMERCIAL CARRIERS     */}
        {/* ========================================================= */}
        {(selectedCategory === "all" || selectedCategory === "cargo") && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="loaders">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  Commercial Freight Hardware
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  Heavy Cargo Loaders, Carriers &amp; Structural Guards
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Engineered for agricultural produce, wholesale transport, and market freight. Shippable PAN India.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CARGO_CARRIERS.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#070C18] border border-white/10 hover:border-cyan-400/30 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {item.badge}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>PAN India</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.tagline}
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs font-mono text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Rating:</span>
                        <span className="text-white font-bold">{item.specs.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Material:</span>
                        <span className="text-slate-300">{item.specs.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Logistics:</span>
                        <span className="text-emerald-400 font-semibold">{item.specs.shipping}</span>
                      </div>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-400 pt-1">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleOpenEnquiry(item.name, "Cargo Hardware")}
                      className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Order Carrier / Pre-Book</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: TANGIBLE ACCESSORIES (PAN INDIA SHIPPABLE)     */}
        {/* ========================================================= */}
        {(selectedCategory === "all" || selectedCategory === "accessories") && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="accessories">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  Certified Tangible Upgrades
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  Accessories &amp; Styling Kits (PAN-India Shippable)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  High-durability accessories, roof taxi signboards, sound packages, and weather protective armor shipped directly to your door nationwide.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACCESSORIES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#070C18] border border-white/10 hover:border-emerald-400/30 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>Ships PAN India</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs text-slate-400">
                      {item.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleOpenEnquiry(item.name, "Accessory Item")}
                      className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 hover:border-emerald-400/40 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Order Accessory Online</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 4: SPARES & POWER SYSTEMS                         */}
        {/* ========================================================= */}
        {(selectedCategory === "all" || selectedCategory === "spares") && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" id="spares">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block font-bold">
                  Power Electronics &amp; Replacement Spares
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  Smart Automatic Chargers &amp; Electrical Assemblies
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  OEM replacement electronic components, smart chargers, and battery systems.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SPARE_POWER_SYSTEMS.map((spare) => (
                <div
                  key={spare.id}
                  className="p-6 rounded-2xl bg-[#070C18] border border-white/10 hover:border-violet-400/30 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30 font-bold">
                        Power Component
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {spare.shipping}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-heading text-white">
                      {spare.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {spare.tagline}
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-slate-300">
                      <span className="text-slate-500 block text-[10px]">Specifications:</span>
                      <span className="text-emerald-400 font-bold">{spare.rating}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleOpenEnquiry(spare.name, "Spares & Power Systems")}
                      className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 hover:border-violet-400/40 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span>Inquire Technical Specs</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* LOGISTICS & SHOWROOM VISIT CTA CALLOUT                   */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0d162d] via-[#070c18] to-[#040813] border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                Flagship Showroom Visit
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Visit Our Showroom at Pegu Bazaar, Dhemaji
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Inspect vehicles personally, take test rides, examine battery warranty cards, and consult with our on-site commercial vehicle loan specialists from Chola Finance and Bajaj Finance.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-white">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rittika Enterprise, Pegu Bazaar, Dhemaji, Assam – 787057</span>
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+91-99543-67393</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleOpenEnquiry("Schedule Showroom Visit")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                Schedule Test Drive
              </button>
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition text-center"
              >
                Showroom Location &amp; Directions
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultInterest={selectedInterest}
        defaultVehicleName={selectedProduct}
      />
    </div>
  );
}

