import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const testimonials = [
  {
    name: "Sarah",
    role: "Bride · Toronto",
    review: "Krishna made me feel absolutely beautiful on my wedding day. My makeup lasted over 14 hours and photographed beautifully.",
    rating: 5,
    image: "/images/gallery/bridal-nath-detail.jpg",
    alt: "Client testimonial portrait for Sarah",
  },
  {
    name: "Priya",
    role: "Bride · Mississauga",
    review: "Krishna made my wedding morning calm and stress-free. Her dupatta draping and South Asian bridal glam were sheer perfection.",
    rating: 5,
    image: "/images/gallery/editorial-couple-dip.jpg",
    alt: "Client testimonial portrait for Priya",
  },
  {
    name: "Anjali",
    role: "Bride · Ajax",
    review: "I've never felt so confident! The soft glam look lasted from early morning photos through the late night reception seamlessly.",
    rating: 5,
    image: "/images/hero/hero-main.jpg",
    alt: "Client testimonial portrait for Anjali",
  },
  {
    name: "Jessica",
    role: "Bridesmaid · Vaughan",
    review: "Krishna styled our entire bridal party on time. Every bridesmaid looked stunning with cohesive, personalized hair and makeup.",
    rating: 5,
    image: "/images/gallery/soft-glam-bouquet-profile.jpg",
    alt: "Client testimonial portrait for Jessica",
  },
  {
    name: "Simran",
    role: "Bride · Pickering",
    review: "From the trial session to the wedding day, Krishna listened to every request. My Hollywood waves stayed intact all night!",
    rating: 5,
    image: "/images/gallery/hollywood-waves-veil.jpg",
    alt: "Client testimonial portrait for Simran",
  },
  {
    name: "Maya",
    role: "Engagement Glam · Markham",
    review: "The makeup was lightweight, natural, yet completely camera-ready for our outdoor engagement shoot. Highly recommended!",
    rating: 5,
    image: "/images/gallery/editorial-golden-hour.jpg",
    alt: "Client testimonial portrait for Maya",
  },
  {
    name: "Natasha",
    role: "Editorial Shoot · Toronto",
    review: "Professional, punctual, and extremely skilled. Krishna's attention to detail on mature skin and soft glam is unmatched.",
    rating: 5,
    image: "/images/gallery/editorial-marble-staircase.jpg",
    alt: "Client testimonial portrait for Natasha",
  },
  {
    name: "Kiran",
    role: "Baby Shower · Oshawa",
    review: "Such a pleasant experience! The maternity glam look felt light, radiant, and kept me glowing for all my photos.",
    rating: 5,
    image: "/images/gallery/updo-gown-marble-steps.jpg",
    alt: "Client testimonial portrait for Kiran",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          style={{ fill: "#B8935A", stroke: "#B8935A" }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle at bottom right, rgba(184, 147, 90, 0.06), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
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
              Client Love
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
            Stories from Our Brides
          </h2>
          <p className="text-xs text-[#8c6b36] mt-2 tracking-wide font-medium">
            Verified 5-Star Experience from Real GTA Brides
          </p>
        </motion.div>

        {/* 8 Cards in a 4-col responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: "easeOut" }}
              data-testid={`testimonial-card-${i}`}
              style={{
                background: "rgba(251, 246, 238, 0.8)",
                border: "1px solid rgba(184, 147, 90, 0.2)",
                borderRadius: "20px",
                padding: "24px 20px",
                boxShadow: "0 4px 20px rgba(31, 51, 41, 0.05)",
                transition: "all 250ms ease-out",
                cursor: "default",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(184, 147, 90, 0.5)",
                boxShadow: "0 12px 40px rgba(31, 51, 41, 0.12)",
              }}
            >
              <div>
                {/* Stars */}
                <div style={{ marginBottom: "12px" }}>
                  <StarRating count={t.rating} />
                </div>

                {/* Review Quote */}
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "14px",
                    color: "#4a3a30",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                    fontStyle: "italic",
                  }}
                >
                  "{t.review}"
                </p>
              </div>

              <div>
                {/* Author attribution */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "1.5px solid rgba(184, 147, 90, 0.3)",
                      flexShrink: 0,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <ImageWithFallback
                      src={t.image}
                      alt={t.alt}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--app-font-serif)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#1F3329",
                      }}
                    >
                      – {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "11px",
                        color: "#B8935A",
                        fontWeight: 500,
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
