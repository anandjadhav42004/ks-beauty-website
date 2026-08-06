export interface WhatsAppBookingData {
  quoteRef: string;
  clientName: string;
  serviceType: string;
  eventDate: string;
  preferredContactTime: string;
  grandTotal: string;
  studioPhone?: string;
}

export function generateWhatsAppMessageText(data: WhatsAppBookingData): string {
  return `Hi ${data.clientName}, your booking (Quote #${data.quoteRef}) for ${data.serviceType} on ${data.eventDate} is confirmed! Grand Total: ${data.grandTotal}. We'll contact you during your ${data.preferredContactTime}.`;
}

export function generateWhatsAppBookingUrl(data: WhatsAppBookingData): string {
  const phone = (data.studioPhone || "16476403439").replace(/[^0-9]/g, "");
  const text = generateWhatsAppMessageText(data);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
