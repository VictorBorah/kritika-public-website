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
import { motion } from "framer-motion";
import { ACCESSORIES_DATA } from "@/data/accessories";

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
        return <Lightbulb className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case "Music":
        return <Music className="w-5 h-5 text-violet-400" />;
      case "Disc":
        return <Disc className="w-5 h-5 text-rose-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "CircleDot":
        return <CircleDot className="w-5 h-5 text-cyan-400" />;
      default:
        return <Wrench className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="accessories" className="py-20 sm:py-28 relative bg-[#040812] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-400 text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>Vehicle Customization Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
            Optional Accessories & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-teal-300">
              Customization Packages
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                    ? "bg-[#0B152A] text-violet-300 border border-violet-400/50 shadow-md shadow-violet-500/10"
                    : "bg-[#070C18] text-slate-400 border border-white/10 hover:text-white hover:bg-[#0B1325]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 7 Accessories Grid — Dark Obsidian Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="dark-automotive-card p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                    {getAccessoryIcon(item.icon)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/10 uppercase">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-cyan-400 border border-white/10">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-wide text-slate-400 block mb-1">
                  {item.tagline}
                </span>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Optional Add-On
                </span>

                <button
                  onClick={() => onOpenEnquiry(`Accessory: ${item.name}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-400 hover:text-white bg-white/[0.04] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Assembly Banner Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 p-8 rounded-3xl bg-[#070C18] border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
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
              className="px-8 py-4 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-xl shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
            >
              Customize Your Ride
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
