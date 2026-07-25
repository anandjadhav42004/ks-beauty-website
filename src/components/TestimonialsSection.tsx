import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const testimonials = [
  {
    name: "Priya M.",
    role: "Bride · Mississauga",
    review:
      "Komal made my wedding morning the most peaceful part of the entire day. I was expecting to feel rushed, but she arrived early, set up beautifully, and had me looking exactly how I imagined. My lehenga look was absolutely flawless — even after 12 hours.",
    rating: 5,
    initial: "PM",
    image: "/images/gallery/bridal-1.jpg",
    alt: "Client testimonial portrait for Priya M.",
  },
  {
    name: "Anjali K.",
    role: "Bride · Ajax",
    review:
      "I've never felt so beautiful in my life. Komal understood my South Asian features so perfectly — the contouring, the eye makeup for my almond shape, the way she draped my dupatta. My whole family was in awe. Booked for my sister's wedding immediately after.",
    rating: 5,
    initial: "AK",
    image: "/images/gallery/bridal-2.jpg",
    alt: "Client testimonial portrait for Anjali K.",
  },
  {
    name: "Sarah L.",
    role: "Bride · Toronto",
    review:
      "From my trial to my wedding day, Komal was absolutely exceptional. She listened to every detail, matched my vision perfectly, and made the whole experience feel luxurious rather than stressful. Worth every penny and so much more.",
    rating: 5,
    initial: "SL",
    image: "/images/gallery/soft-glam-1.jpg",
    alt: "Client testimonial portrait for Sarah L.",
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
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              data-testid={`testimonial-card-${i}`}
              style={{
                background: "rgba(251, 246, 238, 0.8)",
                border: "1px solid rgba(184, 147, 90, 0.15)",
                borderRadius: "24px",
                padding: "32px 28px",
                boxShadow: "0 4px 20px rgba(31, 51, 41, 0.05)",
                transition: "all 250ms ease-out",
                cursor: "default",
                position: "relative",
              }}
              whileHover={{
                y: -5,
                borderColor: "rgba(184, 147, 90, 0.5)",
                boxShadow: "0 12px 40px rgba(31, 51, 41, 0.12)",
              }}
            >
              {/* Large quote mark */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  fontFamily: "var(--app-font-serif)",
                  fontSize: "80px",
                  lineHeight: 1,
                  color: "rgba(184, 147, 90, 0.12)",
                  fontWeight: 800,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                "
              </div>

              {/* Stars */}
              <div style={{ marginBottom: "16px" }}>
                <StarRating count={t.rating} />
              </div>

              {/* Review */}
              <p
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "15px",
                  color: "#4a3a30",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                "{t.review}"
              </p>

              {/* Sample notice */}
              <div
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "10px",
                  color: "rgba(90, 74, 64, 0.5)",
                  letterSpacing: "0.08em",
                  marginBottom: "20px",
                  fontStyle: "normal",
                }}
              >
                [SAMPLE — replace with real review]
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(184, 147, 90, 0.3)",
                    flexShrink: 0,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* TODO: replace with client's real portfolio photos before launch. */}
                  <ImageWithFallback
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1F3329",
                      lineHeight: 1.2,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "12px",
                      color: "#B8935A",
                      letterSpacing: "0.05em",
                      marginTop: "2px",
                    }}
                  >
                    {t.role}
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
