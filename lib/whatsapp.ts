import { whatsapp } from "@/lib/content";

/** WhatsApp deep link — opens the app on mobile, WhatsApp Web on desktop. */
export function waLink(message?: string): string {
  const number = whatsapp.number.replace(/\D/g, "");
  const text = encodeURIComponent(message ?? whatsapp.defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}
