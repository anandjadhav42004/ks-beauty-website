interface LogoMarkProps {
  size?: number;
  className?: string;
}

export default function LogoMark({ size = 38, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="KS Beauty Monogram Logo"
    >
      {/* Outer gold circle */}
      <circle cx="50" cy="50" r="45" stroke="#B8935A" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="50" r="41" stroke="#B8935A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.65" fill="none" />

      {/* Decorative bindi dot at top */}
      <circle cx="50" cy="14" r="3.5" fill="#B8935A" />

      {/* Interlocking KS Text */}
      <text
        x="35"
        y="62"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="44"
        fontWeight="700"
        fill="#B8935A"
        letterSpacing="-3"
      >
        K
      </text>
      <text
        x="51"
        y="65"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="40"
        fontWeight="700"
        fill="#D4AF37"
        fontStyle="italic"
        opacity="0.95"
      >
        S
      </text>

      {/* Small diamond accent at bottom */}
      <polygon points="50,82 52.5,85 50,88 47.5,85" fill="#B8935A" />
    </svg>
  );
}
