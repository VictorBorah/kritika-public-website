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
    id: "crimson-super-dx",
    name: "Kritika Crimson Super DX",
    series: "Signature Series",
    tagline: "The rugged urban workhorse engineered for maximum passenger comfort and endurance.",
    badge: "Most Popular",
    colorName: "Ruby Crimson",
    colorHex: "#EF4444",
    accentColor: "from-red-500/20 to-orange-500/10",
    image: "/images/erickshaw-hero.png",
    frameIndex: 180,
    specs: {
      motor: "1200W High-Torque BLDC",
      battery: "48V 130Ah Heavy Duty Powerpack",
      range: "110 – 130 km / Charge",
      speed: "25 km/h (ARAI Regulated)",
      payload: "480 kg High Capacity",
      seating: "4 Passengers + 1 Driver",
      charging: "6 – 8 Hours Smart Cut-off",
    },
    highlights: [
      "Robotic welded tubular steel chassis with anti-corrosion primer coating",
      "Reinforced heavy-duty front shock absorbers for Indian road conditions",
      "All-weather high-visibility safety windshield with mechanical wiper",
      "Rooftop luggage carrier and integrated spare wheel mount",
    ],
  },
  {
    id: "jade-commuter-pro",
    name: "Kritika Jade Commuter Pro",
    series: "Eco-Performance Series",
    tagline: "Advanced aerodynamics, high efficiency motor, and superior mileage on city routes.",
    badge: "Eco-Tech Choice",
    colorName: "Emerald Teal",
    colorHex: "#10B981",
    accentColor: "from-emerald-500/20 to-cyan-500/10",
    image: "/frames/ezgif-frame-180.jpg",
    frameIndex: 180,
    specs: {
      motor: "1400W High-Efficiency BLDC",
      battery: "48V 140Ah Dual Mode Energy Pack",
      range: "125 – 145 km / Charge",
      speed: "25 km/h (ARAI Regulated)",
      payload: "500 kg Heavy Load Tested",
      seating: "4 Passengers + 1 Driver",
      charging: "5 – 7 Hours Fast Charging",
    },
    highlights: [
      "Digital speedometer cluster with battery health telemetry and trip meter",
      "Dual 5V USB fast charging ports for driver mobile device",
      "Rear leaf-spring suspension with heavy-duty dampeners",
      "Full perimeter LED ambient safety reflectors",
    ],
  },
  {
    id: "cobalt-voyager-max",
    name: "Kritika Cobalt Voyager Max",
    series: "Flagship Luxury Series",
    tagline: "Premium passenger ride quality with reinforced roll-cage and ultra-plush seating.",
    badge: "Flagship Comfort",
    colorName: "Cobalt Sapphire",
    colorHex: "#3B82F6",
    accentColor: "from-blue-500/20 to-violet-500/10",
    image: "/frames/ezgif-frame-180.jpg",
    frameIndex: 180,
    specs: {
      motor: "1500W Peak Performance BLDC",
      battery: "60V 150Ah Long-Life Pack",
      range: "140 – 160 km / Charge",
      speed: "25 km/h (ARAI Regulated)",
      payload: "520 kg Maximum Rating",
      seating: "4 Passengers + 1 Driver",
      charging: "5 – 6 Hours Fast Charging",
    },
    highlights: [
      "High-density PU foam quilted leatherette seats with lumbar support",
      "Front responsive hydraulic disc brake + rear drum with parking lever",
      "Reinforced roof frame prepared for taxi illumination light box",
      "Factory wiring harness ready for custom music system & alloy wheels",
    ],
  },
];
