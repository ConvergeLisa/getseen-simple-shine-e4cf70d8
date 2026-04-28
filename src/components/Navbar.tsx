import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "./WhatsAppButton";
import logo from "@/assets/getseen-logo-transparent.png";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/78 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white"
        >
          <img
            src={logo}
            alt="GetSeen logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          GetSeen
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-200/80 transition-colors hover:text-cyan-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("whatsapp_click", "whatsapp_lead");
              trackServerEvent("generate_lead");
            }}
          >
            See your website concept
          </a>
        </Button>
      </div>
    </header>
  );
}
