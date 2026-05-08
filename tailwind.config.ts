import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#62b6cb",
        secondary: "#bee9e8",
        white: "#ffffff",
        dark: "#0d1b2a",
        "dark-2": "#1b2a3b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        glow: "glow 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate3d(0, 1, 0.1, -12deg)" },
          "50%": { transform: "translateY(-28px) rotate3d(0, 1, 0.1, -12deg)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 30px rgba(98,182,203,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(98,182,203,0.7), 0 0 100px rgba(190,233,232,0.3)" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
