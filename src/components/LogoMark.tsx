interface LogoMarkProps {
  size?: number;
  className?: string;
}

export default function LogoMark({ size = 42, className = "" }: LogoMarkProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src="/images/logo/rivaaz-monogram.png"
        alt="Rivaaz Glam Studio RG Monogram Logo"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
