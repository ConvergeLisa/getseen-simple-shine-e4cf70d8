import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { WHATSAPP_LINK } from "@/components/WhatsAppButton";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { trackEvent, trackServerEvent } from "@/lib/analytics";

const proofChips = [
  { label: "4.9 rating · 128 reviews", icon: Star, subtle: false, delay: 0.22 },
  { label: "Built to increase enquiries", subtle: true, delay: 0.34 },
];

const headlineWords = ["Websites", "that", "get", "local", "businesses", "seen."];
const mockupExamples = [
  {
    id: "plumbing",
    image: "/plumber.png",
    title: "Plumbing Service Website",
    subtitle: "Fast response. Trusted local team.",
    pills: ["Leak repairs", "Drain cleaning", "Emergency callouts"],
  },
  {
    id: "beauty",
    image: "/beautysalon.png",
    title: "Beauty Salon Website",
    subtitle: "More bookings. More local clients.",
    pills: ["Facials", "Hair styling", "Bookings"],
  },
  {
    id: "fitness",
    image: "/PT.png",
    title: "Personal Trainer Website",
    subtitle: "More leads. More bookings.",
    pills: ["Training plans", "Results", "Consultations"],
  },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [mockupIndex, setMockupIndex] = useState(0);
  const currentMockup = mockupExamples[mockupIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setMockupIndex((prev) => (prev + 1) % mockupExamples.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      className="premium-noise relative overflow-hidden bg-slate-950 pb-20 pt-14 sm:pt-20 lg:pb-28"
    >
      <img
        src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2000&q=80"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-24"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/76 to-slate-950/86" />
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.10),transparent_36%),radial-gradient(circle_at_82%_70%,rgba(132,204,22,0.08),transparent_34%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]"
        animate={
          prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.42, 0.58, 0.42] }
        }
        transition={
          prefersReducedMotion ? undefined : { duration: 10, repeat: Number.POSITIVE_INFINITY }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[-6rem] h-80 w-80 rounded-full bg-emerald-400/20 blur-[100px]"
        animate={prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, -18, 0] }}
        transition={
          prefersReducedMotion ? undefined : { duration: 12, repeat: Number.POSITIVE_INFINITY }
        }
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-100 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Trusted by local businesses across South Africa
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-2 top-[6.5rem] h-24 w-[28rem] rotate-[-6deg] rounded-full bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent blur-2xl"
            animate={
              prefersReducedMotion ? undefined : { x: [-80, 240, -80], opacity: [0, 0.7, 0] }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            }
          />
          <motion.h1
            className="relative mt-6 max-w-2xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl"
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "show"}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {headlineWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className={
                  word === "seen." ? "mr-3 inline-block text-gradient" : "mr-3 inline-block"
                }
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200/85 sm:text-xl">
            More visibility. More trust. More customers.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 rgba(34,211,238,0.18)",
                        "0 0 24px rgba(34,211,238,0.45)",
                        "0 0 0 rgba(34,211,238,0.18)",
                      ],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 2.6, repeat: Number.POSITIVE_INFINITY }
              }
              className="rounded-full"
            >
              <Button asChild variant="hero" size="xl" className="border border-cyan-300/30">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("whatsapp_click", "whatsapp_lead");
                    trackServerEvent("generate_lead");
                  }}
                >
                  See your website concept
                  <ArrowRight />
                </a>
              </Button>
            </motion.div>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              <a href="#portfolio">See what we build</a>
            </Button>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
            Mobile-first, conversion-focused, and built to win local trust
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_25%_30%,rgba(34,211,238,0.20),transparent_48%),radial-gradient(circle_at_70%_80%,rgba(132,204,22,0.16),transparent_44%)] blur-2xl" />
            <motion.div
              initial={prefersReducedMotion ? undefined : { x: 16, opacity: 0.9 }}
              animate={
                prefersReducedMotion ? undefined : { x: [16, 6, 16], y: [0, -8, 0], opacity: 1 }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }
              className="relative rounded-3xl border border-cyan-200/20 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl"
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
            >
              <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                {proofChips.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <motion.div
                      key={chip.label}
                      className={`inline-flex items-center rounded-full px-2.5 py-1.5 text-[11px] font-medium backdrop-blur-md ${
                        chip.subtle
                          ? "border border-white/10 bg-slate-900/60 text-slate-200/90 shadow-md shadow-cyan-950/10"
                          : "border border-white/14 bg-slate-900/76 text-slate-100 shadow-lg shadow-cyan-950/20"
                      }`}
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 0.95, y: 0 }}
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 0.35, delay: chip.delay, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      {Icon && (
                        <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200">
                          <Icon className="h-2.5 w-2.5" />
                        </span>
                      )}
                      {chip.label}
                    </motion.div>
                  );
                })}
              </div>
              <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                  <div className="relative overflow-hidden rounded-xl border border-white/10">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentMockup.id}
                        src={currentMockup.image}
                        alt={`${currentMockup.title} example preview`}
                        className="h-[14.5rem] w-full object-cover sm:h-72"
                        loading="lazy"
                        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                        transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/62 via-slate-950/24 to-slate-950/20" />
                    <div className="absolute inset-x-3 top-3 rounded-xl border border-white/14 bg-slate-950/58 p-3 backdrop-blur-sm">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentMockup.id}
                          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                          transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
                        >
                          <p className="text-sm font-semibold text-white sm:text-base">{currentMockup.title}</p>
                          <p className="mt-1 text-[11px] text-slate-300 sm:text-xs">
                            {currentMockup.subtitle}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                      <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px] font-medium text-slate-200 sm:text-[11px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${currentMockup.id}-pills`}
                            className="col-span-3 grid grid-cols-3 gap-1.5"
                            initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                            transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
                          >
                            {currentMockup.pills.map((pill) => (
                              <span
                                key={pill}
                                className="rounded-md border border-white/12 bg-white/[0.08] px-2 py-1 text-center"
                              >
                                {pill}
                              </span>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm">
                  <p className="flex items-center gap-2 text-slate-200">
                    <Sparkles className="h-4 w-4 text-cyan-200" />
                    Before: outdated and unclear
                  </p>
                  <p className="flex items-center gap-2 text-emerald-100">
                    <Star className="h-4 w-4 text-emerald-200" />
                    After: premium and trusted
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
