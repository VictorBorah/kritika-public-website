"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CinematicHero from "@/components/sections/CinematicHero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import VehicleShowcase from "@/components/sections/VehicleShowcase";
import Accessories from "@/components/sections/Accessories";
import Financing from "@/components/sections/Financing";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function Home() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState("E-Rickshaw Purchase");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleOpenEnquiry = (interestOrVehicle?: string) => {
    if (interestOrVehicle?.startsWith("Vehicle:")) {
      setSelectedVehicle(interestOrVehicle.replace("Vehicle:", "").trim());
      setSelectedInterest("E-Rickshaw Purchase");
    } else if (interestOrVehicle) {
      setSelectedInterest(interestOrVehicle);
      setSelectedVehicle("");
    } else {
      setSelectedInterest("General Showroom Enquiry");
      setSelectedVehicle("");
    }
    setEnquiryOpen(true);
  };

  const handleVehicleSelect = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setSelectedInterest(`Vehicle: ${vehicleName}`);
    setEnquiryOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-white selection:bg-[#00FF9D] selection:text-[#030508] overflow-hidden">
      {/* Top Floating Navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Flow: Unified Cinematic Hero (Scroll sequence + animating entrance headings) */}
      <main>
        {/* Unified Cinematic Hero */}
        <CinematicHero onOpenEnquiry={handleOpenEnquiry} />

        {/* Showroom Advantage & Assurance (Flows immediately with zero gap) */}
        <WhyChooseUs onOpenEnquiry={handleOpenEnquiry} />

        {/* E-Rickshaw Vehicles Showcase */}
        <VehicleShowcase onOpenEnquiry={handleVehicleSelect} />

        {/* Optional Accessories Hub */}
        <Accessories onOpenEnquiry={handleOpenEnquiry} />

        {/* Financing Assistance Information */}
        <Financing onOpenEnquiry={handleOpenEnquiry} />

        {/* About Dealership */}
        <About />

        {/* Contact Section & Map */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Interactive Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultInterest={selectedInterest}
        defaultVehicleName={selectedVehicle}
      />
    </div>
  );
}
