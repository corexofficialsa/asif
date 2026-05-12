"use client";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizes = { sm: 36, md: 44, lg: 60 };
  const h = sizes[size];

  return (
    <Image
      src="/ab-logo.png"
      alt="ASIF"
      width={h}
      height={h}
      priority
      className="select-none"
      style={{ objectFit: "contain" }}
    />
  );
}
