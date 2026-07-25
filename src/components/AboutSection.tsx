import { motion } from "framer-motion";
import { Award, Heart, Star } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      {/* Subtle side ornament */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(184, 147, 90, 0.07), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Founder portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative mx-auto" style={{ maxWidth: "460px" }}>
              {/* Gold corner ornaments */}
              {[
                { top: -12, left: -12, borderTop: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
                { top: -12, right: -12, borderTop: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
                { bottom: -12, left: -12, borderBottom: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
                { bottom: -12, right: -12, borderBottom: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
              ].map((style, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "40px",
                    height: "40px",
                    zIndex: 2,
                    ...style,
                  }}
                />
              ))}

              {/* Founder photo */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "24px",
                  background: "#1F3329",
                  border: "1px solid rgba(184, 147, 90, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(31, 51, 41, 0.25)",
                }}
              >
                <ImageWithFallback
                  src="/images/about/founder-portrait.jpg"
                  alt="Krishna S. in black blazer holding makeup palette reflected in studio mirror — KS Beauty founder"
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 50%, rgba(31, 51, 41, 0.65) 100%)",
                  }}
                />
                {/* Bottom label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {["Certified Artist", "PBCA Member", "10+ Years"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#B8935A",
                          background: "rgba(184, 147, 90, 0.12)",
                          border: "1px solid rgba(184, 147, 90, 0.3)",
                          borderRadius: "100px",
                          padding: "4px 10px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "-30px",
                  background: "rgba(251, 246, 238, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(184, 147, 90, 0.35)",
                  borderRadius: "18px",
                  padding: "16px 20px",
                  boxShadow: "0 8px 30px rgba(31, 51, 41, 0.15)",
                  zIndex: 3,
                }}
                className="hidden sm:block"
              >
                <div
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#1F3329",
                    lineHeight: 1,
                  }}
                >
                  500+
                </div>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "11px",
                    color: "#B8935A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginTop: "4px",
                  }}
                >
                  Brides Served
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Section label */}
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
                Meet the Artist
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--app-font-serif)",
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 700,
                color: "#1F3329",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              I'm Krishna — your{" "}
              <span style={{ color: "#7A2E38", fontStyle: "italic" }}>
                dedicated
              </span>{" "}
              bridal artist.
            </h2>

            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "18px",
                color: "#4a3a30",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              A certified makeup artist with over 10 years of experience creating stunning bridal and editorial looks. I specialize in South Asian and multicultural beauty, and I come to you, wherever your morning begins.
            </p>

            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "17px",
                color: "#5a4a40",
                lineHeight: 1.8,
                marginBottom: "36px",
              }}
            >
              Every bride deserves to feel like herself — only more radiant. My approach is rooted in listening: understanding your vision, your skin, your culture, and your day, then crafting a look that holds up from the morning puja to the last dance.
            </p>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <Award size={14} />, text: "Certified Artist" },
                { icon: <Star size={14} />, text: "10+ Years Experience" },
                { icon: <Heart size={14} />, text: "Member of PBCA" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2"
                  style={{
                    background: "rgba(31, 51, 41, 0.06)",
                    border: "1px solid rgba(184, 147, 90, 0.3)",
                    borderRadius: "100px",
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ color: "#B8935A" }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2B2420",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Signature quote */}
            <blockquote
              style={{
                borderLeft: "2px solid #B8935A",
                paddingLeft: "20px",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "#1F3329",
                  lineHeight: 1.6,
                }}
              >
                "Your wedding morning should feel like a breath — quiet, beautiful, and completely yours."
              </p>
              <footer
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "13px",
                  color: "#B8935A",
                  marginTop: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                — Krishna S., Founder
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
