import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export default function FinalCTASection() {
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
      className="py-28 lg:py-40 relative overflow-hidden"
      style={{ background: "#FAF4EC" }}
    >
      {/* Corner ornaments */}
      {[
        { top: "24px", left: "24px", borderTop: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
        { top: "24px", right: "24px", borderTop: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
        { bottom: "24px", left: "24px", borderBottom: "1.5px solid #B8935A", borderLeft: "1.5px solid #B8935A" },
        { bottom: "24px", right: "24px", borderBottom: "1.5px solid #B8935A", borderRight: "1.5px solid #B8935A" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "44px",
            height: "44px",
            ...style,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Ambient blobs with scroll parallax drift */}
      <motion.div style={{ y: bgY, willChange: "transform" }} className="absolute inset-0 pointer-events-none">
        <div
          className="blob-1 absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(31, 51, 41, 0.05) 0%, transparent 70%)",
            top: "-200px",
            left: "-100px",
          }}
        />
        <div
          className="blob-3 absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(184, 147, 90, 0.06) 0%, transparent 70%)",
            bottom: "-100px",
            right: "-50px",
          }}
        />
      </motion.div>

      {/* Botanical */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23B8935A' stroke-width='0.4' opacity='0.06'%3E%3Cellipse cx='100' cy='100' rx='40' ry='80'/%3E%3Cellipse cx='100' cy='100' rx='80' ry='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        {/* Decorative ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "rgba(184, 147, 90, 0.5)" }} />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#B8935A",
            }}
          />
          <div style={{ flex: 1, maxWidth: "80px", height: "1px", background: "rgba(184, 147, 90, 0.5)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "var(--app-font-serif)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            color: "#1F3329",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Ready to look and feel your best?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "var(--app-font-sans)",
            fontSize: "18px",
            color: "#6a5a50",
            lineHeight: 1.6,
            marginBottom: "36px",
          }}
        >
          Book your bridal consultation today.
        </motion.p>

        {/* Three CTAs: Book Now, WhatsApp Me, View Portfolio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Button 1: Book Now */}
          <button
            className="btn-primary ripple-container"
            onClick={(e) => {
              handleRipple(e);
              const target = document.querySelector("#calculator") || document.querySelector("#pricing") || document.querySelector("#contact");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="final-cta-book-now"
            style={{ padding: "16px 36px", fontSize: "15px" }}
          >
            Book Now
            <ArrowRight size={16} className="btn-arrow" />
          </button>

          {/* Button 2: WhatsApp Me */}
          <a
            href="https://wa.me/16476403439?text=Hi%20KS%20Beauty!%20I'd%20like%20to%20check%20bridal%20availability%20for%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            data-testid="final-cta-whatsapp"
            className="px-8 py-4 rounded-full font-sans font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-md active:scale-95"
            style={{
              background: "#25D366",
              color: "#FFFFFF",
              minHeight: "52px",
              boxShadow: "0 6px 20px rgba(37, 211, 102, 0.25)",
            }}
          >
            <span>WhatsApp Me</span>
            <ArrowRight size={16} />
          </a>

          {/* Button 3: View Portfolio */}
          <button
            className="btn-secondary ripple-container"
            onClick={(e) => {
              handleRipple(e);
              document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="final-cta-portfolio"
            style={{ padding: "16px 36px", fontSize: "15px" }}
          >
            View Portfolio
            <ArrowRight size={16} className="btn-arrow" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
