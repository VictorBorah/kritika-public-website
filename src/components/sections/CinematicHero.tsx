"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Sparkles, BatteryCharging, Shield, Truck, HandCoins, ChevronDown, CheckCircle2, RotateCcw } from "lucide-react";
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
  const touchStartYRef = useRef<number>(0);
  const isCompletedRef = useRef<boolean>(false);

  const [frame, setFrame] = useState<number>(1);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

  // Format frame path: /frames/ezgif-frame-001.jpg
  const getFramePath = (index: number) => {
    const padded = index.toString().padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
  };

  const paintImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Full-bleed automotive cover fill without distortion
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
      // Find nearest loaded fallback frame
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

    // Priority 1: Load Frame 1 immediately for instant first-paint
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current.set(1, firstImg);
      setIsLoaded(true);
      drawFrame(1);
      preloadRemainingFrames();
    };

    const preloadRemainingFrames = () => {
      // Prioritize intermediate keyframes across 269 frames for ultra-responsive scrubbing
      const queue: number[] = [];
      // Pass 1: Every 2nd frame
      for (let i = 2; i <= TOTAL_FRAMES; i += 2) queue.push(i);
      // Pass 2: Remaining odd frames
      for (let i = 3; i <= TOTAL_FRAMES; i += 2) queue.push(i);

      let pointer = 0;
      const CONCURRENCY = 10;

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

  // Step frame function with stage updating
  const stepFrameTo = useCallback((newFrame: number) => {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, newFrame));
    currentFrameRef.current = clamped;
    setFrame(clamped);

    // Update active text stage based on progress
    if (clamped <= 90) {
      setActiveStage(0);
    } else if (clamped <= 180) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }

    if (clamped >= TOTAL_FRAMES) {
      isCompletedRef.current = true;
      setIsAnimationComplete(true);
    }

    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(() => {
        drawFrame(clamped);
        isRenderingRef.current = false;
      });
    }
  }, [drawFrame]);

  // Scroll to showroom section smoothly
  const scrollToNextSection = useCallback(() => {
    const nextSec = document.getElementById("why-choose-us");
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // WHEEL & TOUCH CONTROLLER:
  // - Keeps viewport rock-solid locked at the top while frames scrub 1 -> 269
  // - Reaching frame 269 unlocks downward scrolling to naturally enter the showroom
  // - Scrolling up while at the top rewinds frames smoothly
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;

      // Only control when user is at the top of the webpage (hero section)
      if (scrollY <= 10) {
        if (e.deltaY > 0) {
          // User is scrolling down
          if (currentFrameRef.current < TOTAL_FRAMES) {
            // Animation is in progress: Lock viewport and advance frames
            e.preventDefault();
            // Dynamically scale step: ~4 to 8 frames per notch for responsive velocity
            const step = Math.max(3, Math.min(10, Math.round(Math.abs(e.deltaY) * 0.07)));
            stepFrameTo(currentFrameRef.current + step);
          } else {
            // Animation has reached the very end (frame 269):
            // Allow normal page scroll downwards into the rest of the site!
          }
        } else if (e.deltaY < 0) {
          // User is scrolling up at top: rewind frames
          if (currentFrameRef.current > 1) {
            e.preventDefault();
            const step = Math.max(3, Math.min(10, Math.round(Math.abs(e.deltaY) * 0.07)));
            stepFrameTo(currentFrameRef.current - step);
            if (currentFrameRef.current < TOTAL_FRAMES) {
              isCompletedRef.current = false;
              setIsAnimationComplete(false);
            }
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY;
      if (scrollY <= 10) {
        const currentY = e.touches[0].clientY;
        const diff = touchStartYRef.current - currentY;

        if (diff > 0 && currentFrameRef.current < TOTAL_FRAMES) {
          // Swiping up (scrolling down): advance frames
          e.preventDefault();
          const step = Math.max(2, Math.round(diff * 0.18));
          stepFrameTo(currentFrameRef.current + step);
          touchStartYRef.current = currentY;
        } else if (diff < 0 && currentFrameRef.current > 1) {
          // Swiping down (scrolling up): rewind frames
          e.preventDefault();
          const step = Math.max(2, Math.round(Math.abs(diff) * 0.18));
          stepFrameTo(currentFrameRef.current - step);
          touchStartYRef.current = currentY;
        }
      }
    };

    // Attach non-passive wheel listener
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [stepFrameTo]);

  const progressPercent = Math.round((frame / TOTAL_FRAMES) * 100);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-screen overflow-hidden bg-[#030508]"
    >
      {/* Full-Bleed Highway Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Ambient Dark Gradient Overlays for High Automotive Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/95 via-[#030508]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030508] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030508] via-[#030508]/80 to-transparent pointer-events-none z-10" />

      {/* Viewport Content Container */}
      <div className="relative z-20 h-full w-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4">
        {/* Top Space */}
        <div />

        {/* Central Automotive Hero Content */}
        <div className="my-auto py-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headings & Descriptions with Enter/Exit Animations */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {activeStage === 0 && (
                  /* Stage 0: Initial Load — All 3 Headings Animate Into Viewport */
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>OFFICIAL E-RICKSHAW SHOWROOM • DHEMAJI, ASSAM</span>
                    </motion.div>

                    {/* All 3 Headings on initial load with staggered animation */}
                    <div className="space-y-1">
                      <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white leading-none"
                      >
                        YOUR JOURNEY.
                      </motion.h1>
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300 leading-none"
                      >
                        YOUR FREEDOM.
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300 leading-none"
                      >
                        YOUR E-RICKSHAW.
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide"
                    >
                      BUILT FOR BIGGER DREAMS & CLEAN ELECTRIC MOBILITY
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                      className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal"
                    >
                      Discover reliable commercial E-Rickshaws, exciting customization accessories, and convenient financing assistance through our associated finance partners — all under one showroom roof in Dhemaji.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="flex flex-wrap items-center gap-3 pt-2"
                    >
                      <a
                        href="#vehicles"
                        className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 group cursor-pointer"
                      >
                        <span className="w-6 h-6 rounded-full bg-white text-[#030508] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span>Explore E-Rickshaws</span>
                      </a>

                      <button
                        onClick={() => onOpenEnquiry("Hero Consultation")}
                        className="px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Book a Test Ride</span>
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {activeStage === 1 && (
                  /* Stage 1: As user scrolls, replaced by Fleet Power & Range Features */
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
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
                      <a
                        href="#vehicles"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Check Vehicle Specifications</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {activeStage === 2 && (
                  /* Stage 2: Final Stage — Showroom Handover & Custom Accessories */
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
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
                        className="px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition flex items-center gap-2"
                      >
                        <span>Visit Dhemaji Showroom</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Discrete Vertical Stage Counter & Progress HUD */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
              <div className="flex flex-col items-center gap-2 font-mono text-xs text-slate-400 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
                <span className="text-2xl font-bold text-white">
                  0{activeStage + 1}
                </span>
                <span className="text-[10px] text-slate-500">/ 03</span>

                <div className="w-[3px] h-20 bg-white/10 rounded-full relative overflow-hidden my-2">
                  <div
                    className="absolute top-0 left-0 w-full bg-cyan-400 transition-all duration-150"
                    style={{ height: `${progressPercent}%` }}
                  />
                </div>

                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  {progressPercent}%
                </span>

                <span className="text-[9px] tracking-widest uppercase -rotate-90 origin-center my-4 text-slate-500">
                  FRAME {frame}
                </span>

                {frame > 1 && (
                  <button
                    onClick={() => stepFrameTo(1)}
                    className="mt-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Reset Animation to Frame 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Capability Telemetry Strip & Scroll Cue */}
        <div className="border border-white/10 bg-[#030508]/90 backdrop-blur-md py-3.5 px-4 rounded-2xl shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
            <div className="flex items-center gap-2.5 border-r border-white/5 pr-2">
              <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                  120+ KM RANGE
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  High-Efficiency BLDC
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-r border-white/5 pr-2">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="truncate">
                <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                  SAME-DAY DELIVERY*
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  Direct from Showroom
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-r border-white/5 pr-2">
              <HandCoins className="w-4 h-4 text-violet-400 shrink-0" />
              <div className="truncate">
                <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                  PARTNER FINANCING
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  Minimal Documentation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-r border-white/5 pr-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="block text-xs font-bold text-white font-mono uppercase tracking-wider">
                  100% ASSEMBLED
                </span>
                <span className="text-[10px] text-slate-400 truncate block">
                  Factory Inspected & Tested
                </span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center justify-center lg:justify-end gap-2 text-xs font-mono">
              {frame < TOTAL_FRAMES ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>SCROLL TO ANIMATE</span>
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                  <button
                    onClick={scrollToNextSection}
                    className="text-[10px] text-slate-500 hover:text-slate-300 underline underline-offset-2 ml-1 cursor-pointer"
                  >
                    Skip
                  </button>
                </div>
              ) : (
                <button
                  onClick={scrollToNextSection}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 transition text-[11px] font-bold animate-pulse cursor-pointer"
                >
                  <span>EXPLORE SHOWROOM</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
