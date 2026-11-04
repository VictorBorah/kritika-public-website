export interface ProductItem {
  id: string;
  title: string;
  category: "Motors & Powertrain" | "Controllers & Electronics" | "Batteries & Energy" | "Lighting & Electricals" | "Audio & Accessories";
  price: number;
  originalPrice?: number;
  image: string;
  badge: string;
  tag: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  warranty: string;
  shipping: string;
  shortDesc: string;
  fullDesc: string[];
  features: { icon: string; title: string; desc: string }[];
  specs: Record<string, string>;
}

export const ACCESSORIES_CATALOG: ProductItem[] = [
  {
    id: "skyy-rider-bldc-motor-1200w",
    title: "Skyy Rider BLDC Motor, 1200w",
    category: "Motors & Powertrain",
    price: 6850.0,
    originalPrice: 8500.0,
    image: "/images/products/skyy-rider-bldc-motor-1200w.jpg",
    badge: "1200W Heavy Duty",
    tag: "High Torque",
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    warranty: "12 Months OEM Warranty",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "High-torque 1200W brushless DC motor engineered for passenger e-rickshaws and heavy urban commercial routes.",
    fullDesc: [
      "HIGH PERFORMANCE 1200W BLDC MOTOR: Delivers powerful brushless DC output at 48V/60V with up to 3500 RPM speed and 40A current for dependable electric vehicle operations.",
      "HEAVY DUTY INDUSTRIAL GRADE BUILD: Constructed with alloy steel housing and industrial-grade internals, this motor withstands rough terrains, monsoon humidity, and Indian road conditions with ease.",
      "ADVANCED COOLING FIN TECHNOLOGY: Precision aluminium cooling fins ensure rapid thermal dissipation during continuous city passenger duty.",
      "HIGH TORQUE & WATERPROOF DESIGN: Engineered with high starting torque suitable for uphill gradients and full passenger payload.",
      "ENERGY EFFICIENT & LOW NOISE: 100% pure copper winding provides whisper-quiet running and maximizes battery range per full charge."
    ],
    features: [
      { icon: "Zap", title: "1200W Power", desc: "Brushless 48V/60V DC system" },
      { icon: "Cpu", title: "Pure Copper", desc: "High-efficiency thermal winding" },
      { icon: "ShieldCheck", title: "Waterproof", desc: "Sealed chassis for monsoon driving" },
      { icon: "Gauge", title: "3500 RPM", desc: "High starting torque curve" }
    ],
    specs: {
      "Rated Power": "1200 Watts",
      "Operating Voltage": "48V / 60V DC",
      "Rated Speed": "Up to 3500 RPM",
      "Operating Current": "40 Amperes",
      "Winding Material": "100% Electrolytic Copper",
      "Housing": "Alloy Steel with Aluminium Cooling Fins",
      "Vehicle Compatibility": "Passenger E-Rickshaws & Cargo Carriers"
    }
  },
  {
    id: "nanya-48-60v-controller",
    title: "Nanya 48-60V E-Rickshaw Controller",
    category: "Controllers & Electronics",
    price: 4800.0,
    originalPrice: 5900.0,
    image: "/images/products/Nanya%2048-60V%20E-Rickshaw%20Controller.jpg",
    badge: "60A Regulated",
    tag: "Intelligent Drive",
    rating: 4.8,
    reviewCount: 36,
    inStock: true,
    warranty: "6 Months Replacement Warranty",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "Precision solid-state 48V/60V 60A motor controller for smooth acceleration, regenerative braking, and thermal protection.",
    fullDesc: [
      "INTELLIGENT MOTOR CONTROL: Works between the battery, throttle, and brushless motor, processing driver input and regulating smooth electrical power delivery.",
      "DUAL VOLTAGE COMPATIBILITY: Engineered for both 48V and 60V electric three-wheeler setups with dynamic 60A current limit.",
      "MULTI-STAGE SAFETY CIRCUITS: Built-in safeguards against overcurrent, undervoltage, throttle runaway, and motor phase short-circuits.",
      "DIRECT OE REPLACEMENT: Standard color-coded wiring harness and weatherproof connectors for fast servicing and installation."
    ],
    features: [
      { icon: "Cpu", title: "60A Limiter", desc: "Precision throttle & torque output" },
      { icon: "Zap", title: "48V - 60V Dual", desc: "Wide voltage operating range" },
      { icon: "ShieldCheck", title: "Thermal Guard", desc: "Overcurrent & low-voltage cutoff" },
      { icon: "Layers", title: "CY Solid-State", desc: "Long-life MOSFET architecture" }
    ],
    specs: {
      "Brand": "Nanya / CY Electronics",
      "Rated Voltage": "48V / 60V DC",
      "Current Limit": "60 Amperes",
      "Phase Angle": "120° / 60° Compatible",
      "Braking": "Electronic Low/High Level Braking",
      "Casing": "Die-Cast Aluminium Ribbed Enclosure"
    }
  },
  {
    id: "12v-cabin-lights",
    title: "12v Cabin Lights",
    category: "Lighting & Electricals",
    price: 900.0,
    originalPrice: 1350.0,
    image: "/images/products/12v-cabin-lights.jpg",
    badge: "8 Lighting Modes",
    tag: "Auto Color Cycle",
    rating: 4.7,
    reviewCount: 62,
    inStock: true,
    warranty: "6 Months Showroom Guarantee",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "Multi-color automated cycling 6-LED cabin luminaire with 8 dynamic modes and rugged weatherproof housing.",
    fullDesc: [
      "AUTOMATIC COLOUR CHANGE: 6 high-output LEDs automatically cycle through multiple vibrant shades — white, cream, yellow, red, and blue — with each switch trigger.",
      "WIDE VEHICLE COMPATIBILITY: Built for E-Rickshaws, auto-rickshaws, commercial loaders, and all standard 12V auxiliary DC setups.",
      "WATERPROOF & SHOCK RESISTANT: Hermetically sealed lens and durable ABS casing prevent water ingress and withstand rough road vibration.",
      "SIMPLE TWO-WIRE INSTALL: Standard red and black leads with inline fuse compatibility for rapid cabin mounting."
    ],
    features: [
      { icon: "Sparkles", title: "5 Dynamic Colors", desc: "White, cream, yellow, red & blue" },
      { icon: "Zap", title: "12V DC Input", desc: "Low drain on vehicle battery" },
      { icon: "ShieldCheck", title: "IP65 Waterproof", desc: "Sealed against rain and dust" },
      { icon: "Layers", title: "8 Lighting Modes", desc: "Strobe, steady & mood lighting" }
    ],
    specs: {
      "Operating Voltage": "12 Volts DC",
      "LED Configuration": "6 SMD Super-Bright LEDs",
      "Modes": "8 Automated Light Patterns",
      "Housing Material": "Impact-Resistant Polycarbonate / ABS",
      "Lead Length": "Pre-wired 1.2m Copper Harness"
    }
  },
  {
    id: "2500w-loader-motor",
    title: "2500w Loader Motor",
    category: "Motors & Powertrain",
    price: 1180.0,
    originalPrice: 1850.0,
    image: "/images/products/2500w-loader-motor.jpg",
    badge: "2.5KW PMSM Power",
    tag: "Hill Climb Extreme",
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    warranty: "1 Year Commercial Warranty",
    shipping: "PAN India Freight Dispatch",
    shortDesc: "Datai 2.5KW high-durability PMSM motor engineered for extreme torque and steep hill climbs in Northeast terrain.",
    fullDesc: [
      "DATAI HIGH-DURABILITY PMSM: Engineered specifically for severe commercial cargo duty, steep mountain inclines, and challenging terrains across Assam and the North-East.",
      "EXTREME 97%+ EFFICIENCY: Advanced Permanent Magnet Synchronous Motor architecture delivers class-leading efficiency, extending battery mileage.",
      "IP67 INGRESS RATING: Fully sealed construction prevents water, silt, mud, and dust intrusion during heavy monsoon delivery work.",
      "HIGH SUSTAINED TORQUE: Provides effortless low-RPM pull under heavy metric ton payloads."
    ],
    features: [
      { icon: "Zap", title: "2500W Output", desc: "High-efficiency PMSM technology" },
      { icon: "Gauge", title: "97%+ Efficiency", desc: "Maximizes battery run-time" },
      { icon: "ShieldCheck", title: "IP67 Submersible", desc: "Total water & mud resistance" },
      { icon: "Cpu", title: "Dual Speed", desc: "High torque low-gear incline capability" }
    ],
    specs: {
      "Power Rating": "2500 Watts (2.5 KW)",
      "Motor Architecture": "Permanent Magnet Synchronous Motor (PMSM)",
      "Efficiency": "Greater than 97%",
      "Water Protection": "IP67 Certified",
      "Voltage Support": "48V / 60V / 72V DC",
      "Application": "Heavy Cargo Loaders & Commercial Three-Wheelers"
    }
  },
  {
    id: "eastman-e-rickshaw-51-2-battery",
    title: "Eastman E-Rickshaw 51.2v Battery",
    category: "Batteries & Energy",
    price: 69800.0,
    originalPrice: 79500.0,
    image: "/images/products/eastman-e-rickshaw-51.2-battery.jpg",
    badge: "51.2V 105Ah (5.3kWh)",
    tag: "LiFePO4 Chemistry",
    rating: 5.0,
    reviewCount: 54,
    inStock: true,
    warranty: "3 Years Comprehensive Warranty",
    shipping: "Special Hazardous Heavy Freight Delivery",
    shortDesc: "Eastman 51.2V 105Ah (5.3kWh) Lithium Iron Phosphate battery pack with intelligent Smart BMS in a rugged GI metal enclosure.",
    fullDesc: [
      "HIGH CAPACITY COMMERCIAL PERFORMANCE: 51.2V, 105Ah, 5.3kWh Lithium Iron Phosphate (LiFePO4) architecture delivering 120+ km per single charging cycle.",
      "INTELLIGENT SMART BMS: Active Battery Management System monitors each individual cell, preventing overcharge, deep discharge, high-temp thermal runaway, and short circuits.",
      "RUGGED GALVANIZED ENCLOSURE: IP67-rated heavy-gauge Metal GI enclosure protects internal cells from severe vibration, monsoon standing water, and road shocks.",
      "3000+ CYCLE LONGEVITY: Premium LiFePO4 cells provide 5x longer operational life compared to traditional lead-acid traction packs."
    ],
    features: [
      { icon: "BatteryCharging", title: "5.3 kWh Capacity", desc: "51.2V 105Ah high energy density" },
      { icon: "Cpu", title: "Smart BMS", desc: "Cell balance & thermal auto-cutoff" },
      { icon: "ShieldCheck", title: "3000+ Cycles", desc: "Long-life LiFePO4 chemistry" },
      { icon: "Layers", title: "Metal GI Enclosure", desc: "IP67 waterproof & vibration proof" }
    ],
    specs: {
      "Nominal Voltage": "51.2 Volts",
      "Capacity": "105 Ampere-Hours",
      "Total Energy": "5.376 kWh",
      "Cell Chemistry": "Lithium Iron Phosphate (LiFePO4)",
      "Cycle Life": "3000+ Cycles @ 80% DoD",
      "Enclosure": "Powder-Coated Galvanized Iron (IP67)",
      "Standard Charging Time": "3 to 4 Hours Fast Charge Support"
    }
  },
  {
    id: "ambient-light-kit",
    title: "Ambient Light Kit",
    category: "Lighting & Electricals",
    price: 1600.0,
    originalPrice: 2200.0,
    image: "/images/products/ambient-light-kit.jpg",
    badge: "5m Wire + 6 RGB Trims",
    tag: "Atmospheric Neon",
    rating: 4.8,
    reviewCount: 41,
    inStock: true,
    warranty: "6 Months Showroom Guarantee",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "Full vehicle interior RGB ambiance kit with 5 meters of flexible cool-touch neon wire and 6 exterior RGB accent pods.",
    fullDesc: [
      "COMPLETE INTERIOR ILLUMINATION: 5 meters of flexible, bendable neon EL wire that follows vehicle dashboard lines, roof lining, and door trims.",
      "SAFE TOUCH & ZERO HEAT: Operates with zero surface heat, remaining cool to the touch even after 12 hours of continuous commercial driving.",
      "EXTERIOR ACCENT MODULES: Package includes 6 pieces of 6-LED RGB trim modules for underbody, grille, or rear step styling.",
      "12V COMPATIBLE: Seamlessly plugs into vehicle 12V auxiliary converter circuit with inline toggle switch."
    ],
    features: [
      { icon: "Sparkles", title: "5m Flexible Line", desc: "Contours around dashboards & trims" },
      { icon: "Zap", title: "Cool Touch", desc: "Zero heat emission & safe handling" },
      { icon: "Layers", title: "6 RGB Trim Pods", desc: "Exterior and interior accent lighting" },
      { icon: "ShieldCheck", title: "12V Protected", desc: "Low 60A surge rated circuit" }
    ],
    specs: {
      "Wire Length": "5.0 Meters Flexible Fiber",
      "Accent Pods": "6 x RGB 6-LED Surface Pods",
      "Input Voltage": "12V DC (Via Auxiliary Converter)",
      "Illumination Type": "Continuous Neon Glow + RGB Modules",
      "Mounting": "Adhesive Clips & Trim Channel Integration"
    }
  },
  {
    id: "drl-indicator",
    title: "DRL Indicator",
    category: "Lighting & Electricals",
    price: 580.0,
    originalPrice: 850.0,
    image: "/images/products/drl-indicator.jpg",
    badge: "Triple Color Cluster",
    tag: "Low Drain LED",
    rating: 4.9,
    reviewCount: 73,
    inStock: true,
    warranty: "6 Months Guarantee",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "Triple-color LED Daytime Running Light and turn indicator cluster set with durable ABS back and pure copper leads.",
    fullDesc: [
      "TRI-COLOR CLUSTERING: High-luminance LED combination delivering Yellow Amber indicator, Signal Red brake warning, and Pure White DRL visibility.",
      "COMPATIBLE FITMENT: Tailored for Apsara, Mayuri, Saarthi, and universal multi-brand commercial E-Rickshaws.",
      "ULTRA-LOW CONSUMPTION: Draws only 12V 2A (3 Watts), ensuring safety lighting without draining traction battery reserves.",
      "HIGH-GRADE ABS CASING: Shock-resistant ABS polymer back casing with copper insulated leads protects against road splash and impacts."
    ],
    features: [
      { icon: "Zap", title: "3W Ultra-Low Drain", desc: "Preserves traction battery mileage" },
      { icon: "Sparkles", title: "Tri-Color Cluster", desc: "Amber turn, Red stop, White DRL" },
      { icon: "ShieldCheck", title: "ABS Housing", desc: "Heavy road shock and stone-chip proof" },
      { icon: "Layers", title: "Copper Wiring", desc: "Tinned copper leads for long life" }
    ],
    specs: {
      "Light Colors": "Yellow, Red, White",
      "Operating Power": "12V 2A (3 Watts)",
      "Back Cover": "High-Quality ABS Engineered Polymer",
      "Fitment Type": "Front & Rear Exterior Mounting Bracket",
      "Compatible Fleet": "Apsara, Mayuri, Saarthi & Standard E-Rickshaws"
    }
  },
  {
    id: "music-system",
    title: "Music System",
    category: "Audio & Accessories",
    price: 1400.0,
    originalPrice: 2100.0,
    image: "/images/products/music-system.jpg",
    badge: "Remote Included",
    tag: "Bluetooth & FM",
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    warranty: "6 Months Showroom Guarantee",
    shipping: "PAN India Dispatch in 24 Hrs",
    shortDesc: "Commercial EV stereo player with Bluetooth hands-free calling, sunlight-readable display screen, heavy bass amp, and remote control.",
    fullDesc: [
      "HIGH-BRIGHTNESS DISPLAY SCREEN: High-contrast daylight readable screen gives clear track and FM visibility under direct bright sunlight.",
      "BLUETOOTH HANDS-FREE CALLING: Built-in Bluetooth microphone enables drivers to receive incoming passenger and commercial calls safely without holding phones.",
      "MULTIPLE AUDIO INPUTS: Supports Bluetooth 5.0 wireless streaming, USB flash drives, TF/SD cards, AUX input, and sensitive digital FM receiver.",
      "HEAVY STEREO BASS AMP: High-output dual-channel external speaker amplifier delivers loud, crystal-clear sound throughout the passenger cabin.",
      "REMOTE CONTROL INCLUDED: Comes with a dedicated infrared wireless remote control (batteries included in the package)."
    ],
    features: [
      { icon: "Sparkles", title: "Bluetooth 5.0", desc: "Hands-free calling & audio streaming" },
      { icon: "Volume2", title: "Heavy Bass Amp", desc: "Dual stereo high-power audio output" },
      { icon: "Sun", title: "Sunlight Display", desc: "Crystal clear daylight readability" },
      { icon: "Radio", title: "Remote + FM/USB", desc: "Wireless remote & multi-source playback" }
    ],
    specs: {
      "Connectivity": "Bluetooth 5.0, USB 2.0, SD/TF Card, 3.5mm AUX, FM Radio",
      "Calling": "Integrated Microphone for Hands-Free Calling",
      "Audio Amplifier": "Dual Channel Stereo High-Watt Output",
      "Display": "Sunlight-Readable Digital LED Matrix",
      "Operating Voltage": "12V DC Auxiliary",
      "Included in Box": "Stereo Unit, IR Remote Control, Batteries, Wiring Loom"
    }
  }
];

