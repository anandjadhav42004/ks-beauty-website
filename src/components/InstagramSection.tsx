import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const posts = [
  {
    image: "/images/instagram/hero-main.jpg",
    label: "Maroon Lehenga Bridal Reel",
    alt: "Seated South Asian bride in velvet maroon lehenga by KS Beauty",
    reelUrl: "https://www.instagram.com/reel/DXVYz3kMRpS/?igsh=MTRoYjNyZWJoYXVhMA==",
  },
  {
    image: "/images/instagram/bridal-nath-detail.jpg",
    label: "Jewelry & Nath Glam Reel",
    alt: "South Asian bride touching pearl nath close-up by KS Beauty",
    reelUrl: "https://www.instagram.com/reel/DXVZjpOEXWm/?igsh=MWVwbTN4bjlsanB0Yg==",
  },
  {
    image: "/images/instagram/updo-gown-marble-steps.jpg",
    label: "Hairstyling Updo Reel",
    alt: "Bridal updo & gown walk on marble steps by KS Beauty",
    reelUrl: "https://www.instagram.com/reel/DZlTRCvMvsZ/?igsh=b2R3bWo4cmMydDVs",
  },
  {
    image: "/images/instagram/editorial-couple-dip.jpg",
    label: "Editorial Wedding Reel",
    alt: "Editorial wedding couple dip pose by KS Beauty",
    reelUrl: "https://www.instagram.com/reel/DaWozwvsiwr/?igsh=bGM5cHowNXdwYzY3",
  },
  {
    image: "/images/instagram/editorial-golden-hour.jpg",
    label: "Golden Hour Bridal Reel",
    alt: "Candid golden hour sunset bridal shoot by KS Beauty",
    reelUrl: "https://www.instagram.com/ks_beauty6ix?igsh=b3R0YTk3MGoxM3Jn",
  },
  {
    image: "/images/instagram/soft-glam-white-gown.jpg",
    label: "Soft Glam White Gown Reel",
    alt: "Radiant soft glam white gown bridal portrait by KS Beauty",
    reelUrl: "https://www.instagram.com/ks_beauty6ix?igsh=b3R0YTk3MGoxM3Jn",
  },
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
              Watch On Instagram
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
            Featured Bridal Reels &amp; Transformation Videos
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-10">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              data-testid={`instagram-post-${i}`}
              style={{
                aspectRatio: "1",
                borderRadius: "16px",
                border: "1px solid rgba(184, 147, 90, 0.25)",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "transform 250ms ease-out",
                display: "block",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(184, 147, 90, 0.6)",
              }}
              aria-label={post.label}
              className="group"
            >
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

              {/* Reel Play Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "rgba(31, 51, 41, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(184, 147, 90, 0.4)",
                  borderRadius: "100px",
                  padding: "3px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  zIndex: 10,
                }}
              >
                <Play size={10} className="fill-[#B8935A] text-[#B8935A]" />
                <span className="text-[9px] font-bold text-[#FBF6EE] uppercase tracking-wider">Reel</span>
              </div>

              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  background: "rgba(31, 51, 41, 0.75)",
                  opacity: 0,
                  transition: "opacity 250ms ease-out",
                  zIndex: 20,
                }}
                className="group-hover:opacity-100"
              >
                <div className="w-9 h-9 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center shadow-lg">
                  <Play size={16} className="fill-[#1F3329] translate-x-0.5" />
                </div>
                <span className="text-[10px] font-bold text-[#FBF6EE] tracking-wider uppercase">Watch Reel</span>
              </div>
            </motion.a>
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
            href="https://www.instagram.com/ks_beauty6ix?igsh=b3R0YTk3MGoxM3Jn"
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
            Follow @ks_beauty6ix
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
