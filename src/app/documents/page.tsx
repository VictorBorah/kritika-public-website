"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import {
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  AlertCircle,
  Clock,
  ArrowRight
} from "lucide-react";

export default function LegalDocumentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState("Legal Documents Request");

  const handleOpenEnquiry = (topic: string) => {
    setInquiryTopic(topic);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry("General Inquiry")} />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Breadcrumb Navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Legal Documents</span>
          </div>

          {/* Hero Header */}
          <div className="mt-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Statutory &amp; Dealership Repository</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Legal Documents
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Official statutory certificates, dealership disclosures, and regulatory documents for Kritika Micro Foundation.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Version: 2026.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Entity: Kritika Micro Foundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Dhemaji, Assam, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blank Scaffold Body - Reserved for Future Documents */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 rounded-2xl bg-[#070C18] border border-white/10 text-center space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
              <Clock className="w-8 h-8" />
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Document Repository Under Preparation
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                This section is reserved for statutory registration certificates, dealership trade licenses, and authorized manufacturer affiliation documents. All relevant files are currently being updated by our compliance desk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-lg mx-auto flex items-center gap-3 text-xs text-slate-300 text-left">
              <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                For immediate verification of dealership licenses or official copies of certificates, please contact our showroom office directly.
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenEnquiry("Legal Documents Verification")}
                className="px-6 py-3 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Contact Compliance Desk</span>
              </button>

              <Link
                href="/terms"
                className="px-6 py-3 rounded-xl text-xs font-mono text-cyan-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-2"
              >
                <span>View Terms &amp; Conditions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={inquiryTopic}
      />
    </div>
  );
}

