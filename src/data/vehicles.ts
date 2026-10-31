export interface VehicleModel {
  id: string;
  name: string;
  series: string;
  tagline: string;
  badge: string;
  colorName: string;
  colorHex: string;
  accentColor: string;
  image: string;
  frameIndex: number; // reference to scene frame
  specs: {
    motor: string;
    battery: string;
    range: string;
    speed: string;
    payload: string;
    seating: string;
    charging: string;
  };
  highlights: string[];
}

export const VEHICLE_MODELS: VehicleModel[] = [
  {
    id: "max-moter-elite",
    name: "Max Moter Elite",
    series: "Signature Series",
    tagline: "Flagship commercial passenger e-rickshaw engineered with aerodynamic steel bodywork, high-torque BLDC drivetrain, and unmatched passenger ride comfort for maximum daily fare revenue.",
    badge: "Signature Flagship",
    colorName: "Max Crimson & Chrome",
    colorHex: "#EF4444",
    accentColor: "from-red-500/20 to-orange-500/10",
    image: "/images/vehicles/max-motors.png",
    frameIndex: 180,
    specs: {
      motor: "1400W High-Torque BLDC",
      battery: "48V 140Ah Heavy Duty Powerpack",
      range: "125 – 140 km / Charge",
      speed: "25 km/h (ARAI Regulated)",
      payload: "520 kg High Capacity",
      seating: "4 Passengers + 1 Driver",
      charging: "5 – 7 Hours Smart Cut-off",
    },
    highlights: [
      "Aerodynamic front cowl with automotive-grade robotic welded steel chassis",
      "Heavy-duty telescopic hydraulic front suspension tuned for northeast road terrain",
      "Luxury high-resilience PU foam passenger bench with non-slip textured matting",
      "High-output LED headlamps, dual USB mobile charger, and digital telemetry cluster",
    ],
  },
  {
    id: "apsara-comfort",
    name: "Apsara Comfort",
    series: "Passenger Commuter Series",
    tagline: "Built for nonstop everyday passenger routes, combining high battery efficiency, whisper-quiet operation, ultra-plush seating, and an all-weather canopy for full rider protection.",
    badge: "Best-in-Class Mileage",
    colorName: "Apsara Emerald & Gold",
    colorHex: "#10B981",
    accentColor: "from-emerald-500/20 to-teal-500/10",
    image: "/images/vehicles/apsara-tuk-tuk.png",
    frameIndex: 180,
    specs: {
      motor: "1200W High-Efficiency BLDC",
      battery: "48V 130Ah Long-Life Powerpack",
      range: "115 – 135 km / Charge",
      speed: "25 km/h (ARAI Regulated)",
      payload: "480 kg High Capacity",
      seating: "4 Passengers + 1 Driver",
      charging: "6 – 8 Hours Smart Charging",
    },
    highlights: [
      "Spacious cabin with extra legroom, passenger grab rails, and wide boarding footplate",
      "Dual-rate rear leaf spring suspension with shock absorbers for vibration-free transit",
      "Reinforced all-weather canopy with roll-down transparent monsoon rain curtains",
      "Digital speedometer with battery voltage readout, reverse gear assist, and hazard flashers",
    ],
  },
  {
    id: "apsara-loader",
    name: "Apsara Loader",
    series: "Heavy Cargo Series",
    tagline: "Heavy-duty commercial electric cargo loader built for wholesale markets, parcel logistics, construction supplies, and agricultural freight with a reinforced drop-side cargo bed.",
    badge: "Heavy Cargo Edition",
    colorName: "Industrial Blue & Steel",
    colorHex: "#3B82F6",
    accentColor: "from-blue-500/20 to-cyan-500/10",
    image: "/images/vehicles/apsara-loader.png",
    frameIndex: 180,
    specs: {
      motor: "1500W High-Gradeability BLDC",
      battery: "60V 150Ah Commercial Pack",
      range: "105 – 125 km / Charge (Loaded)",
      speed: "25 km/h (ARAI Regulated)",
      payload: "650 kg Heavy Commercial Rating",
      seating: "1 Driver + Heavy Flatbed Cargo Box",
      charging: "6 – 7 Hours Fast Charging",
    },
    highlights: [
      "Reinforced drop-side corrugated steel cargo bed with industrial tailgate locks",
      "High-reduction torque axle for commanding steep bridge inclines and muddy rural roads",
      "Triple-leaf heavy duty rear spring suspension with structural cross-bracing",
      "Dual-circuit mechanical and handbrake parking locks with heavy-duty bumper guard",
    ],
  },
];
