import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CTARibbon from "@/components/CTARibbon";
import WhyChooseSection from "@/components/WhyChooseSection";
import AddOnsSection from "@/components/AddOnsSection";
import GallerySection from "@/components/GallerySection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramSection from "@/components/InstagramSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import InstantQuoteCalculator from "@/components/InstantQuoteCalculator";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import BackToTop from "@/components/BackToTop";
import WhatsAppConcierge from "@/components/WhatsAppConcierge";

export default function HomePage() {
  return (
    <>
      {/* SEO Meta — injected via document in index.html */}
      <Navigation />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust Badges */}
        <TrustBadges />

        {/* 3. About / Founder */}
        <AboutSection />

        {/* 4. Services */}
        <ServicesSection />

        {/* 5. CTA Ribbon */}
        <CTARibbon />

        {/* 6. Why Choose */}
        <WhyChooseSection />

        {/* 7. Add-Ons */}
        <AddOnsSection />

        {/* 8. Gallery */}
        <GallerySection />

        {/* 9. Process Timeline */}
        <ProcessTimeline />

        {/* 11. Testimonials */}
        <TestimonialsSection />

        {/* 12. Instagram */}
        <InstagramSection />

        {/* 13. Investment & Packages */}
        <PricingSection />

        {/* 14. FAQ */}
        <FAQSection />

        {/* 15. Final CTA */}
        <FinalCTASection />

        {/* 16. Instant Quote Calculator */}
        <InstantQuoteCalculator />
      </main>

      <Footer />

      {/* 17. Mobile Sticky Bar */}
      <MobileStickyBar />

      {/* 18. Floating Back To Top */}
      <BackToTop />

      {/* 19. WhatsApp VIP Concierge */}
      <WhatsAppConcierge />
    </>
  );
}
