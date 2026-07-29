import { useState } from "react";
import { Sparkles } from "lucide-react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackBg?: string;
  placeholderText?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  fallbackBg = "#1F3329",
  placeholderText,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || src === "" || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center p-4 relative overflow-hidden ${className || ""}`}
        style={{
          backgroundColor: fallbackBg,
          background: fallbackBg === "#FBF6EE"
            ? "linear-gradient(135deg, #FBF6EE 0%, #F5ECCB 100%)"
            : "linear-gradient(135deg, #1F3329 0%, #294537 100%)",
          color: fallbackBg === "#FBF6EE" ? "#1F3329" : "#FBF6EE",
          ...style,
        }}
        aria-label={alt || "KS Beauty Placeholder"}
        role="img"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-inner"
          style={{
            background: fallbackBg === "#FBF6EE" ? "rgba(31, 51, 41, 0.08)" : "rgba(184, 147, 90, 0.15)",
            border: "1px solid rgba(184, 147, 90, 0.3)",
          }}
        >
          <Sparkles size={18} style={{ color: "#B8935A" }} />
        </div>
        <span
          style={{
            fontFamily: "var(--app-font-serif, serif)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#B8935A",
            opacity: 0.9,
          }}
        >
          {placeholderText || "KS Beauty"}
        </span>
      </div>
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
