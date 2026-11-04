"use client";

import React from "react";
import Link from "next/link";
import { Zap, Phone, Mail, MapPin, ArrowUp, Heart, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020407] border-t border-white/10 relative overflow-hidden text-slate-300">
      {/* Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-wider text-white font-heading">
                  KRITIKA MICRO FOUNDATION
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  E-Rickshaw Dealer &amp; Financer
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering regional and commercial mobility across Assam with high-efficiency electric passenger e-rickshaws, heavy commercial cargo loaders, genuine accessories, and authorized financing assistance.
            </p>

            <div className="space-y-2 pt-1 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">
                  Showroom Active • Dhemaji, Assam
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Authorized Multi-Brand Dealership</span>
              </div>
            </div>
          </div>

          {/* Column 1: Showroom Fleet (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold">
              Showroom Fleet
            </span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link href="/#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/#vehicles" className="hover:text-white transition-colors">
                  E-Rickshaw Models
                </Link>
              </li>
              <li>
                <Link href="/#accessories" className="hover:text-white transition-colors">
                  Optional Accessories
                </Link>
              </li>
              <li>
                <Link href="/#financing" className="hover:text-white transition-colors">
                  Vehicle Financing
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Dealership
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Products & Catalog (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">
              Products & Catalog
            </span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white text-emerald-300 font-semibold transition-colors flex items-center gap-1.5">
                  <span>All Products Catalog</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products#fleet" className="hover:text-white transition-colors">
                  Passenger E-Rickshaws
                </Link>
              </li>
              <li>
                <Link href="/products#loaders" className="hover:text-white transition-colors">
                  Heavy Cargo Loaders
                </Link>
              </li>
              <li>
                <Link href="/products#accessories" className="hover:text-white transition-colors">
                  Tangible Accessories (PAN India)
                </Link>
              </li>
              <li>
                <Link href="/products#pickup" className="hover:text-white transition-colors">
                  Showroom Pickup Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#warranty" className="hover:text-white transition-colors">
                  Warranty & Service SOP
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Pre-Booking Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest block font-bold">
              Legal & Governance
            </span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/refunds-cancellations" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Refunds & Cancellations</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy (DPDP Act)</span>
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Legal Documents</span>
                </Link>
              </li>
              <li>
                <Link href="/terms#financing-recovery" className="hover:text-white transition-colors">
                  Financing & Loan Recovery
                </Link>
              </li>
              <li>
                <Link href="/terms#jurisdiction" className="hover:text-white transition-colors">
                  Dhemaji District Jurisdiction
                </Link>
              </li>
            </ul>

            {/* Quick Location info */}
            <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight text-slate-400">
                  Rittika Enterprise, Pegu Bazaar, Dhemaji, Assam – 787057
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919954367393" className="text-[11px] font-mono hover:text-white">
                  +91-99543-67393
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <a href="mailto:sales@kritikafoundation.com" className="text-[11px] font-mono hover:text-white break-all">
                  sales@kritikafoundation.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500 font-mono">
          <div className="space-y-1">
            <p>
              © {currentYear} Kritika Micro Foundation. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Commercial E-Rickshaws &amp; Loaders are available for physical pickup/delivery at Dhemaji Showroom. Tangible accessories shipped PAN India.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/refunds-cancellations" className="hover:text-white transition-colors">
              Refunds
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookies
            </Link>

            <button
              onClick={scrollToTop}
              className="ml-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
