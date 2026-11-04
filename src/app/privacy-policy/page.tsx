"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileCheck2,
  Database,
  Building2,
  Calendar,
  MapPin,
  ChevronRight,
  UserCheck,
  Server,
  FileLock2,
  Phone,
  Mail
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Privacy & Data Protection Enquiry");

  const handleOpenEnquiry = (interest?: string) => {
    setSelectedInterest(interest || "Privacy & Data Protection Enquiry");
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
            <span className="text-cyan-400">Governance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Privacy Policy</span>
          </div>

          {/* Hero Title Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DPDP Act 2023 Compliant • Document Ref: KMF-PRIV-2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Privacy Policy
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                How Kritika Micro Foundation collects, protects, processes, and safeguards personal KYC credentials, vehicle registration details, and credit assessment information across our showroom and digital touchpoints.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Effective Date: 1st November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Data Fiduciary: Kritika Micro Foundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Grievance Office: Dhemaji, Assam, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Principles Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#070C18] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-heading text-white">Strict Purpose Limitation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your data is collected strictly for vehicle invoicing, RTO registration, authorized warranty tracking, and loan processing.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#070C18] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                <FileLock2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-heading text-white">Zero Telemarketing Sales</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never monetize, rent, or trade your contact numbers or identity papers to third-party telemarketing or data broker firms.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#070C18] border border-white/10 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-heading text-white">Consent-Driven Credit Share</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Financial records are shared with partners (Chola, Bajaj) exclusively upon your explicit authorization for loan approval.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Section 1 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-base">01.</span>
              <span>Information We Collect</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>
                In the course of providing electric vehicle sales, accessory supply, showroom enquiries, and financing assistance, Kritika Micro Foundation collects:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li><strong>Identity &amp; Contact Credentials:</strong> Name, mobile phone number, WhatsApp contact, postal address, email, and photo identification.</li>
                <li><strong>Statutory RTO Registration Records:</strong> Aadhaar Card, Voter Identity Card, PAN Card, electricity bills, and passport photographs required for official commercial vehicle registration under the Motor Vehicles Act.</li>
                <li><strong>Credit &amp; Financing Assessment Data:</strong> Bank account statements, credit health history, utility bills, and guarantor information submitted for vehicle financing evaluation with partner lenders (e.g., Chola Finance, Bajaj Finance, or in-house micro credit).</li>
                <li><strong>Vehicle Telemetry &amp; Battery Serial Numbers:</strong> Motor serial numbers, battery pack batch identifiers, chassis numbers, warranty card records, and charging cycle logs recorded during service visits.</li>
                <li><strong>Website Interaction Data:</strong> IP address, device type, browser specifications, and anonymous showroom enquiry selections recorded on our digital website.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-emerald-400 font-mono text-base">02.</span>
              <span>How We Utilize Your Information</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>Kritika Micro Foundation processes personal and commercial data solely for the following legitimate purposes:</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>Processing pre-bookings, showroom deliveries, and generating tax sale invoices.</li>
                <li>Facilitating statutory commercial E-Rickshaw registration, road tax filing, and fitness certification with the District Transport Office (DTO/RTO).</li>
                <li>Forwarding loan documentation to accredited financing partners (Chola Finance, Bajaj Finance, etc.) with the buyer&apos;s written consent.</li>
                <li>Registering battery packs and vehicle powertrains with OEMs for valid warranty protection and factory recall alerts.</li>
                <li>Dispatching shippable accessories (loaders, taxi signs, audio packages) across PAN India with certified logistics carriers.</li>
                <li>Notifying vehicle owners of scheduled servicing, battery maintenance tips, and insurance renewals.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-violet-400 font-mono text-base">03.</span>
              <span>Data Sharing &amp; Third-Party Disclosures</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>
                We do not sell, rent, monetize, or publicly disclose customer data. Data is shared strictly on a confidential need-to-know basis with:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li><strong>Institutional Financing Partners:</strong> Shared only when a customer applies for vehicle credit to enable credit health checks and loan underwriting.</li>
                <li><strong>Government Regulatory Authorities:</strong> Regional Transport Offices (DTO/RTO), commercial tax departments, and law enforcement agencies when mandated by statutory Indian law.</li>
                <li><strong>Authorized OEM Manufacturers:</strong> For warranty registration, parts validation, and technical recall communications.</li>
                <li><strong>Courier &amp; Logistics Partners:</strong> For dispatching tangible accessories and spares to customer addresses nationwide.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-cyan-400 font-mono text-base">04.</span>
              <span>Data Security &amp; Retention Standards</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>
                All digital records are maintained in secure databases using industry-standard SSL encryption and strict role-based access control. Physical loan dossiers and sale deeds are stored in fire-resistant archives at our registered office in Dhemaji, Assam.
              </p>
              <p>
                Data is retained for the active operational lifespan of the vehicle or as mandated under Indian tax and motor vehicle regulatory statutory retention limits (typically 7 years following vehicle sale).
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2.5">
              <span className="text-emerald-400 font-mono text-base">05.</span>
              <span>Your Statutory Rights (DPDP Act 2023)</span>
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-8">
              <p>Under the Digital Personal Data Protection Act 2023, you have the right to:</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>Request a summary of personal data held about you and processing activities.</li>
                <li>Request correction of inaccurate or incomplete contact details or addresses.</li>
                <li>Request erasure of personal data that is no longer required for statutory tax or vehicle warranty compliance.</li>
                <li>Withdraw consent for marketing communications or optional SMS service reminders at any time.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: GRIEVANCE OFFICER */}
          <section className="p-8 rounded-2xl bg-gradient-to-r from-[#0d162d] via-[#080d1e] to-[#040813] border border-cyan-400/30 space-y-4">
            <h2 className="text-xl font-bold font-heading text-white">
              Grievance Redressal Officer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, you may reach out to our designated Grievance Officer:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono text-slate-300">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <span className="text-slate-500 block uppercase">Officer Name &amp; Designation</span>
                <span className="text-white font-semibold block text-sm">Arun Baruah</span>
                <span className="text-cyan-400 text-xs block">Manager and Grievance &amp; Compliance Officer</span>
                <span className="text-slate-400 block">Kritika Micro Foundation</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <span className="text-slate-500 block uppercase">Showroom Address</span>
                <span className="text-slate-300 block">Rittika Enterprise, Pegu Bazaar, Dhemaji – 787057, Assam, IN.</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <span className="text-slate-500 block uppercase">Electronic Contact</span>
                <a href="mailto:sales@kritikafoundation.com" className="text-cyan-400 font-semibold block hover:underline">
                  sales@kritikafoundation.com
                </a>
                <span className="text-slate-500 block">Turnaround: 48–72 Business Hours</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => handleOpenEnquiry("Privacy Policy Inquiry")}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                Submit Privacy Inquiry
              </button>
              <Link
                href="/terms"
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-cyan-400 hover:text-white transition"
              >
                View Terms &amp; Conditions &rarr;
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

