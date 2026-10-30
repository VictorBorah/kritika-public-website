"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Check, ArrowRight, BatteryCharging, Gauge, Users, Weight, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { VEHICLE_MODELS, VehicleModel } from "@/data/vehicles";

interface VehicleShowcaseProps {
  onOpenEnquiry: (vehicleName: string) => void;
}

export default function VehicleShowcase({ onOpenEnquiry }: VehicleShowcaseProps) {
  const [selectedModel, setSelectedModel] = useState<VehicleModel>(VEHICLE_MODELS[0]);

  return (
    <section id="vehicles" className="py-20 sm:py-28 relative bg-[#030508] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom Fleet • 2026 Models</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
            Explore Our Commercial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
              E-Rickshaw Fleet
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered with heavy-duty robotic welded chassis, energy-dense powerpacks, and verified ARAI compliance for daily commercial earning power.
          </p>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {VEHICLE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedModel.id === model.id
                    ? "bg-[#0B152A] text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/10"
                    : "bg-[#070C18] text-slate-400 border border-white/10 hover:text-white hover:bg-[#0B1325]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: model.colorHex }}
                />
                <span>{model.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Vehicle Spotlight Card — Dark Obsidian Background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="dark-automotive-card p-6 sm:p-10 rounded-3xl mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Vehicle Viewer */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
                <Image
                  src={selectedModel.image}
                  alt={selectedModel.name}
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Color & Series Chip */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: selectedModel.colorHex }}
                  />
                  <span>Finish: {selectedModel.colorName}</span>
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-emerald-400 border border-white/10">
                  {selectedModel.badge}
                </span>
              </div>
            </div>

            {/* Specifications & Highlights */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  {selectedModel.series}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {selectedModel.name}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedModel.tagline}
                </p>
              </div>

              {/* 4-Stat Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <BatteryCharging className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white font-mono">
                    {selectedModel.specs.range.split(" ")[0]} km
                  </span>
                  <span className="text-[10px] text-slate-400">Range / Charge</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Gauge className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white font-mono">
                    {selectedModel.specs.speed.split(" ")[0]} km/h
                  </span>
                  <span className="text-[10px] text-slate-400">ARAI Speed</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Weight className="w-4 h-4 text-violet-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white font-mono">
                    {selectedModel.specs.payload.split(" ")[0]} kg
                  </span>
                  <span className="text-[10px] text-slate-400">Max Payload</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-white font-mono">
                    4 + 1
                  </span>
                  <span className="text-[10px] text-slate-400">Seating Cap</span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                  Showroom Inspection Checklist:
                </span>
                {selectedModel.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry(selectedModel.name)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Enquire on This Vehicle</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#accessories"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition text-center flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>Customize with Accessories</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {VEHICLE_MODELS.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                selectedModel.id === model.id
                  ? "bg-[#0B1426] border-cyan-400/50 shadow-xl shadow-black/80"
                  : "bg-[#070C18] border-white/10 hover:border-white/20 hover:bg-[#0B1325]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
                    style={{ backgroundColor: model.colorHex }}
                  />
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {model.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-heading text-white">{model.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{model.tagline}</p>

                <div className="my-4 py-3 border-y border-white/5 space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Motor:</span>
                    <span className="text-white">{model.specs.motor.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mileage:</span>
                    <span className="text-emerald-400">{model.specs.range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payload:</span>
                    <span className="text-cyan-400">{model.specs.payload}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedModel(model);
                  onOpenEnquiry(model.name);
                }}
                className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-mono font-medium text-slate-200 bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition flex items-center justify-center gap-1.5"
              >
                <span>Instant Showroom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
