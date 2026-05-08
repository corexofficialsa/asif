"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export default function Logo({ size = "md", dark = false }: LogoProps) {
  const sizes = { sm: 28, md: 36, lg: 52 };
  const h = sizes[size];
  const textColor = dark ? "#0d1b2a" : "#ffffff";
  const barColor = "#62b6cb";

  return (
    <svg
      height={h}
      viewBox="0 0 110 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {/* Accent dot */}
      <circle cx="6" cy="18" r="5" fill="#62b6cb" opacity="0.95" />
      <circle cx="6" cy="18" r="3" fill="#bee9e8" />

      {/* Wordmark */}
      <text
        x="16"
        y="25"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        letterSpacing="2.5"
        fill={textColor}
      >
        ASIF
      </text>

      {/* Underline */}
      <rect x="16" y="29" width="88" height="2" rx="1" fill={barColor} />
    </svg>
  );
}
