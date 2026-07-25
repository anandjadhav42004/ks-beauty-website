import { useEffect, useRef, useState } from "react";

interface GoldDrapeDividerProps {
  flipped?: boolean;
  color?: string;
}

export default function GoldDrapeDivider({ flipped = false, color = "#B8935A" }: GoldDrapeDividerProps) {
  const ref = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      viewBox="0 0 1440 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        display: "block",
        transform: flipped ? "scaleY(-1)" : "none",
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      {/* Background fill to blend sections */}
      <path
        d="M0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 40 L0 40Z"
        fill="transparent"
      />
      {/* Decorative drape line */}
      <path
        ref={ref}
        d="M0 30 Q180 8 360 22 Q540 36 720 16 Q900 -2 1080 18 Q1260 36 1440 12"
        stroke={color}
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.5"
        strokeDasharray="1000"
        strokeDashoffset={visible ? "0" : "1000"}
        style={{
          transition: visible ? "stroke-dashoffset 900ms ease-out" : "none",
        }}
      />
      {/* Second subtler line */}
      <path
        d="M0 34 Q240 14 480 26 Q720 38 960 20 Q1200 4 1440 18"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        strokeOpacity="0.25"
        strokeDasharray="1000"
        strokeDashoffset={visible ? "0" : "1000"}
        style={{
          transition: visible ? "stroke-dashoffset 1100ms ease-out 100ms" : "none",
        }}
      />
    </svg>
  );
}
