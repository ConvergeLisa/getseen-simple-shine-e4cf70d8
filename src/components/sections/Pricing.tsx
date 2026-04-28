import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StaggerGroup, staggerChildVariants } from "./Reveal";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

const tiers = [
  {
    name: "Starter Website",
    price: "From R2,500",
    desc: "For small businesses that need a credible online presence fast.",
    features: ["1-3 pages", "Mobile-first build", "Contact + WhatsApp CTA"],
    featured: false,
  },
  {
    name: "Business Website",
    price: "From R5,500",
    desc: "For growing businesses that need stronger trust and clearer conversion.",
    features: ["4-6 pages", "Custom visual direction", "Local SEO setup"],
    featured: true,
  },
  {
    name: "Redesign + Lead Funnel",
    price: "From R8,500",
    desc: "For outdated websites that need a full visual and conversion reset.",
    features: ["Before/after concept", "Conversion funnel pages", "WhatsApp lead flow"],
    featured: false,
  },
];

export function Pricing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative bg-gradient-to-b from-slate-50 via-white to-stone-50 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_15%_85%,rgba(245,158,11,0.08),transparent_38%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Pricing teaser"
            title="Simple packages, tailored to your goals"
            description="Clear starting points for businesses that want to look premium and convert better."
          />
        </Reveal>
        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerChildVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8 transition-smooth",
                t.featured
                  ? "border-cyan-300/60 bg-slate-900 text-white shadow-2xl shadow-cyan-900/25 lg:-translate-y-4 lg:scale-[1.02]"
                  : "border-slate-200/90 bg-white text-slate-900 shadow-[0_10px_32px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(8,145,178,0.14)]",
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-300 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-glow">
                  Most selected
                </span>
              )}
              <div>
                <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                <p
                  className={cn("mt-2 text-sm", t.featured ? "text-slate-300" : "text-slate-600")}
                >
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
                        t.featured
                          ? "bg-white/18 text-white"
                          : "bg-cyan-300/20 text-cyan-700",
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
                className={cn(
                  "mt-10 w-full",
                  !t.featured &&
                    "border-slate-300 bg-slate-900 text-slate-100 hover:-translate-y-0.5 hover:bg-slate-800",
                )}
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("whatsapp_click", "whatsapp_lead");
                    trackServerEvent("whatsapp_click");
                  }}
                >
                  Ask for a quote
                </a>
              </Button>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
