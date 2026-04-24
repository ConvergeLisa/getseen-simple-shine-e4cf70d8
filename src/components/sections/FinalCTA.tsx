import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";

export function FinalCTA() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 text-center shadow-card sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Ready to get your business <span className="text-primary">seen</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Let's get your website live and working for you.
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild size="xl">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Start on WhatsApp
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
