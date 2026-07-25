import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const posts = [
  { image: "/images/gallery/bridal-1.jpg", label: "Bridal Glam", alt: "Bridal glam makeup by KS Beauty" },
  { image: "/images/gallery/bridal-2.jpg", label: "Mehendi Look", alt: "Indian bridal beauty look by KS Beauty" },
  { image: "/images/gallery/hair-styling-1.jpg", label: "Hair Styling", alt: "Bridal updo & hair styling by KS Beauty" },
  { image: "/images/gallery/reception-1.jpg", label: "Reception", alt: "Reception makeup look by KS Beauty" },
  { image: "/images/gallery/soft-glam-1.jpg", label: "Soft Glam", alt: "Soft glam beauty look by KS Beauty" },
  { image: "/images/services/bridal-makeup-hair.jpg", label: "Trial Prep", alt: "Bridal touch-up and trial prep by KS Beauty" },
];

export default function InstagramSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#1F3329" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.3' opacity='0.05'%3E%3Ccircle cx='80' cy='80' r='40'/%3E%3Ccircle cx='80' cy='80' r='70'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
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
              Instagram
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A", opacity: 0.6 }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#FBF6EE",
              lineHeight: 1.15,
            }}
          >
            Follow Our Bridal Journey
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              data-testid={`instagram-post-${i}`}
              style={{
                aspectRatio: "1",
                borderRadius: "16px",
                border: "1px solid rgba(184, 147, 90, 0.2)",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "transform 250ms ease-out",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(184, 147, 90, 0.5)",
              }}
              aria-label={post.label}
            >
              {/* TODO: replace with client's real portfolio photos before launch. */}
              <ImageWithFallback
                src={post.image}
                alt={post.alt}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(31, 51, 41, 0.3)",
                  opacity: 0,
                  transition: "opacity 250ms ease-out",
                }}
                className="group-hover:opacity-100"
              >
                <Instagram size={20} color="#B8935A" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://instagram.com/ksbeauty_toronto"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="instagram-follow-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(251, 246, 238, 0.08)",
              border: "1.5px solid rgba(184, 147, 90, 0.35)",
              borderRadius: "var(--radius)",
              padding: "14px 32px",
              fontFamily: "var(--app-font-sans)",
              fontWeight: 700,
              fontSize: "13px",
              color: "#FBF6EE",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 250ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(184, 147, 90, 0.15)";
              e.currentTarget.style.borderColor = "rgba(184, 147, 90, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(251, 246, 238, 0.08)";
              e.currentTarget.style.borderColor = "rgba(184, 147, 90, 0.35)";
            }}
          >
            <Instagram size={16} />
            Follow @ksbeauty_toronto
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
