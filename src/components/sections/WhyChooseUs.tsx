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
import { SHOWROOM_FEATURES, DISCLAIMER_TEXT } from "@/data/features";

interface WhyChooseUsProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function WhyChooseUs({ onOpenEnquiry }: WhyChooseUsProps) {
  // Map icon string to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Layers className="w-6 h-6 text-emerald-400" />;
      case "FileCheck":
        return <FileCheck className="w-6 h-6 text-cyan-400" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-violet-400" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-emerald-400" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
      case "Sliders":
        return <Sliders className="w-6 h-6 text-violet-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-24 sm:py-32 relative bg-[#04070F] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Showroom Advantage & Assurance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Why Buy Your E-Rickshaw From <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              Kritika Micro Foundation?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            We bring together vehicle variety, hassle-free partner financing, and instant showroom handover under one seamless experience in Dhemaji.
          </p>
        </div>

        {/* 6 Feature Cards Grid with Animated Gradient Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SHOWROOM_FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="cyber-card-glow p-6 sm:p-8 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                    {getIcon(feat.icon)}
                  </div>

                  {feat.badge && (
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {feat.badge}
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  {feat.subtitle}
                </span>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-medium">KMF Verified Standard</span>
                <button
                  onClick={() => onOpenEnquiry(`Feature Query: ${feat.title}`)}
                  className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors group/btn"
                >
                  <span>Enquire</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Asterisk Disclaimer Callout */}
        <div className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-4xl mx-auto">
            {DISCLAIMER_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
