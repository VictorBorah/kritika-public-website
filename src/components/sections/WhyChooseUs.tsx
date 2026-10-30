"use client";

import React from "react";
import {
  Layers,
  FileCheck,
  Zap,
  Truck,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { SHOWROOM_FEATURES, DISCLAIMER_TEXT } from "@/data/features";

interface WhyChooseUsProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function WhyChooseUs({ onOpenEnquiry }: WhyChooseUsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case "FileCheck":
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-violet-400" />;
      case "Truck":
        return <Truck className="w-5 h-5 text-emerald-400" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case "Sliders":
        return <Sliders className="w-5 h-5 text-violet-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section
      id="why-choose-us"
      className="pt-12 sm:pt-16 pb-20 sm:pb-28 relative bg-[#03060E] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Showroom Advantage & Assurance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
            Why Buy Your E-Rickshaw From <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
              Kritika Micro Foundation?
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We bring together genuine vehicle options, hassle-free partner financing, and instant showroom handover under one seamless experience in Dhemaji.
          </p>
        </motion.div>

        {/* 6 Feature Cards Grid — Dark Obsidian Background with High Legibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SHOWROOM_FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.id}
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
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                    {getIcon(feat.icon)}
                  </div>

                  {feat.badge && (
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-emerald-400 border border-white/10">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  {feat.subtitle}
                </span>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-medium">Showroom Standard</span>
                <button
                  onClick={() => onOpenEnquiry(`Advantage Query: ${feat.title}`)}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors group/btn"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Asterisk Disclaimer Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-4 rounded-xl bg-[#070C18] border border-white/10 text-center"
        >
          <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-4xl mx-auto">
            {DISCLAIMER_TEXT}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
