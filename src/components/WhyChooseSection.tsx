import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  {
    title: "10+ years of professional experience",
    detail: "Over a decade of master bridal experience creating unforgettable looks across GTA and Ontario.",
  },
  {
    title: "Certified Hair & Makeup Artist",
    detail: "Full professional credentials, PBCA membership, and continuing education in luxury beauty techniques.",
  },
  {
    title: "Mobile luxury service",
    detail: "We travel to your home, hotel, or venue bridal suite across Toronto, Durham, and the GTA.",
  },
  {
    title: "Specialized in South Asian & multicultural beauty",
    detail: "Expert knowledge of South Asian bridal traditions, dupatta draping, skin undertones, and cultural features.",
  },
  {
    title: "Customized looks for every face shape & skin tone",
    detail: "Bespoke contouring, eye shapes, and custom shade matching tailored specifically to you.",
  },
  {
    title: "Professional, hygienic, and reliable",
    detail: "Strict sanitization protocols, fresh disposable applicators, and guaranteed on-time arrival.",
  },
  {
    title: "High-end products for long-lasting wear",
    detail: "Formulated with luxury formulas (Charlotte Tilbury, MAC, NARS) that withstand tears, humidity, and 14+ hours of wear.",
  },
  {
    title: "Hair & makeup in one appointment",
    detail: "One artist handling both hair and makeup — streamlined, relaxed, and timed to perfection.",
  },
  {
    title: "Bridal and special event specialist",
    detail: "Focused expertise in weddings, engagements, sangeets, receptions, and high-profile celebrations.",
  },
];

export default function WhyChooseSection() {
  return (
    <section
      id="why-us"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FAF4EC" }}
    >
      {/* Decorative side element */}
      <div
        className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to left, rgba(184, 147, 90, 0.04), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Decorative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative" style={{ padding: "24px" }}>
              {/* Corner ornaments */}
              {[
                { top: 0, left: 0, borderTop: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
                { top: 0, right: 0, borderTop: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
                { bottom: 0, left: 0, borderBottom: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
                { bottom: 0, right: 0, borderBottom: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
              ].map((style, i) => (
                <div
                  key={i}
                  style={{ position: "absolute", width: "44px", height: "44px", zIndex: 2, ...style }}
                />
              ))}

              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #FBF6EE 0%, #f0e8d8 100%)",
                  border: "1px solid rgba(184, 147, 90, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(31, 51, 41, 0.08)",
                  padding: "40px",
                }}
              >
                {/* Pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.5' opacity='0.1'%3E%3Cellipse cx='80' cy='80' rx='30' ry='60'/%3E%3Cellipse cx='80' cy='80' rx='60' ry='30'/%3E%3Ccircle cx='80' cy='80' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "160px 160px",
                  }}
                />

                {/* Stats */}
                <div
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#1F3329",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  10+
                </div>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#B8935A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "32px",
                  }}
                >
                  Years of Excellence
                </div>

                <div
                  style={{
                    width: "60px",
                    height: "1px",
                    background: "rgba(184, 147, 90, 0.4)",
                    marginBottom: "32px",
                  }}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    textAlign: "center",
                  }}
                >
                  {[
                    { num: "500+", label: "Brides" },
                    { num: "GTA", label: "Coverage" },
                    { num: "100%", label: "Mobile" },
                    { num: "PBCA", label: "Certified" },
                  ].map((stat) => (
                    <div key={stat.num}>
                      <div
                        style={{
                          fontFamily: "var(--app-font-serif)",
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "#1F3329",
                          lineHeight: 1,
                        }}
                      >
                        {stat.num}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#B8935A",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginTop: "4px",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Checklist */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-5">
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
                  Why Choose Us
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 700,
                  color: "#1F3329",
                  lineHeight: 1.15,
                  marginBottom: "36px",
                }}
              >
                Beauty that moves{" "}
                <span style={{ color: "#7A2E38", fontStyle: "italic" }}>with you.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col gap-5">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  data-testid={`why-item-${i}`}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px 24px",
                    background: "rgba(251, 246, 238, 0.7)",
                    border: "1px solid rgba(184, 147, 90, 0.15)",
                    borderRadius: "18px",
                    transition: "all 250ms ease-out",
                  }}
                  whileHover={{
                    borderColor: "rgba(184, 147, 90, 0.4)",
                    boxShadow: "0 4px 20px rgba(31, 51, 41, 0.07)",
                  }}
                >
                  {/* Check icon */}
                  <div
                    style={{
                      minWidth: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(184, 147, 90, 0.12)",
                      border: "1px solid rgba(184, 147, 90, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#B8935A",
                      marginTop: "2px",
                    }}
                  >
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1F3329",
                        marginBottom: "6px",
                        lineHeight: 1.3,
                      }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "14px",
                        color: "#6a5a50",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {reason.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
