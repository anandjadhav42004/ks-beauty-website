import { useState } from "react";
import { Instagram, Mail, Phone, Clock, MapPin, X } from "lucide-react";
import LogoMark from "./LogoMark";

export default function Footer() {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "Book Now", href: "#contact" },
  ];

  return (
    <footer
      style={{
        background: "#1a2d23",
        borderTop: "1px solid rgba(184, 147, 90, 0.3)",
        paddingTop: "60px",
        paddingBottom: "32px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoMark size={40} />
              <div>
                <div
                  style={{
                    fontFamily: "var(--app-font-serif)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#FBF6EE",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  KS Beauty
                </div>
                <div
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "#B8935A",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Luxury Bridal Artistry
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "14px",
                color: "rgba(251, 246, 238, 0.6)",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              On-location bridal hair, makeup, and drape styling serving Toronto, Durham Region, and the Greater Toronto Area.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ksbeauty_toronto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(251, 246, 238, 0.08)",
                  border: "1px solid rgba(184, 147, 90, 0.3)",
                  color: "#B8935A",
                }}
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:contact@ksbeauty.ca"
                aria-label="Email"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(251, 246, 238, 0.08)",
                  border: "1px solid rgba(184, 147, 90, 0.3)",
                  color: "#B8935A",
                }}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#B8935A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Navigation
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: "12px" }}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "14px",
                      color: "rgba(251, 246, 238, 0.6)",
                      textDecoration: "none",
                      transition: "color 200ms",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#FBF6EE"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(251, 246, 238, 0.6)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#B8935A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Get In Touch
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <Mail size={15} style={{ color: "#B8935A", marginTop: "3px", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", color: "rgba(251, 246, 238, 0.4)", margin: 0, textTransform: "uppercase" }}>Inquiries</p>
                <a href="mailto:contact@ksbeauty.ca" style={{ fontFamily: "var(--app-font-sans)", fontSize: "14px", color: "#FBF6EE", textDecoration: "none" }}>
                  contact@ksbeauty.ca
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <Phone size={15} style={{ color: "#B8935A", marginTop: "3px", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", color: "rgba(251, 246, 238, 0.4)", margin: 0, textTransform: "uppercase" }}>Phone / WhatsApp</p>
                <a href="tel:+14165550192" style={{ fontFamily: "var(--app-font-sans)", fontSize: "14px", color: "#FBF6EE", textDecoration: "none" }}>
                  (416) 555-0192
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Instagram size={15} style={{ color: "#B8935A", marginTop: "3px", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "var(--app-font-sans)", fontSize: "11px", color: "rgba(251, 246, 238, 0.4)", margin: 0, textTransform: "uppercase" }}>Instagram</p>
                <a href="https://instagram.com/ksbeauty_toronto" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--app-font-sans)", fontSize: "14px", color: "#FBF6EE", textDecoration: "none" }}>
                  @ksbeauty_toronto
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Area */}
          <div>
            <h3
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#B8935A",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Hours &amp; Service Areas
            </h3>

            <div className="flex items-start gap-3 mb-5">
              <Clock size={15} style={{ color: "#B8935A", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "14px",
                    color: "rgba(251, 246, 238, 0.6)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Mon – Sat: 7:00 am – 8:00 pm
                  <br />
                  Sunday: By appointment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={15} style={{ color: "#B8935A", marginTop: "2px", flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "13px",
                  color: "rgba(251, 246, 238, 0.5)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Toronto · Durham Region
                <br />
                Pickering · Ajax · Whitby
                <br />
                Oshawa · GTA
              </p>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(184, 147, 90, 0.2)",
            marginBottom: "24px",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "12px",
              color: "rgba(251, 246, 238, 0.4)",
              margin: 0,
            }}
          >
            © 2025 KS Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <button
              onClick={() => setLegalModal("privacy")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "var(--app-font-sans)",
                fontSize: "12px",
                color: "rgba(251, 246, 238, 0.4)",
                cursor: "pointer",
              }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal("terms")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "var(--app-font-sans)",
                fontSize: "12px",
                color: "rgba(251, 246, 238, 0.4)",
                cursor: "pointer",
              }}
            >
              Terms of Service
            </button>
            <span style={{ color: "rgba(184, 147, 90, 0.3)" }}>|</span>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "12px",
                color: "rgba(251, 246, 238, 0.6)",
                margin: 0,
              }}
            >
              Created &amp; Developed by{" "}
              <a
                href="https://portfolio-three-swart-hx117dkm48.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#B8935A",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#D4AF37"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#B8935A"; }}
              >
                Anand Jadhav
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8"
            style={{
              background: "#1F3329",
              border: "1px solid rgba(184, 147, 90, 0.4)",
              color: "#FBF6EE",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#B8935A] hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {legalModal === "privacy" ? (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#FBF6EE] mb-4">Privacy Policy</h3>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  At KS Beauty ("we", "our", "us"), we respect your privacy and are committed to protecting the personal information you share with us through our contact form and booking inquiries.
                </p>
                <h4 className="font-serif text-lg font-bold text-[#B8935A] mb-2">1. Information We Collect</h4>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  When submitting a quote inquiry, we collect your name, email address, phone number, event date, venue location, and selected beauty services to prepare custom quotes and communicate availability.
                </p>
                <h4 className="font-serif text-lg font-bold text-[#B8935A] mb-2">2. How We Use Your Information</h4>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  Your information is used strictly to communicate regarding your event inquiry, schedule bridal trials, confirm bookings, and provide mobile services across Toronto and the GTA. We never sell or share your data with third parties.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#FBF6EE] mb-4">Terms of Service</h3>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  Welcome to KS Beauty. By booking our mobile hair and makeup services, you agree to the following terms and conditions.
                </p>
                <h4 className="font-serif text-lg font-bold text-[#B8935A] mb-2">1. Bookings &amp; Retainers</h4>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  Bridal dates are secured upon receipt of a signed service contract and non-refundable deposit retainer. Remaining balances are due prior to or on the date of service.
                </p>
                <h4 className="font-serif text-lg font-bold text-[#B8935A] mb-2">2. Travel &amp; On-Site Requirements</h4>
                <p className="font-sans text-sm text-[#FBF6EE]/80 leading-relaxed mb-4">
                  Mobile services include travel throughout the GTA. Parking or valet fees at hotels and venues are covered by the client.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
