"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Sparkles, ChevronRight, Zap } from "lucide-react";

interface NavbarProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Story in Motion", href: "#cinematic-sequence" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "E-Rickshaws", href: "#vehicles" },
    { label: "Accessories", href: "#accessories" },
    { label: "Financing", href: "#financing" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030508]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Branding */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-wider text-white font-heading">
                    KRITIKA
                  </span>
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    DEALERSHIP
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                  Micro Foundation • Dhemaji
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-mono tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Desk */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+919954367393"
                className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors py-1.5 px-3 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91-99543-67393</span>
              </a>

              <button
                onClick={() => onOpenEnquiry("General Showroom Enquiry")}
                className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-xl group focus:outline-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-80" />
                <span className="relative px-4 py-2 text-xs font-semibold font-mono tracking-wide text-white bg-[#070B14] rounded-[11px] flex items-center gap-1.5 transition-colors group-hover:bg-[#070B14]/80">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enquire Now</span>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-[#070C18] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white font-heading">KRITIKA</span>
                    <span className="block text-[10px] text-slate-400 font-mono">Dhemaji Showroom</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 transition"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href="tel:+919954367393"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Showroom Desk</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry("Mobile Menu Enquiry");
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold font-mono text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
