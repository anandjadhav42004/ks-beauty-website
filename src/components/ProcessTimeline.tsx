import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Palette, Star } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <MessageSquare size={22} />,
    title: "Consultation",
    description:
      "We begin with a personal conversation — your vision, your skin, your timeline, and your budget. No pressure, just clarity.",
    gradient: "linear-gradient(135deg, #1F3329 0%, #2D4A3A 100%)",
  },
  {
    num: "02",
    icon: <Palette size={22} />,
    title: "Trial Session",
    description:
      "We refine every detail — product formulas, colour palettes, hair style, and timing — until your look is exactly right.",
    gradient: "linear-gradient(135deg, #B8935A 0%, #c4a060 100%)",
  },
  {
    num: "03",
    icon: <Star size={22} />,
    title: "Event Day",
    description:
      "We arrive at your door, on time, fully equipped. You relax. We create. You walk out ready for the most important moment of your life.",
    gradient: "linear-gradient(135deg, #7A2E38 0%, #4a1520 100%)",
  },
];

export default function ProcessTimeline() {
  const lineRef = useRef<SVGLineElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (lineRef.current) observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FAF4EC" }}
    >
      {/* Corner ornament */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle at top right, rgba(184, 147, 90, 0.07), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              How It Works
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#1F3329",
              lineHeight: 1.15,
            }}
          >
            Three Steps to Effortless Beauty
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: "48px",
              left: "16.66%",
              right: "16.66%",
              height: "1px",
              zIndex: 0,
              overflow: "visible",
            }}
          >
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", overflow: "visible" }}
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
            >
              <line
                ref={lineRef}
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#B8935A"
                strokeWidth="1"
                strokeOpacity="0.5"
                strokeDasharray="200"
                strokeDashoffset={lineVisible ? "0" : "200"}
                style={{
                  transition: lineVisible ? "stroke-dashoffset 1000ms ease-out 300ms" : "none",
                }}
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
                data-testid={`timeline-step-${i}`}
                style={{ textAlign: "center" }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: step.gradient,
                    border: "2px solid rgba(184, 147, 90, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                    boxShadow: "0 8px 24px rgba(31, 51, 41, 0.15)",
                    position: "relative",
                  }}
                >
                  <div style={{ color: "rgba(251, 246, 238, 0.7)", marginBottom: "2px" }}>{step.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#B8935A",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#1F3329",
                    marginBottom: "12px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "15px",
                    color: "#5a4a40",
                    lineHeight: 1.75,
                    maxWidth: "280px",
                    margin: "0 auto",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              style={{ display: "flex", gap: "20px", position: "relative" }}
            >
              {/* Left column: circle + line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "64px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: step.gradient,
                    border: "1.5px solid rgba(184, 147, 90, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 18px rgba(31, 51, 41, 0.15)",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ color: "rgba(251, 246, 238, 0.8)" }}>{step.icon}</div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: "1px",
                      flex: 1,
                      background: "rgba(184, 147, 90, 0.3)",
                      margin: "8px 0",
                      minHeight: "48px",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div style={{ paddingBottom: i < steps.length - 1 ? "32px" : "0", paddingTop: "12px" }}>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#B8935A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Step {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#1F3329",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "15px",
                    color: "#5a4a40",
                    lineHeight: 1.75,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
