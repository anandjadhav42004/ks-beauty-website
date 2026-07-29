import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import LogoMark from "./LogoMark";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Calculate scroll progress %
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for Active Section Scroll-Spy
  useEffect(() => {
    const sectionIds = ["about", "services", "why-us", "pricing", "gallery", "faq", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "About", href: "#about", id: "about" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Why Us", href: "#why-us", id: "why-us" },
    { label: "Packages", href: "#pricing", id: "pricing" },
    { label: "Gallery", href: "#gallery", id: "gallery" },
    { label: "Book Now", href: "#contact", id: "contact" },
  ];

  // Mobile menu grouped structure
  const mobileGroups = [
    {
      title: "Explore",
      items: [
        { label: "About Rivaaz Glam Studio", href: "#about", id: "about" },
        { label: "Services & Artistry", href: "#services", id: "services" },
        { label: "Portfolio Gallery", href: "#gallery", id: "gallery" },
        { label: "Why Choose Us", href: "#why-us", id: "why-us" },
      ],
    },
    {
      title: "Plan Your Look",
      items: [
        { label: "Packages & Rates", href: "#pricing", id: "pricing" },
        { label: "Frequently Asked", href: "#faq", id: "faq" },
      ],
    },
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
    <>
      {/* 2. Scroll Progress Bar (Top 3px gold line) */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none transition-all"
        style={{ background: "rgba(184, 147, 90, 0.15)" }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#B8935A] via-[#D4AF37] to-[#B8935A] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(251, 246, 238, 0.92)"
            : "rgba(251, 246, 238, 0.0)",
          backdropFilter: scrolled ? "blur(16px) saturate(1.5)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184, 147, 90, 0.25)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(31, 51, 41, 0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-2.5 flex items-center justify-between">
          {/* Wordmark with Monogram Logo Mark */}
          <a
            href="#"
            className="flex items-center gap-2.5"
            data-testid="nav-wordmark"
            style={{ textDecoration: "none" }}
          >
            <LogoMark size={34} />
            <div className="flex flex-col leading-tight">
              <span
                style={{
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "clamp(17px, 2.5vw, 20px)",
                  fontWeight: 700,
                  color: "#1F3329",
                  letterSpacing: "0.02em",
                  lineHeight: 1.05,
                }}
              >
                Rivaaz Glam Studio
              </span>
              <span
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "#B8935A",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                }}
              >
                Luxury Beauty Studio
              </span>
            </div>
          </a>

          {/* Desktop nav with Active Section Highlight */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link relative transition-colors duration-200"
                  data-testid={`nav-link-${link.label.toLowerCase().replace(" ", "-")}`}
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "14px",
                    color: isActive ? "#B8935A" : "#2B2420",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    paddingBottom: "4px",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8935A] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Desktop Persistent CTA Button */}
            <button
              className="btn-primary ripple-container relative group overflow-hidden"
              onClick={(e) => {
                handleRipple(e);
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="nav-cta-button"
              style={{
                padding: "10px 24px",
                fontSize: "13px",
                boxShadow: scrolled ? "0 4px 16px rgba(184, 147, 90, 0.3)" : "none",
              }}
            >
              <span className="flex items-center gap-1.5 relative z-10">
                <Sparkles size={13} className="text-[#1F3329]" />
                Get a Quote
              </span>
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

        {/* Reorganized Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden fixed top-[70px] right-0 bottom-0 w-[85vw] max-w-xs z-50 flex flex-col justify-between shadow-2xl p-6 overflow-y-auto"
              style={{
                background: "rgba(31, 51, 41, 0.98)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(184, 147, 90, 0.4)",
              }}
            >
              <div className="space-y-6 pt-2">
                {mobileGroups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <span
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#B8935A",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      }}
                    >
                      {group.title}
                    </span>
                    <div className="flex flex-col gap-1">
                      {group.items.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between min-h-[42px] px-3 rounded-xl transition-colors hover:bg-white/5 active:bg-white/10"
                            style={{
                              fontFamily: "var(--app-font-sans)",
                              fontWeight: isActive ? 700 : 500,
                              fontSize: "14px",
                              color: isActive ? "#B8935A" : "#FBF6EE",
                              textDecoration: "none",
                              background: isActive ? "rgba(184, 147, 90, 0.12)" : "transparent",
                            }}
                          >
                            <span>{item.label}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8935A]" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#B8935A]/30 mt-6">
                <button
                  className="w-full min-h-[48px] rounded-full flex items-center justify-center font-sans font-bold text-sm shadow-xl gap-2"
                  style={{
                    background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                    color: "#1F3329",
                  }}
                  onClick={() => {
                    setMobileOpen(false);
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Sparkles size={16} />
                  Get Instant Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
