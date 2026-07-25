import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackBg?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  fallbackBg = "#1F3329",
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: fallbackBg,
          ...style,
        }}
        aria-label={alt}
        role="img"
      />
    );
  }

  const combinedClassName = className ? `editorial-photo ${className}` : "editorial-photo";

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={combinedClassName}
      style={{
        filter: "sepia(6%) saturate(108%) brightness(1.02) contrast(1.03)",
        ...style,
      }}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
