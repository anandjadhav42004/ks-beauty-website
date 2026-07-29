import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const categories = [
  "All",
  "Bridal",
  "Indian Bridal",
  "Soft Glam",
  "Editorial",
  "Party Glam",
  "Hollywood Waves",
  "Hair Styling",
  "Updos",
];

const galleryItems = [
  {
    category: "Bridal",
    label: "Seated Candlelight Indian Bridal",
    image: "/images/hero/hero-main.jpg",
    alt: "South Asian bride in elaborate velvet maroon lehenga seated in warm candlelight studio portrait",
    height: "360px",
  },
  {
    category: "Bridal",
    label: "Traditional Indian Bridal Prep & Nath",
    image: "/images/gallery/bridal-mirror-prep.jpg",
    alt: "Close-up portrait of South Asian bride touching pearl nath nose ring in maroon lehenga",
    height: "360px",
  },
  {
    category: "Bridal",
    label: "Royal Maroon Velvet Bridal Lehenga",
    image: "/images/gallery/editorial-couple-dip.jpg",
    alt: "Indian bride in heavy gold-embroidered maroon velvet lehenga with dupatta and kalire",
    height: "360px",
  },
  {
    category: "Bridal",
    label: "Mirror Reflection & Kalire Setting",
    image: "/images/gallery/editorial-couple-embrace.jpg",
    alt: "Bridal prep portrait reflected in oval mirror with intricate gold kalire",
    height: "360px",
  },
  {
    category: "Soft Glam",
    label: "Strapless White Gown & Veil",
    image: "/images/gallery/bridal-nath-detail.jpg",
    alt: "Bride in strapless white gown holding wildflower bouquet with natural soft glam makeup",
    height: "360px",
  },
  {
    category: "Soft Glam",
    label: "Luminous Gown & Veil Profile",
    image: "/images/gallery/soft-glam-luminous-close-up.jpg",
    alt: "Side profile portrait of bride in strapless white gown admiring bouquet with delicate veil",
    height: "360px",
  },
  {
    category: "Soft Glam",
    label: "Soft Glam Couple Dip",
    image: "/images/gallery/soft-glam-white-gown.jpg",
    alt: "Couple dip pose in white gown",
    height: "360px",
  },
  {
    category: "Editorial",
    label: "Golden Hour Sunset Outdoor Shoot",
    image: "/images/gallery/editorial-golden-hour.jpg",
    alt: "Candid bride extending hand toward camera in golden hour sunlight",
    height: "360px",
  },
  {
    category: "Editorial",
    label: "Romantic Overcoat Couple Embrace",
    image: "/images/gallery/soft-glam-bouquet-profile.jpg",
    alt: "Groom holding bride from behind in wool overcoat outdoors in romantic editorial portrait",
    height: "360px",
  },
  {
    category: "Editorial",
    label: "Studio Makeup & Lip Application Detail",
    image: "/images/gallery/editorial-marble-staircase.jpg",
    alt: "Close-up makeup application reflected in palette mirror",
    height: "360px",
  },
  {
    category: "Updos",
    label: "Textured Romantic Updo with Pearls",
    image: "/images/gallery/hair-styling-updo.jpg",
    alt: "Bridal hair updo styling with pearl accessory",
    height: "360px",
  },
  {
    category: "Hollywood Waves",
    label: "Hollywood Waves & Flowing Veil",
    image: "/images/gallery/hollywood-waves-veil.jpg",
    alt: "Classic Hollywood waves bridal hairstyling with sheer flowing veil placement",
    height: "360px",
  },
  {
    category: "Mature Skin",
    label: "Masterclass Palette & Skin Prep",
    image: "/images/gallery/makeup-tools-palette.jpg",
    alt: "Luxury makeup brushes and eyeshadow palette flatlay",
    height: "360px",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yEven = useTransform(scrollYProgress, [0, 1], ["-15px", "15px"]);
  const yOdd = useTransform(scrollYProgress, [0, 1], ["15px", "-15px"]);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? filtered.length - 1 : (prev as number) - 1));
  }, [selectedIndex, filtered.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === filtered.length - 1 ? 0 : (prev as number) + 1));
  }, [selectedIndex, filtered.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleBookThisLook = (item: (typeof galleryItems)[0]) => {
    handleClose();
    setTimeout(() => {
      const calcEl = document.querySelector("#calculator") || document.querySelector("#pricing");
      if (calcEl) {
        calcEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
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
              Portfolio
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#1F3329",
              lineHeight: 1.15,
            }}
          >
            Every Look, a Story
          </h2>
        </motion.div>

        {/* Filter tabs — Responsive flex wrap on all screens */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-2 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-testid={`gallery-filter-${cat.toLowerCase().replace(" ", "-")}`}
              className="shrink-0 transition-all duration-200 active:scale-95"
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: activeCategory === cat
                  ? "1.5px solid #B8935A"
                  : "1.5px solid rgba(184, 147, 90, 0.25)",
                background: activeCategory === cat ? "#1F3329" : "rgba(251, 246, 238, 0.6)",
                color: activeCategory === cat ? "#FBF6EE" : "#5a4a40",
                fontFamily: "var(--app-font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Instagram 2-Column App Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.category}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-testid={`gallery-item-${i}`}
                className="w-full relative group rounded-2xl overflow-hidden border border-[#B8935A]/40 shadow-lg cursor-pointer aspect-[4/5] sm:aspect-square"
                onClick={() => setSelectedIndex(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                    transition: "transform 350ms ease-out",
                  }}
                />
                <div className="editorial-green-gradient-overlay" />

                {/* Mobile & Desktop Pill Badge (Category) */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(31, 51, 41, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(184, 147, 90, 0.5)",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#FBF6EE",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    zIndex: 10,
                  }}
                >
                  {item.category}
                </div>

                {/* Permanent Text Label Overlay at Bottom of Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(31, 51, 41, 0.92) 0%, rgba(31, 51, 41, 0.2) 40%, transparent 70%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px 20px",
                    zIndex: 5,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--app-font-serif)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#FBF6EE",
                        lineHeight: 1.25,
                        margin: 0,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "11px",
                        color: "#B8935A",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        margin: 0,
                        marginTop: "2px",
                      }}
                    >
                      Click to View &amp; Book
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Full-Screen Interactive Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && filtered[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
              style={{
                background: "rgba(15, 28, 22, 0.94)",
                backdropFilter: "blur(20px)",
              }}
              data-testid="gallery-lightbox-overlay"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-[#B8935A]/40 bg-[#1F3329]"
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-[#FBF6EE] hover:bg-[#B8935A] hover:text-[#1F3329] transition-all duration-200"
                  aria-label="Close Lightbox"
                  data-testid="lightbox-close-btn"
                >
                  <X size={20} />
                </button>

                {/* Left / Right Arrow Navigation */}
                {filtered.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 text-[#FBF6EE] hover:bg-[#B8935A] hover:text-[#1F3329] transition-all duration-200"
                      aria-label="Previous Photo"
                      data-testid="lightbox-prev-btn"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 text-[#FBF6EE] hover:bg-[#B8935A] hover:text-[#1F3329] transition-all duration-200"
                      aria-label="Next Photo"
                      data-testid="lightbox-next-btn"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Main Lightbox Image View */}
                <div className="relative flex-1 bg-black/30 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px]">
                  <ImageWithFallback
                    src={filtered[selectedIndex].image}
                    alt={filtered[selectedIndex].alt}
                    loading="eager"
                    style={{
                      maxHeight: "65vh",
                      maxWidth: "100%",
                      objectFit: "contain",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </div>

                {/* Caption Bar & Action Controls */}
                <div className="p-5 sm:p-6 bg-[#1F3329] border-t border-[#B8935A]/30 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
                  <div className="text-center sm:text-left">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#B8935A]/20 text-[#B8935A] text-[11px] font-bold uppercase tracking-widest mb-1.5 border border-[#B8935A]/40">
                      {filtered[selectedIndex].category}
                    </span>
                    <h3
                      style={{ fontFamily: "var(--app-font-serif, serif)" }}
                      className="text-lg sm:text-xl font-bold text-[#FBF6EE] leading-snug"
                    >
                      {filtered[selectedIndex].label}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleBookThisLook(filtered[selectedIndex])}
                    className="w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
                      color: "#1F3329",
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      boxShadow: "0 6px 20px rgba(184, 147, 90, 0.4)",
                    }}
                    data-testid="lightbox-book-look-btn"
                  >
                    <Sparkles size={16} />
                    <span>✨ Book This Look</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
