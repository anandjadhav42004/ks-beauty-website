import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Sparkles, AlertCircle, AlertTriangle } from 'lucide-react';
import { isDateBlocked, getBlockedDates } from '@/lib/availabilityStore';

interface AvailabilityPickerProps {
  selectedContactTime: string;
  onSelectContactTime: (timeSlot: string) => void;
  eventDate?: string;
}

export const TIME_PRESETS = [
  {
    id: "morning",
    label: "🌅 Morning Window",
    timeRange: "7:00 AM – 11:00 AM",
    description: "Best for early bird calls & morning trial prep",
  },
  {
    id: "afternoon",
    label: "☀️ Afternoon Window",
    timeRange: "12:00 PM – 4:00 PM",
    description: "Ideal for mid-day consultations & quote walk-throughs",
  },
  {
    id: "evening",
    label: "🌙 Evening Window",
    timeRange: "5:00 PM – 8:00 PM",
    description: "Convenient after work hours & evening planning",
  },
  {
    id: "whatsapp",
    label: "💬 WhatsApp Instant Chat",
    timeRange: "Anytime",
    description: "Direct instant messaging with Krishna",
  },
];

// Static/mock schedule slots to demonstrate studio status
const MOCK_SCHEDULE = [
  { day: "Mon", hours: "7 AM - 8 PM", status: "Available" },
  { day: "Tue", hours: "7 AM - 8 PM", status: "Available" },
  { day: "Wed", hours: "7 AM - 8 PM", status: "Available" },
  { day: "Thu", hours: "7 AM - 8 PM", status: "Limited Slots" },
  { day: "Fri", hours: "7 AM - 8 PM", status: "Available" },
  { day: "Sat", hours: "7 AM - 8 PM", status: "Prime Bridal" },
  { day: "Sun", hours: "By Appt Only", status: "Private Event" },
];

export const AvailabilityPicker: React.FC<AvailabilityPickerProps> = ({
  selectedContactTime,
  onSelectContactTime,
  eventDate,
}) => {
  const [customTime, setCustomTime] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const isBlocked = eventDate ? isDateBlocked(eventDate) : false;
  const blockedList = getBlockedDates();

  const handlePresetSelect = (presetLabel: string) => {
    setIsCustomMode(false);
    onSelectContactTime(presetLabel);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTime.trim()) {
      onSelectContactTime(`Custom Slot: ${customTime.trim()}`);
    }
  };

  return (
    <div className="bg-[#FBF6EE] rounded-3xl p-5 sm:p-6 border border-[#B8935A]/30 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F3329]/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#B8935A]">
            <Sparkles size={15} />
            <span>Check Studio Availability</span>
          </div>
          <h4
            style={{ fontFamily: "var(--app-font-serif, serif)" }}
            className="text-xl sm:text-2xl font-bold text-[#1F3329] mt-1"
          >
            When Are You Free For A Consultation?
          </h4>
          <p className="text-xs text-[#5a4a40] mt-0.5">
            Select your preferred contact time window so Krishna can coordinate your booking details.
          </p>
        </div>

        {/* Operating Hours Pill */}
        <div className="bg-[#1F3329] text-[#FBF6EE] px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-md border border-[#B8935A]/40 shrink-0">
          <Clock size={16} className="text-[#B8935A]" />
          <div>
            <div className="font-bold text-[#B8935A]">Studio Hours</div>
            <div className="text-[11px] text-[#FBF6EE]/80">Mon–Sat: 7:00 AM – 8:00 PM</div>
          </div>
        </div>
      </div>

      {/* Blocked Date Warning Alert if date is marked unavailable in admin */}
      {isBlocked && (
        <div className="bg-amber-100 border border-amber-400 text-amber-900 p-4 rounded-2xl text-xs font-semibold flex items-start gap-3 shadow-sm">
          <AlertTriangle size={20} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950 text-sm">Date Status Notice for {eventDate}</div>
            <p className="mt-0.5 leading-relaxed">
              This date is currently marked as <strong>Fully Booked / Limited Availability</strong> in studio records. You can still calculate your quote and submit your request — Krishna will review your time slot or suggest nearby availability.
            </p>
          </div>
        </div>
      )}

      {/* Mock Schedule Indicator */}
      <div>
        <div className="text-xs font-bold text-[#1F3329] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#B8935A]" />
            Weekly Booking Calendar Overview
          </span>
          {eventDate && (
            <span className="text-[11px] text-[#B8935A] font-semibold">
              Selected Date: <strong>{eventDate}</strong>
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {MOCK_SCHEDULE.map((slot) => {
            const isPrime = slot.status === "Prime Bridal";
            const isPrivate = slot.status === "Private Event";
            const isLimited = slot.status === "Limited Slots";

            let badgeBg = "bg-[#1F3329]/5 text-[#1F3329] border-[#1F3329]/15";
            if (isPrime) badgeBg = "bg-[#B8935A]/15 text-[#8a6833] border-[#B8935A]/40";
            if (isPrivate) badgeBg = "bg-amber-100 text-amber-900 border-amber-300";
            if (isLimited) badgeBg = "bg-emerald-50 text-emerald-900 border-emerald-300";

            return (
              <div
                key={slot.day}
                className={`p-2.5 rounded-xl border text-center text-xs transition ${badgeBg}`}
              >
                <div className="font-extrabold text-[#1F3329]">{slot.day}</div>
                <div className="text-[10px] opacity-75 mt-0.5">{slot.hours}</div>
                <div className="text-[10px] font-semibold mt-1 flex items-center justify-center gap-1">
                  {slot.status === "Available" && <CheckCircle2 size={10} className="text-emerald-600" />}
                  {slot.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preset Contact Windows Selection */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1F3329]">
          Choose Preferred Contact Window <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIME_PRESETS.map((preset) => {
            const isSelected = !isCustomMode && selectedContactTime === preset.label;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.label)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ease-out flex flex-col justify-between ${
                  isSelected
                    ? "border-[#B8935A] bg-[#1F3329] text-[#FBF6EE] shadow-lg scale-[1.01]"
                    : "border-[#1F3329]/15 bg-white text-[#1F3329] hover:border-[#B8935A]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${isSelected ? "text-[#B8935A]" : "text-[#1F3329]"}`}>
                    {preset.label}
                  </span>
                  {isSelected && <CheckCircle2 size={18} className="text-[#B8935A]" />}
                </div>
                <div className={`text-xs font-semibold mt-1 ${isSelected ? "text-[#FBF6EE]" : "text-[#1F3329]/80"}`}>
                  {preset.timeRange}
                </div>
                <div className={`text-[11px] mt-1 ${isSelected ? "text-[#FBF6EE]/70" : "text-[#5a4a40]"}`}>
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Time Entry Option */}
      <div className="pt-2">
        {!isCustomMode ? (
          <button
            type="button"
            onClick={() => setIsCustomMode(true)}
            className="text-xs font-bold text-[#B8935A] hover:underline flex items-center gap-1.5"
          >
            <Clock size={14} />
            + Enter specific preferred time or notes instead
          </button>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-2 bg-white p-3.5 rounded-2xl border border-[#B8935A]/40">
            <label className="block text-xs font-semibold text-[#1F3329]">
              Specify Exact Preferred Date / Time:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Wednesday at 6:30 PM"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#1F3329]/20 outline-none focus:ring-2 focus:ring-[#B8935A]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1F3329] text-[#FBF6EE] text-xs font-bold rounded-xl hover:bg-[#B8935A] hover:text-[#1F3329] transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsCustomMode(false)}
                className="px-3 py-2 border border-[#1F3329]/20 text-[#1F3329] text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Selected Time Confirmation Badge */}
      {selectedContactTime && (
        <div className="bg-[#1F3329]/10 border border-[#B8935A]/40 p-3 rounded-2xl flex items-center justify-between text-xs text-[#1F3329]">
          <span className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={16} className="text-[#B8935A]" />
            Preferred Contact Window: <strong>{selectedContactTime}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
