import { motion } from "framer-motion";
import { Sparkles, Wind, Crown, Shirt, RefreshCw, User, Clock, Scissors, CheckCircle2 } from "lucide-react";

const addons = [
  {
    icon: <Sparkles size={24} />,
    name: "False Lash Application",
    tagline: "Handcrafted individual or strip lashes for drama that photographs flawlessly.",
    gradient: "linear-gradient(135deg, #1F3329 0%, #B8935A 100%)",
  },
  {
    icon: <Wind size={24} />,
    name: "Hair Extensions Installation",
    tagline: "Clip-in or tape-in volume and length — seamlessly blended into your style.",
    gradient: "linear-gradient(135deg, #7A2E38 0%, #B8935A 100%)",
  },
  {
    icon: <Crown size={24} />,
    name: "Dupatta or Veil Draping",
    tagline: "Traditional and contemporary styles. Secured to last through every prayer and dance.",
    gradient: "linear-gradient(135deg, #B8935A 0%, #1F3329 100%)",
  },
  {
    icon: <Shirt size={24} />,
    name: "Saree Draping",
    tagline: "Expert draping in Gujarati, Nivi, Bengali, and other regional styles.",
    gradient: "linear-gradient(135deg, #4a2535 0%, #7A2E38 100%)",
  },
  {
    icon: <Clock size={24} />,
    name: "Touch-Up Service",
    tagline: "On-site standby service for ceremony-to-reception touch-ups and sweat management.",
    gradient: "linear-gradient(135deg, #1F3329 0%, #B8935A 70%)",
  },
  {
    icon: <RefreshCw size={24} />,
    name: "Second Look / Evening Look",
    tagline: "A reception or post-ceremony look change — effortless transition, maximum impact.",
    gradient: "linear-gradient(135deg, #2D4A3A 0%, #B8935A 80%)",
  },
  {
    icon: <CheckCircle2 size={24} />,
    name: "Trial Sessions",
    tagline: "Full rehearsal trial session prior to the wedding day for peace of mind.",
    gradient: "linear-gradient(135deg, #7A2E38 0%, #1F3329 100%)",
  },
  {
    icon: <User size={24} />,
    name: "Groom Styling",
    tagline: "Grooming, skin preparation, and subtle enhancement for the groom.",
    gradient: "linear-gradient(135deg, #1F3329 0%, #4a2535 100%)",
  },
  {
    icon: <Scissors size={24} />,
    name: "Express Hair Styling",
    tagline: "Quick blowout, curls, or pin-up styling for family members or bridesmaids.",
    gradient: "linear-gradient(135deg, #B8935A 0%, #4a2535 100%)",
  },
];

export default function AddOnsSection() {
  return (
    <section
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#1F3329" }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.3' opacity='0.05'%3E%3Cellipse cx='100' cy='100' rx='40' ry='80'/%3E%3Cellipse cx='100' cy='100' rx='80' ry='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div
        className="blob-2 absolute pointer-events-none rounded-full"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(184, 147, 90, 0.07) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
        }}
      />

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
              Add-On Services
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.6 }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#FBF6EE",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Elevate Your Look
          </h2>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "17px",
              color: "rgba(251, 246, 238, 0.65)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Curated enhancements to complete every dimension of your bridal vision.
          </p>
        </motion.div>

        {/* Grid — Mobile horizontal carousel / Desktop 3-col grid */}
        <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 sm:pb-0 px-2 sm:px-0">
          {addons.map((addon, i) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              data-testid={`addon-card-${i}`}
              className="shrink-0 w-[80vw] sm:w-auto snap-center relative"
              style={{
                background: "rgba(251, 246, 238, 0.04)",
                border: "1px solid rgba(184, 147, 90, 0.15)",
                borderRadius: "20px",
                padding: "28px",
                transition: "all 250ms ease-out",
                cursor: "default",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(184, 147, 90, 0.5)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                background: "rgba(251, 246, 238, 0.07)",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: addon.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FBF6EE",
                  marginBottom: "18px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                {addon.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#FBF6EE",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}
              >
                {addon.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "14px",
                  color: "rgba(251, 246, 238, 0.6)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {addon.tagline}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "15px",
              color: "rgba(251, 246, 238, 0.5)",
            }}
          >
            All add-ons are booked alongside your main service.{" "}
            <button
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#B8935A",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontFamily: "var(--app-font-sans)",
                fontSize: "15px",
              }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ask about pricing
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
