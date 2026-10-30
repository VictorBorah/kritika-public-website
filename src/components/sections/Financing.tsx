"use client";

import React from "react";
import { HandCoins, FileCheck, CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";

interface FinancingProps {
  onOpenEnquiry: (interest?: string) => void;
}

export default function Financing({ onOpenEnquiry }: FinancingProps) {
  const partnerSteps = [
    {
      step: "01",
      title: "Select Your E-Rickshaw",
      desc: "Choose your preferred model, color variant, and optional accessory package at our Dhemaji showroom.",
    },
    {
      step: "02",
      title: "Submit Basic KYC",
      desc: "Provide minimal verification documentation with guided on-ground assistance from our showroom team.",
    },
    {
      step: "03",
      title: "Partner Sanctioning*",
      desc: "Our associated finance partners evaluate your application with same-day loan sanctioning priority for eligible applicants.",
    },
    {
      step: "04",
      title: "Immediate Delivery*",
      desc: "Drive your fully assembled, road-ready E-Rickshaw home directly from the showroom floor upon formal clearance.",
    },
  ];

  return (
    <section id="financing" className="py-20 sm:py-28 relative bg-[#03060E] border-y border-white/5 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-72 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <HandCoins className="w-4 h-4" />
              <span>Customer Financing Assistance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
              Your Dream E-Rickshaw, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300">
                Made Easier to Own.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Explore convenient vehicle financing options through our associated finance partners. With minimal documentation requirements and a streamlined application process, eligible customers can benefit from same-day loan sanctioning and vehicle delivery, subject to finance partner approval and vehicle availability.
            </p>
          </div>

          {/* 4-Step Process Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {partnerSteps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-[#070D1B]/80 border border-white/10 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-cyan-400/50 block mb-2">
                    {s.step}
                  </span>
                  <h4 className="text-base font-bold font-heading text-white mb-1.5">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance & Direct CTA Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#081120] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Facilitated Through Associated Finance Partners</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                *Kritika Micro Foundation facilitates vehicle financing solely through associated licensed finance partners. All credit approvals, interest determinations, and tenure assessments remain at the sole discretion of the partner institutions.
              </p>
            </div>

            <button
              onClick={() => onOpenEnquiry("Vehicle Financing Assistance")}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 hover:brightness-110 transition shadow-lg shadow-cyan-500/20 whitespace-nowrap flex items-center gap-2 cursor-pointer"
            >
              <span>Enquire About Financing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
