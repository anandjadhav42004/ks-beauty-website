import { motion } from "framer-motion";
import { Clock, Award, MapPin, Sparkles, Shield, Sunrise, Heart } from "lucide-react";

const badges = [
  {
    icon: <Clock size={22} />,
    label: "10+ Years",
    sub: "Experience",
  },
  {
    icon: <Award size={22} />,
    label: "Certified Hair &",
    sub: "Makeup Artist",
  },
  {
    icon: <MapPin size={22} />,
    label: "Mobile Services Across",
    sub: "Toronto & GTA",
  },
  {
    icon: <Heart size={22} />,
    label: "500+ Happy Clients",
    sub: "[CONFIRM NUMBER WITH CLIENT]",
  },
  {
    icon: <Sparkles size={22} />,
    label: "Premium Luxury",
    sub: "Products",
  },
  {
    icon: <Shield size={22} />,
    label: "Sanitized",
    sub: "Professional Kit",
  },
];

export default function TrustBadges() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        background: "#1F3329",
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.3' opacity='0.08'%3E%3Ccircle cx='60' cy='60' r='30'/%3E%3Ccircle cx='60' cy='60' r='50'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section label */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.6 }} />
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
              Why Brides Trust KS Beauty
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.6 }} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.175, 0.885, 0.32, 1.275], // spring-like
              }}
              data-testid={`trust-badge-${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                background: "rgba(251, 246, 238, 0.04)",
                border: "1px solid rgba(184, 147, 90, 0.25)",
                borderRadius: "18px",
                padding: "20px 24px",
                minWidth: "120px",
                transition: "all 250ms ease-out",
                cursor: "default",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(184, 147, 90, 0.6)",
                background: "rgba(251, 246, 238, 0.07)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(184, 147, 90, 0.12)",
                  border: "1px solid rgba(184, 147, 90, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#B8935A",
                }}
              >
                {badge.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#FBF6EE",
                    lineHeight: 1.2,
                  }}
                >
                  {badge.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 400,
                    fontSize: "11px",
                    color: "rgba(184, 147, 90, 0.8)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  {badge.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
