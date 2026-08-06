import { sendInvoiceEmail, InvoiceData, formatCurrencyCAD, SendInvoiceResult } from './sendInvoiceEmail';
import { generateWhatsAppBookingUrl, generateWhatsAppMessageText } from './whatsapp';

export interface ConfirmBookingResult {
  emailSuccess: boolean;
  isLive: boolean;
  emailMessage: string;
  whatsappUrl: string;
  whatsappText: string;
}

export async function confirmBooking(data: InvoiceData): Promise<ConfirmBookingResult> {
  const formattedGrandTotal = formatCurrencyCAD(data.grandTotal);

  const whatsappData = {
    quoteRef: data.quoteRef,
    clientName: data.clientName,
    serviceType: data.serviceType,
    eventDate: data.eventDate,
    preferredContactTime: data.preferredContactTime,
    grandTotal: formattedGrandTotal,
  };

  const whatsappUrl = generateWhatsAppBookingUrl(whatsappData);
  const whatsappText = generateWhatsAppMessageText(whatsappData);

  // Trigger Email send and WhatsApp preparation in parallel
  const [emailResult] = await Promise.allSettled([
    sendInvoiceEmail(data),
  ]);

  let emailSuccess = false;
  let isLive = false;
  let emailMessage = "";

  if (emailResult.status === 'fulfilled') {
    emailSuccess = emailResult.value.success;
    isLive = emailResult.value.isLive;
    emailMessage = emailResult.value.message;
  } else {
    emailSuccess = false;
    isLive = true;
    emailMessage = "Email delivery service encountered an unexpected error.";
  }

  return {
    emailSuccess,
    isLive,
    emailMessage,
    whatsappUrl,
    whatsappText,
  };
}
