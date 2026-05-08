"use client";

interface PhoneMockupProps {
  brand?: "Apple" | "Samsung" | "Google";
  color?: string;
  className?: string;
  size?: number;
}

const brandThemes = {
  Apple: {
    body: ["#2a2a2e", "#3a3a3e"],
    screen: ["#0a0a14", "#1a1a28"],
    accent: "#62b6cb",
    camera: true,
    dynamicIsland: true,
  },
  Samsung: {
    body: ["#1a1a2e", "#2e2e4a"],
    screen: ["#050510", "#10102a"],
    accent: "#bee9e8",
    camera: true,
    dynamicIsland: false,
  },
  Google: {
    body: ["#f0f0f0", "#e0e0e0"],
    screen: ["#0a0a14", "#1a1a28"],
    accent: "#62b6cb",
    camera: false,
    dynamicIsland: false,
  },
};

export default function PhoneMockup({
  brand = "Apple",
  color,
  className = "",
  size = 220,
}: PhoneMockupProps) {
  const theme = brandThemes[brand];
  const w = size * 0.48;
  const h = size;
  const id = `${brand}-${Math.random().toString(36).slice(2, 6)}`;

  const bodyColor = color || theme.body[0];

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bodyColor} />
          <stop offset="100%" stopColor={theme.body[1]} />
        </linearGradient>
        <linearGradient id={`screen-${id}`} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={theme.screen[0]} />
          <stop offset="100%" stopColor={theme.screen[1]} />
        </linearGradient>
        <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`shine-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={`shadow-${id}`}>
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor={theme.accent} floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Body shadow */}
      <rect x="8" y="6" width="84" height="198" rx="18" fill={theme.accent} opacity="0.15" />

      {/* Phone body */}
      <rect x="4" y="2" width="92" height="206" rx="18" fill={`url(#body-${id})`} filter={`url(#shadow-${id})`} />

      {/* Screen bezel */}
      <rect x="8" y="6" width="84" height="198" rx="15" fill={`url(#screen-${id})`} />

      {/* Screen glow from bottom */}
      <rect x="8" y="130" width="84" height="74" rx="0" fill={`url(#glow-${id})`} opacity="0.4" />

      {/* Screen content - abstract UI */}
      <rect x="14" y="50" width="72" height="6" rx="3" fill={theme.accent} opacity="0.5" />
      <rect x="14" y="62" width="50" height="4" rx="2" fill="white" opacity="0.12" />
      <rect x="14" y="72" width="60" height="4" rx="2" fill="white" opacity="0.08" />

      <rect x="14" y="88" width="34" height="34" rx="8" fill={theme.accent} opacity="0.2" />
      <rect x="52" y="88" width="34" height="34" rx="8" fill="white" opacity="0.06" />

      <rect x="14" y="130" width="72" height="3" rx="1.5" fill="white" opacity="0.07" />
      <rect x="14" y="138" width="55" height="3" rx="1.5" fill="white" opacity="0.05" />
      <rect x="14" y="146" width="65" height="3" rx="1.5" fill="white" opacity="0.05" />

      {/* Shine overlay */}
      <rect x="4" y="2" width="92" height="206" rx="18" fill={`url(#shine-${id})`} />

      {/* Dynamic Island / Notch */}
      {theme.dynamicIsland ? (
        <rect x="33" y="12" width="34" height="12" rx="6" fill="#0a0a0a" />
      ) : (
        <circle cx="50" cy="18" r="5" fill="#0a0a0a" />
      )}

      {/* Home indicator */}
      <rect x="38" y="195" width="24" height="3" rx="1.5" fill="white" opacity="0.3" />

      {/* Side buttons */}
      <rect x="0" y="60" width="3" height="22" rx="1.5" fill={bodyColor} />
      <rect x="0" y="88" width="3" height="22" rx="1.5" fill={bodyColor} />
      <rect x="97" y="70" width="3" height="30" rx="1.5" fill={bodyColor} />

      {/* Camera (Samsung style - square bump) */}
      {brand === "Samsung" && (
        <>
          <rect x="60" y="8" width="28" height="26" rx="6" fill="#111" opacity="0.9" />
          <circle cx="68" cy="16" r="4" fill="#222" />
          <circle cx="80" cy="16" r="4" fill="#222" />
          <circle cx="68" cy="27" r="4" fill="#222" />
          <circle cx="80" cy="27" r="2.5" fill="#222" />
          <circle cx="68" cy="16" r="2" fill={theme.accent} opacity="0.6" />
          <circle cx="80" cy="16" r="2" fill={theme.accent} opacity="0.4" />
        </>
      )}

      {/* Camera (Apple style - square module) */}
      {brand === "Apple" && (
        <>
          <rect x="14" y="8" width="26" height="24" rx="7" fill="#111" opacity="0.95" />
          <circle cx="22" cy="16" r="4" fill="#1a1a1a" />
          <circle cx="32" cy="16" r="4" fill="#1a1a1a" />
          <circle cx="22" cy="25" r="4" fill="#1a1a1a" />
          <circle cx="22" cy="16" r="2.2" fill={theme.accent} opacity="0.7" />
          <circle cx="32" cy="16" r="2.2" fill={theme.accent} opacity="0.5" />
        </>
      )}

      {/* Camera (Google style - camera bar) */}
      {brand === "Google" && (
        <>
          <rect x="4" y="55" width="92" height="18" rx="4" fill="#d0d0d0" opacity="0.7" />
          <circle cx="30" cy="64" r="6" fill="#bbb" />
          <circle cx="50" cy="64" r="6" fill="#bbb" />
          <circle cx="70" cy="64" r="4" fill="#ccc" />
          <circle cx="30" cy="64" r="3" fill="#62b6cb" opacity="0.6" />
          <circle cx="50" cy="64" r="3" fill="#62b6cb" opacity="0.4" />
        </>
      )}
    </svg>
  );
}
