"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  MessageSquare,
  Sparkles,
  BatteryCharging,
  Gauge,
  Weight,
  Users,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VehicleModel } from "@/data/vehicles";

interface VehicleLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  models: VehicleModel[];
  currentModelId: string;
  onSelectModel: (model: VehicleModel) => void;
  onOpenEnquiry: (vehicleName: string) => void;
}

export default function VehicleLightbox({
  isOpen,
  onClose,
  models,
  currentModelId,
  onSelectModel,
  onOpenEnquiry,
}: VehicleLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const currentIndex = models.findIndex((m) => m.id === currentModelId);
  const activeModel = models[currentIndex] || models[0];

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    const nextIdx = (currentIndex + 1) % models.length;
    onSelectModel(models[nextIdx]);
  }, [currentIndex, models, onSelectModel]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    const prevIdx = (currentIndex - 1 + models.length) % models.length;
    onSelectModel(models[prevIdx]);
  }, [currentIndex, models, onSelectModel]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Reset zoom on model change
  useEffect(() => {
    setIsZoomed(false);
  }, [currentModelId]);

  if (!isOpen || !activeModel) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-6xl h-[92vh] max-h-[880px] mx-4 sm:mx-6 rounded-2xl sm:rounded-3xl bg-[#070C16] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#091122]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: activeModel.colorHex }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                    {activeModel.name}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {activeModel.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  {activeModel.series} • Finish: {activeModel.colorName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>2000 × 2000 px Ultra HD</span>
              </span>

              {/* Zoom Toggle */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? "Zoom Out (Reset view)" : "Zoom In (1.5x HD detail)"}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition flex items-center gap-1.5 text-xs font-mono"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-4 h-4 text-cyan-400" />
                    <span className="hidden sm:inline">Reset</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-4 h-4 text-cyan-400" />
                    <span className="hidden sm:inline">Zoom HD</span>
                  </>
                )}
              </button>

              {/* View Raw Full Image in New Tab */}
              <a
                href={activeModel.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Open 2000x2000 raw image in new tab"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                title="Close Lightbox (Esc)"
                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 border border-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Visual Stage */}
          <div className="relative flex-1 bg-gradient-to-b from-[#040812] via-[#050B18] to-[#040812] flex items-center justify-center overflow-auto p-4 select-none">
            {/* Subtle background radial glow */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${activeModel.colorHex} 0%, transparent 65%)`,
              }}
            />

            {/* Left Chevron */}
            <button
              onClick={handlePrev}
              title="Previous vehicle (Arrow Left)"
              className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Chevron */}
            <button
              onClick={handleNext}
              title="Next vehicle (Arrow Right)"
              className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Uncropped 2000x2000 Image Container */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 cursor-${
                isZoomed ? "zoom-out" : "zoom-in"
              } ${isZoomed ? "scale-150 sm:scale-125" : "scale-100"}`}
            >
              <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
                <Image
                  src={activeModel.image}
                  alt={activeModel.name}
                  width={2000}
                  height={2000}
                  priority
                  className="max-h-[58vh] sm:max-h-[62vh] w-auto h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* Click to zoom hint overlay */}
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 hidden sm:block pointer-events-none">
              {isZoomed ? "Click image to reset view" : "Click image or button to zoom 2000×2000 HD"}
            </div>
          </div>

          {/* Bottom Bar: Model Switcher & Specs Strip */}
          <div className="px-4 sm:px-6 py-3.5 border-t border-white/10 bg-[#091122]/90 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* 3 Model Thumbnail Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {models.map((m) => {
                const isSelected = m.id === activeModel.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setIsZoomed(false);
                      onSelectModel(m);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-mono shrink-0 ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: m.colorHex }}
                    />
                    <span className="font-semibold">{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Specs & Enquiry CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-slate-300 mr-2">
                <span className="flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeModel.specs.range}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeModel.specs.payload}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeModel.specs.seating}</span>
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(activeModel.name);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

