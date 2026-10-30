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
  const [frameNumber, setFrameNumber] = useState<number>(1);

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

    // Use cover for immersive full-screen automotive feel like the Thar screenshot
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
      // Find nearest loaded frame
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

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current.set(1, firstImg);
      drawFrame(1);
      preloadRemaining();
    };

    const preloadRemaining = () => {
      // Load prioritized keyframes every 4th frame
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

  // Canvas resize with DPI support
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

  // Scroll listener mapping scroll progress to frame & typography stage
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const target = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));

      // 3 Stages of Entrance Typography
      if (progress < 0.35) {
        setActiveStage(0);
      } else if (progress < 0.70) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }

      setFrameNumber(target);

      if (target !== currentFrameRef.current && !isRenderingRef.current) {
        isRenderingRef.current = true;
        currentFrameRef.current = target;
        requestAnimationFrame(() => {
          drawFrame(target);
          isRenderingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  // Typography Stages based on Thar reference
  const stageData = [
    {
      stageNumber: "01",
      eyebrow: "LEGEND OF CLEAN MOBILITY • DHEMAJI, ASSAM",
      headlinePrimary: "YOUR",
      headlineAccent: "JOURNEY.",
      accentClass: "text-white",
      subtitle: "BUILT FOR BIGGER DREAMS & DAILY FREEDOM",
      description:
        "The all-new commercial E-Rickshaws from Kritika Micro Foundation — tougher, smarter, and engineered for Assam roads. Fully assembled, minimal paperwork, and same-day delivery*.",
    },
    {
      stageNumber: "02",
      eyebrow: "HEAVY-DUTY TUBULAR STEEL CHASSIS",
      headlinePrimary: "YOUR",
      headlineAccent: "FREEDOM.",
      accentClass: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-200",
      subtitle: "120+ KM RANGE PER CHARGE • ZERO BOUNCE RUNNING",
      description:
        "High-efficiency BLDC motor combined with heavy-duty leaf spring dampeners ensures smooth passenger transit with minimal maintenance and maximum earning power.",
    },
    {
      stageNumber: "03",
      eyebrow: "SHOWROOM FLOOR READY • CUSTOM FIT PACKAGES",
      headlinePrimary: "YOUR",
      headlineAccent: "E-RICKSHAW.",
      accentClass: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-300",
      subtitle: "FACTORY TAXI LIGHTS • MUSIC SYSTEM • ALLOY WHEELS",
      description:
        "Inspect our Ruby Red, Emerald Teal, and Cobalt Blue models in person at Pegu Bazaar. Complete turnkey handover with partner financing assistance on-site.",
    },
  ];

  const current = stageData[activeStage];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[280vh] bg-[#030508]"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Canvas Background Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic Vignette Overlays for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/90 via-[#030508]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030508]/90 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#030508] via-[#030508]/80 to-transparent pointer-events-none z-10" />

        {/* Top Navbar Clearance spacer */}
        <div className="relative z-20 pt-24 sm:pt-28" />

        {/* Central Automotive Hero Content (Matching Thar Reference Anatomy) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Bold Display Headings animating with scroll */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Eyebrow Label */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase">
                      {current.eyebrow}
                    </span>
                  </div>

                  {/* Giant Headline: Display font */}
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight text-white leading-[0.95]">
                    {current.headlinePrimary}{" "}
                    <span className={current.accentClass}>
                      {current.headlineAccent}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <h2 className="text-base sm:text-xl font-bold font-mono text-cyan-300 tracking-wide">
                    {current.subtitle}
                  </h2>

                  {/* Description Paragraph */}
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTAs matching Thar layout (Circular arrow button + secondary pill) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#vehicles"
                  className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-xl shadow-emerald-500/25 group cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full bg-white text-[#030508] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span>Explore E-Rickshaws</span>
                </a>

                <button
                  onClick={() => onOpenEnquiry("Hero Test Ride Enquiry")}
                  className="px-6 py-3.5 sm:py-4 rounded-full font-medium text-xs sm:text-sm text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Book a Test Ride</span>
                </button>
              </div>
            </div>

            {/* Right Column: Discrete Vertical Stage Pagination (01 / 03) */}
            <div className="hidden lg:flex lg:col-span-4 justify-end items-center">
              <div className="flex flex-col items-center gap-3 font-mono text-xs text-slate-400">
                <span className="text-lg font-bold text-white">
                  0{activeStage + 1}
                </span>
                <div className="w-[2px] h-16 bg-white/10 relative overflow-hidden">
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

        {/* Bottom Capability Telemetry Strip (Exact Thar Layout) */}
        <div className="relative z-20 border-t border-white/10 bg-[#030508]/85 backdrop-blur-md py-4 sm:py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 items-center">
              {/* Stat 1 */}
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

              {/* Stat 2 */}
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

              {/* Stat 3 */}
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

              {/* Stat 4 */}
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

              {/* Far Right Badge (Matching Thar "GO ANYWHERE") */}
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
