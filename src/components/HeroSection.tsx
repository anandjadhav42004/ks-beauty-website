import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Instagram, Calendar, Star } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function HeroSection() {
  const [linesReady, setLinesReady] = useState(false);
  const [subReady, setSubReady] = useState(false);
  const [ctaReady, setCtaReady] = useState(false);
  const [selectedService, setSelectedService] = useState("Bridal Makeup & Hair");
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

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
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.querySelector("#calculator") || document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
      style={{
        background: "#FBF6EE",
      }}
    >
      {/* Background Radial Glow & Sub-pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(184, 147, 90, 0.18) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(31, 51, 41, 0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Top Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2.5 mb-4"
            >
              <div style={{ width: "32px", height: "1.5px", background: "#B8935A" }} />
              <span
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#B8935A",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Toronto Mobile Beauty Studio · Serving All GTA Brides
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={linesReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                fontFamily: "var(--app-font-serif)",
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.12,
                color: "#1F3329",
                letterSpacing: "-0.01em",
                marginBottom: "14px",
              }}
            >
              Luxury Bridal Hair &amp; Makeup Artistry for Modern Brides
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={subReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "clamp(15px, 2vw, 19px)",
                fontWeight: 500,
                color: "#3a4d42",
                lineHeight: 1.5,
                marginBottom: "12px",
                maxWidth: "560px",
              }}
            >
              Mobile On-Location Beauty Services Across Toronto &amp; the Greater GTA
            </motion.p>

            {/* Service Pillars Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={subReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="mb-8"
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#B8935A",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "rgba(184, 147, 90, 0.12)",
                  border: "1px solid rgba(184, 147, 90, 0.3)",
                  padding: "6px 14px",
                  borderRadius: "100px",
                }}
              >
                Soft Glam • Western Bridal • Indian Bridal • Hair Styling • Editorial
              </span>
            </motion.div>

            {/* Responsive Action Buttons (Side-by-side compact buttons on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="flex flex-row items-center gap-3 mb-6 w-full sm:w-auto"
            >
              <button
                onClick={(e) => {
                  handleRipple(e);
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 sm:flex-none relative overflow-hidden py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-sans font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #1F3329 0%, #294537 100%)",
                  border: "1px solid #B8935A",
                  color: "#FBF6EE",
                  boxShadow: "0 8px 24px rgba(31, 51, 41, 0.25)",
                }}
                data-testid="hero-primary-cta"
              >
                <span>Book Appointment</span>
                <ArrowRight size={14} className="text-[#B8935A]" />
              </button>

              <button
                onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })}
                className="flex-1 sm:flex-none py-3.5 px-6 rounded-full flex items-center justify-center gap-2 font-sans font-semibold text-xs sm:text-sm transition-all border active:scale-95"
                style={{
                  borderColor: "rgba(184, 147, 90, 0.4)",
                  background: "rgba(251, 246, 238, 0.7)",
                  color: "#1F3329",
                }}
                data-testid="hero-secondary-cta"
              >
                <span>View Portfolio</span>
              </button>
            </motion.div>

            {/* Trust Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={ctaReady ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-3 p-2.5 pr-5 rounded-full self-start"
              style={{
                background: "rgba(251, 246, 238, 0.95)",
                border: "1px solid rgba(184, 147, 90, 0.35)",
                boxShadow: "0 6px 20px rgba(31, 51, 41, 0.08)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "#1F3329",
                  color: "#B8935A",
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--app-font-serif)", fontSize: "13px", fontWeight: 700, color: "#1F3329" }}>
                  10+ Years Luxury Artistry
                </p>
                <p style={{ fontFamily: "var(--app-font-sans)", fontSize: "10px", color: "#B8935A", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  South Asian &amp; Western Bridal Specialist
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Unified Multi-Pillar Visual Collage (Identical across Desktop, Tablet & Mobile) */}
          <div className="lg:col-span-5 relative w-full mt-4 lg:mt-0">
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={linesReady ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="grid grid-cols-12 gap-3 items-center w-full"
            >
              {/* Left Sub-Column: Hair Styling & Vanity Tools */}
              <div className="col-span-5 space-y-3 pt-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#B8935A]/30 group">
                  <ImageWithFallback
                    src="/images/gallery/hair-styling-updo.jpg"
                    alt="Luxury hair styling updo and Hollywood waves"
                    loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <span className="text-[10px] font-bold text-[#B8935A] uppercase tracking-wider block">Hair Styling</span>
                  </div>
                </div>

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#B8935A]/30 group">
                  <ImageWithFallback
                    src="/images/gallery/makeup-tools-palette.jpg"
                    alt="Luxury vanity makeup brushes and palette flatlay"
                    loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <span className="text-[10px] font-bold text-[#B8935A] uppercase tracking-wider block">Brushes &amp; Prep</span>
                  </div>
                </div>
              </div>

              {/* Right Main Column: Western Soft Glam Bride */}
              <div className="col-span-7">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B8935A]/40 group">
                  <ImageWithFallback
                    src="/images/gallery/bridal-nath-detail.jpg"
                    alt="Western soft glam bridal hair and makeup"
                    loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#1F3329] via-[#1F3329]/60 to-transparent">
                    <span className="text-sm font-bold text-[#FBF6EE] block">Soft Glam &amp; Bridal</span>
                    <span className="text-[10px] text-[#B8935A] uppercase font-bold tracking-wider">Serving All GTA Brides</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Floating Quick Quote Bar (Desktop & Tablet) */}
        <div className="hidden md:block relative z-30 max-w-5xl mx-auto px-2 w-full mt-12">
          <motion.form
            onSubmit={handleQuickQuoteSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="rounded-full p-3 grid grid-cols-12 gap-3 items-center"
            style={{
              background: "rgba(31, 51, 41, 0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(184, 147, 90, 0.4)",
              boxShadow: "0 20px 50px rgba(31, 51, 41, 0.25)",
            }}
          >
            <div className="col-span-5 relative px-4 py-2 flex flex-col justify-center border-r border-white/10">
              <label style={{ fontFamily: "var(--app-font-sans)", fontSize: "10px", fontWeight: 700, color: "#B8935A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-transparent text-white font-serif text-base font-medium focus:outline-none appearance-none pr-6 cursor-pointer"
                style={{ color: "#FBF6EE" }}
              >
                <option value="Bridal Makeup & Hair" className="bg-[#1F3329] text-white">Bridal Makeup &amp; Hair</option>
                <option value="Special Event Glam" className="bg-[#1F3329] text-white">Special Event Glam</option>
                <option value="Soft Glam & Waves" className="bg-[#1F3329] text-white">Soft Glam &amp; Waves</option>
                <option value="Group Booking" className="bg-[#1F3329] text-white">Group Booking</option>
              </select>
            </div>

            <div className="col-span-4 relative px-4 py-2 flex flex-col justify-center border-r border-white/10">
              <label style={{ fontFamily: "var(--app-font-sans)", fontSize: "10px", fontWeight: 700, color: "#B8935A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Service Location
              </label>
              <p className="text-white font-sans text-sm font-semibold truncate" style={{ color: "#FBF6EE" }}>
                Mobile Across Toronto &amp; GTA
              </p>
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                  color: "#1F3329",
                }}
              >
                <span>Instant Pricing</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.form>
        </div>

      </div>
    </section>
  );
}
