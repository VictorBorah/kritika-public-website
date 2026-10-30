"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Sparkles, BatteryCharging, Shield, Truck, HandCoins, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 269;

interface CinematicHeroProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function CinematicHero({ onOpenEnquiry }: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isRenderingRef = useRef<boolean>(false);

  const [activeStage, setActiveStage] = useState<number>(0);

  // Helper to format frame path: ezgif-frame-001.jpg
  const getFramePath = (index: number) => {
    const padded = index.toString().padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
  };

  const paintImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Full-bleed automotive cover fill
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.fillStyle = "#030508";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  };

  const drawFrame = useCallback((fNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current.get(fNum);
    if (!img || !img.complete) {
      let fallback = fNum;
      while (fallback > 1 && (!imagesRef.current.get(fallback) || !imagesRef.current.get(fallback)?.complete)) {
        fallback--;
      }
      img = imagesRef.current.get(fallback);
    }

    if (img && img.complete) {
      paintImage(ctx, canvas, img);
    }
  }, []);

  // Frame preloader
  useEffect(() => {
    let isCancelled = false;

    // Immediately load Frame 1
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current.set(1, firstImg);
      drawFrame(1);
      preloadRemaining();
    };

    const preloadRemaining = () => {
      // Prioritize keyframes
      const queue: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 4) queue.push(i);
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!queue.includes(i)) queue.push(i);
      }

      let pointer = 0;
      const CONCURRENCY = 6;

      const loadNext = () => {
        if (isCancelled || pointer >= queue.length) return;
        const idx = queue[pointer++];
        const img = new Image();
        img.src = getFramePath(idx);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current.set(idx, img);
          loadNext();
        };
        img.onerror = () => {
          if (isCancelled) return;
          loadNext();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) loadNext();
    };

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Canvas resize with retina DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Synchronized scroll scrub
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
      );

      // 3 Stages of Entrance & Exit Typography
      if (progress < 0.32) {
        setActiveStage(0);
      } else if (progress < 0.66) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }

      if (targetFrame !== currentFrameRef.current && !isRenderingRef.current) {
        isRenderingRef.current = true;
        currentFrameRef.current = targetFrame;
        requestAnimationFrame(() => {
          drawFrame(targetFrame);
          isRenderingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[260vh] bg-[#030508]"
    >
      {/* Sticky Pinned Viewport — Stays 100% in place while user scrolls through the 260vh container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Highway Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Ambient Dark Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/95 via-[#030508]/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#030508] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030508] via-[#030508]/80 to-transparent pointer-events-none z-10" />

        {/* Top Navbar Clearance */}
        <div className="relative z-20 pt-20 sm:pt-24" />

        {/* Dynamic Center Typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {activeStage === 0 && (
                  /* Stage 0: Initial Page Load — All 3 Headings Enter the Viewport */
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>OFFICIAL E-RICKSHAW SHOWROOM • DHEMAJI, ASSAM</span>
                    </div>

                    {/* All 3 Headings rendered on load as requested */}
                    <div className="space-y-1">
                      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white leading-none">
                        YOUR JOURNEY.
                      </h1>
                      <div className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300 leading-none">
                        YOUR FREEDOM.
                      </div>
                      <div className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300 leading-none">
                        YOUR E-RICKSHAW.
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
                      BUILT FOR BIGGER DREAMS & CLEAN ELECTRIC MOBILITY
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      Discover reliable commercial E-Rickshaws, exciting customization accessories, and convenient financing assistance through our associated finance partners — all under one showroom roof in Dhemaji.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href="#vehicles"
                        className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-xl shadow-emerald-500/20 group cursor-pointer"
                      >
                        <span className="w-6 h-6 rounded-full bg-white text-[#030508] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span>Explore E-Rickshaws</span>
                      </a>

                      <button
                        onClick={() => onOpenEnquiry("Hero Consultation")}
                        className="px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Book a Test Ride</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeStage === 1 && (
                  /* Stage 1: As user scrolls, replaced by Fleet Power & Range Features */
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
                      <BatteryCharging className="w-3.5 h-3.5" />
                      <span>02 • POWER & CHASSIS TELEMETRY</span>
                    </div>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white leading-none">
                      ENGINEERED FOR <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
                        ASSAM ROADS.
                      </span>
                    </h2>

                    <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-wide">
                      120+ KM PER CHARGE • HEAVY DUTY TUBULAR CHASSIS
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      High-efficiency BLDC motor with robotic welded tubular steel frame and leaf-spring shock absorbers built specifically for rugged daily commutes with zero return bounce.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-300">
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 120+ km Range
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 500 kg Payload
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> ARAI Tested
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onOpenEnquiry("Fleet Power Query")}
                        className="px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                      >
                        <span>Check Vehicle Specifications</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeStage === 2 && (
                  /* Stage 2: Final Scroll Stage — Handover & Showroom Customization */
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-violet-400">
                      <Truck className="w-3.5 h-3.5" />
                      <span>03 • TURNKEY ROAD-READY HANDOVER</span>
                    </div>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white leading-none">
                      READY TO DRIVE <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300">
                        HOME TODAY.
                      </span>
                    </h2>

                    <p className="text-xs sm:text-sm font-mono text-emerald-400 tracking-wide">
                      SAME-DAY DELIVERY* • FACTORY ACCESSORIES & SOUND
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      Inspect our Ruby Red, Emerald Teal, and Cobalt Blue models on the showroom floor at Pegu Bazaar. Complete turnkey delivery with partner financing coordination on-site.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => onOpenEnquiry("Immediate Delivery Enquiry")}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-xl shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Enquire on WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href="#contact"
                        className="px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all flex items-center gap-2"
                      >
                        <span>Visit Dhemaji Showroom</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Discrete Vertical Stage Pagination (01 / 03) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end items-center">
              <div className="flex flex-col items-center gap-3 font-mono text-xs text-slate-400">
                <span className="text-xl font-bold text-white">
                  0{activeStage + 1}
                </span>
                <div className="w-[2px] h-20 bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-cyan-400 transition-all duration-300"
                    style={{
                      height: `${((activeStage + 1) / 3) * 100}%`,
                    }}
                  />
                </div>
                <span>03</span>
                <span className="text-[10px] tracking-widest uppercase -rotate-90 origin-center my-6 text-slate-500">
                  SCROLL STAGE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Capability Telemetry Strip (Exact Thar Anatomy) */}
        <div className="relative z-20 border-t border-white/10 bg-[#030508]/90 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 items-center">
              <div className="flex items-center gap-3 border-r border-white/5 pr-2">
                <BatteryCharging className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                    120+ KM RANGE
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    High-Efficiency BLDC
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-r border-white/5 pr-2">
                <Truck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                    SAME-DAY DELIVERY*
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    Direct from Showroom
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-r border-white/5 pr-2">
                <HandCoins className="w-5 h-5 text-violet-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                    PARTNER FINANCING
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    Minimal Documentation
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-r border-white/5 pr-2">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                    100% ASSEMBLED
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    Factory Inspected & Tested
                  </span>
                </div>
              </div>

              <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center justify-center lg:justify-end gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold tracking-wider">
                  DHEMAJI SHOWROOM
                </span>
                <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
