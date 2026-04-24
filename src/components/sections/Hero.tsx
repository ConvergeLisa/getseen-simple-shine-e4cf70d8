import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-visibility.png";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-soft opacity-50" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-32 lg:pt-24">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Websites for small businesses
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Get Your Business{" "}
            <span className="text-primary">Seen</span> Online
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We build professional websites that help small businesses get noticed
            and get customers — fast.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild size="xl">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Message Us on WhatsApp
                <ArrowRight />
              </a>
            </Button>
            <p className="text-sm font-medium text-muted-foreground">
              No stress. No tech headaches.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background bg-primary"
                  style={{ opacity: 0.5 + i * 0.12 }}
                />
              ))}
            </div>
            <span>Trusted by small businesses across SA</span>
          </div>
        </div>

        <div className="relative animate-fade-in delay-200">
          <div className="absolute -inset-10 rounded-full bg-primary/5 blur-3xl" />
          <img
            src={heroImage}
            alt="Professional websites for small businesses shown on laptop and phone"
            width={1280}
            height={1024}
            className="relative mx-auto w-full max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
