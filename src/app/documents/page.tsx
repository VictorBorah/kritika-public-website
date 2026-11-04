"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  ChevronLeft,
  Sparkles,
  Download,
  Maximize2,
  ExternalLink,
  Eye,
  X,
  Scale,
  Landmark,
  BadgeCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

interface LegalDoc {
  id: string;
  order: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  issuer: string;
  authority: string;
  description: string;
  fileName: string;
  fileUrl: string;
  highlights: string[];
}

const LEGAL_DOCUMENTS: LegalDoc[] = [
  {
    id: "cin",
    order: "01",
    title: "Company Certificate of Incorporation (CIN)",
    category: "Ministry of Corporate Affairs (MCA)",
    badge: "Statutory Incorporation",
    badgeColor: "emerald",
    issuer: "Registrar of Companies (RoC), Central Registration Centre",
    authority: "Ministry of Corporate Affairs, Government of India",
    description:
      "Statutory Certificate of Incorporation legally establishing Kritika Micro Foundation as an active corporate entity registered under Section 8 of the Companies Act, 2013.",
    fileName: "Kritika_CIN_compressed.pdf",
    fileUrl: "/legal_docs/Kritika_CIN_compressed.pdf",
    highlights: [
      "Companies Act 2013 Recognition",
      "Corporate Identity Number Issued",
      "Registrar of Companies Authenticated"
    ]
  },
  {
    id: "license",
    order: "02",
    title: "License under Section 8 (Companies Act, 2013)",
    category: "Central Government Statutory License",
    badge: "Section 8 License",
    badgeColor: "cyan",
    issuer: "Office of the Regional Director / Registrar of Companies",
    authority: "Government of India, Ministry of Corporate Affairs",
    description:
      "Statutory License granted under Section 8(1) of the Companies Act, 2013, authorizing the organization to operate for community welfare, micro-credit empowerment, and social enterprise.",
    fileName: "KRITIKA_LICENSE_compressed.pdf",
    fileUrl: "/legal_docs/KRITIKA_LICENSE_compressed.pdf",
    highlights: [
      "Granted under Section 8(1) Companies Act",
      "Social Welfare & Non-Profit Directive",
      "Central Government Sanction"
    ]
  },
  {
    id: "moa",
    order: "03",
    title: "Memorandum of Association (MoA)",
    category: "Charter & Welfare Objectives",
    badge: "Charter Document",
    badgeColor: "violet",
    issuer: "Ministry of Corporate Affairs, Govt. of India",
    authority: "Statutory Constitution of Foundation",
    description:
      "The foundational charter defining the formal constitutional scope, non-profit community welfare objects, electric mobility facilitation, micro-credit support, and operational mandate.",
    fileName: "MoA_compressed.pdf",
    fileUrl: "/legal_docs/MoA_compressed.pdf",
    highlights: [
      "Official Objects & Purpose Clause",
      "Authorized Capital & Subscriber Clauses",
      "Micro-Credit & EV Dealership Mandate"
    ]
  },
  {
    id: "aoa",
    order: "04",
    title: "Articles of Association (AoA)",
    category: "Corporate Governance & By-Laws",
    badge: "Governance By-Laws",
    badgeColor: "emerald",
    issuer: "Ministry of Corporate Affairs, Govt. of India",
    authority: "Board & Operational Regulations",
    description:
      "Internal constitutional regulations governing board governance, management proceedings, fiduciary oversight, and compliance frameworks of Kritika Micro Foundation.",
    fileName: "AOA_KRITIKA_compressed.pdf",
    fileUrl: "/legal_docs/AOA_KRITIKA_compressed.pdf",
    highlights: [
      "Board Administration & Meetings",
      "Fiduciary Accountability Rules",
      "Statutory Audit & Reporting Rules"
    ]
  },
  {
    id: "pan",
    order: "05",
    title: "Company Permanent Account Number (PAN)",
    category: "Taxation & Revenue Identity",
    badge: "Tax Identification",
    badgeColor: "amber",
    issuer: "Income Tax Department",
    authority: "Ministry of Finance, Government of India",
    description:
      "Official Permanent Account Number (PAN) issued to Kritika Micro Foundation by the Income Tax Department, establishing its formal fiscal identity and tax compliance standing.",
    fileName: "PAN_compressed.pdf",
    fileUrl: "/legal_docs/PAN_compressed.pdf",
    highlights: [
      "Income Tax Department Certified",
      "Corporate Tax Standing",
      "Commercial Banking Linkage"
    ]
  },
  {
    id: "banking",
    order: "06",
    title: "Official Company Bank Details",
    category: "Banking & Settlement Verification",
    badge: "Verified Commercial Account",
    badgeColor: "blue",
    issuer: "Authorized Commercial Banking Institution",
    authority: "Corporate Financial Settlement Desk",
    description:
      "Official verification letter and account docket detailing the authorized corporate bank account, IFSC routing, and banking credentials for legitimate commercial settlements.",
    fileName: "Banking Details_compressed.pdf",
    fileUrl: "/legal_docs/Banking%20Details_compressed.pdf",
    highlights: [
      "Official Corporate Account",
      "IFSC & NEFT/RTGS Verified",
      "Prevents Unauthorized Transactions"
    ]
  }
];

export default function LegalDocumentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState("Legal Document Verification");
  const [activeLightboxDoc, setActiveLightboxDoc] = useState<LegalDoc | null>(null);

  const navigateLightbox = useCallback((direction: number) => {
    setActiveLightboxDoc((current) => {
      if (!current) return null;
      const currentIndex = LEGAL_DOCUMENTS.findIndex((d) => d.id === current.id);
      if (currentIndex === -1) return current;
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = LEGAL_DOCUMENTS.length - 1;
      if (newIndex >= LEGAL_DOCUMENTS.length) newIndex = 0;
      return LEGAL_DOCUMENTS[newIndex];
    });
  }, []);

  // Close lightbox on Escape key & support Left/Right navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxDoc) return;
      if (e.key === "Escape") {
        setActiveLightboxDoc(null);
      } else if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
      } else if (e.key === "ArrowRight") {
        navigateLightbox(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxDoc, navigateLightbox]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxDoc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeLightboxDoc]);

  const handleOpenEnquiry = (topic: string) => {
    setInquiryTopic(topic);
    setModalOpen(true);
  };

  

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenEnquiry={() => handleOpenEnquiry("General Inquiry")} />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Legal Documents</span>
          </div>

          {/* Hero Header Card */}
          <div className="mt-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Statutory &amp; Corporate Transparency Repository</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Legal Documents &amp; Certificates
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Official statutory registrations, incorporation dockets, charter deeds, tax identity, and banking credentials of <strong>Kritika Micro Foundation</strong>. Inspect, enlarge, or download verified PDF records.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Verified: November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Kritika Micro Foundation (Sec. 8 License)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Pegu Bazaar, Dhemaji – 787057, Assam, IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anti-Fraud & Direct Verification Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 rounded-2xl bg-amber-500/[0.07] border border-amber-500/30 text-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold font-heading text-white block">
                  Official Verification &amp; Anti-Fraud Guidance
                </span>
                <p>
                  As mandated under our Terms &amp; Conditions, payments made to unauthorized individuals, unofficial QR codes, or private bank accounts will not be recognized. Always cross-check the official corporate credentials and bank details displayed below before making booking deposits or entering into financing agreements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Legal Document Showcase Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {LEGAL_DOCUMENTS.map((doc) => {
              return (
                <section
                  key={doc.id}
                  id={doc.id}
                  className="rounded-2xl bg-[#070C18] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-white/10 bg-white/[0.01]">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                          {doc.order}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {doc.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                        {doc.badge}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {doc.title}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {doc.description}
                    </p>

                    {/* Authority Tag */}
                    <div className="flex items-center gap-2 mt-3 text-[11px] font-mono text-slate-400">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{doc.issuer}</span>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer Box */}
                  <div className="p-4 sm:p-6 bg-black/40">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#020407] shadow-inner h-80 sm:h-96">
                      <iframe
                        src={`${doc.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        title={doc.title}
                        className="w-full h-full border-0 pointer-events-auto"
                        loading="lazy"
                      />

                      {/* Quick Hover Controls Overlay */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#030508]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-lg">
                        <button
                          onClick={() => setActiveLightboxDoc(doc)}
                          title="Enlarge & Read in Lightbox"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-cyan-500/20 transition cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4 text-cyan-400" />
                        </button>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open PDF in New Browser Tab"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-emerald-500/20 transition cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4 text-emerald-400" />
                        </a>
                        <a
                          href={doc.fileUrl}
                          download={doc.fileName}
                          title="Download PDF File"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        >
                          <Download className="w-4 h-4 text-slate-300" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.01] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveLightboxDoc(doc)}
                        className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-white/5 hover:bg-cyan-500/15 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Enlarge Viewer</span>
                      </button>

                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span>Full Page</span>
                      </a>
                    </div>

                    <a
                      href={doc.fileUrl}
                      download={doc.fileName}
                      className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Verification Assistance Desk */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d162d] via-[#080d1e] to-[#040813] border border-cyan-400/30 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Official Compliance Desk</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Require Certified True Copies for Institutional Due Diligence?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Financiers, bank officers, and commercial vehicle fleet operators may request physical stamped copies of our Section 8 certificate and charter dossiers from our registered headquarters.
                </p>
              </div>

              <button
                onClick={() => handleOpenEnquiry("Certified Document Copies Request")}
                className="px-6 py-3.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20 transition cursor-pointer shrink-0 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Contact Compliance Desk</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      {activeLightboxDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxDoc(null)}
        >
          <div
            className="w-full max-w-5xl max-h-[95vh] bg-[#070C18] border border-cyan-400/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {activeLightboxDoc.order}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold font-heading text-white truncate">
                    {activeLightboxDoc.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    {activeLightboxDoc.issuer}
                  </span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeLightboxDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition flex items-center gap-1.5 text-xs font-mono"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>

                <a
                  href={activeLightboxDoc.fileUrl}
                  download={activeLightboxDoc.fileName}
                  className="px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => setActiveLightboxDoc(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 border border-transparent transition cursor-pointer ml-1"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 text-rose-400" />
                </button>
              </div>
            </div>

            {/* Modal Body: Large Aspect Ratio PDF Viewer */}
            <div className="flex-1 min-h-[60vh] max-h-[75vh] w-full bg-[#020407] p-2 sm:p-4">
              <iframe
                src={`${activeLightboxDoc.fileUrl}#view=FitH&toolbar=1&navpanes=1`}
                title={activeLightboxDoc.title}
                className="w-full h-full rounded-xl border border-white/10 bg-[#030508]"
              />
            </div>

            {/* Modal Footer: Document Sequencer (< Previous | Next >) */}
            <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between gap-4 bg-white/[0.01] text-xs font-mono">
              <button
                onClick={() => navigateLightbox(-1)}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 flex items-center gap-1.5 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-cyan-400" />
                <span>Previous Document</span>
              </button>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Document {activeLightboxDoc.order} of {LEGAL_DOCUMENTS.length} • Press ESC to close
              </span>

              <button
                onClick={() => navigateLightbox(1)}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Next Document</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={inquiryTopic}
      />
    </div>
  );
}
