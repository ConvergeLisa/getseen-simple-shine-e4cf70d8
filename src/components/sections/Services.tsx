import { Palette, Hammer, Rocket } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    icon: Palette,
    title: "Website Design",
    desc: "Clean, modern designs that represent your brand.",
  },
  {
    icon: Hammer,
    title: "Website Build",
    desc: "We handle everything from start to finish.",
  },
  {
    icon: Rocket,
    title: "Website Launch",
    desc: "Your site goes live, ready for customers.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeader
        eyebrow="What we do"
        title="Everything you need, done for you"
        description="From concept to launch — we cover the whole journey so you don't have to."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-soft opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
