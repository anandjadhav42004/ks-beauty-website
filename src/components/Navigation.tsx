import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LogoMark from "./LogoMark";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Packages", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Now", href: "#contact" },
  ];

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
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(251, 246, 238, 0.88)"
          : "rgba(251, 246, 238, 0.0)",
        backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184, 147, 90, 0.2)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(31, 51, 41, 0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Wordmark with Monogram Logo Mark */}
        <a
          href="#"
          className="flex items-center gap-3"
          data-testid="nav-wordmark"
          style={{ textDecoration: "none" }}
        >
          <LogoMark size={36} />
          <div className="flex flex-col leading-tight">
            <span
              style={{
                fontFamily: "var(--app-font-serif)",
                fontSize: "24px",
                fontWeight: 700,
                color: "#1F3329",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              KS Beauty
            </span>
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "9px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.6,
              }}
            >
              Luxury Bridal Artistry
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                fontSize: "14px",
                color: "#2B2420",
                textDecoration: "none",
                letterSpacing: "0.04em",
                paddingBottom: "2px",
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="btn-primary ripple-container"
            onClick={(e) => {
              handleRipple(e);
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="nav-cta-button"
            style={{ padding: "10px 24px", fontSize: "13px" }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="nav-mobile-toggle"
          style={{ color: "#1F3329" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer (Bottle-green/gold slide-in panel) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-[70px] right-0 bottom-0 w-[80vw] max-w-xs z-50 flex flex-col justify-between shadow-2xl p-6"
            style={{
              background: "rgba(31, 51, 41, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(184, 147, 90, 0.4)",
            }}
          >
            <div className="flex flex-col gap-2 pt-2">
              <span
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#B8935A",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Menu Navigation
              </span>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center min-h-[44px] px-3 rounded-xl transition-colors hover:bg-white/5 active:bg-white/10"
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#FBF6EE",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(184, 147, 90, 0.15)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#B8935A]/30">
              <button
                className="w-full min-h-[48px] rounded-full flex items-center justify-center font-sans font-bold text-sm shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                  color: "#1F3329",
                }}
                onClick={() => {
                  setMobileOpen(false);
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
