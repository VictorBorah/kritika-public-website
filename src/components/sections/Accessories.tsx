"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Zap,
  Sparkles,
  Music,
  Disc,
  ShieldCheck,
  CircleDot,
  ArrowRight,
  Wrench,
  Check,
  CheckCircle2,
} from "lucide-react";
import { ACCESSORIES_DATA, AccessoryItem } from "@/data/accessories";

interface AccessoriesProps {
  onOpenEnquiry: (accessoryName: string) => void;
}

export default function Accessories({ onOpenEnquiry }: AccessoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Lighting", "Audio", "Protection", "Styling"];

  const filtered =
    selectedCategory === "All"
      ? ACCESSORIES_DATA
      : ACCESSORIES_DATA.filter((item) => item.category === selectedCategory);

  const getAccessoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb":
        return <Lightbulb className="w-6 h-6 text-amber-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
      case "Music":
        return <Music className="w-6 h-6 text-violet-400" />;
      case "Disc":
        return <Disc className="w-6 h-6 text-rose-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case "CircleDot":
        return <CircleDot className="w-6 h-6 text-cyan-400" />;
      default:
        return <Wrench className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="accessories" className="py-24 sm:py-32 relative bg-[#040812] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono">
            <Wrench className="w-4 h-4" />
            <span>Vehicle Customization Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Optional Accessories & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">
              Customization Packages
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Upgrade functionality, night visibility, passenger comfort, and vehicle protection. Available individually or bundled with your fully assembled vehicle.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-violet-500/20 text-violet-300 border border-violet-400/50 shadow-md shadow-violet-500/20"
                    : "bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 7 Accessories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="cyber-card-glow p-6 sm:p-7 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getAccessoryIcon(item.icon)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-mono uppercase tracking-wide text-slate-400 block mb-1">
                  {item.tagline}
                </span>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Optional Add-On
                </span>

                <button
                  onClick={() => onOpenEnquiry(`Accessory: ${item.name}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Assembly Banner Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0B1528] via-[#091122] to-[#0B1528] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Professional Showroom Pre-Assembly Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Customize Your Ride with Turnkey Handover
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choose any combination of taxi lights, music systems, protective covers, or alloy rims. Our certified showroom technicians mount, wire, and seal your accessories onto the vehicle prior to final delivery.
              </p>
            </div>

            <button
              onClick={() => onOpenEnquiry("Customized Ride Package Request")}
              className="px-8 py-4 rounded-xl font-semibold text-sm text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:brightness-110 transition shadow-xl shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
            >
              Customize Your Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
