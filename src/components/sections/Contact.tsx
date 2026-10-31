"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("E-Rickshaw Purchase");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00FF9D", "#00F0FF", "#A855F7"],
      });
    } catch {
      // ignore
    }

    setIsSent(true);

    const whatsappNumber = "919954367393";
    const text = encodeURIComponent(
      `Hello Kritika Micro Foundation Showroom,\n\nI am contacting from the website Contact Form:\n*Name*: ${name.trim()}\n*Phone*: ${cleanPhone}\n*Interested In*: ${interest}\n${message ? `*Message*: ${message.trim()}\n` : ""}\nPlease contact me with details.`
    );
    const waUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-[#030508] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>Showroom Direct Connect</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight">
            Visit Our Showroom or <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300">
              Get in Touch Today
            </span>
          </h2>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Experience the vehicles in person, test drive models, consult on accessories, or discuss partner financing with our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Direct Showroom Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Showroom Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="dark-automotive-card p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    Showroom Address
                  </span>
                  <h4 className="text-base font-bold text-white font-heading">
                    Rittika Enterprise
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">
                    Pegu Bazaar, <br />
                    Assam – 787057, India.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Telephone & WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="dark-automotive-card p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                    Direct Showroom Phone
                  </span>
                  <a
                    href="tel:+919954367393"
                    className="text-lg font-bold font-mono text-white hover:text-emerald-400 transition-colors block"
                  >
                    +91-99543-67393
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Showroom hours: Monday – Saturday (9:30 AM – 7:00 PM)
                  </p>

                  <div className="pt-3">
                    <a
                      href="https://wa.me/919954367393?text=Hello%20Kritika%20Micro%20Foundation,%20I%20would%20like%20to%20enquire%20about%20E-Rickshaws"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="dark-automotive-card p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-violet-400 uppercase tracking-widest block mb-1">
                    Email Desk
                  </span>
                  <a
                    href="mailto:sales@kritikafoundation.com"
                    className="text-sm sm:text-base font-bold font-mono text-white hover:text-violet-400 transition-colors block break-all"
                  >
                    sales@kritikafoundation.com
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Sales enquiries, dealership queries & bulk orders.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Embedded Location Map Frame */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#070D1B] h-44 relative">
              <iframe
                title="Kritika Micro Foundation Showroom Location"
                src="https://maps.google.com/maps?q=Pegu+Bazaar+Assam+787057&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-[#030508]/90 border border-white/10 text-[10px] font-mono text-slate-300">
                Pegu Bazaar, Assam – 787057
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form — Clean Dark Obsidian */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="dark-automotive-card p-6 sm:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    Direct Inquiry Desk
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    Send an Enquiry to Our Showroom
                  </h3>
                  <p className="text-[11px] sm:text-sm text-slate-300 mt-1 font-normal">
                    Fill out your contact details below. Our team directly reviews submissions and responds via phone or WhatsApp.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                    {error}
                  </div>
                )}

                {!isSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Pradip Gogoi"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1222] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit mobile"
                          className="w-full px-4 py-3 rounded-xl bg-[#0B1222] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                          Interested In
                        </label>
                        <select
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0B1222] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                        >
                          <option value="E-Rickshaw Purchase">E-Rickshaw Purchase</option>
                          <option value="Optional Accessories">Vehicle Accessories</option>
                          <option value="Financing Assistance">Financing Assistance</option>
                          <option value="Showroom Visit / Test Ride">Test Ride at Showroom</option>
                          <option value="Other Query">Other General Query</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Message / Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you're looking for, preferred model or delivery requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1222] border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Send Direct Enquiry via WhatsApp</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      *Direct WhatsApp routing ensures zero delays in getting your quote from our showroom desk.
                    </p>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold font-heading text-white">
                      Enquiry Dispatched!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-sm mx-auto">
                      Thank you for contacting Kritika Micro Foundation. WhatsApp has been opened with your prefilled details.
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition"
                    >
                      Submit Another Query
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
