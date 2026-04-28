import { SectionHeader } from "./SectionHeader";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StaggerGroup, staggerChildVariants } from "./Reveal";
import { Dumbbell, Scissors, Wrench } from "lucide-react";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1400&q=80",
    title: "Plumbing Service Redesign",
    tag: "More booked callouts",
    icon: Wrench,
  },
  {
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80",
    title: "Beauty Salon Website Refresh",
    tag: "Premium booking-ready feel",
    icon: Scissors,
  },
  {
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80",
    title: "Fitness Trainer Lead Site",
    tag: "More DMs and consult calls",
    icon: Dumbbell,
  },
];

export function Portfolio() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal>
        <SectionHeader
          eyebrow="Work / Proof"
          title="See what your business could look like"
          description="Real-world redesign directions for plumbers, beauty salons, and fitness trainers."
          inverted
        />
      </Reveal>
      <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={staggerChildVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { y: -6, rotate: -0.5, boxShadow: "0 20px 40px rgba(34,211,238,0.16)" }
            }
            className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-soft backdrop-blur-sm"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-900 p-3">
              <div className="relative h-full overflow-hidden rounded-[1.2rem] border border-white/15 bg-slate-950 p-2">
                <div className="mb-2 flex items-center gap-1.5 px-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="relative h-[calc(100%-1.2rem)] overflow-hidden rounded-lg">
                  <img
                    src={p.img}
                    alt={`${p.title} redesign example`}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-2">
                <p.icon className="h-4 w-4 text-cyan-200" />
                <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
              </div>
              <span className="rounded-full bg-cyan-300/20 px-3 py-1 text-xs font-semibold text-cyan-100">
                {p.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
