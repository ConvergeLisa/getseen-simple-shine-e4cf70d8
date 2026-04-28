import { Smartphone, MessageCircle, Gauge, Building2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { StaggerGroup, staggerChildVariants } from "./Reveal";

const items = [
  { icon: Smartphone, label: "Mobile-first" },
  { icon: MessageCircle, label: "WhatsApp-ready" },
  { icon: Gauge, label: "Fast turnaround" },
  { icon: Building2, label: "Built for local businesses" },
];

export function TrustStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative -mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_72%,#f8f7f5_100%)] py-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/40 via-white/35 to-transparent" />
      <StaggerGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 py-5 sm:px-8 md:grid-cols-4 md:gap-6 md:py-7">
        {items.map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            variants={staggerChildVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -6,
                    boxShadow: "0 25px 70px rgba(0,0,0,0.08), 0 10px 40px rgba(0,255,200,0.12)",
                  }
            }
            className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/18 text-cyan-700 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-[#0b0f14] sm:text-base">{label}</span>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
