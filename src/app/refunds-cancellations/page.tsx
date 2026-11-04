"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Truck,
  RotateCcw,
  Ban,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  HelpCircle,
  Clock,
  CreditCard,
  PackageCheck
} from "lucide-react";

export default function RefundsCancellationsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Refund & Cancellation Enquiry");

  const handleOpenEnquiry = (interest?: string) => {
    setSelectedInterest(interest || "Refund & Cancellation Enquiry");
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
            <span className="text-white">Refunds &amp; Cancellations</span>
          </div>

          {/* Hero Title Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Commercial Vehicle Showroom Policy • Policy Ref: KMF-REF-2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Refunds &amp; Cancellations Policy
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Official commercial policy governing vehicle bookings, retail accessories purchases, partner financing agreements, warranty service obligations, and territorial shipping limitations for Kritika Micro Foundation.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Effective Date: 1st November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Entity: Kritika Micro Foundation (Rittika Enterprise)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Jurisdiction: Dhemaji, Assam, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Executive Summary Box */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/[0.07] border border-amber-500/30 text-slate-200 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold font-heading text-white">
                  Essential Summary for Commercial Buyers
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc list-inside">
                  <li><strong>Financed Commercial Products:</strong> Refunds or order cancellations are strictly <u>not permitted</u> once financing dockets and delivery deeds are executed.</li>
                  <li><strong>Complete E-Rickshaws:</strong> We do <u>not</u> ship complete assembled E-Rickshaws out-of-station. Assembled vehicles are available solely via showroom pickup or authorized local delivery from our flagship showroom at Pegu Bazaar, Dhemaji, Assam.</li>
                  <li><strong>Tangible Accessories:</strong> Feasible retail accessories, batteries, couplers, motor-controllers, carriers, loaders, and components are eligible for PAN-India shipment and returns as per policy guidelines.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* SECTION 1 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold font-mono text-sm">
                01
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                1. Financed Products — Strict Non-Refundable &amp; Non-Cancellable Policy
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                For all products purchased through any financing structure—including third-party financiers (e.g., Chola Finance, Bajaj Finance, NBFC loan providers) or in-house micro-credit facilities provided by Kritika Micro Foundation—<strong>a Refund or a Cancellation is strictly not possible under any circumstances</strong> once the delivery has been effected and the financing documentation has been signed.
              </p>
              <p>
                Financing contracts constitute legally binding tripartite credit commitments involving statutory registration, RTO compliance, chassis assignment, and hypothecation endorsements. Once executed, no purchase return or financial reversal can be initiated through dealership channels.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
                <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Notice:</strong> The showroom staff, management, or associated partners have no authority to accept vehicle returns or offer cash/ledger refunds on financed vehicles once delivered.
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm">
                02
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                2. Loan / Credit Foreclosure Criteria
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                A cancellation or termination of a vehicle loan or micro-credit obligation is only possible when the <strong>outstanding principal and interest balance, as per the loan agreement of the financed product, is fully liquidated</strong>.
              </p>
              <p>
                Depending on the specific agreement:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  Foreclosure is subject to full repayment of all outstanding installments, accrued interest, and applicable foreclosure/pre-payment penalty charges as stipulated in the formal sale deed and finance contract.
                </li>
                <li>
                  Upon full settlement, the customer will receive an official No Objection Certificate (NOC) and loan closure letter enabling RTO hypothecation removal.
                </li>
                <li>
                  Premature cancellation of the financing contract without full financial discharge is treated as an event of default and will trigger contractual recovery procedures.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                03
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                3. Defective Products &amp; Warranty Adherence
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                In the event of any mechanical, structural, or electronic defect in a sold vehicle or component, Kritika Micro Foundation is liable strictly to follow the <strong>official Warranty Procedure</strong> associated with the product as and when disclosed during the sale.
              </p>
              <p>
                <strong>Customer Obligation at Point of Purchase:</strong> The customer is strongly advised and required to thoroughly inspect the physical condition of the vehicle, test all operating switches and lights, verify battery voltage readouts, and validate the warranty card, battery serial numbers, motor serial numbers, and charger documentation directly from the sales staff at our showroom counter before finalizing purchase or driving off the premises.
              </p>
              <p>
                Warranty coverage covers repair or replacement of manufacturing-defective parts as per OEM terms; warranty coverage does not constitute grounds for total vehicle return, cash refund, or model exchange.
              </p>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center font-bold font-mono text-sm">
                04
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                4. Prepaid Non-Financed Retail Purchases
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                For all other standalone retail products purchased with 100% upfront prepaid payments (such as roof taxi signs, dynamic LED effect strobes, Bluetooth stereo sound packages, spare tire covers, vehicle body armor covers, and electrical spares):
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Cancellation Before Dispatch:</strong> Prepaid accessory orders can be cancelled prior to warehouse dispatch with zero cancellation penalty.
                </li>
                <li>
                  <strong>Eligible Product Returns:</strong> Unused accessories in original factory packaging with all seal tags intact may be returned within <strong>7 days of delivery</strong> for exchange or refund.
                </li>
                <li>
                  <strong>Non-Eligible Retail Items:</strong> Used Products, items that have been installed, wired, tampered with, cut, or damaged due to improper customer voltage application cannot be returned or refunded. Vehicle Polishes, Scratch Removers as return or exchange possible only if factory cap seal is un-broken.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 5 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold font-mono text-sm">
                05
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                5. Pre-Bookings &amp; Institutional Cancellation Rights
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Kritika Micro Foundation reserves the absolute right to decline, reschedule, or cancel any vehicle pre-booking if the requested model, color, or battery allocation cannot be procured or provided due to manufacturing shortages, supply chain blockages, regulatory changes, or allocation limits.
              </p>
              <p>
                <strong>Refund Terms for Cancelled Pre-Bookings:</strong> In the event that Kritika Micro Foundation cancels a pre-booking due to inability to deliver the vehicle:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>Any advance pre-booking deposit will be refunded to the customer <strong>without any interest</strong>.</li>
                <li>The refund may be subject to the deduction of pre-processing charges if expressly specified in the respective booking docket for that product category.</li>
                <li>Pre-processing fee schedules differ from product to product; customers are advised to carefully check the booking docket terms before signing or handing over booking deposits.</li>
              </ul>
            </div>
          </section>

          {/* SECTION 6 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                06
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                6. Territorial Logistics &amp; Shipping Limitations (Notice on Complete Vehicles)
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <div className="p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/30 text-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Truck className="w-4 h-4" />
                  <span>Crucial Shipping Policy for Complete Assembled E-Rickshaws</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Regarding the purchase of E-Rickshaws, <strong>we do NOT ship complete assembled E-Rickshaws to locations out-of-station</strong> unless we have an operational showroom or distribution outlet at a nearby address. Complete assembled E-Rickshaws are available <strong>exclusively for in-person delivery or pickup at our authorized showrooms</strong> as indicated on this website or at our main flagship showroom location:
                </p>
                <p className="text-xs font-mono font-bold text-white bg-black/40 p-2.5 rounded-lg border border-white/10">
                  Rittika Enterprise, Pegu Bazaar, Dhemaji – 787057, Assam, India.
                </p>
              </div>

              <p className="pt-2">
                <strong>Tangible &amp; Feasible Products Shippable PAN India:</strong> We sell and dispatch all tangible and feasible products that can be safely couriered nationwide across India. This PAN-India catalog includes:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-1">
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Roof Taxi Light Signboards</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Heavy-Duty Loaders &amp; Flatbed Cargo Carriers</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>LED Front Dynamic Effect Strobes</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bluetooth Stereo Audio Systems</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Spare Wheel Covers &amp; Rain Armor Covers</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Smart Automatic Battery Chargers &amp; Spares</span>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 7 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center font-bold font-mono text-sm">
                07
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                7. Refund Execution Timeline &amp; Banking Modes
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Where a refund is sanctioned for an eligible retail accessory return or pre-booking cancellation:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>Refunds will be processed exclusively through electronic bank transfer (NEFT/RTGS/IMPS) or original UPI rail. No cash refunds are handed out at showroom counters.</li>
                <li>Standard processing turnaround is <strong>7 to 10 business days</strong> from the receipt and inspection of the returned accessory or cancellation approval.</li>
                <li>Any banking transaction charges or return courier freight deductions will be reflected in the final settlement note.</li>
              </ul>
            </div>
          </section>

          {/* SECTION 8: CONTACT FOR CLAIMS */}
          <section className="p-8 rounded-2xl bg-gradient-to-r from-[#0a1122] via-[#060a17] to-[#040813] border border-white/15 space-y-4">
            <h2 className="text-xl font-bold font-heading text-white">
              Questions Regarding Refunds or Cancellations?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Before finalizing any vehicle purchase or pre-booking deposit, our sales team is happy to answer any questions regarding warranty dockets, loan agreements, or shipping coverage.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleOpenEnquiry("Refund & Cancellation Query")}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                Contact Showroom Desk
              </button>
              <a
                href="tel:+919954367393"
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call +91-99543-67393</span>
              </a>
              <Link
                href="/terms"
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-cyan-400 hover:text-white transition"
              >
                Read Terms &amp; Conditions &rarr;
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

