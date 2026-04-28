import { motion, useReducedMotion } from "framer-motion";

export function SpotlightBrand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="premium-noise relative overflow-hidden bg-black py-26 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.11),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.11),transparent_35%),radial-gradient(circle_at_50%_95%,rgba(34,211,238,0.16),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.42)_100%)]" />

      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-[45%] right-[-42%] h-[245%] w-[92%] rotate-[-24deg]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.30) 44%, rgba(34,211,238,0.38) 62%, rgba(255,255,255,0) 100%)",
              clipPath: "polygon(44% 0%, 78% 0%, 58% 100%, 24% 100%)",
            }}
            animate={{ x: ["56%", "-70%"], opacity: [0.16, 0.42, 0.16] }}
            transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-[45%] right-[-42%] h-[245%] w-[92%] rotate-[-24deg] blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.44) 0%, rgba(34,211,238,0.28) 28%, rgba(34,211,238,0.06) 58%, rgba(255,255,255,0) 78%)",
              clipPath: "polygon(44% 0%, 78% 0%, 58% 100%, 24% 100%)",
            }}
            animate={{ x: ["56%", "-70%"], opacity: [0.08, 0.38, 0.08] }}
            transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.12 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-[40%] right-[-42%] h-[230%] w-[90%] rotate-[-24deg] opacity-40"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0) 6px)",
              clipPath: "polygon(44% 0%, 78% 0%, 58% 100%, 24% 100%)",
              maskImage: "linear-gradient(to bottom, transparent 8%, black 30%, black 70%, transparent 96%)",
            }}
            animate={{ x: ["56%", "-70%"], opacity: [0.04, 0.16, 0.04] }}
            transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.16 }}
          />
        </>
      )}

      <div className="pointer-events-none absolute inset-x-[8%] bottom-2 h-28 rounded-[50%] bg-cyan-300/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-950/70" />
      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <motion.h2
          className="font-display text-5xl font-extrabold tracking-[-0.05em] text-white drop-shadow-[0_12px_26px_rgba(0,0,0,0.72)] sm:text-7xl lg:text-8xl"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  filter: [
                    "brightness(0.9) contrast(1)",
                    "brightness(1.08) contrast(1.1)",
                    "brightness(0.9) contrast(1)",
                  ],
                }
          }
          transition={prefersReducedMotion ? undefined : { duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          GET{" "}
          <motion.span
            className="text-cyan-300"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    textShadow: [
                      "0 0 14px rgba(34,211,238,0.34)",
                      "0 0 42px rgba(34,211,238,0.82)",
                      "0 0 14px rgba(34,211,238,0.34)",
                    ],
                  }
            }
            transition={prefersReducedMotion ? undefined : { duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            SEEN
          </motion.span>
        </motion.h2>
        <p className="mt-4 text-sm font-semibold tracking-[0.26em] text-white/80 sm:text-base">
          WEBSITES THAT GET YOU SEEN
        </p>
      </div>
    </section>
  );
}
