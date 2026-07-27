import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, MoveHorizontal } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: "#FBF6EE" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8935A]/40 bg-[#B8935A]/10 text-[#B8935A] text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles size={14} />
            Interactive Transformation
          </div>
          <h2
            style={{ fontFamily: "var(--app-font-serif, serif)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3329] tracking-tight mb-4"
          >
            Real Bridal Artistry Transformation
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a40] max-w-xl mx-auto leading-relaxed">
            Drag the slider left and right to reveal the flawless, long-wear transformation crafted by KS Beauty.
          </p>
        </motion.div>

        {/* Drag Slider Box */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#B8935A]/40 select-none touch-pan-y cursor-ew-resize"
        >
          {/* AFTER IMAGE (Underneath, Full width) */}
          <div className="absolute inset-0 w-full h-full">
            <ImageWithFallback
              src="/images/before-after/after-glam.jpg"
              alt="Bridal After Hair & Makeup Glam"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 right-4 bg-[#1F3329]/90 text-[#FBF6EE] text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#B8935A]/50 shadow-md">
              After (KS Beauty Glam)
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped on top) */}
          <div
            className="absolute top-0 left-0 bottom-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute top-0 left-0 w-full h-full" style={{ width: containerRef.current?.clientWidth || "100%" }}>
              <ImageWithFallback
                src="/images/before-after/before-natural.jpg"
                alt="Bridal Natural Prep"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-white/90 text-[#1F3329] text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-[#1F3329]/20 shadow-md">
                Before (Natural Skin)
              </div>
            </div>
          </div>

          {/* SLIDER DIVIDER LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#B8935A] shadow-2xl z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1F3329] text-[#B8935A] border-2 border-[#B8935A] shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform hover:scale-110 active:scale-95">
              <MoveHorizontal size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#8c6b36] font-semibold mt-4">
          ✨ Tip: Drag or swipe horizontally to compare before vs after.
        </p>
      </div>
    </section>
  );
}
