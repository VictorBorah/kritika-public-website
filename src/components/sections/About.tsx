"use client";

import React from "react";
import { MapPin, Building, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const showroomValues = [
    {
      icon: <Building className="w-5 h-5 text-cyan-400" />,
      title: "Direct Showroom Presence",
      desc: "Centrally located at Pegu Bazaar, providing accessible sales and after-sales customer support for Assam.",
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
    <section id="about" className="py-20 sm:py-28 relative bg-[#04070F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Story with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>About Kritika Micro Foundation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Driving Urban Mobility & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
                Economic Independence
              </span>
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
              At <strong className="text-white">Kritika Micro Foundation</strong>, we believe mobility should be accessible, convenient, and empowering. We bring together E-Rickshaw options, essential accessories, and financing assistance through our associated partners to make your vehicle purchasing experience simpler.
            </p>

            <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed font-normal">
              Operating out of Rittika Enterprise at Pegu Bazaar, our dedicated showroom provides local drivers, entrepreneurs, and fleet owners with a dependable, transparent environment to inspect road-ready electric vehicles, configure add-on packages, and coordinate partner financing.
            </p>

            <div className="pt-2 flex items-center gap-2.5 text-xs font-mono text-emerald-400">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Pegu Bazaar, Assam – 787057</span>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars with Motion */}
          <div className="lg:col-span-6 space-y-3.5">
            {showroomValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="dark-automotive-card p-5 sm:p-6 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
