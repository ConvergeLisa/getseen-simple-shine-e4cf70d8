import { MessageCircle } from "lucide-react";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

export const WHATSAPP_LINK = "https://wa.me/27718964644?text=Hi%20I%20want%20a%20website";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => {
        trackEvent("whatsapp_click", "whatsapp_lead");
        trackServerEvent("whatsapp_click");
      }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.65_0.16_148)] text-white shadow-glow transition-smooth hover:scale-110 hover:bg-[oklch(0.6_0.16_148)] sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.65_0.16_148)] opacity-30" />
      <MessageCircle className="relative h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
    </a>
  );
}
