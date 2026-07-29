import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, ChevronDown, Instagram, Facebook, Share2, Star } from "lucide-react";
import GoldDrapeDivider from "./GoldDrapeDivider";
import ImageWithFallback from "./ImageWithFallback";

interface HeroSectionProps {
  onQuickQuoteSubmit?: (service: string, date: string) => void;
}

export default function HeroSection({ onQuickQuoteSubmit }: HeroSectionProps) {
  const [linesReady, setLinesReady] = useState(false);
  const [subReady, setSubReady] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const [selectedService, setSelectedService] = useState("Bridal Makeup & Hair");
  const [eventDate, setEventDate] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);

  useEffect(() => {
    const t1 = setTimeout(() => setLinesReady(true), 200);
    const t2 = setTimeout(() => setSubReady(true), 600);
    const t3 = setTimeout(() => setCtaReady(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

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

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuickQuoteSubmit) {
      onQuickQuoteSubmit(selectedService, eventDate);
    } else {
      const calcEl = document.querySelector("#calculator") || document.querySelector("#pricing");
      if (calcEl) {
        calcEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Recent GTA Brides avatar trust strip
  const recentBrides = [
    { name: "Aria M.", role: "Brampton Bride", img: "/images/hero/hero-main.jpg" },
    { name: "Priya K.", role: "Toronto Reception", img: "/images/gallery/bridal-nath-detail.jpg" },
    { name: "Sonia R.", role: "Mississauga Wedding", img: "/images/gallery/soft-glam-white-gown.jpg" },
    { name: "Jessica T.", role: "Vaughan Soft Glam", img: "/images/gallery/editorial-couple-dip.jpg" },
    { name: "Ananya S.", role: "Markham Bridal", img: "/images/gallery/updo-gown-marble-steps.jpg" },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      {/* Ambient background glows */}
      <motion.div
        style={{ y: bgY, willChange: "transform" }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute rounded-full opacity-[0.14]"
          style={{
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, #1F3329 0%, transparent 70%)",
            top: "-250px",
            right: "-150px",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.10]"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #B8935A 0%, transparent 70%)",
            bottom: "-100px",
            left: "-150px",
          }}
        />
      </motion.div>

      {/* Sidebar Social Icons (Desktop only) */}
      <aside
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 items-center"
        aria-label="Social media links"
      >
        <div style={{ width: "1px", height: "40px", background: "rgba(184, 147, 90, 0.4)" }} />
        {[
          { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ks_beauty6ix?igsh=b3R0YTk3MGoxM3Jn" },
          { icon: Facebook, label: "Facebook", href: "#" },
          { icon: Share2, label: "Share", href: "#" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(251, 246, 238, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(184, 147, 90, 0.3)",
              color: "#1F3329",
              boxShadow: "0 4px 12px rgba(31, 51, 41, 0.08)",
            }}
          >
            <item.icon size={16} className="transition-colors hover:text-[#B8935A]" />
          </a>
        ))}
        <div style={{ width: "1px", height: "40px", background: "rgba(184, 147, 90, 0.4)" }} />
      </aside>

      {/* ======================================================== */}
      {/* 1. MOBILE NATIVE APP HERO (Screen width <= 768px)       */}
      {/* ======================================================== */}
      <div className="block md:hidden relative w-full pt-16">
        {/* Edge-to-edge full bleed hero image with dark gradient scrim */}
        <div className="relative w-full aspect-[4/5] min-h-[440px] overflow-hidden">
          <ImageWithFallback
            src="/images/hero/hero-main.jpg"
            alt="KS Beauty luxury mobile bridal makeup & hair — Seated South Asian bride in velvet maroon lehenga in studio candlelight portrait"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 15%",
            }}
          />
          {/* Soft gradient scrim on bottom third for crisp text contrast without darkening subject */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(31, 51, 41, 0.85) 0%, rgba(31, 51, 41, 0.35) 25%, transparent 50%)",
            }}
          />

          {/* Overlaid headline & single full-width CTA */}
          <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Toronto Makeup Artist · Mobile Bridal Artistry
            </span>
            <h1
              style={{
                fontFamily: "var(--app-font-serif)",
                fontSize: "clamp(24px, 6vw, 32px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#FBF6EE",
                marginBottom: "8px",
              }}
            >
              Luxury Bridal Hair &amp; Makeup for Modern Brides
            </h1>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "#E2D7C5",
                marginBottom: "6px",
              }}
            >
              Mobile Services Across Toronto &amp; the GTA
            </p>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Soft Glam • Indian Bridal • Editorial • Special Events
            </p>

            {/* CTAs on mobile hero */}
            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={(e) => {
                  handleRipple(e);
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-sans font-bold text-sm shadow-xl active:scale-95 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                  color: "#1F3329",
                  minHeight: "48px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                }}
              >
                <span>Book Your Appointment</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={(e) => {
                  handleRipple(e);
                  document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 px-6 rounded-full flex items-center justify-center gap-2 font-sans font-semibold text-sm transition-all"
                style={{
                  background: "rgba(251, 246, 238, 0.1)",
                  border: "1px solid rgba(184, 147, 90, 0.4)",
                  color: "#FBF6EE",
                  minHeight: "44px",
                }}
              >
                <span>View Portfolio</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats Horizontal Scroll Strip */}
        <div className="px-4 py-3 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-amber-900/10">
          {["✨ 10+ Years Artistry", "🚗 Mobile GTA", "💍 Certified Bridal Specialist", "⭐ 5.0 Star Rated"].map((chip) => (
            <span
              key={chip}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(31, 51, 41, 0.08)",
                border: "1px solid rgba(184, 147, 90, 0.3)",
                color: "#1F3329",
                fontFamily: "var(--app-font-sans)",
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP / TABLET HERO (Screen width > 768px)         */}
      {/* ======================================================== */}
      <div className="hidden md:grid relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-12 my-auto w-full grid-cols-12 gap-6 items-center">
        {/* Left Column (Cols 1-7) */}
        <div className="col-span-7 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={linesReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div style={{ width: "40px", height: "1px", background: "#B8935A" }} />
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "12px",
                fontWeight: 600,
                color: "#B8935A",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Toronto Makeup Artist · Mobile Bridal Artistry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={linesReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(42px, 5vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#1F3329",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Luxury Bridal Hair &amp; Makeup for Modern Brides
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={subReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "20px",
              fontWeight: 600,
              color: "#1F3329",
              lineHeight: 1.5,
              marginBottom: "8px",
              maxWidth: "540px",
            }}
          >
            Mobile Services Across Toronto &amp; the GTA
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={subReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            style={{
              display: "inline-block",
              fontFamily: "var(--app-font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "#B8935A",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "rgba(184, 147, 90, 0.12)",
              border: "1px solid rgba(184, 147, 90, 0.3)",
              padding: "6px 14px",
              borderRadius: "100px",
              marginBottom: "32px",
            }}
          >
            Soft Glam • Indian Bridal • Editorial • Special Events
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={ctaReady ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center mb-6"
          >
            <button
              className="btn-primary ripple-container"
              onClick={(e) => {
                handleRipple(e);
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="hero-cta-primary"
            >
              Book Your Appointment
              <ArrowRight size={16} className="btn-arrow" />
            </button>
            <button
              className="btn-secondary ripple-container"
              onClick={(e) => {
                handleRipple(e);
                document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="hero-cta-secondary"
            >
              View Portfolio
              <ArrowRight size={16} className="btn-arrow" />
            </button>
          </motion.div>

          {/* Quick-Jump Shortcut Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={ctaReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <span className="text-xs font-semibold text-[#8c6b36] uppercase tracking-wider mr-1">
              Jump To:
            </span>
            {[
              { label: "Services →", target: "#services" },
              { label: "Pricing →", target: "#pricing" },
              { label: "Gallery →", target: "#gallery" },
              { label: "FAQ →", target: "#faq" },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => document.querySelector(chip.target)?.scrollIntoView({ behavior: "smooth" })}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200"
                style={{
                  borderColor: "rgba(184, 147, 90, 0.4)",
                  background: "rgba(251, 246, 238, 0.8)",
                  color: "#1F3329",
                }}
              >
                {chip.label}
              </button>
            ))}
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={ctaReady ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4 p-3 pr-6 rounded-full inline-flex"
            style={{
              background: "rgba(251, 246, 238, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(184, 147, 90, 0.4)",
              boxShadow: "0 12px 30px rgba(31, 51, 41, 0.12)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #1F3329 0%, #2D4A3C 100%)",
                color: "#B8935A",
                boxShadow: "0 4px 12px rgba(31, 51, 41, 0.25)",
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--app-font-serif)", fontSize: "14px", fontWeight: 700, color: "#1F3329" }}>
                10+ Years Artistry
              </p>
              <p style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", color: "#B8935A", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                South Asian &amp; Multicultural
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Cutout Hero Image (Cols 8-12) */}
        <div className="col-span-5 relative">
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={linesReady ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="relative w-full lg:w-[125%] lg:-mr-[25%]"
          >
            <div
              className="relative w-full aspect-[4/5] hero-cutout-mask"
              style={{
                background: "#FBF6EE",
              }}
            >
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src="/images/hero/hero-main.jpg"
                  alt="Luxury South Asian bridal portrait by KS Beauty — Seated Indian bride in velvet maroon lehenga surrounded by studio candlelight"
                  loading="eager"
                  fallbackBg="#FBF6EE"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Quick Quote Bar (Desktop & Tablet) */}
      <div className="hidden md:block relative z-30 max-w-5xl mx-auto px-6 w-full mb-6">
        <motion.form
          onSubmit={handleQuickQuoteSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="rounded-full p-3 grid grid-cols-12 gap-3 items-center"
          style={{
            background: "rgba(31, 51, 41, 0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(184, 147, 90, 0.4)",
            boxShadow: "0 20px 50px rgba(31, 51, 41, 0.25)",
          }}
        >
          <div className="col-span-5 relative px-4 py-2 flex flex-col justify-center border-r border-white/10">
            <label style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", fontWeight: 600, color: "#B8935A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Select Service
            </label>
            <div className="relative flex items-center">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-white font-serif text-base font-medium focus:outline-none appearance-none pr-6 cursor-pointer"
                style={{ color: "#FBF6EE" }}
              >
                <option value="Bridal Makeup & Hair" className="bg-[#1F3329] text-white">Bridal Makeup &amp; Hair</option>
                <option value="Special Event Glam" className="bg-[#1F3329] text-white">Special Event Glam</option>
                <option value="Bridal Party Package" className="bg-[#1F3329] text-white">Bridal Party Package</option>
                <option value="Touch-Up & Trial" className="bg-[#1F3329] text-white">Touch-Up &amp; Trial Sessions</option>
              </select>
              <ChevronDown size={16} className="absolute right-0 text-[#B8935A] pointer-events-none" />
            </div>
          </div>

          <div className="col-span-4 relative px-4 py-2 flex flex-col justify-center border-r border-white/10">
            <label style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", fontWeight: 600, color: "#B8935A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Event Date
            </label>
            <div className="relative flex items-center gap-2">
              <Calendar size={15} className="text-[#B8935A] shrink-0" />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-transparent text-white font-sans text-sm focus:outline-none cursor-pointer"
                style={{ color: "#FBF6EE", colorScheme: "dark" }}
              />
            </div>
          </div>

          <div className="col-span-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                color: "#1F3329",
                fontFamily: "var(--app-font-sans)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 6px 20px rgba(184, 147, 90, 0.35)",
              }}
              data-testid="hero-quick-quote-btn"
            >
              <span>Get a Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.form>
      </div>

      {/* Horizontal Scrolling "Recent Brides" Trust Strip */}
      <div className="relative z-20 w-full bg-[#1F3329]/95 text-[#FBF6EE] py-4 border-y border-[#B8935A]/30">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-[#B8935A]/30">
            <Star size={16} className="text-[#B8935A] fill-[#B8935A]" />
            <span className="font-serif font-bold text-sm text-[#FBF6EE] whitespace-nowrap">
              Recent GTA Brides
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            {recentBrides.map((bride) => (
              <div key={bride.name} className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B8935A]/50 shrink-0">
                  <ImageWithFallback
                    src={bride.img}
                    alt={bride.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-xs text-[#FBF6EE] leading-tight">{bride.name}</p>
                  <p className="font-sans text-[11px] text-[#B8935A] leading-tight">{bride.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold drape divider */}
      <div className="relative z-10 w-full">
        <GoldDrapeDivider />
      </div>
    </section>
  );
}
