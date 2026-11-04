"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Zap,
  Package,
  Layers,
  Truck,
  Building2,
  ShieldCheck,
  FileText,
  BadgePercent,
  MessageSquare
} from "lucide-react";

interface NavbarProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"products" | "company" | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(true);
  
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  // Dropdown hover handlers with slight delay to prevent jitter
  const handleMouseEnter = (menu: "products" | "company") => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const isProductsActive = pathname.startsWith("/products");
  const isDocumentsActive = pathname.startsWith("/documents") || pathname.startsWith("/legal-documents");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030508]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Branding */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-wider text-white font-heading">
                    KRITIKA
                  </span>
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    DEALERSHIP
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                  Micro Foundation • Dhemaji
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* 1. Home */}
              <Link
                href={isHomePage ? "#hero" : "/"}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-mono tracking-wide text-slate-300 hover:text-white hover:bg-white/5"
              >
                Home
              </Link>

              {/* 2. Products (Multi-level Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("products")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "products" ? null : "products")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-mono tracking-wide flex items-center gap-1.5 cursor-pointer ${
                    isProductsActive || activeDropdown === "products"
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  aria-expanded={activeDropdown === "products"}
                >
                  <span>Products</span>
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Catalog
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "products" ? "rotate-180 text-cyan-300" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === "products" && (
                  <div
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#070C18]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <Link
                      href="/products"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                          <span>All Products</span>
                          <span className="text-[8px] px-1 py-0.2 rounded font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                            Explore
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Full catalog with vehicles, loaders &amp; spares
                        </span>
                      </div>
                    </Link>

                    <Link
                      href={isHomePage ? "#vehicles" : "/#vehicles"}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          E-Rickshaws
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Passenger &amp; commercial EV fleet models
                        </span>
                      </div>
                    </Link>

                    <Link
                      href={isHomePage ? "#accessories" : "/#accessories"}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Accessories
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Genuine spares, parts &amp; PAN-India items
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/products#loaders"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Cargo Loaders
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          High-payload commercial cargo carriers
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Company (Multi-level Dropdown: About Us, Why Us, Legal Documents) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "company" ? null : "company")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-mono tracking-wide flex items-center gap-1.5 cursor-pointer ${
                    activeDropdown === "company" || isDocumentsActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                  aria-expanded={activeDropdown === "company"}
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "company" ? "rotate-180 text-cyan-300" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === "company" && (
                  <div
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#070C18]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <Link
                      href={isHomePage ? "#about" : "/#about"}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          About Us
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          Our mission, leadership &amp; vision
                        </span>
                      </div>
                    </Link>

                    <Link
                      href={isHomePage ? "#why-choose-us" : "/#why-choose-us"}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Why Choose Us
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          5-layer dealership advantage &amp; guarantees
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/documents"
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group ${
                        isDocumentsActive ? "bg-cyan-500/10 border border-cyan-400/30" : ""
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                          <span>Legal Documents</span>
                          <span className="text-[8px] px-1 py-0.2 rounded font-mono font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">
                            Verified
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight mt-0.5">
                          CIN, Sec. 8 License, MoA, AoA, PAN &amp; Bank
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. Financing */}
              <Link
                href={isHomePage ? "#financing" : "/#financing"}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-mono tracking-wide text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
              >
                <BadgePercent className="w-3.5 h-3.5 text-emerald-400" />
                <span>Financing</span>
              </Link>

              {/* 5. Contact */}
              <Link
                href={isHomePage ? "#contact" : "/#contact"}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 font-mono tracking-wide text-slate-300 hover:text-white hover:bg-white/5"
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Desk */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+919954367393"
                className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors py-1.5 px-3 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91-99543-67393</span>
              </a>

              <button
                onClick={() => onOpenEnquiry("General Showroom Enquiry")}
                className="px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wide text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border border-emerald-400/30 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#070C18] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white font-heading">KRITIKA</span>
                    <span className="block text-[10px] text-slate-400 font-mono">Micro Foundation</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {/* Home */}
                <Link
                  href={isHomePage ? "#hero" : "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>

                {/* Products Collapsible Group */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden my-1">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-cyan-400" />
                      <span>Products</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Catalog
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileProductsOpen && (
                    <div className="pl-6 pr-2 py-1 space-y-1 border-t border-white/5 bg-black/20">
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-xs font-mono transition ${
                          isProductsActive
                            ? "text-cyan-300 font-bold bg-cyan-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        • All Products Catalog
                      </Link>
                      <Link
                        href={isHomePage ? "#vehicles" : "/#vehicles"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition"
                      >
                        • E-Rickshaws
                      </Link>
                      <Link
                        href={isHomePage ? "#accessories" : "/#accessories"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition"
                      >
                        • Accessories (PAN India)
                      </Link>
                      <Link
                        href="/products#loaders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition"
                      >
                        • Cargo Loaders
                      </Link>
                    </div>
                  )}
                </div>

                {/* Company Collapsible Group */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden my-1">
                  <button
                    onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>Company</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        mobileCompanyOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileCompanyOpen && (
                    <div className="pl-6 pr-2 py-1 space-y-1 border-t border-white/5 bg-black/20">
                      <Link
                        href={isHomePage ? "#about" : "/#about"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition"
                      >
                        • About Us
                      </Link>
                      <Link
                        href={isHomePage ? "#why-choose-us" : "/#why-choose-us"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition"
                      >
                        • Why Choose Us
                      </Link>
                      <Link
                        href="/documents"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-xs font-mono transition ${
                          isDocumentsActive
                            ? "text-cyan-300 font-bold bg-cyan-500/10"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        • Legal Documents
                      </Link>
                    </div>
                  )}
                </div>

                {/* Financing */}
                <Link
                  href={isHomePage ? "#financing" : "/#financing"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-2">
                    <BadgePercent className="w-4 h-4 text-emerald-400" />
                    <span>Financing</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>

                {/* Contact */}
                <Link
                  href={isHomePage ? "#contact" : "/#contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                    <span>Contact</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="tel:+919954367393"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Showroom Desk</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry("Mobile Menu Enquiry");
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold font-mono text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:brightness-110 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
