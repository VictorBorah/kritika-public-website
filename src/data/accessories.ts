export interface AccessoryItem {
  id: string;
  name: string;
  tagline: string;
  category: "Lighting" | "Audio" | "Protection" | "Styling";
  description: string;
  badge?: string;
  features: string[];
  icon: string;
}

export const ACCESSORIES_DATA: AccessoryItem[] = [
  {
    id: "taxi-light",
    name: "Taxi Light (Roof Illuminated Sign)",
    tagline: "High-Visibility Commercial Roof Signboard",
    category: "Lighting",
    description: "Ultra-bright weatherproof aerodynamic roof taxi light with illuminated branding for maximum passenger hail visibility day and night.",
    badge: "Commercial Must-Have",
    icon: "Lightbulb",
    features: [
      "Weather-sealed IP65 waterproof acrylic casing",
      "Low power consumption high-intensity SMD LEDs",
      "Easy mounting on factory roof carrier bracket",
      "Direct integration with vehicle lighting harness",
    ],
  },
  {
    id: "led-effect-lights",
    name: "LED Effect Lights (Dynamic Strobes)",
    tagline: "Multicolor Programmable Exterior Accents",
    category: "Lighting",
    description: "Dynamic multi-pattern LED strobe and running indicators for front grille and roof rails, adding high-tech presence on evening routes.",
    badge: "Popular Customization",
    icon: "Zap",
    features: [
      "Selectable pulse, strobe, and running light patterns",
      "Waterproof silicone-encapsulated LED strips",
      "Dedicated cockpit toggle switch panel",
      "Vibration-resistant solid-state drivers",
    ],
  },
  {
    id: "ambient-led-lights",
    name: "Ambient LED Lights (Interior Mood)",
    tagline: "Cabin & Footwell Under-Seat Illumination",
    category: "Lighting",
    description: "Subtle neon glow for the passenger cabin, floorboards, and driver footwell, creating a comfortable, welcoming experience for night commuters.",
    icon: "Sparkles",
    features: [
      "Warm cyber-cyan and electric-green ambient tones",
      "Non-glare indirect illumination",
      "Water-resistant under-seat mounting",
      "Automated passenger entry illumination mode",
    ],
  },
  {
    id: "music-system",
    name: "Stereo Music System & Sound Package",
    tagline: "Bluetooth FM/USB Audio with Dual Speakers",
    category: "Audio",
    description: "High-output stereo audio head unit with Bluetooth 5.0 wireless streaming, FM radio, USB playback, and twin weatherproof speakers.",
    badge: "Passenger Favorite",
    icon: "Music",
    features: [
      "Bluetooth 5.0 wireless smartphone connectivity",
      "Dual 4-inch weatherproof high-clarity cone speakers",
      "Aux-in, USB flash drive slot, and FM digital tuner",
      "Compact dash-integrated control console",
    ],
  },
  {
    id: "tire-cover",
    name: "Custom Spare Tire Cover",
    tagline: "Heavy-Duty Vinyl Wheel Armor",
    category: "Protection",
    description: "Heavy-gauge reinforced vinyl cover tailored for the rear-mounted spare wheel, protecting rubber from harsh monsoon rain, mud, and UV cracking.",
    icon: "Disc",
    features: [
      "Heavy-duty water-repellent PVC leatherette vinyl",
      "UV-stabilized anti-cracking material coating",
      "Elasticized drawstring hem for snug fit",
      "Reflective safety strip for night-time visibility",
    ],
  },
  {
    id: "rickshaw-protective-cover",
    name: "All-Weather Rickshaw Body Cover",
    tagline: "Full-Body Outdoor Weather Protection",
    category: "Protection",
    description: "Full-coverage weatherproof cover safeguarding vehicle body, electrical components, and seating from torrential rains, dust, and intense sunlight.",
    badge: "Essential Care",
    icon: "ShieldCheck",
    features: [
      "100% waterproof high-density parachute taffeta fabric",
      "Mirror pockets and antenna cutouts",
      "Bottom wind-buckle locking straps",
      "Scratch-proof inner lining preserving vehicle paint",
    ],
  },
  {
    id: "alloy-wheels",
    name: "Precision Alloy Wheels (Set)",
    tagline: "Lightweight High-Strength Wheel Rims",
    category: "Styling",
    description: "Premium dual-tone aerodynamic aluminum alloy rims engineered for superior road stance, heat dissipation, and reduced rotational unsprung weight.",
    badge: "Premium Upgrade",
    icon: "CircleDot",
    features: [
      "Die-cast high-tensile lightweight aluminum alloy",
      "Rust-proof chrome / gloss-black dual-tone finish",
      "Enhanced heat dissipation improving braking response",
      "Engineered specifically for heavy passenger loads",
    ],
  },
];
