"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";
import {
  FileText,
  ShieldCheck,
  AlertOctagon,
  Scale,
  CreditCard,
  Wrench,
  AlertTriangle,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  ChevronRight,
  ShieldAlert,
  Zap,
  Lock
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("Terms & Conditions Enquiry");

  const handleOpenEnquiry = (interest?: string) => {
    setSelectedInterest(interest || "Terms & Conditions Enquiry");
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
            <span className="text-violet-400">Governance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Terms &amp; Conditions</span>
          </div>

          {/* Hero Title Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#091124] to-[#040813] border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-500/10 border border-violet-500/30 text-violet-400 mb-4">
                <Scale className="w-3.5 h-3.5" />
                <span>Commercial Vehicle Dealership Governance • Document Ref: KMF-TNC-2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
                Terms &amp; Conditions
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                Statutory commercial terms governing vehicle acquisitions, authorized brand dealership servicing, anti-fraud payment protocols, DIY electrical liability exclusions, pre-bookings, and credit facilitation at Kritika Micro Foundation.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Effective Date: 1st November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Dealership: Kritika Micro Foundation (Rittika Enterprise)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>Exclusive Legal Jurisdiction: Dhemaji District, Assam</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Anti-Fraud Payment Warning Banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-rose-500/[0.08] border border-rose-500/40 text-slate-200 relative overflow-hidden shadow-lg shadow-rose-950/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                  <span>Mandatory Anti-Fraud Notice: Authorized Payments &amp; Identity Verification</span>
                </h2>
                <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                  <strong>Payments made to unauthorized persons, unverified personal phone numbers, third-party payment links, or unauthorized personal QR Codes will NOT be honoured or acknowledged by Kritika Micro Foundation under any circumstance.</strong>
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prospective buyers and customers are strictly requested and required to verify the legal credentials of the sales representative communicating with them, inspect showroom photo ID cards, and verify and establish the official registered identity of Kritika Micro Foundation / Rittika Enterprise before making any advance payments, transferring electronic funds, or signing any sale contracts. Official remittances must strictly be remitted directly to the registered showroom counter or the organization&apos;s verified bank current account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Contract Clauses */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* CLAUSE 1 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm">
                01
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                1. Customer Pre-Purchase Diligence, Sale Deed &amp; Warranty Verification
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Prior to executing a purchase or remitting booking funds, prospective customers <strong>must read, understand, and strictly follow the sale deed, vehicle registration documentation, and customer invoice</strong>.
              </p>
              <p>
                It is the mandatory responsibility of the customer to thoroughly inspect the physical condition of the electric vehicle or commercial carrier, verify the motor serial number, check chassis engraving, and validate the warranty booklet, battery batch numbers, and warranty expiration dates directly with the showroom sales staff at the time of purchase.
              </p>
              <p>
                Signing the vehicle delivery receipt or sales deed constitutes conclusive proof that the buyer has personally verified all equipment, accepted the vehicle in roadworthy and operational condition, and agreed to all terms embedded herein.
              </p>
            </div>
          </section>

          {/* CLAUSE 2 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold font-mono text-sm">
                02
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                2. Pre-Bookings, Stock Availability &amp; Pre-Processing Fee Deductions
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Kritika Micro Foundation reserves the unilateral right to decline, cancel, or re-allocate any vehicle pre-booking without assigning prior cause.
              </p>
              <p>
                <strong>Inability to Deliver:</strong> In the event that Kritika Micro Foundation is unable to provide the booked vehicle, commercial carrier, or service due to production holdups, manufacturer delays, logistics blockades, or allocation caps:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  Kritika Micro Foundation will refund the pre-booking deposit amount <strong>without any interest</strong>.
                </li>
                <li>
                  Such refund will be subject to the deduction of reasonable pre-processing and administrative charges as mentioned in the respective booking docket, which differs from product to product.
                </li>
                <li>
                  The customer is strongly advised to carefully read the vehicle booking docket, pre-processing fee schedule, and tentative delivery schedules before signing or making any deposit.
                </li>
              </ul>
            </div>
          </section>

          {/* CLAUSE 3 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                03
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                3. Authorized Dealership Servicing, Brand Warranties &amp; External Purchases
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Kritika Micro Foundation offers scheduled servicing, preventive maintenance, and warranty replacement to all vehicle and battery brands for which Kritika Micro Foundation is an authorized vendor, registered dealer, or authorized regional distributor.
              </p>
              <p>
                In providing these services, Kritika Micro Foundation strictly follows the standard <strong>Warranty Procedure and OEM Replacement SOPs</strong> established by the respective vehicle manufacturer.
              </p>
              <p>
                <strong>Vehicles Purchased from Other Dealerships:</strong> Vehicles or components purchased at a different showroom location, an outside dealer, or another vendor will also be serviced at our Dhemaji facility <em>provided</em> the vehicle falls within authorized multi-dealership network regulations and reciprocal warranty agreements.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
                <Wrench className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Dealership Discretion:</strong> Kritika Micro Foundation expressly reserves the right to decline warranty claims, parts replacements, or technical service to any vehicle or component that has been modified, tampered with, or sourced from unauthorized gray-market channels outside authorized manufacturer dealership regulations.
                </span>
              </div>
            </div>
          </section>

          {/* CLAUSE 4 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold font-mono text-sm">
                04
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                4. EV Care, Operating Manual Compliance &amp; DIY Wiring / Tampering Exclusion
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <div className="p-4 rounded-xl bg-rose-500/[0.08] border border-rose-500/30 text-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High-Voltage Electrical Safety &amp; Fire Hazard Notice</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Electric commercial rickshaws and loaders incorporate high-capacity DC traction battery packs, solid-state electronic controllers, and high-amperage electrical harnesses. Customers and drivers <strong>must strictly follow all instructions, operating guidelines, and technical advice provided by our certified engineers and technicians</strong>.
                </p>
                <p className="text-xs leading-relaxed">
                  Electric vehicles must be kept under strict maintenance, parked in dry sheltered locations, charged via dedicated surge-protected outlets, and driven with care and caution. Failing to follow standard operating procedures can result in severe technical failure, short-circuits, battery thermal runaway, or catastrophic fire accidents.
                </p>
              </div>

              <p className="pt-2">
                <strong>Mandatory Manual Reading:</strong> All drivers and owners must thoroughly read, comprehend, and retain the vehicle operating manual before operating the vehicle.
              </p>

              <p>
                <strong>Zero Liability for DIY Wiring or Amateur Modifications:</strong> Conditions including, but not limited to:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs sm:text-sm">
                <li>Charging anomalies (using ungrounded sockets, third-party uncalibrated chargers, or mismatched input voltage),</li>
                <li>Manual tampering with electronic speed controllers, motor harnesses, or main wiring looms,</li>
                <li>Any DIY (Do-It-Yourself) wiring, unauthorized tapping into battery packs for music systems/lights without dealership relay kits, or bypassing fuse boxes</li>
              </ul>
              <p>
                <strong>will instantly void all warranties on the vehicle, battery, motor, and controller.</strong> Kritika Micro Foundation shall bear <strong>zero liability or financial responsibility</strong> for any resulting DIY accident, fire damage, vehicle loss, personal injury, or operational failures arising from customer negligence or breach of operating procedures.
              </p>
            </div>
          </section>

          {/* CLAUSE 5 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm">
                05
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                5. Vehicle Financing Assistance &amp; Credit Health Evaluation
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                Kritika Micro Foundation acts as an authorized facilitator assisting prospective buyers with commercial electric vehicle financing through accredited institutional financing partners (including Chola Finance, Bajaj Finance, and certified NBFCs) as well as selective in-house micro-credit facilities for eligible local operators.
              </p>
              <p>
                Customers seeking financing assistance are advised to coordinate directly with our authorized showroom finance desk to understand the documentation checklist, KYC requirements, down payment schedules, and mandatory <strong>Credit Health Check</strong> procedures.
              </p>
              <p>
                Loan sanctions, interest rates, tenure, down payment thresholds, and hypothecation requirements are governed independently by the underwriting criteria of the respective financier. Dealership assistance does not guarantee statutory loan sanction.
              </p>
            </div>
          </section>

          {/* CLAUSE 6 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4" id="financing-recovery">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-400 flex items-center justify-center font-bold font-mono text-sm">
                06
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                6. Financing Recovery Rights &amp; Dealership Non-Interference
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                In the event of a product financed through an external financial institution:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Third-Party Financier Recovery:</strong> The financier reserves the full contractual and statutory right to recover the financed amount along with interest, penalty charges, legal costs, and recovery expenses. <strong>Kritika Micro Foundation plays zero role, bears no liability, and exercises no interference in the recovery, repossession, or legal proceedings initiated by the financier.</strong>
                </li>
                <li>
                  <strong>In-House Micro Credit Recovery:</strong> In cases where Kritika Micro Foundation directly self-finances a commercial vehicle or carrier through its in-house micro-credit facilities, <strong>Kritika Micro Foundation shall be exclusively responsible and contractually empowered to recover all financed amounts, accrued interest, delayed payment fees, and associated legal recovery expenses</strong> in accordance with the executed loan deed.
                </li>
              </ul>
            </div>
          </section>

          {/* CLAUSE 7 */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                07
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                7. Assembled Vehicle Delivery vs. PAN-India Tangible Accessories Logistics
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed pl-1 sm:pl-12">
              <p>
                As stipulated in our shipping guidelines:
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li>
                  <strong>Complete Assembled E-Rickshaws:</strong> We do <u>not</u> ship completely assembled E-Rickshaws to locations out-of-station unless we maintain an authorized showroom or regional delivery outlet at a nearby address. Delivery or handover of assembled E-Rickshaws is conducted strictly at our registered showrooms or at our flagship facility at Pegu Bazaar, Dhemaji, Assam.
                </li>
                <li>
                  <strong>PAN-India Shippable Feasible Goods:</strong> Tangible accessories, carriers, heavy cargo flatbeds, lighting harnesses, digital telemetry clusters, audio packages, and weather protective covers can be ordered and dispatched nationwide across India via standard freight and courier channels.
                </li>
                <li>
                  <strong>Online Accessories Purchase &amp; Original Packaging Obligation:</strong> In case of Online Purchase of accessories and in case of eligible returns, customers are obliged to retain the original box of the part or accessory and other components as received and ensure they are in the box to be returned. Returns or exchanges cannot be processed if original packaging, protective foam, tags, or components are damaged or missing.
                </li>
              </ul>
            </div>
          </section>

          {/* CLAUSE 8: JURISDICTION */}
          <section className="p-8 rounded-2xl bg-gradient-to-r from-[#0d162d] via-[#080d1e] to-[#040813] border border-emerald-500/30 space-y-4" id="jurisdiction">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                08
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                8. Exclusive Jurisdiction &amp; Dispute Resolution
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed pl-1 sm:pl-12">
              <p className="text-sm font-semibold text-emerald-300">
                All disputes, claims, legal proceedings, consumer arbitrations, or judicial suits arising out of or in connection with the purchase, financing facilitation, warranty execution, booking, or servicing of vehicles and accessories by Kritika Micro Foundation shall be strictly subject to the exclusive <strong>Jurisdiction of the Competent Courts in Dhemaji District, Assam, India</strong>.
              </p>
              <p className="text-xs text-slate-400">
                The customer agrees that all contractual agreements are deemed to have been executed at Dhemaji, Assam, and no other court or tribunal shall have territorial jurisdiction over claims against Kritika Micro Foundation.
              </p>
            </div>
          </section>

          {/* SHOWROOM ASSISTANCE DESK */}
          <section className="p-8 rounded-2xl bg-[#070C18] border border-white/10 space-y-4">
            <h2 className="text-lg font-bold font-heading text-white">
              Official Showroom Legal &amp; Commercial Contact Desk
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono text-slate-300">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-500 block uppercase">Showroom Address</span>
                <span className="text-white font-semibold block">
                  Rittika Enterprise, Pegu Bazaar, Dhemaji – 787057, Assam, India.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-500 block uppercase">Commercial Helpline</span>
                <a href="tel:+919954367393" className="text-emerald-400 font-semibold block hover:underline">
                  +91-99543-67393
                </a>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-slate-500 block uppercase">Official Legal Mail</span>
                <a href="mailto:sales@kritikafoundation.com" className="text-cyan-400 font-semibold block hover:underline break-all">
                  sales@kritikafoundation.com
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => handleOpenEnquiry("Terms & Conditions Clarification")}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                Inquire with Legal Desk
              </button>
              <Link
                href="/refunds-cancellations"
                className="px-5 py-2.5 rounded-xl text-xs font-mono text-cyan-400 hover:text-white transition"
              >
                View Refunds &amp; Cancellations Policy &rarr;
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

