import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";

const categories = ["All", "Bridal", "Soft Glam", "Reception", "Party Makeup", "Editorial", "Hair Styling"];

// TODO: replace with client's real portfolio photos before launch.
const galleryItems = [
  {
    category: "Bridal",
    label: "Traditional Red & Gold Lehenga",
    image: "/images/gallery/bridal-1.jpg",
    alt: "Bride in red velvet gold-embroidered lehenga with floral hairpiece looking into hand mirror",
    height: "320px",
  },
  {
    category: "Soft Glam",
    label: "Dewy Skin & Diamond Elegance",
    image: "/images/gallery/soft-glam-1.jpg",
    alt: "Close-up eye makeup with cream beaded gown and diamond necklace by KS Beauty",
    height: "280px",
  },
  {
    category: "Reception",
    label: "Chandelier Bokeh Glamour",
    image: "/images/gallery/reception-1.jpg",
    alt: "Evening reception portrait with chandelier and string light bokeh by KS Beauty",
    height: "300px",
  },
  {
    category: "Hair Styling",
    label: "Floral & Gold Hairpins Updo",
    image: "/images/gallery/hair-styling-1.jpg",
    alt: "Floral and gold hairpins styled into bridal updo by KS Beauty",
    height: "320px",
  },
  {
    category: "Bridal",
    label: "Dupatta Draping & Maang Tikka",
    image: "/images/gallery/bridal-2.jpg",
    alt: "Bride in red and gold lehenga with draped dupatta and maang tikka holding hand mirror",
    height: "340px",
  },
  {
    category: "Soft Glam",
    label: "Morning Prep Touch-Up",
    image: "/images/services/bridal-makeup-hair.jpg",
    alt: "Close-up of bridal makeup application and skin prep by KS Beauty",
    height: "260px",
  },
  {
    category: "Party Makeup",
    label: "Event Eyeshadow Application",
    image: "/images/services/special-event-glam.jpg",
    alt: "Eyeshadow application with diamond jewelry at evening event",
    height: "250px",
  },
  {
    category: "Editorial",
    label: "Studio Mirror Rehearsal",
    image: "/images/about/founder-portrait.jpg",
    alt: "Professional makeup trial and consultation in studio setting by KS Beauty",
    height: "290px",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

        {/* Filter tabs — Horizontal scroll strip on mobile / Centered wrap on desktop */}
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap justify-start md:justify-center gap-2 mb-10 pb-2 px-1">
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

        {/* Masonry / App-Carousel grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex md:block overflow-x-auto snap-x snap-mandatory gap-5 no-scrollbar pb-6 md:pb-0 masonry-grid"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={`${item.category}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                data-testid={`gallery-item-${i}`}
                className="shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center relative group"
                style={{
                  y: i % 2 === 0 ? yEven : yOdd,
                  willChange: "transform",
                  position: "relative",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid rgba(184, 147, 90, 0.4)",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(31, 51, 41, 0.08)",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: item.height,
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
                      KS Beauty Editorial
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
