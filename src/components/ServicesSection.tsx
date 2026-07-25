import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const featuredServices = [
  {
    title: "Bridal Makeup & Hair",
    description:
      "A full-day bridal experience — from your morning hair styling and makeup application to a look that photographs beautifully and lasts. Fully mobile, arriving at your venue.",
    image: "/images/services/bridal-makeup-hair.jpg",
    alt: "Close-up bride's face with makeup sponge blending and veil by KS Beauty",
    badge: "Signature Service",
  },
  {
    title: "Special Event Glam",
    description:
      "Cocktail parties, galas, receptions, and milestone celebrations. A polished, long-wear look tailored to the occasion and your personal aesthetic.",
    image: "/images/services/special-event-glam.jpg",
    alt: "Eyeshadow application at evening event with diamond jewelry by KS Beauty",
    badge: "Most Booked",
  },
  {
    title: "Group & Bridal Party Bookings",
    description:
      "Seamless coordination for your entire bridal party. Multiple artists when needed, timed scheduling, and cohesive looks from bridesmaids to mother of the bride.",
    image: "/images/gallery/soft-glam-1.jpg",
    alt: "Bridal party getting ready and group glamour by KS Beauty",
    badge: "Group Rates",
  },
  {
    title: "Touch-Up & Trial Sessions",
    description:
      "Your bridal trial is a full rehearsal — we'll perfect your look, test products on your skin, and ensure you walk down the aisle with complete confidence.",
    image: "/images/services/touchup-trial.jpg",
    alt: "Bride in red lehenga having eyeshadow applied during trial session by KS Beauty",
    badge: "Recommended",
  },
];

const servicePillars = [
  {
    title: "Luxury at Your Doorstep",
    description: "Professional salon-quality hair and makeup in the comfort of your home, hotel, or venue. No travel or waiting in a salon.",
  },
  {
    title: "Personalized Consultation",
    description: "A pre-booking consultation to discuss vision, outfit, skin type, and hair type. Customized look based on features and event.",
  },
  {
    title: "Premium Products",
    description: "High-end, long-lasting, and hygienic products. Suitable for all skin tones and hair types.",
  },
  {
    title: "On-Time & Reliable",
    description: "Early morning bookings for weddings and events. Punctual arrival with a fully sanitized professional kit.",
  },
  {
    title: "Hair & Makeup Expertise",
    description: "One artist for both hair and makeup. Bridal, soft glam, editorial, party, engagement, photoshoots, and special events.",
  },
  {
    title: "Touch-Up Options",
    description: "Stay-on service for touch-ups and look changes (available as an add-on).",
  },
  {
    title: "Group Bookings",
    description: "Bridal parties, bridesmaids, family makeup, and event packages.",
  },
  {
    title: "Travel Across the GTA",
    description: "Mobile services throughout Toronto, Durham Region, and surrounding areas.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      {/* Corner ornament background detail */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle at top left, rgba(184, 147, 90, 0.06), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
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
              Our Services
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 700,
              color: "#1F3329",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Beauty, On Your Terms
          </h2>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "18px",
              color: "#5a4a40",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every service is fully mobile and tailored to your vision, your culture, and your day.
          </p>
        </motion.div>

        {/* Featured services cards — Mobile horizontal snap carousel / Desktop 2-col grid */}
        <div className="flex md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 md:pb-0 px-2 md:px-0">
          {featuredServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              data-testid={`service-card-${i}`}
              className="shrink-0 w-[85vw] sm:w-[340px] md:w-auto snap-center relative"
              style={{
                background: "rgba(251, 246, 238, 0.95)",
                border: "1px solid rgba(184, 147, 90, 0.4)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(31, 51, 41, 0.08)",
                transition: "all 250ms ease-out",
                cursor: "default",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 14px 40px rgba(31, 51, 41, 0.14)",
                borderColor: "rgba(184, 147, 90, 0.6)",
              }}
            >
              {/* Service image */}
              <div
                style={{
                  height: "210px",
                  background: "#1F3329",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <ImageWithFallback
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {/* Top-left Pill Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(31, 51, 41, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(184, 147, 90, 0.5)",
                    borderRadius: "100px",
                    padding: "5px 14px",
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#FBF6EE",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {service.badge}
                </div>

                {/* Top-right Floating Info Badge */}
                <div
                  className="hidden sm:flex items-center gap-1.5"
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "rgba(184, 147, 90, 0.9)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "100px",
                    padding: "4px 10px",
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#1F3329",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <Sparkles size={11} />
                  <span>MOST BOOKED</span>
                </div>
              </div>

              {/* Overlapping Circular Icon Badge (Boundary between image & content) */}
              <div className="relative px-6 pt-6 pb-7">
                <div
                  className="absolute -top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #1F3329 0%, #2D4A3C 100%)",
                    border: "2px solid #B8935A",
                    color: "#B8935A",
                    boxShadow: "0 6px 16px rgba(31, 51, 41, 0.25)",
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#1F3329",
                    marginBottom: "12px",
                    lineHeight: 1.25,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "15px",
                    color: "#5a4a40",
                    lineHeight: 1.75,
                    marginBottom: "20px",
                  }}
                >
                  {service.description}
                </p>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#B8935A",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    transition: "gap 200ms ease-out",
                  }}
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  data-testid={`service-learn-more-${i}`}
                  className="group"
                >
                  Book This Service
                  <ArrowRight
                    size={14}
                    style={{ transition: "transform 200ms ease-out" }}
                    className="group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 8 Full Service Pillars Grid with ✨ Icon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-10 border-t border-[rgba(184,147,90,0.2)]"
        >
          <h3
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "28px",
              fontWeight: 700,
              color: "#1F3329",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            The Full KS Beauty Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid rgba(184, 147, 90, 0.2)",
                  borderRadius: "18px",
                  padding: "20px",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(184, 147, 90, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sparkles size={14} color="#B8935A" />
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--app-font-serif)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#1F3329",
                      lineHeight: 1.3,
                    }}
                  >
                    {pillar.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "13px",
                    color: "#5a4a40",
                    lineHeight: 1.6,
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
