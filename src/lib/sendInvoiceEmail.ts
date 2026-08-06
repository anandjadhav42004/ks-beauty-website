import emailjs from '@emailjs/browser';

export interface BreakdownItem {
  label: string;
  qty: number;
  total: number;
}

export interface InvoiceData {
  quoteRef: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  finishTime: string;
  preferredContactTime: string;
  region: string;
  serviceType: string;
  selectedTier: string;
  nextAction: string;
  breakdownItems: BreakdownItem[];
  travelFee: number;
  subtotal: number;
  hstTax: number;
  grandTotal: number;
}

export interface SendInvoiceResult {
  success: boolean;
  isLive: boolean;
  message: string;
}

export function formatCurrencyCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function sendInvoiceEmail(data: InvoiceData): Promise<SendInvoiceResult> {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
  const CLIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID || "YOUR_CLIENT_TEMPLATE_ID";
  const OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || "YOUR_OWNER_TEMPLATE_ID";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
  const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "rivaaz.glam@gmail.com";

  const isConfigured =
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
    CLIENT_TEMPLATE_ID !== "YOUR_CLIENT_TEMPLATE_ID" &&
    PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

  // Build itemized invoice summary string
  const itemizedText = data.breakdownItems
    .map((item) => `• ${item.label} (Qty: ${item.qty}) — ${formatCurrencyCAD(item.total)}`)
    .join("\n");

  const formattedTravel = formatCurrencyCAD(data.travelFee);
  const formattedSubtotal = formatCurrencyCAD(data.subtotal);
  const formattedTax = formatCurrencyCAD(data.hstTax);
  const formattedGrandTotal = formatCurrencyCAD(data.grandTotal);

  const payload = {
    subject: `Your Booking is Confirmed! Quote #${data.quoteRef} — Rivaaz Glam Studio`,
    heading: "Your Slot is Booked!",
    quote_ref: data.quoteRef,
    client_name: data.clientName,
    to_email: data.clientEmail,
    to_phone: data.clientPhone,
    event_date: data.eventDate,
    finish_time: data.finishTime,
    preferred_contact_time: data.preferredContactTime || "Anytime (Mon-Sat, 7 AM - 8 PM)",
    contact_notice: `The studio will reach out during your preferred contact window (${data.preferredContactTime || "Mon-Sat, 7 AM - 8 PM"}).`,
    region: data.region,
    service_type: data.serviceType,
    selected_tier: data.selectedTier,
    next_action: data.nextAction,
    itemized_details: itemizedText,
    travel_fee: formattedTravel,
    subtotal: formattedSubtotal,
    hst_tax: `${formattedTax} (13% HST)`,
    grand_total: formattedGrandTotal,
    owner_email: OWNER_EMAIL,
  };

  if (!isConfigured) {
    console.log("[INVOICE EMAIL PREVIEW MODE]", payload);
    return {
      success: false,
      isLive: false,
      message: "Preview Mode: Real EmailJS keys not configured in .env file.",
    };
  }

  try {
    // 1. Send client email invoice
    await emailjs.send(EMAILJS_SERVICE_ID, CLIENT_TEMPLATE_ID, payload, PUBLIC_KEY);
    
    // 2. Send owner notification copy
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      OWNER_TEMPLATE_ID,
      payload,
      PUBLIC_KEY
    );

    return {
      success: true,
      isLive: true,
      message: `Live invoice #${data.quoteRef} sent to ${data.clientEmail} & owner inbox.`,
    };
  } catch (err: any) {
    console.error("Live EmailJS delivery error:", err);
    const errorDetails = err?.text || err?.message || JSON.stringify(err);
    return {
      success: false,
      isLive: true,
      message: `EmailJS API Error: ${errorDetails}`,
    };
  }
}
