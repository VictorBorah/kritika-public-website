"use client";

import React from "react";
import { Sparkles, MapPin, Building, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export default function About() {
  const showroomValues = [
    {
      icon: <Building className="w-5 h-5 text-cyan-400" />,
      title: "Local Dhemaji Presence",
      desc: "Centrally located at Pegu Bazaar, Dhemaji Town, providing accessible sales and after-sales customer support for Assam.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Quality Tested Builds",
      desc: "Each vehicle is rigorously examined for chassis integrity, electrical safety, and mechanical readiness prior to customer handover.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-violet-400" />,
      title: "Driver Empowerment",
      desc: "Committed to supporting commercial operators and small business owners with transparent pricing and straightforward guidance.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#04070F] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Award className="w-4 h-4" />
              <span>About Kritika Micro Foundation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Driving Urban Mobility & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
                Economic Independence
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              At <strong className="text-white">Kritika Micro Foundation</strong>, we believe mobility should be accessible, convenient, and empowering. We bring together E-Rickshaw options, essential accessories, and financing assistance through our associated partners to make your vehicle purchasing experience simpler.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Operating out of Rittika Enterprise at Pegu Bazaar, Dhemaji, our dedicated showroom provides local drivers, entrepreneurs, and fleet owners with a dependable, transparent environment to inspect road-ready electric vehicles, configure add-on packages, and coordinate partner financing.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-emerald-400">
              <MapPin className="w-4 h-4" />
              <span>Pegu Bazaar, Dhemaji Town, Assam – 787057</span>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {showroomValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#070D1B]/80 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-heading text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
