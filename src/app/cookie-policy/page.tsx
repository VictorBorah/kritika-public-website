"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  ChevronRight,
  Sliders,
  Sparkles,
  Lock,
  Globe,
  Settings
} from "lucide-react";

export default function CookiePolicyPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Cookie Policy Enquiry");

  const handleOpenEnquiry = (interest?: string) => {
    setSelectedInterest(interest || "Cookie Policy Enquiry");
    setEnquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 selection:bg-[#00FF9D] selection:text-[#030508]">
      {/* Top Navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="pt-28 sm:pt-32 pb-20">
        {/* Header Breadcrumb & Title Hero */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-400">Governance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Cookie Policy</span>
          </div>

          {/* Hero Title Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <Cookie className="w-3.5 h-3.5" />
                <span>Website Transparency &amp; Cookie Standards • Ref: KMF-CK-2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Cookie Policy
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                How Kritika Micro Foundation uses cookies, local storage, and transparent telemetry to optimize vehicle showroom showcases, maintain enquiry security, and enhance regional user experience.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Effective Date: 1st November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Website: kritikafoundation.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Showroom HQ: Dhemaji, Assam, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Cookie Categories */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Section 1 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-emerald-400 font-mono text-base">01.</span>
              <span>What Are Cookies?</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>
                Cookies are small encrypted alphanumeric text files placed on your browser or device when you navigate our showroom website (<span className="text-cyan-300 font-mono">kritikafoundation.com</span>). They allow our servers to recognize your session, remember your selected vehicle model interest, and ensure rapid, fluid loading of our cinematic vehicle 3D sequences.
              </p>
              <p>
                Cookies do not give us access to your computer, personal passwords, or financial cards. They hold minimal technical tokens necessary for fluid rendering and security.
              </p>
            </div>
          </section>

          {/* Section 2: Table of Cookies */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-base">02.</span>
              <span>Categories of Cookies We Use</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category A */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold font-heading text-white">Strictly Necessary Cookies</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Essential for basic site security, form CSRF token validation, and state persistence during vehicle enquiry submissions. Without these, core features of the showroom portal cannot function.
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Examples: <span className="text-slate-400">kmf_session_id</span>, <span className="text-slate-400">csrf_token</span>
                </div>
              </div>

              {/* Category B */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold font-heading text-white">Functional &amp; Preference Cookies</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    Enhancement
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Remembers your selected vehicle interests (e.g. Max Moter Elite, Apsara Loader), drawer states, and user interface preferences across multiple page visits.
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Examples: <span className="text-slate-400">kmf_interest_pref</span>, <span className="text-slate-400">enquiry_state</span>
                </div>
              </div>

              {/* Category C */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <h3 className="text-sm font-bold font-heading text-white">Performance &amp; Cache Cookies</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">
                    Speed &amp; Asset Cache
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Caches high-resolution vehicle frames and interactive sequences locally on the device to avoid redundant mobile data consumption on subsequent page visits.
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Storage Type: <span className="text-slate-400">IndexedDB / Browser Cache</span>
                </div>
              </div>

              {/* Category D */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold font-heading text-white">Third-Party Map &amp; Font Cookies</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Showroom Directions
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Used by Google Maps embeds on our Contact page to calculate driving routes and distances to our showroom at Pegu Bazaar, Dhemaji, Assam.
                </p>
                <div className="text-[11px] font-mono text-slate-500">
                  Provider: <span className="text-slate-400">Google Inc. (Maps API)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-violet-400 font-mono text-base">03.</span>
              <span>How You Can Control or Disable Cookies</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>
                You can manage or disable cookies directly through your browser settings. Most modern browsers allow you to block all cookies, delete existing cookies, or receive a warning before a cookie is stored:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li><strong>Google Chrome:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and other site data.</li>
                <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection.</li>
                <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Prevent cross-site tracking.</li>
                <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions.</li>
              </ul>
              <p className="text-xs text-slate-400 pt-1">
                <em>Note:</em> If you choose to disable strictly necessary cookies, some interactive features such as the quick vehicle enquiry drawer or live showroom map guidance may not function optimally.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="p-8 rounded-2xl bg-gradient-to-r from-[#0a1122] via-[#060a17] to-[#040813] border border-white/15 space-y-4">
            <h2 className="text-xl font-bold font-heading text-white">
              Questions Regarding Our Cookie Practices?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have any questions regarding cookie usage, local telemetry caching, or data privacy at Kritika Micro Foundation, please contact our web administration team.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:sales@kritikafoundation.com"
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                Email Technical Desk
              </a>
              <Link
                href="/privacy-policy"
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-cyan-400 hover:text-white transition"
              >
                Read Privacy Policy &rarr;
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultInterest={selectedInterest}
      />
    </div>
  );
}

