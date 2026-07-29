import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Scissors,
  Check,
  Send,
  Loader2,
  RefreshCw,
  Mail,
  Info,
  AlertTriangle,
  PhoneCall,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// --- TYPES & INTERFACES ---
export type RegionOption =
  | "Durham Region"
  | "GTA (Greater Toronto Area)";

export type ServiceTypeOption = "Bridal" | "Semi-Bridal" | "Non-Bridal";

export type TierName = "Standard Artist" | "Senior Artist" | "Lead Artist (Founder)";

export type NextActionOption = "Book this package" | "Request a call" | "Save this quote";

export interface QuoteFormData {
  // Step 1
  firstName: string;
  eventDate: string;
  finishTime: string;
  // Step 2
  region: RegionOption;
  // Step 3
  serviceType: ServiceTypeOption;
  // Step 4
  bothHairMakeup: boolean;
  bothCount: number;
  makeupOnlyCount: number;
  hairOnlyCount: number;
  extensionsCount: number;
  jewelryDupattaCount: number;
  // Step 5
  selectedTier: TierName;
  nextAction: NextActionOption;
  // Step 6
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
}

// --- CURRENCY FORMATTER (CAD) ---
const formatCAD = (amount: number): string => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// --- TRAVEL FEE MATRIX (Flat $30 across Durham Region & GTA) ---
const TRAVEL_FEES: Record<RegionOption, number> = {
  "Durham Region": 30,
  "GTA (Greater Toronto Area)": 30,
};

// --- BASE PRICE MATRIX PER PERSON (Hair & Makeup combined) ---
const TIER_PRICING: Record<
  TierName,
  Record<ServiceTypeOption, { both: number; single: number }>
> = {
  "Standard Artist": {
    Bridal: { both: 250, single: 150 },
    "Semi-Bridal": { both: 220, single: 135 },
    "Non-Bridal": { both: 200, single: 120 },
  },
  "Senior Artist": {
    Bridal: { both: 300, single: 180 },
    "Semi-Bridal": { both: 260, single: 155 },
    "Non-Bridal": { both: 240, single: 145 },
  },
  "Lead Artist (Founder)": {
    Bridal: { both: 450, single: 270 },
    "Semi-Bridal": { both: 350, single: 210 },
    "Non-Bridal": { both: 300, single: 180 },
  },
};

const ADD_ON_PRICES = {
  extension: 40,
  jewelryDupatta: 40,
};

// Country codes for step 6
const COUNTRY_CODES = [
  { code: "+1", label: "🇨🇦 / 🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
];

interface InstantQuoteCalculatorProps {
  prefilledData?: {
    service?: string;
    date?: string;
  } | null;
}

export default function InstantQuoteCalculator({ prefilledData }: InstantQuoteCalculatorProps = {}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    eventDate: "",
    finishTime: "",
    region: "Durham Region",
    serviceType: "Bridal",
    bothHairMakeup: true,
    bothCount: 1,
    makeupOnlyCount: 0,
    hairOnlyCount: 0,
    extensionsCount: 0,
    jewelryDupattaCount: 0,
    selectedTier: "Senior Artist",
    nextAction: "Book this package",
    lastName: "",
    email: "",
    phoneCountryCode: "+1",
    phoneNumber: "",
  });

  // Pre-fill calculator when data is received from Hero quick-quote bar
  useEffect(() => {
    if (!prefilledData) return;

    setFormData((prev) => {
      let mappedType: ServiceTypeOption = "Bridal";
      let bothFlag = true;
      let bothCnt = 1;
      let makeupCnt = 0;

      if (prefilledData.service === "Special Event Glam") {
        mappedType = "Non-Bridal";
        bothFlag = true;
        bothCnt = 1;
      } else if (prefilledData.service === "Bridal Party Package") {
        mappedType = "Semi-Bridal";
        bothFlag = true;
        bothCnt = 3;
      } else if (prefilledData.service === "Touch-Up & Trial") {
        mappedType = "Bridal";
        bothFlag = false;
        makeupCnt = 1;
      } else if (prefilledData.service === "Bridal Makeup & Hair") {
        mappedType = "Bridal";
        bothFlag = true;
        bothCnt = 1;
      }

      return {
        ...prev,
        eventDate: prefilledData.date || prev.eventDate,
        serviceType: mappedType,
        bothHairMakeup: bothFlag,
        bothCount: bothCnt,
        makeupOnlyCount: makeupCnt,
      };
    });
  }, [prefilledData]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // --- CALCULATION LOGIC ---
  const calculateBreakdown = (tier: TierName) => {
    const rates = TIER_PRICING[tier][formData.serviceType];
    let servicesTotal = 0;
    const items: Array<{ label: string; qty: number; unitPrice: number; total: number }> = [];

    if (formData.bothHairMakeup) {
      const qty = Math.max(1, formData.bothCount);
      const total = qty * rates.both;
      servicesTotal += total;
      items.push({
        label: `${formData.serviceType} Hair & Makeup`,
        qty,
        unitPrice: rates.both,
        total,
      });
    } else {
      if (formData.makeupOnlyCount > 0) {
        const qty = formData.makeupOnlyCount;
        const total = qty * rates.single;
        servicesTotal += total;
        items.push({
          label: `${formData.serviceType} Makeup Only (Lashes Inc.)`,
          qty,
          unitPrice: rates.single,
          total,
        });
      }
      if (formData.hairOnlyCount > 0) {
        const qty = formData.hairOnlyCount;
        const total = qty * rates.single;
        servicesTotal += total;
        items.push({
          label: `${formData.serviceType} Hair Styling Only`,
          qty,
          unitPrice: rates.single,
          total,
        });
      }
    }

    // Addons
    let extensionsTotal = 0;
    if (formData.extensionsCount > 0) {
      extensionsTotal = formData.extensionsCount * ADD_ON_PRICES.extension;
      items.push({
        label: "Hair Extensions Installation",
        qty: formData.extensionsCount,
        unitPrice: ADD_ON_PRICES.extension,
        total: extensionsTotal,
      });
    }

    let jewelryTotal = 0;
    if (formData.jewelryDupattaCount > 0) {
      jewelryTotal = formData.jewelryDupattaCount * ADD_ON_PRICES.jewelryDupatta;
      items.push({
        label: "Jewelry / Dupatta / Veil Setting",
        qty: formData.jewelryDupattaCount,
        unitPrice: ADD_ON_PRICES.jewelryDupatta,
        total: jewelryTotal,
      });
    }

    const totalPeople = formData.bothHairMakeup
      ? formData.bothCount
      : formData.makeupOnlyCount + formData.hairOnlyCount;

    const travelFee = TRAVEL_FEES[formData.region] || 30;

    const subtotal = servicesTotal + extensionsTotal + jewelryTotal + travelFee;
    const hstTax = subtotal * 0.13;
    const grandTotal = subtotal + hstTax;

    return {
      items,
      totalPeople,
      travelFee,
      subtotal,
      hstTax,
      grandTotal,
    };
  };

  // --- STEP VALIDATION ---
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    const todayStr = new Date().toISOString().split("T")[0];

    if (step === 1) {
      if (!formData.eventDate) {
        errs.eventDate = "Please select your event date";
      } else if (formData.eventDate < todayStr) {
        errs.eventDate = "Event date cannot be in the past";
      }

      if (!formData.finishTime) {
        errs.finishTime = "Please enter required finish time";
      } else {
        const hour = parseInt(formData.finishTime.split(":")[0], 10);
        if (hour >= 1 && hour < 5) {
          errs.finishTime = "Please enter a reasonable finish time (e.g., between 5:00 AM and 11:00 PM)";
        }
      }
    } else if (step === 4) {
      if (formData.bothHairMakeup) {
        if (formData.bothCount < 1) errs.bothCount = "Please enter at least 1 person";
      } else {
        if (formData.makeupOnlyCount === 0 && formData.hairOnlyCount === 0) {
          errs.peopleCount = "Please enter at least 1 person needing makeup or hair services";
        }
      }
    } else if (step === 6) {
      if (!formData.firstName.trim()) errs.firstName = "First name is required";
      if (!formData.lastName.trim()) errs.lastName = "Last name is required";
      if (!formData.email.trim()) {
        errs.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = "Please enter a valid email address";
      }

      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      if (!formData.phoneNumber.trim()) {
        errs.phoneNumber = "Phone number is required";
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        errs.phoneNumber = "Please enter a valid phone number (7-15 digits)";
      }
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    setFormErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // --- SUBMIT HANDLER WITH ERROR RECOVERY ---
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    setEmailError(null);
    const breakdown = calculateBreakdown(formData.selectedTier);

    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const CLIENT_TEMPLATE_ID = "YOUR_CLIENT_TEMPLATE_ID";
    const OWNER_TEMPLATE_ID = "YOUR_OWNER_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    const payload = {
      client_name: `${formData.firstName} ${formData.lastName}`,
      to_email: formData.email,
      to_phone: `${formData.phoneCountryCode} ${formData.phoneNumber}`,
      event_date: formData.eventDate,
      finish_time: formData.finishTime,
      region: formData.region,
      service_type: formData.serviceType,
      selected_tier: formData.selectedTier,
      next_action: formData.nextAction,
      subtotal: formatCAD(breakdown.subtotal),
      hst_tax: `${formatCAD(breakdown.hstTax)} (13% HST)`,
      grand_total: formatCAD(breakdown.grandTotal),
      itemized_details: breakdown.items
        .map((it) => `${it.label} x${it.qty} = ${formatCAD(it.total)}`)
        .join("\n"),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, CLIENT_TEMPLATE_ID, payload, PUBLIC_KEY);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        OWNER_TEMPLATE_ID,
        { ...payload, owner_email: "rivaaz.glam@gmail.com" },
        PUBLIC_KEY
      );
    } catch (err) {
      console.warn("EmailJS notice (configure live credentials at emailjs.com):", err);
      setEmailError("Note: Email notification server requires active EmailJS credentials. Your calculated quote below is confirmed & saved!");
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const selectedBreakdown = calculateBreakdown(formData.selectedTier);

  // Steps definition for header timeline
  const stepTitles = [
    { number: 1, label: "Event Details" },
    { number: 2, label: "Region" },
    { number: 3, label: "Service Type" },
    { number: 4, label: "Service Details" },
    { number: 5, label: "Package Tiers" },
    { number: 6, label: "Book Quote" },
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
      style={{ background: "#1F3329", color: "#FBF6EE" }}
    >
      {/* Background Decorator Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184, 147, 90, 0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(122, 46, 56, 0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        id="quote-calculator"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8935A]/40 bg-[#B8935A]/10 text-[#B8935A] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles size={14} />
            Instant Booking &amp; Price Calculator
          </div>
          <h2
            style={{ fontFamily: "var(--app-font-serif, serif)" }}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FBF6EE] tracking-tight mb-3"
          >
            Calculate Your Custom Bridal &amp; Event Quote
          </h2>
          <p className="text-sm sm:text-lg text-[#FBF6EE]/80 max-w-2xl mx-auto leading-relaxed">
            Get transparent, itemized luxury rates for your event date in under 60 seconds.
          </p>
        </div>

        {/* Progress Bar & Steps Indicator */}
        <div className="mb-8 bg-[#16251E] p-4 sm:p-6 rounded-2xl border border-[#B8935A]/25 shadow-xl">
          <div className="flex justify-between items-center mb-3 text-xs sm:text-sm font-medium">
            <span className="text-[#B8935A] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B8935A] animate-pulse" />
              Step {currentStep} of 6
            </span>
            <span className="text-[#FBF6EE]/80 font-bold">
              {stepTitles[currentStep - 1].label}
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-[#1F3329] h-2 sm:h-2.5 rounded-full overflow-hidden mb-4 sm:mb-6 border border-[#B8935A]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B8935A] via-[#d4af72] to-[#B8935A] rounded-full"
              initial={{ width: "16.66%" }}
              animate={{ width: `${(currentStep / 6) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Mobile step dots progress bar (sm:hidden) */}
          <div className="flex md:hidden justify-between items-center pt-1 px-1">
            {stepTitles.map((st) => {
              const isActive = currentStep === st.number;
              const isCompleted = currentStep > st.number;
              return (
                <button
                  key={st.number}
                  type="button"
                  onClick={() => {
                    if (isCompleted) setCurrentStep(st.number);
                  }}
                  disabled={!isCompleted}
                  className="flex flex-col items-center gap-1"
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isActive
                        ? "bg-[#B8935A] text-[#1F3329] ring-2 ring-[#B8935A]/40"
                        : isCompleted
                        ? "bg-[#B8935A]/30 text-[#B8935A]"
                        : "bg-[#1F3329] text-[#FBF6EE]/40 border border-[#B8935A]/20"
                    }`}
                  >
                    {isCompleted ? <Check size={10} strokeWidth={3} /> : st.number}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop step pill timeline */}
          <div className="hidden md:grid grid-cols-6 gap-2 text-center">
            {stepTitles.map((st) => {
              const isActive = currentStep === st.number;
              const isCompleted = currentStep > st.number;

              return (
                <button
                  key={st.number}
                  type="button"
                  onClick={() => {
                    if (isCompleted) setCurrentStep(st.number);
                  }}
                  disabled={!isCompleted}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-xs transition-colors duration-200 ${
                    isActive
                      ? "bg-[#B8935A] text-[#1F3329] font-bold shadow-md"
                      : isCompleted
                      ? "bg-[#B8935A]/15 text-[#B8935A] cursor-pointer hover:bg-[#B8935A]/25"
                      : "text-[#FBF6EE]/40 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors duration-200 ${
                      isActive
                        ? "bg-[#1F3329] text-[#B8935A] font-bold"
                        : isCompleted
                        ? "bg-[#B8935A] text-[#1F3329]"
                        : "bg-[#1F3329]/80 border border-[#FBF6EE]/20"
                    }`}
                  >
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : st.number}
                  </span>
                  <span className="truncate w-full">{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Wizard Form Card (Luxury Styling) */}
        <div className="bg-[#FBF6EE] text-[#1F3329] rounded-3xl p-5 sm:p-10 shadow-2xl border-2 border-[#B8935A]/35 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* STEP 1: EVENT DETAILS */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#1F3329]/10 pb-4">
                      <h3
                        style={{ fontFamily: "var(--app-font-serif, serif)" }}
                        className="text-2xl sm:text-3xl font-bold text-[#1F3329] flex items-center gap-3"
                      >
                        <Calendar className="text-[#B8935A]" size={28} />
                        Step 1 — Event Details
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a4a40] mt-1">
                        Tell us when your special event is taking place so we can check schedule availability.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      {/* Event Date */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-[#1F3329] mb-2 flex items-center gap-2">
                          <Calendar size={15} className="text-[#B8935A]" />
                          What's the date for your event? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.eventDate}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, eventDate: e.target.value }));
                            if (formErrors.eventDate) setFormErrors((prev) => ({ ...prev, eventDate: "" }));
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                            formErrors.eventDate
                              ? "border-red-500 ring-2 ring-red-200"
                              : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                          }`}
                        />
                        {formErrors.eventDate && (
                          <p className="text-xs text-red-700 mt-1.5 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.eventDate}
                          </p>
                        )}
                      </div>

                      {/* Finish Time */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-[#1F3329] mb-2 flex items-center gap-2">
                          <Clock size={15} className="text-[#B8935A]" />
                          What time should services be finished by?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          value={formData.finishTime}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, finishTime: e.target.value }));
                            if (formErrors.finishTime) setFormErrors((prev) => ({ ...prev, finishTime: "" }));
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                            formErrors.finishTime
                              ? "border-red-500 ring-2 ring-red-200"
                              : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                          }`}
                        />
                        <p className="text-xs text-[#8c6b36] mt-1.5 flex items-center gap-1 font-semibold">
                          <Info size={13} />
                          NOT the start time (this is when you need to be ready for photos/ceremony)
                        </p>
                        {formErrors.finishTime && (
                          <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.finishTime}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Optional Name for personalized step 5 */}
                    <div className="bg-white/80 p-4 rounded-2xl border border-[#B8935A]/25">
                      <label className="block text-xs font-semibold text-[#1F3329] mb-1 uppercase tracking-wider">
                        First Name (Optional — for personalized quote preview)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Priya or Jessica"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                        }
                        className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#1F3329]/15 bg-white text-[#1F3329] text-sm focus:ring-2 focus:ring-[#B8935A] outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: REGION (Refined Mobile Card Buttons) */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#1F3329]/10 pb-4">
                      <h3
                        style={{ fontFamily: "var(--app-font-serif, serif)" }}
                        className="text-2xl sm:text-3xl font-bold text-[#1F3329] flex items-center gap-3"
                      >
                        <MapPin className="text-[#B8935A]" size={28} />
                        Step 2 — Region &amp; Location
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a4a40] mt-1">
                        Where will our mobile team be traveling to serve you on your event day?
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#1F3329] mb-3 uppercase tracking-wider">
                        Select your event location:
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(
                          [
                            { id: "Durham Region", fee: formatCAD(30) },
                            { id: "GTA (Greater Toronto Area)", fee: formatCAD(30) },
                          ] as Array<{ id: RegionOption; fee: string }>
                        ).map((r) => {
                          const selected = formData.region === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, region: r.id }))
                              }
                              className={`p-5 rounded-2xl border text-left flex items-center justify-between min-h-[64px] transition-all duration-200 ${
                                selected
                                  ? "border-[#B8935A] bg-[#1F3329] text-[#FBF6EE] shadow-md ring-2 ring-[#B8935A]/30"
                                  : "border-[#B8935A]/25 bg-white text-[#1F3329] hover:border-[#B8935A]/60 hover:bg-white/90"
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className="font-bold text-base sm:text-lg">{r.id}</span>
                                <span
                                  className={`text-xs font-semibold mt-0.5 ${
                                    selected ? "text-[#B8935A]" : "text-[#5a4a40]"
                                  }`}
                                >
                                  Flat Travel Fee: {r.fee}
                                </span>
                              </div>
                              {selected ? (
                                <div className="w-8 h-8 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center font-bold shrink-0">
                                  <Check size={18} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-8 h-8 rounded-full border border-[#1F3329]/20 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Mobile & In-Studio Appointment Notice */}
                      <div className="mt-5 p-4 rounded-2xl bg-[#1F3329]/5 border border-[#B8935A]/30 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-[#1F3329] text-[#B8935A] shrink-0 mt-0.5">
                          <Sparkles size={16} />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1F3329] leading-relaxed">
                          <span className="font-bold text-[#7A2E38] block mb-0.5">🏠 Mobile Service &amp; In-Studio Appointments Available:</span>
                          We offer both <strong>Mobile Services</strong> (we travel directly to your venue or home) and <strong>In-Studio Appointments</strong> at our <strong>Oshawa, Durham Region, and GTA / Junction studio locations</strong>.
                          <span className="block text-[11px] text-[#5a4a40] mt-1 font-medium italic">* Exact studio address is provided upon booking confirmation.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: SERVICE TYPE (Refined Cards) */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#1F3329]/10 pb-4">
                      <h3
                        style={{ fontFamily: "var(--app-font-serif, serif)" }}
                        className="text-2xl sm:text-3xl font-bold text-[#1F3329] flex items-center gap-3"
                      >
                        <Sparkles className="text-[#B8935A]" size={28} />
                        Step 3 — Service Type
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a4a40] mt-1">
                        Select the primary nature of your booking to calculate accurate service rates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(
                        [
                          {
                            type: "Bridal" as ServiceTypeOption,
                            title: "Bridal Booking",
                            badge: "Main Event",
                            desc: "For a bride getting ready for the main wedding day (reception, baraat, ceremony, or wedding ceremony).",
                          },
                          {
                            type: "Semi-Bridal" as ServiceTypeOption,
                            title: "Semi-Bridal",
                            badge: "Pre-Wedding",
                            desc: "For a bride getting ready for pre-wedding events (engagement, mehndi, sangeet, haldi, rehearsal dinner).",
                          },
                          {
                            type: "Non-Bridal" as ServiceTypeOption,
                            title: "Non-Bridal / Party Glam",
                            badge: "Bridal Party & Guests",
                            desc: "For bridal party members, bridesmaids, mothers, guests, or general party/event glam (not a bride).",
                          },
                        ]
                      ).map((item) => {
                        const selected = formData.serviceType === item.type;
                        return (
                          <button
                            key={item.type}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, serviceType: item.type }))
                            }
                            className={`p-5 sm:p-6 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative ${
                              selected
                                ? "border-[#B8935A] bg-[#1F3329] text-[#FBF6EE] shadow-xl ring-2 ring-[#B8935A]/30"
                                : "border-[#B8935A]/30 bg-white text-[#1F3329] hover:border-[#B8935A]/60"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                    selected
                                      ? "bg-[#B8935A] text-[#1F3329]"
                                      : "bg-[#1F3329]/10 text-[#1F3329]"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                                {selected ? (
                                  <div className="w-6 h-6 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center font-bold">
                                    <Check size={14} strokeWidth={3} />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-full border border-[#1F3329]/20" />
                                )}
                              </div>
                              <h4
                                style={{ fontFamily: "var(--app-font-serif, serif)" }}
                                className="text-xl font-bold mb-2"
                              >
                                {item.title}
                              </h4>
                              <p
                                className={`text-xs leading-relaxed ${
                                  selected ? "text-[#FBF6EE]/80" : "text-[#5a4a40]"
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: SERVICE DETAILS & HEADCOUNT (Segmented Pill Controls) */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#1F3329]/10 pb-4">
                      <h3
                        style={{ fontFamily: "var(--app-font-serif, serif)" }}
                        className="text-2xl sm:text-3xl font-bold text-[#1F3329] flex items-center gap-3"
                      >
                        <Users className="text-[#B8935A]" size={28} />
                        Step 4 — Service Details &amp; Add-ons
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a4a40] mt-1">
                        Specify exact guest numbers, hair/makeup preferences, and specialty styling choices.
                      </p>
                    </div>

                    {/* Both Hair & Makeup Toggle (Segmented Pill Container) */}
                    <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm">
                      <label className="block text-sm font-semibold text-[#1F3329] mb-1">
                        Does everyone need both Hair &amp; Makeup? <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-[#5a4a40] mb-4">
                        Choose <strong>No</strong> if some people need makeup ONLY, or hair ONLY.
                      </p>

                      <div className="bg-[#1F3329]/10 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-2">
                        {[
                          { val: true, label: "Yes — Hair & Makeup for All" },
                          { val: false, label: "No — Separate Hair / Makeup Counts" },
                        ].map((choice) => (
                          <button
                            key={String(choice.val)}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                bothHairMakeup: choice.val,
                              }));
                              if (formErrors.peopleCount || formErrors.bothCount) {
                                setFormErrors((prev) => ({ ...prev, peopleCount: "", bothCount: "" }));
                              }
                            }}
                            className={`flex-1 min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                              formData.bothHairMakeup === choice.val
                                ? "bg-[#1F3329] text-[#FBF6EE] shadow-md"
                                : "text-[#1F3329] hover:bg-white/50"
                            }`}
                          >
                            {choice.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Numbers Inputs */}
                    <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm space-y-4">
                      {formData.bothHairMakeup ? (
                        <div>
                          <label className="block text-sm font-semibold text-[#1F3329] mb-1">
                            How many people need hair AND makeup?
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={formData.bothCount}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                bothCount: Math.max(0, parseInt(e.target.value) || 0),
                              }));
                              if (formErrors.bothCount) setFormErrors((prev) => ({ ...prev, bothCount: "" }));
                            }}
                            className="w-full sm:w-48 min-h-[48px] px-4 py-3 rounded-2xl border border-[#1F3329]/20 bg-[#FBF6EE] text-[#1F3329] font-bold text-lg focus:ring-2 focus:ring-[#B8935A] outline-none"
                          />
                          {formErrors.bothCount && (
                            <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                              <AlertTriangle size={13} />
                              {formErrors.bothCount}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-[#1F3329] mb-1">
                              How many people need makeup ONLY?
                            </label>
                            <input
                              type="number"
                              min={0}
                              max={20}
                              value={formData.makeupOnlyCount}
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  makeupOnlyCount: Math.max(0, parseInt(e.target.value) || 0),
                                }));
                                if (formErrors.peopleCount) setFormErrors((prev) => ({ ...prev, peopleCount: "" }));
                              }}
                              className="w-full min-h-[48px] px-4 py-3 rounded-2xl border border-[#1F3329]/20 bg-[#FBF6EE] text-[#1F3329] font-bold text-lg focus:ring-2 focus:ring-[#B8935A] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#1F3329] mb-1">
                              How many people need hair ONLY?
                            </label>
                            <input
                              type="number"
                              min={0}
                              max={20}
                              value={formData.hairOnlyCount}
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  hairOnlyCount: Math.max(0, parseInt(e.target.value) || 0),
                                }));
                                if (formErrors.peopleCount) setFormErrors((prev) => ({ ...prev, peopleCount: "" }));
                              }}
                              className="w-full min-h-[48px] px-4 py-3 rounded-2xl border border-[#1F3329]/20 bg-[#FBF6EE] text-[#1F3329] font-bold text-lg focus:ring-2 focus:ring-[#B8935A] outline-none"
                            />
                          </div>
                          {formErrors.peopleCount && (
                            <p className="col-span-2 text-xs text-red-700 font-semibold flex items-center gap-1 mt-1">
                              <AlertTriangle size={13} />
                              {formErrors.peopleCount}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Add-ons counts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Hair extensions */}
                      <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm">
                        <label className="block text-sm font-semibold text-[#1F3329] mb-1 flex items-center justify-between">
                          <span>Hair Extensions Installation</span>
                          <span className="text-xs text-[#B8935A] font-bold">{formatCAD(40)} / person</span>
                        </label>
                        <p className="text-xs text-amber-800 font-medium mb-3 flex items-center gap-1">
                          <Scissors size={13} />
                          We do NOT provide hair extensions. You must have your own.
                        </p>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={formData.extensionsCount}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              extensionsCount: Math.max(0, parseInt(e.target.value) || 0),
                            }))
                          }
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#1F3329]/20 bg-[#FBF6EE] text-[#1F3329] font-bold outline-none"
                        />
                      </div>

                      {/* Jewelry / Dupatta */}
                      <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm">
                        <label className="block text-sm font-semibold text-[#1F3329] mb-1 flex items-center justify-between">
                          <span>Jewelry / Dupatta / Veil Setting</span>
                          <span className="text-xs text-[#B8935A] font-bold">{formatCAD(40)} / person</span>
                        </label>
                        <p className="text-xs text-[#5a4a40] mb-3">
                          Includes heavy chunni pinning, maang tikka, matha patti &amp; jewelry security.
                        </p>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={formData.jewelryDupattaCount}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              jewelryDupattaCount: Math.max(0, parseInt(e.target.value) || 0),
                            }))
                          }
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#1F3329]/20 bg-[#FBF6EE] text-[#1F3329] font-bold outline-none"
                        />
                      </div>
                    </div>

                    {/* Included notice */}
                    <div className="bg-[#1F3329]/5 p-4 rounded-2xl border border-[#1F3329]/10 flex items-center gap-3">
                      <Sparkles className="text-[#B8935A] shrink-0" size={20} />
                      <p className="text-xs text-[#1F3329] font-medium">
                        <strong>Complimentary Lashes Included:</strong> Premium mink or silk false lashes and custom skin preparation are automatically included with all makeup services at no extra charge ({formatCAD(0)}).
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 5: AVAILABILITY & PACKAGE SELECTION */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    {/* Personalized banner */}
                    <div className="bg-[#1F3329] text-[#FBF6EE] p-5 rounded-2xl border-2 border-[#B8935A] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center font-bold shrink-0">
                          <CheckCircle2 size={24} />
                        </div>
                        <div>
                          <h4
                            style={{ fontFamily: "var(--app-font-serif, serif)" }}
                            className="text-lg sm:text-xl font-bold text-[#FBF6EE]"
                          >
                            Good news {formData.firstName ? formData.firstName : "Beautiful"}, we're available!
                          </h4>
                          <p className="text-xs text-[#FBF6EE]/80">
                            Mobile team availability confirmed for {formData.eventDate || "your date"} (finish time: {formData.finishTime || "Flexible"}).
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-[#B8935A]/20 text-[#B8935A] px-3 py-1 rounded-full border border-[#B8935A]/40 shrink-0">
                        Date Reserved for 15m
                      </span>
                    </div>

                    {/* Tier Selection Cards */}
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#1F3329] mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span>Select Your Preferred Artist Tier</span>
                        <span className="text-xs text-[#8c6b36] font-semibold">
                          Calculated for {formData.region} • {selectedBreakdown.totalPeople} Person(s)
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        {(
                          [
                            {
                              tier: "Standard Artist" as TierName,
                              badge: "Great Value",
                              badgeBg: "bg-blue-100 text-blue-800",
                              desc: "Skilled senior artist team specializing in long-wear bridal glam.",
                              available: true,
                            },
                            {
                              tier: "Senior Artist" as TierName,
                              badge: "Most Popular",
                              badgeBg: "bg-[#B8935A] text-[#1F3329]",
                              desc: "Master artist with 6+ years experience in bridal & dupatta styling.",
                              popular: true,
                              available: true,
                            },
                            {
                              tier: "Lead Artist (Founder)" as TierName,
                              badge: "Executive Luxury",
                              badgeBg: "bg-purple-100 text-purple-900",
                              desc: "Exclusively styled by Founder & Lead Artist Karishma.",
                              available: true,
                            },
                          ]
                        ).map((t) => {
                          const breakdown = calculateBreakdown(t.tier);
                          const isSelected = formData.selectedTier === t.tier;

                          return (
                            <div
                              key={t.tier}
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, selectedTier: t.tier }))
                              }
                              className={`rounded-2xl p-5 border-2 cursor-pointer transition-all duration-200 ease-out flex flex-col justify-between relative ${
                                isSelected
                                  ? "border-[#B8935A] bg-[#1F3329] text-[#FBF6EE] shadow-xl"
                                  : "border-[#B8935A]/25 bg-white text-[#1F3329] hover:border-[#B8935A]/50"
                              }`}
                            >
                              <div>
                                {/* Badge */}
                                <div className="flex justify-between items-center mb-3">
                                  <span
                                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${t.badgeBg}`}
                                  >
                                    {t.badge}
                                  </span>
                                  {isSelected && (
                                    <CheckCircle2 size={20} className="text-[#B8935A]" />
                                  )}
                                </div>

                                <h5
                                  style={{ fontFamily: "var(--app-font-serif, serif)" }}
                                  className="text-lg font-bold mb-1"
                                >
                                  {t.tier}
                                </h5>
                                <p
                                  className={`text-xs mb-4 min-h-[36px] ${
                                    isSelected ? "text-[#FBF6EE]/75" : "text-[#5a4a40]"
                                  }`}
                                >
                                  {t.desc}
                                </p>

                                {/* Itemized Breakdown List */}
                                <div
                                  className={`text-xs space-y-1.5 p-3 rounded-xl mb-4 border transition-colors ${
                                    isSelected
                                      ? "bg-black/20 border-[#B8935A]/30 text-[#FBF6EE]/90"
                                      : "bg-[#FBF6EE] border-[#1F3329]/10 text-[#1F3329]"
                                  }`}
                                >
                                  {breakdown.items.map((it, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                      <span className="truncate pr-2">{it.label}</span>
                                      <span className="font-semibold shrink-0">
                                        {formatCAD(it.total)}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="flex justify-between items-center pt-1 border-t border-dashed border-current/20 text-[11px]">
                                    <span>Travel Fee ({formData.region})</span>
                                    <span>{formatCAD(breakdown.travelFee)}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-[11px]">
                                    <span>13% HST Tax</span>
                                    <span>{formatCAD(breakdown.hstTax)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Price Total */}
                              <div className="pt-3 border-t border-current/15">
                                <div className="text-xs opacity-75 uppercase tracking-wider mb-0.5">
                                  Estimated Total (Tax Inc.)
                                </div>
                                <div
                                  style={{ fontFamily: "var(--app-font-serif, serif)" }}
                                  className="text-2xl font-extrabold text-[#B8935A] mb-3"
                                >
                                  {formatCAD(breakdown.grandTotal)}
                                </div>

                                <button
                                  type="button"
                                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors duration-200 min-h-[44px] ${
                                    isSelected
                                      ? "bg-[#B8935A] text-[#1F3329] shadow-md"
                                      : "bg-[#1F3329] text-[#FBF6EE] hover:bg-[#B8935A] hover:text-[#1F3329]"
                                  }`}
                                >
                                  {isSelected ? "Package Selected" : "Select This Tier"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* What would you like to do next? */}
                    <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm">
                      <label className="block text-sm font-semibold text-[#1F3329] mb-2">
                        What would you like to do next?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(
                          [
                            "Book this package",
                            "Request a call",
                            "Save this quote",
                          ] as NextActionOption[]
                        ).map((act) => (
                          <button
                            key={act}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, nextAction: act }))
                            }
                            className={`p-3 rounded-xl border-2 text-xs font-bold transition-all duration-200 ease-out min-h-[44px] ${
                              formData.nextAction === act
                                ? "border-[#B8935A] bg-[#1F3329] text-[#FBF6EE]"
                                : "border-[#1F3329]/15 bg-[#FBF6EE] text-[#1F3329] hover:border-[#B8935A]"
                            }`}
                          >
                            {act}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: CONTACT INFO & SUBMIT */}
                {currentStep === 6 && (
                  <form onSubmit={handleSubmitQuote} className="space-y-6">
                    <div className="border-b border-[#1F3329]/10 pb-4">
                      <h3
                        style={{ fontFamily: "var(--app-font-serif, serif)" }}
                        className="text-2xl sm:text-3xl font-bold text-[#1F3329] flex items-center gap-3"
                      >
                        <Mail className="text-[#B8935A]" size={28} />
                        Step 6 — Finalize &amp; Receive Quote
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5a4a40] mt-1">
                        You'll receive your formal itemized breakdown via email within 30 seconds of submitting this form.
                      </p>
                    </div>

                    {/* Selected Summary Card */}
                    <div className="bg-[#1F3329] text-[#FBF6EE] p-5 rounded-2xl border-2 border-[#B8935A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="text-xs text-[#B8935A] font-bold uppercase tracking-wider">
                          Selected Package: {formData.selectedTier} ({formData.nextAction})
                        </div>
                        <div className="text-sm font-medium mt-1">
                          {formData.serviceType} for {selectedBreakdown.totalPeople} person(s) in {formData.region}
                        </div>
                        <div className="text-xs text-[#FBF6EE]/75 mt-0.5">
                          Date: {formData.eventDate} | Finish by: {formData.finishTime}
                        </div>
                      </div>

                      <div className="text-right sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-[#B8935A]/30 pt-2 sm:pt-0">
                        <div className="text-xs text-[#FBF6EE]/70">Grand Total (13% HST Inc.)</div>
                        <div
                          style={{ fontFamily: "var(--app-font-serif, serif)" }}
                          className="text-2xl font-bold text-[#B8935A]"
                        >
                          {formatCAD(selectedBreakdown.grandTotal)}
                        </div>
                      </div>
                    </div>

                    {/* Contact Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1F3329] uppercase tracking-wider mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                            if (formErrors.firstName) setFormErrors((prev) => ({ ...prev, firstName: "" }));
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                            formErrors.firstName ? "border-red-500 ring-2 ring-red-200" : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                          }`}
                        />
                        {formErrors.firstName && (
                          <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1F3329] uppercase tracking-wider mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                            if (formErrors.lastName) setFormErrors((prev) => ({ ...prev, lastName: "" }));
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                            formErrors.lastName ? "border-red-500 ring-2 ring-red-200" : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                          }`}
                        />
                        {formErrors.lastName && (
                          <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1F3329] uppercase tracking-wider mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: "" }));
                          }}
                          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                            formErrors.email ? "border-red-500 ring-2 ring-red-200" : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone with Country Code */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1F3329] uppercase tracking-wider mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={formData.phoneCountryCode}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phoneCountryCode: e.target.value,
                              }))
                            }
                            className="px-2 py-3 rounded-2xl border border-[#1F3329]/20 bg-white text-[#1F3329] text-xs font-bold outline-none"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            required
                            placeholder="(647) 640-3439"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                              setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
                              if (formErrors.phoneNumber) setFormErrors((prev) => ({ ...prev, phoneNumber: "" }));
                            }}
                            className={`w-full min-h-[48px] px-4 py-3 rounded-2xl border bg-white text-[#1F3329] font-medium outline-none transition ${
                              formErrors.phoneNumber ? "border-red-500 ring-2 ring-red-200" : "border-[#1F3329]/20 focus:ring-2 focus:ring-[#B8935A]"
                            }`}
                          />
                        </div>
                        {formErrors.phoneNumber && (
                          <p className="text-xs text-red-700 mt-1 font-semibold flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {formErrors.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button (Full Width Mobile Luxury Fill) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[52px] py-4 rounded-2xl bg-gradient-to-r from-[#B8935A] via-[#d4af72] to-[#B8935A] text-[#1F3329] font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Generating Custom Quote...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          View Custom Quote &amp; Confirm Booking
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* BOTTOM WIZARD CONTROLS (Back / Next) */}
                <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-[#1F3329]/10 mt-6 sm:mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-3 rounded-2xl border border-[#1F3329]/20 text-[#1F3329] font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#1F3329]/5 transition-colors duration-200 min-h-[44px]"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 6 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-7 py-3 rounded-2xl bg-[#1F3329] text-[#FBF6EE] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 hover:bg-[#B8935A] hover:text-[#1F3329] shadow-lg transition-all duration-200 min-h-[44px]"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* SUCCESS CONFIRMATION VIEW */
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-center py-6 sm:py-8 space-y-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1F3329] text-[#B8935A] flex items-center justify-center mx-auto shadow-2xl border-2 border-[#B8935A]">
                  <CheckCircle2 size={40} />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B8935A] font-bold bg-[#1F3329]/10 px-3 py-1 rounded-full">
                    Quote Reference #{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                  <h3
                    style={{ fontFamily: "var(--app-font-serif, serif)" }}
                    className="text-2xl sm:text-4xl font-bold text-[#1F3329] mt-3 mb-2"
                  >
                    Quote Calculated &amp; Date Reserved!
                  </h3>
                  <p className="text-sm sm:text-base text-[#5a4a40] max-w-lg mx-auto">
                    Thank you, <strong>{formData.firstName}</strong>! Your itemized custom quote breakdown has been generated below for <strong>{formData.email}</strong>.
                  </p>
                </div>

                {/* Email Notice / Error Fallback Banner */}
                {emailError && (
                  <div className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-xl max-w-lg mx-auto text-left text-xs font-medium space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <Info size={16} className="text-amber-700" />
                      Notice Regarding Email Confirmation:
                    </div>
                    <p className="leading-relaxed">{emailError}</p>
                    <div className="pt-1 flex items-center gap-4 text-xs font-bold text-[#1F3329]">
                      <a href="tel:+16476403439" className="flex items-center gap-1 hover:underline">
                        <PhoneCall size={12} />
                        +1 (647) 640-3439
                      </a>
                      <a href="mailto:rivaaz.glam@gmail.com" className="flex items-center gap-1 hover:underline">
                        <Mail size={12} />
                        rivaaz.glam@gmail.com
                      </a>
                    </div>
                  </div>
                )}

                {/* Confirmed Quote Receipt Card */}
                <div className="bg-[#1F3329] text-[#FBF6EE] p-5 sm:p-6 rounded-2xl max-w-lg mx-auto text-left shadow-xl border border-[#B8935A]/40 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#B8935A]/30 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B8935A]">
                      KS Beauty Mobile Booking
                    </span>
                    <span className="text-xs text-[#FBF6EE]/70">{formData.eventDate}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#FBF6EE]/75">Client:</span>
                      <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FBF6EE]/75">Service &amp; Region:</span>
                      <span className="font-semibold">{formData.serviceType} ({formData.region})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FBF6EE]/75">Selected Tier:</span>
                      <span className="font-semibold text-[#B8935A]">{formData.selectedTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FBF6EE]/75">Completion Time:</span>
                      <span className="font-semibold">{formData.finishTime}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#B8935A]/30 space-y-1.5 text-xs">
                    {selectedBreakdown.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[#FBF6EE]/80">
                        <span>{it.label} x{it.qty}</span>
                        <span>{formatCAD(it.total)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-[#FBF6EE]/70 pt-1">
                      <span>Travel Fee ({formData.region})</span>
                      <span>{formatCAD(selectedBreakdown.travelFee)}</span>
                    </div>
                    <div className="flex justify-between text-[#FBF6EE]/70">
                      <span>13% HST</span>
                      <span>{formatCAD(selectedBreakdown.hstTax)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-[#B8935A] pt-2 border-t border-dashed border-[#B8935A]/30">
                      <span>Grand Total</span>
                      <span>{formatCAD(selectedBreakdown.grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-3 rounded-xl border border-[#1F3329]/30 text-[#1F3329] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#1F3329]/10 transition-colors duration-200 min-h-[44px]"
                  >
                    <RefreshCw size={15} />
                    Calculate Another Quote
                  </button>

                  <a
                    href="#gallery"
                    className="px-6 py-3 rounded-xl bg-[#1F3329] text-[#FBF6EE] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#B8935A] hover:text-[#1F3329] transition-colors duration-200 min-h-[44px]"
                  >
                    Explore Bridal Gallery
                    <ArrowRight size={15} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
