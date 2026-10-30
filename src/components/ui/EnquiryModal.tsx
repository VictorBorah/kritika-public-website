"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageSquare, Phone, User, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
  defaultVehicleName?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultInterest = "E-Rickshaw Purchase",
  defaultVehicleName = "",
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [customNotes, setCustomNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInterest(defaultVehicleName ? `Vehicle: ${defaultVehicleName}` : defaultInterest);
      setIsSubmitted(false);
      setErrorMessage("");
    }
  }, [isOpen, defaultInterest, defaultVehicleName]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00FF9D", "#00F0FF", "#A855F7"],
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);

    // Format WhatsApp redirect
    const whatsappNumber = "919954367393";
    const textMsg = encodeURIComponent(
      `Hello Kritika Micro Foundation Showroom,\n\nI would like to enquire about:\n*Interest*: ${interest}\n*Name*: ${name.trim()}\n*Phone*: ${cleanPhone}\n${customNotes ? `*Note*: ${customNotes.trim()}\n` : ""}\nPlease share details and availability.`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${textMsg}`;

    // Open WhatsApp after brief delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all">
      <div 
        className="relative w-full max-w-lg bg-[#070C18] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 rounded-full blur-sm" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close Enquiry Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Dhemaji Showroom Direct Desk
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Book a Test Ride & Vehicle Enquiry
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Connect directly with our showroom executives. Same-day response guaranteed.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Interested In
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                >
                  <option value="E-Rickshaw Purchase">New E-Rickshaw Purchase</option>
                  <option value="Vehicle: Kritika Crimson Super DX">Kritika Crimson Super DX (Ruby)</option>
                  <option value="Vehicle: Kritika Jade Commuter Pro">Kritika Jade Commuter Pro (Teal)</option>
                  <option value="Vehicle: Kritika Cobalt Voyager Max">Kritika Cobalt Voyager Max (Blue)</option>
                  <option value="Custom Accessories Package">Optional Accessories Package</option>
                  <option value="Financing Assistance Enquiry">Vehicle Financing Assistance</option>
                  <option value="Showroom Visit / Test Ride">Showroom Visit & Test Ride</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Borah"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Mobile Number (WhatsApp Preferred) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1325] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Optional Questions / City
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Looking for delivery in Dhemaji / Lakhimpur..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1325] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Submit & Chat via WhatsApp</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-[11px] text-center text-slate-500 mt-2">
                ⚡ Direct instant connect with Rittika Enterprise showroom desk at Pegu Bazaar, Dhemaji.
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">
              Enquiry Forwarded!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. We are opening WhatsApp to instantly connect you with our showroom desk.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
