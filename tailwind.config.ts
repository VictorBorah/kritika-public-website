import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        kmf: {
          dark: "#030508",
          charcoal: "#060911",
          navy: "#0A0E1A",
          card: "rgba(13, 19, 34, 0.75)",
          cardHover: "rgba(18, 26, 46, 0.9)",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(0, 240, 255, 0.3)",
        },
        cyber: {
          green: "#00FF9D",
          emerald: "#10B981",
          cyan: "#00F0FF",
          electric: "#06B6D4",
          violet: "#A855F7",
          purple: "#8B5CF6",
          blue: "#3B82F6",
          crimson: "#FF3366",
          amber: "#F59E0B",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(0, 255, 157, 0.6))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00FF9D 0%, #00F0FF 50%, #A855F7 100%)',
        'cyber-gradient-alt': 'linear-gradient(135deg, #00F0FF 0%, #3B82F6 50%, #8B5CF6 100%)',
        'cyber-grid': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;

