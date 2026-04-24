import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "./WhatsAppButton";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#portfolio", label: "Work" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
            <span className="text-sm font-bold">G</span>
          </span>
          GetSeen
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
        </Button>
      </div>
    </header>
  );
}
