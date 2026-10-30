"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ScrollAnimation from "@/components/sections/ScrollAnimation";
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

      {/* Main Flow */}
      <main>
        {/* Section A & B: Hero */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* Section C: 269-Frame Scroll Canvas Sequence */}
        <ScrollAnimation onOpenEnquiry={handleOpenEnquiry} />

        {/* Section D: Why Choose Us Feature Cards */}
        <WhyChooseUs onOpenEnquiry={handleOpenEnquiry} />

        {/* Section E: E-Rickshaw Vehicles Showcase */}
        <VehicleShowcase onOpenEnquiry={handleVehicleSelect} />

        {/* Section F: Optional Accessories Showcase */}
        <Accessories onOpenEnquiry={handleOpenEnquiry} />

        {/* Section G: Financing Assistance Information */}
        <Financing onOpenEnquiry={handleOpenEnquiry} />

        {/* Section H: About Dealership */}
        <About />

        {/* Section I: Contact Section & Map */}
        <Contact />
      </main>

      {/* Section J: Dark Gaming Footer */}
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
