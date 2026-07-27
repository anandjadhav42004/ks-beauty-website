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

        {/* 10. Testimonials */}
        <TestimonialsSection />

        {/* 11. Instagram */}
        <InstagramSection />

        {/* 12. Investment & Packages */}
        <PricingSection />

        {/* 13. FAQ */}
        <FAQSection />

        {/* 14. Final CTA */}
        <FinalCTASection />

        {/* 15. Instant Quote Calculator */}
        <InstantQuoteCalculator />
      </main>

      <Footer />

      {/* 16. Mobile Sticky Bar */}
      <MobileStickyBar />

      {/* 17. Floating Back To Top */}
      <BackToTop />
    </>
  );
}
