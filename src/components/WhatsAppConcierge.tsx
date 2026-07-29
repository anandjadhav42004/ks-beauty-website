import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

export default function WhatsAppConcierge() {
  const whatsappUrl =
    "https://wa.me/16476403439?text=Hi%20KS%20Beauty!%20I'd%20like%20to%20check%20bridal%20availability%20for%20my%20event.";

  return (
    <aside aria-label="WhatsApp concierges" className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl border-2 transition-all duration-300 group"
        style={{
          background: "linear-gradient(135deg, #1F3329 0%, #294537 100%)",
          borderColor: "#B8935A",
          color: "#FBF6EE",
          boxShadow: "0 8px 24px rgba(31, 51, 41, 0.35)",
        }}
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
          <MessageCircle size={16} fill="white" />
        </div>
        <div className="flex flex-col text-left leading-tight pr-1">
          <span className="text-[10px] uppercase font-bold text-[#B8935A] tracking-wider flex items-center gap-1">
            <Sparkles size={10} /> Live VIP Concierge
          </span>
          <span className="text-xs font-semibold">Chat on WhatsApp</span>
        </div>
      </motion.a>
    </aside>
  );
}
