import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

const featuredServices = [
  {
    title: "Bridal Hair & Makeup",
    description:
      "Complete, long-lasting mobile bridal hair and makeup artistry tailored to your skin tone, dress, and ceremony style.",
    image: "/images/hero/hero-main.jpg",
    alt: "Bridal hair and makeup application by KS Beauty",
    badge: "Signature Service",
  },
  {
    title: "Indian Bridal Makeup",
    description:
      "Traditional and contemporary South Asian bridal glam, dupatta draping, jewelry setting, and high-pigment 14-hour wear.",
    image: "/images/gallery/bridal-nath-detail.jpg",
    alt: "Indian bride in ornate gold jewelry and bridal nath by KS Beauty",
    badge: "Specialist",
  },
  {
    title: "Engagement Makeup",
    description:
      "Radiant, camera-ready glam crafted specifically for engagement photoshoots, ring ceremonies, and pre-wedding celebrations.",
    image: "/images/gallery/editorial-couple-dip.jpg",
    alt: "Soft glam engagement makeup look by KS Beauty",
    badge: "Popular",
  },
  {
    title: "Baby Shower Makeup",
    description:
      "Fresh, luminous soft-focus maternity glam designed to enhance your natural glow on your special celebration day.",
    image: "/images/gallery/soft-glam-luminous-close-up.jpg",
    alt: "Luminous soft makeup for baby shower by KS Beauty",
    badge: "Gentle Glam",
  },
  {
    title: "Fashion & Editorial Makeup",
    description:
      "High-fashion, creative, and runway-standard hair and makeup for photoshoots, editorial features, and brand campaigns.",
    image: "/images/gallery/editorial-marble-staircase.jpg",
    alt: "Editorial high-fashion makeup look by KS Beauty",
    badge: "Creative",
  },
  {
    title: "Express Glam Services",
    description:
      "Quick yet flawless full-face makeup and hair styling optimized for tight schedules and last-minute special events.",
    image: "/images/gallery/soft-glam-white-gown.jpg",
    alt: "Express glam makeup for special events by KS Beauty",
    badge: "Fast Track",
  },
  {
    title: "Hair Styling",
    description:
      "Intricate bridal updos, textured romantic waves, sleek Hollywood waves, and veil or hair accessory placement.",
    image: "/images/gallery/updo-gown-marble-steps.jpg",
    alt: "Bridal hair styling updo with accessories by KS Beauty",
    badge: "Artistry",
  },
  {
    title: "Makeup Lessons",
    description:
      "Personalized 1-on-1 makeup masterclasses covering skin prep, custom color matching, day-to-night routines, and techniques.",
    image: "/images/gallery/bridal-mirror-prep.jpg",
    alt: "1-on-1 makeup lesson session by KS Beauty",
    badge: "1-on-1 Masterclass",
  },
  {
    title: "Mobile Services",
    description:
      "Luxury salon-quality beauty services delivered directly to your home, hotel suite, or venue anywhere across the GTA.",
    image: "/images/gallery/editorial-golden-hour.jpg",
    alt: "Mobile makeup artist service across Toronto & GTA",
    badge: "We Come To You",
  },
  {
    title: "Group Bookings",
    description:
      "Seamlessly coordinated hair and makeup scheduling for bridal parties, bridesmaids, mothers, and group celebrations.",
    image: "/images/gallery/soft-glam-bouquet-profile.jpg",
    alt: "Group bridal party makeup and hair by KS Beauty",
    badge: "Group Package",
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

        {/* 10 Featured services cards — Responsive 3-column desktop grid / 2-column tablet / 1-column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {featuredServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              data-testid={`service-card-${i}`}
              className="relative flex flex-col h-full"
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
                  height: "200px",
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
              </div>

              {/* Card content */}
              <div className="relative p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--app-font-serif)",
                      fontSize: "21px",
                      fontWeight: 700,
                      color: "#1F3329",
                      marginBottom: "10px",
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "14px",
                      color: "#5a4a40",
                      lineHeight: 1.65,
                      marginBottom: "20px",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
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
                    marginTop: "auto",
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
