import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

// TODO: replace placeholder prices with client's exact pricing structure before launch.
const packages = [
  {
    name: "Bridal Trial",
    price: "$150", // [PLACEHOLDER — UPDATE WITH REAL PRICE]
    unit: "starting at",
    description: "A comprehensive rehearsal session to craft and perfect your dream bridal look.",
    popular: false,
    features: [
      "1-hour dedicated consultation",
      "Full hair & makeup trial session",
      "Skin preparation & product testing",
      "High-resolution photos for reference",
      "Schedule & timing planning",
    ],
    cta: "Get This Package",
  },
  {
    name: "Bridal Day",
    price: "$450", // [PLACEHOLDER — UPDATE WITH REAL PRICE]
    unit: "starting at",
    description: "The complete luxury wedding morning experience. Calm, punctual, and flawless.",
    popular: true,
    badge: "Most Popular",
    features: [
      "Luxury bridal hair & makeup",
      "Touch-up kit left behind for the day",
      "On-site mobile arrival at your venue/home",
      "High-end long-wear & waterproof products",
      "Dupatta / veil & jewelry placement assist",
    ],
    cta: "Get This Package",
  },
  {
    name: "Bridal Party Package",
    price: "$350", // [PLACEHOLDER — UPDATE WITH REAL PRICE]
    unit: "per person starting at",
    description: "Coordinated glamour for your bridesmaids, mother of the bride, and loved ones.",
    popular: false,
    features: [
      "Coordinated hair & makeup looks",
      "Timelines & group scheduling management",
      "Lead artist & assistant team on-site",
      "False lash application included",
      "On-location touch-ups before departure",
    ],
    cta: "Get This Package",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
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
              Investment &amp; Packages
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 700,
              color: "#1F3329",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Transparent Luxury Pricing
          </h2>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "18px",
              color: "#5a4a40",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Tailored mobile bridal packages designed to give you peace of mind on your most memorable day.
          </p>
        </motion.div>

        {/* Pricing Cards — Mobile horizontal snap carousel / Desktop 3-col grid */}
        <div className="flex md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 md:pb-0 px-2 md:px-0">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 45px rgba(31, 51, 41, 0.14)",
              }}
              className="shrink-0 w-[88vw] sm:w-[320px] md:w-auto snap-center relative p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-lg transition-all duration-300"
              style={{
                background: pkg.popular ? "#1F3329" : "rgba(251, 246, 238, 0.9)",
                color: pkg.popular ? "#FBF6EE" : "#2B2420",
                border: pkg.popular
                  ? "2px solid #B8935A"
                  : "1px solid rgba(184, 147, 90, 0.25)",
              }}
            >
              {/* Popular Gold Badge */}
              {pkg.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #B8935A 0%, #d4af72 100%)",
                    color: "#1F3329",
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 18px",
                    borderRadius: "100px",
                    boxShadow: "0 4px 12px rgba(184, 147, 90, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Sparkles size={12} />
                  {pkg.badge}
                </div>
              )}

              <div>
                <h3
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: pkg.popular ? "#FBF6EE" : "#1F3329",
                    marginBottom: "10px",
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "14px",
                    color: pkg.popular ? "rgba(251, 246, 238, 0.75)" : "#5a4a40",
                    marginBottom: "24px",
                    lineHeight: 1.6,
                    minHeight: "44px",
                  }}
                >
                  {pkg.description}
                </p>

                {/* Price block */}
                <div style={{ marginBottom: "28px" }}>
                  <span
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "12px",
                      color: "#B8935A",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {pkg.unit}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: "var(--app-font-serif)",
                        fontSize: "44px",
                        fontWeight: 800,
                        color: pkg.popular ? "#FBF6EE" : "#1F3329",
                        lineHeight: 1,
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        color: pkg.popular ? "rgba(184, 147, 90, 0.9)" : "#B8935A",
                      }}
                    >
                      CAD
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: pkg.popular
                      ? "rgba(184, 147, 90, 0.3)"
                      : "rgba(184, 147, 90, 0.15)",
                    marginBottom: "28px",
                  }}
                />

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: pkg.popular
                            ? "rgba(184, 147, 90, 0.2)"
                            : "rgba(31, 51, 41, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Check size={12} color="#B8935A" strokeWidth={2.5} />
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "14px",
                          color: pkg.popular ? "rgba(251, 246, 238, 0.9)" : "#4a3a30",
                          lineHeight: 1.5,
                        }}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  background: pkg.popular ? "#B8935A" : "#1F3329",
                  color: "#FBF6EE",
                  border: "none",
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 200ms ease-out",
                }}
              >
                {pkg.cta}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Small note */}
        <p
          style={{
            fontFamily: "var(--app-font-sans)",
            fontSize: "13px",
            color: "rgba(90, 74, 64, 0.7)",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Final pricing depends on group size, travel distance, and add-ons — request a custom quote for exact pricing.
        </p>
      </div>
    </section>
  );
}
