"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, ArrowDown, Shield, Battery, Gauge } from "lucide-react";

const TOTAL_FRAMES = 269;

interface ScrollAnimationProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function ScrollAnimation({ onOpenEnquiry }: ScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isRenderingRef = useRef<boolean>(false);
  
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [activeStoryStage, setActiveStoryStage] = useState(0);

  // Helper to format frame path: ezgif-frame-001.jpg
  const getFramePath = (index: number) => {
    const padded = index.toString().padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
  };

  // Render a specific frame on the canvas
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current.get(frameNumber);
    if (!img || !img.complete) {
      // Fallback: search nearest loaded frame
      let fallbackIndex = frameNumber;
      while (fallbackIndex > 1 && (!imagesRef.current.get(fallbackIndex) || !imagesRef.current.get(fallbackIndex)?.complete)) {
        fallbackIndex--;
      }
      const fallbackImg = imagesRef.current.get(fallbackIndex);
      if (fallbackImg && fallbackImg.complete) {
        paintImage(ctx, canvas, fallbackImg);
      }
      return;
    }

    paintImage(ctx, canvas, img);
  }, []);

  const paintImage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // Calculate aspect fit (contain)
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.fillStyle = "#030508";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  };

  // Progressive frame preloader
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    // 1. Load First Frame with maximum priority
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current.set(1, firstImg);
      setIsFirstFrameLoaded(true);
      drawFrame(1);
      startBackgroundPreload();
    };
    firstImg.onerror = () => {
      if (isCancelled) return;
      startBackgroundPreload();
    };

    // 2. Progressive background preload
    const startBackgroundPreload = () => {
      // Load key frames first (every 6th frame) for instant scrubbing
      const keyframeIndices: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 6) {
        keyframeIndices.push(i);
      }

      // Rest of the frames
      const remainingIndices: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!keyframeIndices.includes(i)) remainingIndices.push(i);
      }

      const loadQueue = [...keyframeIndices, ...remainingIndices];
      let queuePointer = 0;
      const CONCURRENCY = 6;

      const loadNextInQueue = () => {
        if (isCancelled || queuePointer >= loadQueue.length) return;
        const frameIdx = loadQueue[queuePointer++];
        const img = new Image();
        img.src = getFramePath(frameIdx);

        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current.set(frameIdx, img);
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          loadNextInQueue();
        };

        img.onerror = () => {
          if (isCancelled) return;
          loadedCount++;
          loadNextInQueue();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNextInQueue();
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle canvas sizing with devicePixelRatio support
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for mobile efficiency
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [drawFrame]);

  // Scroll listener mapped to frame sequence with RequestAnimationFrame
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

      // Determine narrative stage
      if (progress < 0.28) {
        setActiveStoryStage(0);
      } else if (progress < 0.62) {
        setActiveStoryStage(1);
      } else if (progress < 0.85) {
        setActiveStoryStage(2);
      } else {
        setActiveStoryStage(3);
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  const stages = [
    {
      title: "The Fleet Approaches",
      tagline: "Eco-Friendly Electric Transit for Assam",
      desc: "Robust electric power delivering emission-free urban mobility with unmatched passenger economy.",
      badge: "Stage 01 • Horizon Arrival",
    },
    {
      title: "Precision Engineering",
      tagline: "Full-Metal Reinforced Roll-Cage",
      desc: "High-tensile tubular chassis built to absorb rugged city and rural road demands year after year.",
      badge: "Stage 02 • Road-Tested Build",
    },
    {
      title: "Illuminated Night Mastery",
      tagline: "Rooftop Taxi Sign & Dual Headlamps",
      desc: "High-visibility LED projectors and roof taxi signage keep your routes safe, prominent, and passenger-friendly.",
      badge: "Stage 03 • Commercial Ready",
    },
    {
      title: "Drive Your Future",
      tagline: "Showroom Availability at Dhemaji",
      desc: "Test ride your choice of color and accessory package today. Immediate delivery on clearance.",
      badge: "Stage 04 • Own Your Ride",
    },
  ];

  const currentStage = stages[activeStoryStage];

  return (
    <section
      id="cinematic-sequence"
      ref={containerRef}
      className="relative h-[360vh] bg-[#030508] border-y border-white/10"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Canvas Background Viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Ambient Top & Bottom Vignette Overlays for readability */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#030508] via-[#030508]/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030508] via-[#030508]/75 to-transparent pointer-events-none z-10" />

        {/* Top Header Controls & Telemetry */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div className="font-mono text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">CINEMATIC PRODUCT REVEAL</span>
              <span className="hidden sm:inline text-slate-500"> • SCROLL TO CONTROL</span>
            </div>
          </div>

          {/* Sync Progress Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[11px] font-mono text-slate-400">
              Frame {currentFrameRef.current} / {TOTAL_FRAMES}
            </span>
            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150"
                style={{ width: `${(currentFrameRef.current / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Storytelling Subtitles (Floating Card) */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 w-full pb-8 sm:pb-12 text-center">
          <div className="inline-block p-6 sm:p-8 rounded-2xl bg-[#070D1B]/85 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-black/80 max-w-xl mx-auto transition-all duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {currentStage.badge}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              {currentStage.title}
            </h2>

            <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1">
              {currentStage.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
              {currentStage.desc}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-cyan-400" /> 25 km/h Max
              </span>
              <span className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" /> 130+ km
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-violet-400" /> ARAI Tested
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>Keep scrolling down to examine vehicle models & accessories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
