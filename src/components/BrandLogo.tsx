interface BrandLogoProps {
  brand: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({ brand, size = 28, className = "" }: BrandLogoProps) {
  if (brand === "Apple") {
    return (
      <svg
        width={size * 0.82}
        height={size}
        viewBox="0 0 170 207"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M150.37 130.25c-.74 16.21 14.18 24.24 14.39 24.35-.12.39-2.25 7.69-7.42 15.24-4.47 6.53-9.11 13.03-16.39 13.16-7.15.13-9.45-4.24-17.63-4.24-8.18 0-10.74 4.11-17.51 4.37-7.04.26-12.39-6.97-16.9-13.47-9.19-13.28-16.22-37.51-6.78-53.9 4.69-8.14 13.1-13.29 22.21-13.42 6.93-.13 13.47 4.66 17.7 4.66 4.23 0 12.17-5.77 20.49-4.92 3.49.15 13.29 1.41 19.58 10.6-.51.31-11.68 6.82-11.74 20.57zm-23.2-40.06c3.75-4.54 6.27-10.86 5.58-17.16-5.4.22-11.94 3.59-15.82 8.13-3.47 4.02-6.51 10.44-5.7 16.6 6.03.47 12.19-3.07 15.94-7.57z" />
      </svg>
    );
  }

  if (brand === "Samsung") {
    return (
      <svg
        width={size * 2.8}
        height={size * 0.6}
        viewBox="0 0 280 60"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="46"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="46"
          letterSpacing="-1"
        >
          SAMSUNG
        </text>
      </svg>
    );
  }

  if (brand === "Google") {
    return (
      <svg
        width={size * 1.6}
        height={size * 0.55}
        viewBox="0 0 90 30"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="23"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="400"
          fontSize="22"
          fill="#5f6368"
          letterSpacing="0.5"
        >
          Pixel
        </text>
      </svg>
    );
  }

  /* Fallback generic phone icon */
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
  );
}
