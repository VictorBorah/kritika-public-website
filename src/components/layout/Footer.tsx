"use client";

import React from "react";
import { Zap, Phone, Mail, MapPin, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020407] border-t border-white/10 relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px]">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white font-heading">
                  KRITIKA MICRO FOUNDATION
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  E-Rickshaw Showroom & Dealership
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering urban and regional mobility in Assam with clean electric E-Rickshaws, genuine vehicle accessories, and partner financing assistance.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400">
                Showroom Active • Assam
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
              Explore Showroom
            </span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#cinematic-sequence" className="hover:text-white transition-colors">
                  Cinematic Frame Sequence
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#vehicles" className="hover:text-white transition-colors">
                  E-Rickshaw Models
                </a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-white transition-colors">
                  Optional Accessories
                </a>
              </li>
              <li>
                <a href="#financing" className="hover:text-white transition-colors">
                  Financing Assistance
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Dealership
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-semibold">
              Showroom Location
            </span>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Rittika Enterprise, Pegu Bazaar, <br />
                  Assam – 787057, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919954367393" className="hover:text-white font-mono transition-colors">
                  +91-99543-67393
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-violet-400 shrink-0" />
                <a href="mailto:sales@kritikafoundation.com" className="hover:text-white font-mono transition-colors break-all">
                  sales@kritikafoundation.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500 font-mono">
          <div>
            <p>
              © {currentYear} Kritika Micro Foundation. All Rights Reserved.
            </p>
            <p className="text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
              Designed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> by Victor Borah
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

