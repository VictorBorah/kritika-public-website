"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import { useCart } from "@/context/CartContext";
import { ACCESSORIES_CATALOG, ProductItem } from "@/data/accessoriesCatalog";
import { VEHICLE_MODELS } from "@/data/vehicles";
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
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Star,
  Cpu,
  Volume2,
  Sun,
  Radio,
  Eye,
  X
} from "lucide-react";

export default function ProductsPage() {
  const { addToCart, totalItems, total } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState("Showroom Fleet Booking");
  
  // Per-product quantity state
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});
  
  // Quick View Modal
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<ProductItem | null>(null);

  const getQuantity = (id: string) => quantities[id] || 1;

  const setQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(10, qty))
    }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const qty = getQuantity(product.id);
    addToCart(product, qty);
    
    // Quick button feedback
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const handleOpenEnquiry = (topic: string) => {
    setInquiryTopic(topic);
    setModalOpen(true);
  };

  const categories = [
    "All",
    "Motors & Powertrain",
    "Controllers & Electronics",
    "Batteries & Energy",
    "Lighting & Electricals",
    "Audio & Accessories"
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? ACCESSORIES_CATALOG
      : ACCESSORIES_CATALOG.filter((p) => p.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
      case "Cpu":
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case "Gauge":
        return <Gauge className="w-3.5 h-3.5 text-amber-400" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />;
      case "Sparkles":
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
      case "Volume2":
        return <Volume2 className="w-3.5 h-3.5 text-violet-400" />;
      case "Sun":
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case "Radio":
        return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
      case "Layers":
      default:
        return <Layers className="w-3.5 h-3.5 text-violet-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry("General Showroom Inquiry")} />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Products Catalog &amp; E-Commerce Store</span>
          </div>

          {/* Hero Header */}
          <div className="mt-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 mb-4">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>PAN-India Shippable Genuine Accessories &amp; Spares</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Genuine E-Rickshaw Parts &amp; Accessories
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Order authentic high-torque BLDC motors, smart LiFePO4 batteries, digital controllers, and commercial accessories. Backed by showroom warranty and secure <strong>Cashfree Payment Gateway</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>PAN India Delivery via Freight / Courier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                  <span>Cashfree Secured (UPI, Cards, Netbanking)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  <span>100% Genuine Tested Spares</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCESSORIES STORE SECTION (8 PRODUCTS, 4 PER ROW) */}
        <section id="accessories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                <h2 className="text-2xl font-bold font-heading text-white">
                  Accessories Catalog
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold">
                  8 Products
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                4-Column Grid • Dispatch from Flagship Showroom in Dhemaji, Assam
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/20 font-bold"
                      : "bg-white/[0.02] text-slate-400 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4 PRODUCTS IN ONE ROW (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const qty = getQuantity(product.id);
              const isAdded = addedAnimation[product.id];

              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-[#070C18] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl relative"
                >
                  {/* Top Image Box */}
                  <div className="relative aspect-square w-full bg-[#020407] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#030508]/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {product.badge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setActiveQuickViewProduct(product)}
                        title="View Full Specifications"
                        className="p-1.5 rounded-lg bg-[#030508]/80 backdrop-blur-md text-slate-300 hover:text-white hover:bg-cyan-500/20 transition border border-white/10"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    </div>

                    {/* Stock Status */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>In Stock • Ready</span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span className="text-cyan-400 truncate max-w-[140px] uppercase">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold font-heading text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Spiced-Up Key Features Chips */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {product.features.slice(0, 4).map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-1.5"
                          title={feat.desc}
                        >
                          {renderIcon(feat.icon)}
                          <span className="text-[10px] font-mono text-slate-300 truncate">
                            {feat.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Stepper */}
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-base font-bold font-mono text-white">
                            ₹{product.price.toLocaleString("en-IN")}.00
                          </div>
                          {product.originalPrice && (
                            <div className="text-[10px] font-mono text-slate-500 line-through -mt-0.5">
                              ₹{product.originalPrice.toLocaleString("en-IN")}.00
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 uppercase">
                          GST Included
                        </span>
                      </div>

                      {/* Quantity Control & Add To Cart Button */}
                      <div className="flex items-center gap-2 pt-1">
                        {/* Stepper */}
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.02] p-0.5">
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, qty - 1)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white min-w-[20px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(product.id, qty + 1)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Add To Cart */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                            isAdded
                              ? "bg-emerald-500 text-[#030508] shadow-emerald-500/20"
                              : "bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 text-[#030508] shadow-cyan-500/20"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SHOWROOM FLEET CATALOG (PASSENGER & CARGO VEHICLES) */}
        <section id="fleet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-t border-white/10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Dealership Showroom Floor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Complete Assembled E-Rickshaws &amp; Loaders
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              As per our delivery policy, complete assembled electric vehicles are available exclusively via showroom pickup or local regional delivery at our Dhemaji flagship location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VEHICLE_MODELS.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl bg-[#070C18] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div className="relative h-56 w-full bg-[#020407]">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {v.badge}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      {v.series}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white mt-1">
                      {v.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {v.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{v.specs.range}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{v.specs.speed}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">Ex-Showroom Price</span>
                      <span className="text-base font-mono font-bold text-emerald-400">On Enquiry</span>
                    </div>

                    <button
                      onClick={() => handleOpenEnquiry(`Vehicle Booking: ${v.name}`)}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                      Enquire Fleet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FLOATING MINI CART INDICATOR (VISIBLE IF ITEMS > 0) */}
        {totalItems > 0 && (
          <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5">
            <Link
              href="/cart"
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-400 text-[#030508] font-mono font-bold text-xs flex items-center gap-3 shadow-2xl shadow-cyan-500/30 hover:brightness-110 transition cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#030508] text-white font-bold text-[9px] flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider text-black/80">View Cart</span>
                <span className="block text-sm">₹{total.toLocaleString("en-IN")}.00</span>
              </div>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}

        {/* QUICK VIEW SPECIFICATIONS MODAL */}
        {activeQuickViewProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveQuickViewProduct(null)}
          >
            <div
              className="w-full max-w-2xl bg-[#070C18] border border-cyan-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveQuickViewProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-full sm:w-48 aspect-square relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 shrink-0">
                  <Image
                    src={activeQuickViewProduct.image}
                    alt={activeQuickViewProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 min-w-0">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                    {activeQuickViewProduct.category}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {activeQuickViewProduct.title}
                  </h3>
                  <div className="text-lg font-mono font-bold text-emerald-400 pt-1">
                    ₹{activeQuickViewProduct.price.toLocaleString("en-IN")}.00
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    {activeQuickViewProduct.warranty} • {activeQuickViewProduct.shipping}
                  </span>
                </div>
              </div>

              {/* Full Description Points */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Technical Overview
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed list-disc list-inside">
                  {activeQuickViewProduct.fullDesc.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications Table */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Factory Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(activeQuickViewProduct.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between"
                    >
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(activeQuickViewProduct);
                    setActiveQuickViewProduct(null);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart (₹{activeQuickViewProduct.price.toLocaleString("en-IN")}.00)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={inquiryTopic}
      />
    </div>
  );
}
