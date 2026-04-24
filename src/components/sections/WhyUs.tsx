import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const bullets = [
  "Done-for-you service",
  "Fast delivery",
  "Simple process",
  "Results-focused",
];

export function WhyUs() {
  return (
    <section id="why" className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Why GetSeen"
              title="You run the business. We handle the website."
              align="left"
              description="You don't need to figure out websites, hosting, or tech. We take care of everything so you can focus on running your business."
            />
          </div>
          <ul className="grid gap-4">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:border-primary/30"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-base font-semibold">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
