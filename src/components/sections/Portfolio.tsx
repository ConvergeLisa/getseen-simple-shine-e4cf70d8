import { SectionHeader } from "./SectionHeader";
import salon from "@/assets/portfolio-salon.png";
import fitness from "@/assets/portfolio-fitness.jpg";
import business from "@/assets/portfolio-business.png";

const projects = [
  { img: salon, title: "Beauty Salon", tag: "Booking-ready" },
  { img: fitness, title: "Fitness Coach", tag: "Lead generation" },
  { img: business, title: "Small Business", tag: "Brand showcase" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeader
        eyebrow="Recent work"
        title="Sites we've launched"
        description="A glimpse of what your business website could look like."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.title}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.img}
                alt={`${p.title} website mockup`}
                width={1024}
                height={768}
                loading="lazy"
                className="h-full w-full object-cover transition-smooth group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-6">
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
