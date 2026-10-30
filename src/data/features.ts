export interface ShowroomFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge?: string;
  hasAsterisk?: boolean;
}

export const SHOWROOM_FEATURES: ShowroomFeature[] = [
  {
    id: "multiple-options",
    title: "Multiple Vehicle Options",
    subtitle: "Curated Electric Fleet",
    description: "Explore diverse E-Rickshaw models tailored for varying payloads, battery chemistries, terrain tolerances, and passenger comfort standards.",
    icon: "Layers",
  },
  {
    id: "minimum-paperwork",
    title: "Minimum Paperwork",
    subtitle: "Simplified Documentation",
    description: "Straightforward verification requiring basic KYC documents. Our on-ground showroom team assists you every step of the registration journey.",
    icon: "FileCheck",
    badge: "Hassle-Free",
  },
  {
    id: "same-day-loan",
    title: "Same-Day Loan Sanctioning*",
    subtitle: "Partner Finance Coordination",
    description: "Expedited application processing facilitated through our network of reputable lending partners, getting approvals sanctioned on the very same day.",
    icon: "Zap",
    badge: "Speed Focused",
    hasAsterisk: true,
  },
  {
    id: "same-day-delivery",
    title: "Same-Day Delivery*",
    subtitle: "Direct From Showroom Floor",
    description: "Drive your new E-Rickshaw home immediately upon completion of partner formalities and stock clearance directly from our Dhemaji showroom.",
    icon: "Truck",
    badge: "Quick Turnaround",
    hasAsterisk: true,
  },
  {
    id: "fully-assembled",
    title: "Fully Assembled Vehicles",
    subtitle: "100% Road-Ready Inspection",
    description: "Every E-Rickshaw undergoes multi-point safety testing, battery calibration, and mechanical torque checks prior to handover.",
    icon: "CheckCircle2",
  },
  {
    id: "optional-accessories",
    title: "Optional Premium Accessories",
    subtitle: "Showroom-Fit Customizations",
    description: "Upgrade your ride with factory-fit taxi lights, stereo sound systems, alloy wheels, and weather-proof covers tailored to your preference.",
    icon: "Sliders",
    badge: "Customization",
  },
];

export const DISCLAIMER_TEXT =
  "*Subject to finance partner approval, borrower eligibility, vehicle model availability, and timely completion of statutory and delivery formalities.";
