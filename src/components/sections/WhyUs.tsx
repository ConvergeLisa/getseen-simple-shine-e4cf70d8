import { ArrowRight, AlertTriangle, BadgeCheck, MessageCircle, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function WhyUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="why" className="bg-slate-950 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12">
            <SectionHeader
              eyebrow="Before / After"
              title="From outdated to conversion-ready"
              description="We redesign weak websites into modern lead engines that make your business look credible from the first second."
              inverted
            />
          </div>
        </Reveal>
        <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <motion.div
            className="relative rounded-3xl border border-red-200/15 bg-gradient-to-b from-slate-900/85 to-slate-900/70 p-7 backdrop-blur-sm"
            whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -0.4 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-red-400/10 to-transparent opacity-70" />
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-100">
              <AlertTriangle className="h-3.5 w-3.5" /> Before
            </div>
            <h3 className="font-display text-2xl font-bold text-white/90">Outdated, unclear, no CTA</h3>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="h-[6.5rem] rounded-lg border border-white/8 bg-slate-900/90 p-3">
                <div className="h-3 w-2/3 rounded bg-slate-500/40" />
                <div className="mt-2 h-2 w-1/2 rounded bg-slate-500/30" />
                <div className="mt-3 h-7 w-full rounded bg-slate-800/80" />
                <div className="mt-2 h-7 w-full rounded bg-slate-800/80" />
              </div>
              <div className="mt-3 rounded-lg border border-slate-500/30 bg-slate-800/80 px-3 py-2 text-xs text-slate-300">
                No obvious offer or action button
              </div>
            </div>
          </motion.div>

          <div className="relative hidden items-center justify-center lg:flex">
            <motion.div
              className="h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300/20 via-cyan-300/90 to-emerald-300/20"
              animate={prefersReducedMotion ? undefined : { opacity: [0.4, 1, 0.4], scaleX: [0.9, 1.1, 0.9] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.span
              className="absolute rounded-full border border-cyan-300/30 bg-cyan-300/10 p-3 text-cyan-200"
              animate={prefersReducedMotion ? undefined : { x: [-8, 8, -8] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </div>

          <motion.div
            className="group relative rounded-3xl border border-emerald-200/25 bg-gradient-to-b from-slate-900/85 to-emerald-950/30 p-7 backdrop-blur-sm"
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -6,
                    rotate: -0.4,
                    boxShadow: "0 18px 38px rgba(16,185,129,0.24)",
                  }
            }
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-300/14 to-transparent opacity-80" />
            <div className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-cyan-200/14 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-100">
              <BadgeCheck className="h-3.5 w-3.5" /> After
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Modern, trusted, conversion-ready</h3>
            <div className="mt-5 rounded-2xl border border-white/14 bg-black/25 p-4">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="h-[6.5rem] rounded-lg border border-white/10 bg-slate-900/90 p-3">
                <div className="h-3 w-2/3 rounded bg-cyan-300/70" />
                <div className="mt-2 h-2 w-1/2 rounded bg-white/30" />
                <div className="mt-3 h-7 w-full rounded bg-cyan-400/20" />
                <div className="mt-2 h-7 w-3/4 rounded bg-emerald-400/20" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold">
                <span className="rounded-lg border border-cyan-200/30 bg-cyan-300/16 px-3 py-2 text-center text-cyan-100">
                  Book Now CTA
                </span>
                <span className="flex items-center justify-center gap-1 rounded-lg border border-emerald-200/30 bg-emerald-400/15 px-3 py-2 text-emerald-100">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-semibold text-amber-100">
                <Star className="h-3 w-3 text-amber-200" /> 4.9 Rating badge
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
