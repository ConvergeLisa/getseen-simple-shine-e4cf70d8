import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "R2,500",
    desc: "Perfect for getting online quickly.",
    features: ["1–3 pages", "Mobile-friendly", "Contact form"],
    featured: false,
  },
  {
    name: "Pro",
    price: "R5,000",
    desc: "For brands ready to stand out.",
    features: ["4–6 pages", "Custom design", "Basic SEO"],
    featured: true,
  },
  {
    name: "Premium",
    price: "R8,000+",
    desc: "Built for growing businesses.",
    features: ["Custom build", "Advanced features", "Integrations"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, honest pricing"
        description="Pick a package that fits. No hidden fees — ever."
      />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8 transition-smooth",
              t.featured
                ? "border-primary bg-foreground text-background shadow-glow lg:-translate-y-4 lg:scale-[1.02]"
                : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-card",
            )}
          >
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
                Most popular
              </span>
            )}
            <div>
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <p className={cn("mt-2 text-sm", t.featured ? "text-background/70" : "text-muted-foreground")}>
                {t.desc}
              </p>
            </div>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold tracking-tight">{t.price}</span>
            </div>
            <ul className="mt-8 flex-1 space-y-4">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      t.featured ? "bg-background/15 text-background" : "bg-primary-soft text-primary",
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={t.featured ? "hero" : "outline"}
              size="lg"
              className="mt-10 w-full"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Get {t.name}
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
