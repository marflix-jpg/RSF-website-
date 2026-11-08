import { Play, ArrowRight, Check, Mail, type LucideProps } from "lucide-react";

type P = { className?: string; size?: number };

// Lucide (web icon set) wrappers — stable names used across the app.
export function PlayIcon(p: LucideProps) {
  return <Play strokeWidth={2} {...p} />;
}
export function ArrowIcon(p: LucideProps) {
  return <ArrowRight size={18} strokeWidth={1.8} {...p} />;
}
export function CheckIcon(p: LucideProps) {
  return <Check size={16} strokeWidth={2.4} {...p} />;
}
export function MailIcon(p: LucideProps) {
  return <Mail size={18} strokeWidth={1.8} {...p} />;
}

// WhatsApp brand mark (Lucide has no brand icons).
export function WhatsAppIcon({ className, size = 19 }: P) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.73-.85-2-.95-.27-.1-.47-.15-.67.15-.2.3-.77.94-.94 1.14-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.73-.71 1.98-1.39.24-.68.24-1.26.17-1.39-.07-.12-.27-.2-.57-.35zM12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.76.46 3.42 1.27 4.86L2 22l5.27-1.38a9.93 9.93 0 0 0 4.75 1.21h.01c5.52 0 10-4.48 10-10S17.54 2 12.02 2z" />
    </svg>
  );
}
