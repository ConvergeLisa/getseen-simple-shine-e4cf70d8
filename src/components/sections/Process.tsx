import { motion, useReducedMotion } from "framer-motion";
import { StaggerGroup, staggerChildVariants } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "We review your current online presence",
    desc: "We audit your current website, messaging, and trust signals to identify quick wins.",
  },
  {
    n: "02",
    title: "We build a free concept",
    desc: "You get a high-impact visual concept tailored to your business and customer journey.",
  },
  {
    n: "03",
    title: "You approve the direction",
    desc: "We align on your preferred style, layout, and offer positioning before final build.",
  },
  {
    n: "04",
    title: "We launch your site",
    desc: "Your new website goes live fast, optimized for mobile and lead conversion.",
  },
];

export function Process() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="process" className="bg-slate-900 py-24 text-background lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Process</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Clear steps. Fast execution.
          </h2>
        </div>
        <StaggerGroup className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={staggerChildVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm md:text-left"
            >
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-emerald-400 font-display text-lg font-bold text-slate-950 shadow-lg shadow-cyan-700/40 md:mx-0">
                {s.n}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
