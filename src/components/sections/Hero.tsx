"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, BatteryCharging, Shield, ChevronDown, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between overflow-hidden bg-grid-cyber"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-cyan-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-wide text-slate-200">
                Official E-Rickshaw Showroom • Dhemaji, Assam
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-[1.08]">
              Your Journey. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
                Your Freedom.
              </span>{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-300">
                Your E-Rickshaw.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover reliable electric mobility, exciting customization accessories, and convenient financing assistance through our associated finance partners — all under one showroom roof in Dhemaji.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#vehicles"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:brightness-110 transition-all duration-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2.5 group"
              >
                <span>Explore E-Rickshaws</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => onOpenEnquiry("Hero Quick Consultation")}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-[#0B1220]/80 hover:bg-[#101A30] border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Fast Value Badges */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  100%
                </span>
                <span className="text-xs text-slate-400">Road-Ready Inspection</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  Same-Day*
                </span>
                <span className="text-xs text-slate-400">Delivery Available</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-mono text-violet-400">
                  Partner
                </span>
                <span className="text-xs text-slate-400">Finance Assistance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Ambient Gaming Accents */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Holographic Glowing Base Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl transform -rotate-3 scale-95" />

            <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-4 sm:p-6 bg-[#070D1B]/80 border border-cyan-500/20 backdrop-blur-xl shadow-2xl">
              {/* Top Status Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold">SHOWROOM IN-STOCK</span>
                </div>
                <span>Dhemaji Floor Model</span>
              </div>

              {/* Vehicle Hero Image */}
              <div className="relative h-64 sm:h-80 w-full flex items-center justify-center my-4 group">
                <Image
                  src="/images/erickshaw-hero.png"
                  alt="Kritika Micro Foundation E-Rickshaw Flagship Model"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,240,255,0.25)] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Feature Tags */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="block text-white font-medium">120+ km Range</span>
                    <span className="text-[10px] text-slate-400">Per Full Charge</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="block text-white font-medium">Robotic Chassis</span>
                    <span className="text-[10px] text-slate-400">Heavy Duty Steel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 text-center pt-8">
        <a
          href="#cinematic-sequence"
          className="inline-flex flex-col items-center text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <span className="tracking-wider uppercase text-[11px] mb-1">
            Experience Story In Motion
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
