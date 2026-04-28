import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="premium-noise bg-slate-950 px-5 pb-24 sm:px-8 lg:pb-32">
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/85 to-slate-900/60 px-6 py-16 text-center shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:px-12 sm:py-24"
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 bg-gradient-to-b from-lime-200/10 to-transparent blur-2xl" />
        <div className="relative">
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Want to see what your business could look like online?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300 sm:text-xl">
            We will map your current site, design a better direction, and show you a concept focused
            on trust, visibility, and lead generation.
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="hero" size="xl">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("whatsapp_click", "whatsapp_lead");
                  trackServerEvent("generate_lead");
                }}
              >
                Request a free concept
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
