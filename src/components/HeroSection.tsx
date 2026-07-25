import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, ChevronDown, Instagram, Facebook, Share2, Star } from "lucide-react";
import GoldDrapeDivider from "./GoldDrapeDivider";
import ImageWithFallback from "./ImageWithFallback";

export default function HeroSection() {
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
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const serviceSelect = document.querySelector("#service-type") as HTMLSelectElement;
      const dateInput = document.querySelector("#event-date") as HTMLInputElement;
      if (serviceSelect && selectedService) serviceSelect.value = selectedService;
      if (dateInput && eventDate) dateInput.value = eventDate;
    }
  };

  // Recent GTA Brides avatar trust strip
  const recentBrides = [
    { name: "Aria M.", role: "Brampton Bride", img: "/images/gallery/bridal-1.jpg" },
    { name: "Priya K.", role: "Toronto Reception", img: "/images/gallery/bridal-2.jpg" },
    { name: "Sonia R.", role: "Mississauga Wedding", img: "/images/services/bridal-makeup-hair.jpg" },
    { name: "Jessica T.", role: "Vaughan Soft Glam", img: "/images/gallery/soft-glam-1.jpg" },
    { name: "Ananya S.", role: "Markham Bridal", img: "/images/gallery/reception-1.jpg" },
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
          { icon: Instagram, label: "Instagram", href: "https://instagram.com/ksbeauty_toronto" },
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
            alt="KS Beauty luxury mobile bridal makeup & hair"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 15%",
            }}
          />
          {/* Dark gradient scrim on bottom third for text contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(31, 51, 41, 0.95) 0%, rgba(31, 51, 41, 0.6) 45%, transparent 75%)",
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
              Mobile Bridal Artistry · Toronto GTA
            </span>
            <h1
              style={{
                fontFamily: "var(--app-font-serif)",
                fontSize: "34px",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#FBF6EE",
                marginBottom: "16px",
              }}
            >
              Luxury Bridal Beauty,{" "}
              <span style={{ color: "#B8935A", fontStyle: "italic" }}>Delivered.</span>
            </h1>

            {/* Single full-width primary CTA on mobile hero */}
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
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </button>
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
              Mobile Bridal Artistry · Toronto GTA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={linesReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(44px, 5.5vw, 76px)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#1F3329",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Luxury Hair &amp; Makeup,{" "}
            <span style={{ color: "#B8935A", fontStyle: "italic", fontWeight: 600 }}>Delivered</span> to Your Door.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={subReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "18px",
              fontWeight: 400,
              color: "#5a4a40",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            Elevated mobile bridal beauty across Toronto, Durham Region &amp; the GTA — arriving at your venue calm, punctual, and fully equipped.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={ctaReady ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center mb-10"
          >
            <button
              className="btn-primary ripple-container"
              onClick={(e) => {
                handleRipple(e);
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="hero-cta-primary"
            >
              Get a Custom Quote
              <ArrowRight size={16} className="btn-arrow" />
            </button>
            <button
              className="btn-secondary ripple-container"
              onClick={(e) => {
                handleRipple(e);
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="hero-cta-secondary"
            >
              View Services
              <ArrowRight size={16} className="btn-arrow" />
            </button>
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
                  alt="Full bridal portrait by KS Beauty"
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
