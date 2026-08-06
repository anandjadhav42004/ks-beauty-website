import React, { useState, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  Calendar,
  Users,
  DollarSign,
  Search,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  getBookings,
  getBlockedDates,
  toggleBlockedDate,
  BookingRecord,
  BlockedDate,
} from '@/lib/availabilityStore';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [newBlockDate, setNewBlockDate] = useState<string>('');
  const [newBlockReason, setNewBlockReason] = useState<string>('Fully Booked');

  useEffect(() => {
    // Check session auth
    const saved = sessionStorage.getItem('rivaaz_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setBookings(getBookings());
    setBlockedDates(getBlockedDates());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'rivaaz2026' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('rivaaz_admin_auth', 'true');
      setAuthError('');
      loadData();
    } else {
      setAuthError('Incorrect passcode. Try rivaaz2026.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('rivaaz_admin_auth');
    setPasscode('');
  };

  const handleToggleBlock = (dateStr: string, reason?: string) => {
    const updated = toggleBlockedDate(dateStr, reason || 'Fully Booked');
    setBlockedDates(updated);
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate) return;
    const updated = toggleBlockedDate(newBlockDate, newBlockReason || 'Fully Booked');
    setBlockedDates(updated);
    setNewBlockDate('');
    setNewBlockReason('Fully Booked');
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.clientName.toLowerCase().includes(q) ||
      b.quoteRef.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      b.eventDate.includes(q)
    );
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.grandTotal || 0), 0);

  const formatCAD = (val: number) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(val);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1F3329] text-[#FBF6EE] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#243d31] p-8 rounded-3xl border-2 border-[#B8935A]/50 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center mx-auto shadow-lg">
              <ShieldCheck size={32} />
            </div>
            <h1
              style={{ fontFamily: 'var(--app-font-serif, serif)' }}
              className="text-2xl sm:text-3xl font-bold text-[#FBF6EE]"
            >
              Owner Admin Portal
            </h1>
            <p className="text-xs text-[#FBF6EE]/75">
              Enter studio passcode to manage bookings &amp; availability.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B8935A] mb-1">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. rivaaz2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#1F3329] border border-[#B8935A]/40 text-[#FBF6EE] outline-none focus:ring-2 focus:ring-[#B8935A] text-sm"
                />
                <Lock className="absolute right-4 top-3.5 text-[#B8935A]/60" size={18} />
              </div>
              {authError && (
                <p className="text-xs text-red-400 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle size={13} /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#B8935A] via-[#d4af72] to-[#B8935A] text-[#1F3329] font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#B8935A]/20">
            <a
              href="/"
              className="text-xs text-[#B8935A] hover:underline flex items-center justify-center gap-1 font-semibold"
            >
              <ArrowLeft size={14} /> Back to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] text-[#1F3329]">
      {/* Admin Top Navigation */}
      <header className="bg-[#1F3329] text-[#FBF6EE] border-b border-[#B8935A]/40 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#B8935A] text-[#1F3329] flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <div>
            <h2
              style={{ fontFamily: 'var(--app-font-serif, serif)' }}
              className="text-xl font-bold text-[#FBF6EE] leading-none"
            >
              Rivaaz Glam Studio — Owner Admin
            </h2>
            <p className="text-[11px] text-[#B8935A] font-medium mt-0.5">
              Live Availability &amp; Booking Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="px-4 py-2 rounded-xl border border-[#B8935A]/40 text-[#FBF6EE] text-xs font-bold flex items-center gap-1.5 hover:bg-[#B8935A]/10 transition"
          >
            <ArrowLeft size={14} /> Website View
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-900/40 text-red-200 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 hover:bg-red-900/60 transition"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1F3329]/10 text-[#1F3329] flex items-center justify-center font-bold">
              <Users size={24} className="text-[#B8935A]" />
            </div>
            <div>
              <div className="text-xs text-[#5a4a40] uppercase tracking-wider font-bold">Total Bookings</div>
              <div
                style={{ fontFamily: 'var(--app-font-serif, serif)' }}
                className="text-2xl sm:text-3xl font-extrabold text-[#1F3329]"
              >
                {bookings.length}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1F3329]/10 text-[#1F3329] flex items-center justify-center font-bold">
              <DollarSign size={24} className="text-[#B8935A]" />
            </div>
            <div>
              <div className="text-xs text-[#5a4a40] uppercase tracking-wider font-bold">Calculated Revenue</div>
              <div
                style={{ fontFamily: 'var(--app-font-serif, serif)' }}
                className="text-2xl sm:text-3xl font-extrabold text-[#B8935A]"
              >
                {formatCAD(totalRevenue)}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#B8935A]/30 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1F3329]/10 text-[#1F3329] flex items-center justify-center font-bold">
              <Calendar size={24} className="text-[#B8935A]" />
            </div>
            <div>
              <div className="text-xs text-[#5a4a40] uppercase tracking-wider font-bold">Blocked Dates</div>
              <div
                style={{ fontFamily: 'var(--app-font-serif, serif)' }}
                className="text-2xl sm:text-3xl font-extrabold text-[#1F3329]"
              >
                {blockedDates.length}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Availability & Date Blockout Manager */}
        <section className="bg-white p-6 rounded-3xl border border-[#B8935A]/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F3329]/10 pb-4">
            <div>
              <h3
                style={{ fontFamily: 'var(--app-font-serif, serif)' }}
                className="text-xl sm:text-2xl font-bold text-[#1F3329] flex items-center gap-2"
              >
                <Calendar className="text-[#B8935A]" size={22} />
                Manage Studio Date Availability
              </h3>
              <p className="text-xs text-[#5a4a40] mt-0.5">
                Block out dates when the studio is fully booked or unavailable. Changes immediately sync to the booking calculator.
              </p>
            </div>
          </div>

          {/* Quick Date Block Form */}
          <form onSubmit={handleAddBlock} className="bg-[#FBF6EE] p-4 rounded-2xl border border-[#B8935A]/30 flex flex-col sm:flex-row items-end gap-3">
            <div className="w-full sm:w-1/3">
              <label className="block text-xs font-bold text-[#1F3329] uppercase tracking-wider mb-1">
                Select Date To Block
              </label>
              <input
                type="date"
                required
                value={newBlockDate}
                onChange={(e) => setNewBlockDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1F3329]/20 bg-white text-xs font-semibold text-[#1F3329] outline-none focus:ring-2 focus:ring-[#B8935A]"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-bold text-[#1F3329] uppercase tracking-wider mb-1">
                Blockout Reason / Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Fully Booked — Bridal Event"
                value={newBlockReason}
                onChange={(e) => setNewBlockReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#1F3329]/20 bg-white text-xs font-semibold text-[#1F3329] outline-none focus:ring-2 focus:ring-[#B8935A]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1F3329] text-[#FBF6EE] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#B8935A] hover:text-[#1F3329] transition shrink-0"
            >
              <Plus size={16} /> Block Date
            </button>
          </form>

          {/* Currently Blocked Dates Feed */}
          <div>
            <div className="text-xs font-bold text-[#1F3329] uppercase tracking-wider mb-3">
              Currently Blocked Dates ({blockedDates.length})
            </div>
            {blockedDates.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
                No dates blocked yet. All dates are currently open for client bookings.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {blockedDates.map((item) => (
                  <div
                    key={item.date}
                    className="p-3.5 rounded-2xl border border-amber-300 bg-amber-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                        <Calendar size={14} className="text-amber-700" />
                        {item.date}
                      </div>
                      <div className="text-[11px] text-amber-800 font-medium mt-0.5">
                        {item.reason || 'Fully Booked'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleBlock(item.date)}
                      className="p-2 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 transition"
                      title="Unblock date"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Bookings Feed Table */}
        <section className="bg-white p-6 rounded-3xl border border-[#B8935A]/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F3329]/10 pb-4">
            <div>
              <h3
                style={{ fontFamily: 'var(--app-font-serif, serif)' }}
                className="text-xl sm:text-2xl font-bold text-[#1F3329] flex items-center gap-2"
              >
                <Users className="text-[#B8935A]" size={22} />
                Client Bookings &amp; Quote Enquiries
              </h3>
              <p className="text-xs text-[#5a4a40] mt-0.5">
                Full list of submitted client quotes, contact windows, and total breakdowns.
              </p>
            </div>

            {/* Search filter */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Search by name, ref, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#1F3329]/20 text-xs text-[#1F3329] outline-none focus:ring-2 focus:ring-[#B8935A]"
              />
              <Search className="absolute left-3 top-2.5 text-[#1F3329]/40" size={14} />
            </div>
          </div>

          {/* Table / Responsive Card List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#5a4a40]">
              No bookings match your search query.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#1F3329]/10 text-[#1F3329] uppercase tracking-wider font-extrabold bg-[#FBF6EE]/60">
                    <th className="py-3 px-3">Quote Ref</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Event Date &amp; Time</th>
                    <th className="py-3 px-3">Service &amp; Region</th>
                    <th className="py-3 px-3">Tier</th>
                    <th className="py-3 px-3">Preferred Window</th>
                    <th className="py-3 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F3329]/10">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FBF6EE]/40 transition">
                      <td className="py-3 px-3 font-bold text-[#B8935A] font-mono">{b.quoteRef}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#1F3329]">{b.clientName}</div>
                        <div className="text-[11px] text-[#5a4a40] flex items-center gap-2 mt-0.5">
                          <a href={`mailto:${b.email}`} className="flex items-center gap-1 hover:underline text-blue-700">
                            <Mail size={11} /> {b.email}
                          </a>
                          <a href={`tel:${b.phone}`} className="flex items-center gap-1 hover:underline text-emerald-700 font-semibold">
                            <Phone size={11} /> {b.phone}
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-medium">
                        <div className="font-semibold text-[#1F3329]">{b.eventDate}</div>
                        <div className="text-[11px] text-[#5a4a40]">Finish: {b.finishTime}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#1F3329]">{b.serviceType}</div>
                        <div className="text-[11px] text-[#5a4a40]">{b.region}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#8a6833]">{b.selectedTier}</td>
                      <td className="py-3 px-3">
                        <span className="bg-[#1F3329]/10 text-[#1F3329] px-2.5 py-1 rounded-full text-[11px] font-semibold">
                          {b.preferredContactTime}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-extrabold text-[#1F3329]">
                        {formatCAD(b.grandTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
