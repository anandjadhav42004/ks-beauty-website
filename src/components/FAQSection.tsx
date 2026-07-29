import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you travel?",
    a: "Yes! We are a 100% mobile luxury bridal beauty team. We bring our full professional kit directly to your home, venue, or hotel suite.",
  },
  {
    q: "How far do you travel?",
    a: "We serve all of Toronto, Durham Region (Pickering, Ajax, Whitby, Oshawa), and the Greater Toronto Area with convenient mobile service.",
  },
  {
    q: "How much is the deposit?",
    a: "A 30% deposit is required upon booking to lock in your event date and time slot in our master calendar.",
  },
  {
    q: "When should I book my bridal appointment?",
    a: "We recommend booking 6 to 12 months in advance for peak wedding season (May–October) to guarantee your preferred morning time.",
  },
  {
    q: "Do you provide lashes?",
    a: "Yes! Complimentary premium strip or cluster false lashes and custom lash application are included with all makeup services.",
  },
  {
    q: "Can I bring inspiration photos?",
    a: "We encourage it! Sharing your Pinterest boards, dress photos, and jewelry details helps us tailor your perfect personalized look.",
  },
  {
    q: "What's included in bridal packages?",
    a: "Bridal packages include skin prep, high-definition 14-hour makeup, lashes, luxury hair styling, dupatta/veil setting, and a complimentary touch-up kit.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations submitted at least 30 days prior to the event date incur no fees beyond the initial booking deposit.",
  },
  {
    q: "Do you offer bridal trials?",
    a: "Yes — bridal trial sessions allow us to test products against your skin chemistry and refine your look 1 to 3 months before your wedding.",
  },
  {
    q: "Which makeup brands do you use?",
    a: "We use high-performance luxury brands including Charlotte Tilbury, NARS, MAC, Giorgio Armani, Huda Beauty, and Pat McGrath.",
  },
  {
    q: "Can you accommodate bridal parties?",
    a: "Yes — we coordinate timelines for bridesmaids and family members, bringing secondary certified artists for larger group bookings.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "#FBF6EE" }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(184, 147, 90, 0.04), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
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
              Common Questions
            </span>
            <div style={{ width: "32px", height: "1px", background: "#B8935A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--app-font-serif)",
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#1F3329",
              lineHeight: 1.15,
            }}
          >
            Everything You Need to Know
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                data-testid={`faq-item-${i}`}
                style={{
                  background: "rgba(251, 246, 238, 0.8)",
                  border: isOpen
                    ? "1.5px solid rgba(184, 147, 90, 0.5)"
                    : "1px solid rgba(184, 147, 90, 0.18)",
                  borderRadius: "18px",
                  overflow: "hidden",
                  transition: "border-color 200ms ease-out",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-testid={`faq-toggle-${i}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "16px",
                    textAlign: "left",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: isOpen ? "#B8935A" : "#1F3329",
                      lineHeight: 1.4,
                      transition: "color 200ms ease-out",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    style={{
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isOpen
                        ? "rgba(184, 147, 90, 0.15)"
                        : "rgba(31, 51, 41, 0.06)",
                      border: isOpen
                        ? "1px solid rgba(184, 147, 90, 0.35)"
                        : "1px solid rgba(31, 51, 41, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#B8935A" : "#1F3329",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "all 300ms ease-in-out",
                    }}
                  >
                    <ChevronDown size={14} strokeWidth={2.5} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 24px 22px",
                          borderTop: "1px solid rgba(184, 147, 90, 0.15)",
                          paddingTop: "18px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--app-font-sans)",
                            fontSize: "15px",
                            color: "#5a4a40",
                            lineHeight: 1.8,
                            margin: 0,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "15px",
              color: "#5a4a40",
              marginBottom: "16px",
            }}
          >
            Still have questions? We'd love to hear from you.
          </p>
          <button
            className="btn-primary ripple-container"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="faq-contact-button"
            style={{ padding: "12px 28px", fontSize: "13px" }}
          >
            Send Us a Message
          </button>
        </motion.div>
      </div>
    </section>
  );
}
