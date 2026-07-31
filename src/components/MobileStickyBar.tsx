import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, Image as ImageIcon, Tag, Send } from "lucide-react";

export default function MobileStickyBar() {
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const services = document.querySelector("#services") as HTMLElement;
      const gallery = document.querySelector("#gallery") as HTMLElement;
      const pricing = document.querySelector("#pricing") as HTMLElement;
      const contact = document.querySelector("#contact") as HTMLElement;

      if (contact && scrollPos >= contact.offsetTop) {
        setActiveTab("quote");
      } else if (pricing && scrollPos >= pricing.offsetTop) {
        setActiveTab("packages");
      } else if (gallery && scrollPos >= gallery.offsetTop) {
        setActiveTab("gallery");
      } else if (services && scrollPos >= services.offsetTop) {
        setActiveTab("services");
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#hero" },
    { id: "services", label: "Services", icon: Sparkles, href: "#services" },
    { id: "gallery", label: "Gallery", icon: ImageIcon, href: "#gallery" },
    { id: "packages", label: "Packages", icon: Tag, href: "#pricing" },
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveTab(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pt-1 pointer-events-none pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-auto max-w-md mx-auto rounded-full px-3 py-1.5 flex items-center justify-between shadow-2xl"
        style={{
          background: "rgba(31, 51, 41, 0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(184, 147, 90, 0.45)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
        }}
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href, item.id)}
              className="relative flex flex-col items-center justify-center min-w-[50px] px-2 py-1 transition-all duration-200 active:scale-95 rounded-full"
              style={{ minHeight: "44px" }}
              aria-label={item.label}
              data-testid={`mobile-nav-${item.id}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobileTabBg"
                  className="absolute inset-0 bg-[#B8935A]/20 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                style={{
                  color: isActive ? "#D4AF37" : "rgba(251, 246, 238, 0.7)",
                  transition: "color 200ms ease",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--app-font-sans)",
                  fontSize: "10px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#FBF6EE" : "rgba(251, 246, 238, 0.7)",
                  marginTop: "2px",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Prominent Gold Quote Button (5th item) */}
        <button
          onClick={() => handleNavClick("#contact", "quote")}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-sans font-bold text-xs shadow-lg transition-all active:scale-95 shrink-0"
          style={{
            background: "linear-gradient(135deg, #B8935A 0%, #D4AF37 100%)",
            color: "#1F3329",
            minHeight: "42px",
            boxShadow: "0 4px 14px rgba(184, 147, 90, 0.45)",
          }}
          data-testid="mobile-nav-quote-btn"
        >
          <Send size={14} />
          <span>Quote</span>
        </button>
      </motion.nav>
    </div>
  );
}
