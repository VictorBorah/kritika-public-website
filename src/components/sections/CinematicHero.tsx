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

  const [frame, setFrame] = useState<number>(1);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);
  const [hasStartedEntrance, setHasStartedEntrance] = useState<boolean>(false);

  // Initial entrance trigger: Start with headings hidden, then animate Heading 3 into view
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStartedEntrance(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Format frame path: /frames/ezgif-frame-001.jpg
  const getFramePath = (index: number) => {
    const padded = index.toString().padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
  };

  const paintImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Stretch to cover and fill hero container without letterboxing
    const scale = Math.max(cw / iw, ch / ih);
    const w = Math.round(iw * scale);
    const h = Math.round(ih * scale);

    // Exact horizontal and vertical centering
    const x = Math.round((cw - w) / 2);
    const y = Math.round((ch - h) / 2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#030508";
    ctx.fillRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
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
      setIsCanvasReady(true);
    }
  }, []);

  // Frame preloader with safe hoisting
  useEffect(() => {
    let isCancelled = false;

    function preloadRemainingFrames() {
      const queue: number[] = [];
      // Pass 1: Every 2nd frame for rapid responsiveness
      for (let i = 2; i <= TOTAL_FRAMES; i += 2) queue.push(i);
      // Pass 2: Remaining frames
      for (let i = 3; i <= TOTAL_FRAMES; i += 2) queue.push(i);

      let pointer = 0;
      const CONCURRENCY = 10;

      const loadNext = () => {
        if (isCancelled || pointer >= queue.length) return;
        const idx = queue[pointer++];
        const img = new window.Image();
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
    }

    // Load Frame 1 immediately
    const firstImg = new window.Image();
    firstImg.src = getFramePath(1);

    const onFirstLoad = () => {
      if (isCancelled) return;
      imagesRef.current.set(1, firstImg);
      drawFrame(1);
      preloadRemainingFrames();
    };

    if (firstImg.complete) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Canvas resize with natural viewport dimensions (prevents over-zooming/stretching)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width || window.innerWidth);
      canvas.height = Math.round(rect.height || window.innerHeight);
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

      if (scrollY <= 10) {
        if (e.deltaY > 0) {
          // Scrolling down: scrub frames until frame 269
          if (currentFrameRef.current < TOTAL_FRAMES) {
            e.preventDefault();
            const step = Math.max(3, Math.min(10, Math.round(Math.abs(e.deltaY) * 0.07)));
            stepFrameTo(currentFrameRef.current + step);
          }
        } else if (e.deltaY < 0) {
          // Scrolling up: rewind frames
          if (currentFrameRef.current > 1) {
            e.preventDefault();
            const step = Math.max(3, Math.min(10, Math.round(Math.abs(e.deltaY) * 0.07)));
            stepFrameTo(currentFrameRef.current - step);
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
          e.preventDefault();
          const step = Math.max(2, Math.round(diff * 0.18));
          stepFrameTo(currentFrameRef.current + step);
          touchStartYRef.current = currentY;
        } else if (diff < 0 && currentFrameRef.current > 1) {
          e.preventDefault();
          const step = Math.max(2, Math.round(Math.abs(diff) * 0.18));
          stepFrameTo(currentFrameRef.current - step);
          touchStartYRef.current = currentY;
        }
      }
    };

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

  // Headings visibility logic (Stage 0):
  // Line 3 ("YOUR E-RICKSHAW."): Animates into view on load / Frame 1, stays visible in Stage 0
  const showH3 = hasStartedEntrance && activeStage === 0;

  // Line 2 ("YOUR FREEDOM."): Displays when frame >= 8 (in Stage 0)
  const showH2 = hasStartedEntrance && activeStage === 0 && frame >= 8;

  // Line 1 ("YOUR JOURNEY."): Displays when frame >= 20 (in Stage 0)
  const showH1 = hasStartedEntrance && activeStage === 0 && frame >= 20;

  // Animated Signature Slogan ("Your Life Your Style") visibility logic:
  // - Hidden on page load / Frame 1
  // - Animates into view on Frame #8 or greater
  // - Stays visible & transitions colors keeping pace with frame scroll
  // - Hides smoothly when section scrolls past (frame > 258)
  // - Repeats when user scrolls back to the top and down again
  const showSlogan = hasStartedEntrance && frame >= 8 && frame <= 258;

  // Dynamic multi-stage color transitions for the slogan
  const getSloganColor = (f: number) => {
    if (f < 50) {
      // Stage 1: Warm Golden Sunrise & Amber (Frames 8 - 49)
      return {
        gradient: "from-amber-100 via-amber-300 to-orange-400",
        shadow: "rgba(245, 158, 11, 0.75)",
        shadowGlow: "rgba(251, 191, 36, 0.4)",
      };
    } else if (f < 105) {
      // Stage 2: Neon Cyan & Electric Ice (Frames 50 - 104)
      return {
        gradient: "from-white via-cyan-200 to-teal-300",
        shadow: "rgba(0, 240, 255, 0.8)",
        shadowGlow: "rgba(6, 182, 212, 0.45)",
      };
    } else if (f < 160) {
      // Stage 3: Pure EV Emerald Glow & Mint Wave (Frames 105 - 159)
      return {
        gradient: "from-emerald-200 via-teal-200 to-cyan-300",
        shadow: "rgba(0, 255, 157, 0.8)",
        shadowGlow: "rgba(16, 185, 129, 0.45)",
      };
    } else if (f < 215) {
      // Stage 4: Signature Max Crimson & Vivid Coral (Frames 160 - 214)
      return {
        gradient: "from-pink-100 via-rose-300 to-orange-400",
        shadow: "rgba(244, 63, 94, 0.8)",
        shadowGlow: "rgba(255, 51, 102, 0.45)",
      };
    } else {
      // Stage 5: Twilight Cosmic Violet & Neon Lavender (Frames 215 - 258)
      return {
        gradient: "from-violet-100 via-fuchsia-300 to-cyan-300",
        shadow: "rgba(168, 85, 247, 0.8)",
        shadowGlow: "rgba(139, 92, 246, 0.45)",
      };
    }
  };

  const sloganColor = getSloganColor(frame);

  return (
    <>
      {/* 
        FIXED VERTICAL FRAME INDICATOR HUD:
        - Stays 100% fixed at one position during scroll of the entire page
        - Ultra-slim & compact (w-9 sm:w-10, h-64 fixed height)
        - Constant height: does NOT grow, shrink, or deflect
      */}
      <div
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center justify-between w-9 sm:w-10 h-64 py-3.5 rounded-full bg-[#030508]/85 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/80 select-none pointer-events-auto"
        role="region"
        aria-label="Scroll sequence progress HUD"
      >
        {/* Top: Fixed Stage Counter */}
        <div className="flex flex-col items-center leading-none">
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            0{activeStage + 1}
          </span>
          <span className="text-[8px] font-mono text-slate-500 mt-0.5">/03</span>
        </div>

        {/* Center: Slim Vertical Progress Track (Fixed height: h-24) */}
        <div className="w-[3px] h-24 bg-white/10 rounded-full relative overflow-hidden my-auto">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-100 rounded-full"
            style={{ height: `${progressPercent}%` }}
          />
        </div>

        {/* Bottom: Progress %, Frame Number & Dedicated Reset Button Slot */}
        <div className="flex flex-col items-center leading-none gap-1">
          <span className="text-[9px] font-mono font-bold text-cyan-300 tabular-nums">
            {progressPercent}%
          </span>
          <span className="text-[8px] font-mono text-slate-500 tabular-nums tracking-tighter">
            F-{frame}
          </span>

          {/* Reset button inside dedicated fixed slot - ensures 0px container expansion */}
          <div className="h-5 w-5 flex items-center justify-center mt-0.5">
            <button
              onClick={() => stepFrameTo(1)}
              className={`p-1 rounded-full text-slate-400 hover:text-white transition-opacity duration-200 cursor-pointer ${
                frame > 1 ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              title="Reset Animation to Frame 1"
              aria-label="Reset to frame 1"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section
        id="hero"
        ref={containerRef}
        className="relative w-full h-screen min-h-screen overflow-hidden bg-[#030508]"
      >
        {/* Fallback Initial Image: Stretched to cover and fill hero container */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/frames/ezgif-frame-001.jpg"
          alt="Kritika E-Rickshaw Highway"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 pointer-events-none ${
            isCanvasReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Dynamic 269-Frame Highway Canvas Background: Stretched Full-Bleed Cover */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Subtle Graph Paper Squared Grid Overlay: Faintly visible technical blueprint squares */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundColor: "rgba(3, 5, 8, 0.42)",
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Cinematic Side Shadows to spice up left and right viewport sides */}
        <div className="absolute inset-y-0 left-0 w-44 sm:w-80 bg-gradient-to-r from-[#030508]/95 via-[#030508]/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-44 sm:w-80 bg-gradient-to-l from-[#030508]/95 via-[#030508]/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030508]/85 via-[#030508]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#030508]/95 via-[#030508]/60 to-transparent pointer-events-none z-10" />

        {/* Dynamic Animated Signature Slogan: "Your Life Your Style" (Rotated 30° CCW, Top-Right) */}
        <AnimatePresence>
          {showSlogan && (
            <motion.div
              key="hero-slogan"
              initial={{ opacity: 0, scale: 0.8, y: -24, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: -30 }}
              exit={{ opacity: 0, scale: 0.8, y: -24, rotate: -30 }}
              transition={{ duration: 0.55, ease: [0.42, 0, 0.58, 1] }}
              className="absolute top-20 sm:top-24 md:top-[25%] lg:top-[28%] xl:top-[29%] 2xl:top-[30%] right-4 sm:right-8 md:right-[15%] lg:right-[19%] xl:right-[21%] 2xl:right-[22%] z-30 pointer-events-none select-none origin-center text-right"
            >
              <div
                className={`font-signature font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.88] tracking-wide transition-all duration-700 ease-out text-transparent bg-clip-text bg-gradient-to-r ${sloganColor.gradient}`}
                style={{
                  filter: `drop-shadow(0 4px 14px ${sloganColor.shadow}) drop-shadow(0 0 32px ${sloganColor.shadowGlow})`,
                }}
              >
                <div className="whitespace-nowrap">Your Life</div>
                <div className="whitespace-nowrap">Your Style</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewport Content Container */}
        <div className="relative z-20 h-full w-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4">
          {/* Top Space */}
          <div />

          {/* Central Automotive Hero Content (Container box removed, crisp text shadows applied) */}
          <div className="my-auto py-2">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait" initial={false}>
                {activeStage === 0 && (
                  /* Stage 0: Staggered Bottom-to-Top Headings Animation with Ease-in-Out */
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.45, ease: [0.42, 0, 0.58, 1] }}
                    className="space-y-2.5 sm:space-y-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-400">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>RITTIKA ENTERPRISES • DHEMAJI</span>
                    </div>

                    {/* 
                      STAGGERED HEADINGS:
                      Bottom-to-Top entrance order:
                      - Frame 1 / Initial Load: "YOUR E-RICKSHAW." animates in first
                      - Frame 8+: "YOUR FREEDOM." displays and enters
                      - Frame 20+: "YOUR JOURNEY." displays and enters
                      - Scrolling in reverse back to top: hides in reverse, leaving "YOUR E-RICKSHAW."
                    */}
                    <div className="space-y-0.5 sm:space-y-1">
                      {/* Line 1 (Top Heading): YOUR JOURNEY. */}
                      <motion.h1
                        initial={false}
                        animate={{
                          opacity: showH1 ? 1 : 0,
                          y: showH1 ? 0 : 18,
                          filter: showH1 ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-tight sm:leading-none"
                      >
                        YOUR JOURNEY.
                      </motion.h1>

                      {/* Line 2 (Middle Heading): YOUR FREEDOM. */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: showH2 ? 1 : 0,
                          y: showH2 ? 0 : 18,
                          filter: showH2 ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300 leading-tight sm:leading-none"
                      >
                        YOUR FREEDOM.
                      </motion.div>

                      {/* Line 3 (Bottom Heading): YOUR E-RICKSHAW. */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: showH3 ? 1 : 0,
                          y: showH3 ? 0 : 18,
                          filter: showH3 ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                        className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300 leading-tight sm:leading-none"
                      >
                        YOUR E-RICKSHAW.
                      </motion.div>
                    </div>

                    <p className="text-[10px] sm:text-sm font-mono text-slate-400 tracking-wide">
                      BUILT FOR BIGGER DREAMS & CLEAN ELECTRIC MOBILITY
                    </p>

                    <p className="text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      Discover reliable commercial E-Rickshaws, exciting customization accessories, and convenient financing assistance through our associated finance partners — all under one showroom roof.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                      <a
                        href="#vehicles"
                        className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 group cursor-pointer"
                      >
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-[#030508] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </span>
                        <span>Explore E-Rickshaws</span>
                      </a>

                      <button
                        onClick={() => onOpenEnquiry("Hero Consultation")}
                        className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                        <span>Book a Test Ride</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeStage === 1 && (
                  /* Stage 1: Power & Chassis Telemetry */
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.45, ease: [0.42, 0, 0.58, 1] }}
                    className="space-y-2.5 sm:space-y-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-emerald-400">
                      <BatteryCharging className="w-3.5 h-3.5" />
                      <span>02 • POWER & CHASSIS TELEMETRY</span>
                    </div>

                    <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-tight sm:leading-none">
                      ENGINEERED FOR <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
                        ASSAM ROADS.
                      </span>
                    </h2>

                    <p className="text-[10px] sm:text-sm font-mono text-cyan-300 tracking-wide">
                      120+ KM PER CHARGE • HEAVY DUTY TUBULAR CHASSIS
                    </p>

                    <p className="text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      High-efficiency BLDC motor with robotic welded tubular steel frame and leaf-spring shock absorbers built specifically for rugged daily commutes with zero return bounce.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-[11px] sm:text-xs font-mono text-slate-300">
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 120+ km Range
                      </span>
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 500 kg Payload
                      </span>
                      <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" /> ARAI Tested
                      </span>
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <a
                        href="#vehicles"
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Check Vehicle Specifications</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {activeStage === 2 && (
                  /* Stage 2: Turnkey Road-Ready Handover */
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.45, ease: [0.42, 0, 0.58, 1] }}
                    className="space-y-2.5 sm:space-y-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                  >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-violet-400">
                      <Truck className="w-3.5 h-3.5" />
                      <span>03 • TURNKEY ROAD-READY HANDOVER</span>
                    </div>

                    <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-tight sm:leading-none">
                      READY TO DRIVE <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300">
                        HOME TODAY.
                      </span>
                    </h2>

                    <p className="text-[10px] sm:text-sm font-mono text-emerald-400 tracking-wide">
                      SAME-DAY DELIVERY* • FACTORY ACCESSORIES & SOUND
                    </p>

                    <p className="text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                      Inspect our Max Moter Elite, Apsara Comfort, and Apsara Loader models on the showroom floor at Pegu Bazaar. Complete turnkey delivery with partner financing coordination on-site.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                      <button
                        onClick={() => onOpenEnquiry("Immediate Delivery Enquiry")}
                        className="inline-flex items-center gap-2 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-xl shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Enquire on WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href="#contact"
                        className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md transition flex items-center gap-2"
                      >
                        <span>Visit Showroom</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Capability Telemetry Strip & Scroll Cue */}
          <div className="border border-white/10 bg-[#030508]/90 backdrop-blur-md py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-2xl shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 items-center">
              <div className="flex items-center gap-2 border-r border-white/5 pr-1 sm:pr-2">
                <BatteryCharging className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] sm:text-xs font-bold text-white font-mono uppercase tracking-wider">
                    120+ KM RANGE
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 truncate block">
                    High-Efficiency BLDC
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-r border-white/5 pr-1 sm:pr-2">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] sm:text-xs font-bold text-white font-mono uppercase tracking-wider">
                    SAME-DAY DELIVERY*
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 truncate block">
                    Direct from Showroom
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-r border-white/5 pr-1 sm:pr-2">
                <HandCoins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] sm:text-xs font-bold text-white font-mono uppercase tracking-wider">
                    PARTNER FINANCING
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 truncate block">
                    Minimal Documentation
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-r border-white/5 pr-1 sm:pr-2">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] sm:text-xs font-bold text-white font-mono uppercase tracking-wider">
                    100% ASSEMBLED
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 truncate block">
                    Factory Inspected & Tested
                  </span>
                </div>
              </div>

              <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center justify-center lg:justify-end gap-2 text-xs font-mono pt-1 lg:pt-0">
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
    </>
  );
}
