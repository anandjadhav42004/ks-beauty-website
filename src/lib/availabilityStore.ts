export interface BookingRecord {
  id: string;
  quoteRef: string;
  clientName: string;
  email: string;
  phone: string;
  eventDate: string;
  finishTime: string;
  preferredContactTime: string;
  serviceType: string;
  region: string;
  selectedTier: string;
  nextAction: string;
  grandTotal: number;
  createdAt: string;
  status: 'Confirmed' | 'Pending Call' | 'Completed';
}

export interface BlockedDate {
  date: string; // YYYY-MM-DD or readable string
  reason?: string;
}

const BOOKINGS_KEY = 'rivaaz_glam_bookings_v1';
const BLOCKED_DATES_KEY = 'rivaaz_glam_blocked_dates_v1';

// Initial sample data for realistic admin dashboard preview
const SAMPLE_BOOKINGS: BookingRecord[] = [
  {
    id: 'b1',
    quoteRef: 'KS-849201',
    clientName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+1 (647) 555-0192',
    eventDate: '2026-08-15',
    finishTime: '11:00 AM',
    preferredContactTime: '🌅 Morning Window (7:00 AM – 11:00 AM)',
    serviceType: 'Bridal',
    region: 'GTA (Greater Toronto Area)',
    selectedTier: 'Lead Artist (Founder)',
    nextAction: 'Book this package',
    grandTotal: 536.75,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
  },
  {
    id: 'b2',
    quoteRef: 'KS-392019',
    clientName: 'Ananya Patel',
    email: 'ananya.p@example.com',
    phone: '+1 (416) 555-0144',
    eventDate: '2026-08-22',
    finishTime: '12:30 PM',
    preferredContactTime: '☀️ Afternoon Window (12:00 PM – 4:00 PM)',
    serviceType: 'Semi-Bridal',
    region: 'Durham Region',
    selectedTier: 'Senior Artist',
    nextAction: 'Request a call',
    grandTotal: 327.70,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'Pending Call',
  },
];

const SAMPLE_BLOCKED_DATES: BlockedDate[] = [
  { date: '2026-08-15', reason: 'Fully Booked — Bridal Party Event' },
  { date: '2026-08-29', reason: 'Private Destination Wedding' },
];

export function getBookings(): BookingRecord[] {
  if (typeof window === 'undefined') return SAMPLE_BOOKINGS;
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    if (!data) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(SAMPLE_BOOKINGS));
      return SAMPLE_BOOKINGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.warn('Failed to load bookings from localStorage', err);
    return SAMPLE_BOOKINGS;
  }
}

export function saveBooking(booking: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>): BookingRecord {
  const existing = getBookings();
  const newBooking: BookingRecord = {
    ...booking,
    id: `b_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
  };
  const updated = [newBooking, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  }
  return newBooking;
}

export function getBlockedDates(): BlockedDate[] {
  if (typeof window === 'undefined') return SAMPLE_BLOCKED_DATES;
  try {
    const data = localStorage.getItem(BLOCKED_DATES_KEY);
    if (!data) {
      localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(SAMPLE_BLOCKED_DATES));
      return SAMPLE_BLOCKED_DATES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.warn('Failed to load blocked dates from localStorage', err);
    return SAMPLE_BLOCKED_DATES;
  }
}

export function toggleBlockedDate(dateStr: string, reason: string = 'Fully Booked'): BlockedDate[] {
  const current = getBlockedDates();
  const exists = current.some((b) => b.date === dateStr);
  let updated: BlockedDate[];
  if (exists) {
    updated = current.filter((b) => b.date !== dateStr);
  } else {
    updated = [...current, { date: dateStr, reason }];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(BLOCKED_DATES_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function isDateBlocked(dateStr: string): boolean {
  if (!dateStr) return false;
  const current = getBlockedDates();
  return current.some((b) => b.date === dateStr);
}
