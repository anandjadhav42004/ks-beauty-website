import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTARibbon() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-25px", "25px"]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "#1F3329" }}
    >
      {/* Ambient blobs with scroll parallax drift */}
      <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0 pointer-events-none">
        <div
          className="blob-1 absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(184, 147, 90, 0.12) 0%, transparent 70%)",
            top: "-150px",
            right: "-100px",
          }}
        />
        <div
          className="blob-2 absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(122, 46, 56, 0.15) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-80px",
          }}
        />
      </motion.div>

      {/* Botanical overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.4' opacity='0.06'%3E%3Cellipse cx='100' cy='100' rx='40' ry='80'/%3E%3Cellipse cx='100' cy='100' rx='80' ry='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        {/* Ornament line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            width: "60px",
            height: "1px",
            background: "#B8935A",
            margin: "0 auto 24px",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            fontFamily: "var(--app-font-serif)",
            fontSize: "clamp(26px, 4vw, 46px)",
            fontWeight: 700,
            color: "#FBF6EE",
            lineHeight: 1.2,
            marginBottom: "20px",
          }}
        >
          Your wedding morning should feel{" "}
          <span style={{ color: "#B8935A", fontStyle: "italic" }}>calm, luxurious,</span>{" "}
          and unforgettable.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "var(--app-font-sans)",
            fontSize: "17px",
            color: "rgba(251, 246, 238, 0.75)",
            lineHeight: 1.7,
            marginBottom: "36px",
            maxWidth: "500px",
            margin: "0 auto 36px",
          }}
        >
          We come to you — so you can stay present, unhurried, and completely at ease while we handle everything beauty-related.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            className="ripple-container"
            onClick={(e) => {
              handleRipple(e);
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="cta-ribbon-button"
            style={{
              background: "#B8935A",
              color: "#1F3329",
              border: "1px solid #B8935A",
              borderRadius: "var(--radius)",
              padding: "16px 36px",
              fontFamily: "var(--app-font-sans)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 250ms ease-out",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 28px rgba(184, 147, 90, 0.45), 0 6px 20px rgba(31, 51, 41, 0.3)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Book Your Bridal Consultation
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
