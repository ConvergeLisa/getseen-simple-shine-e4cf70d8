import { Blocks, Globe, Search, MessageCircleMore, ServerCog, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Reveal, StaggerGroup, staggerChildVariants } from "./Reveal";

const services = [
  {
    icon: Blocks,
    title: "Website redesigns",
    desc: "Transform old, outdated sites into premium, trust-building experiences.",
  },
  {
    icon: Globe,
    title: "Landing pages",
    desc: "High-converting pages focused on one clear offer and one strong CTA.",
  },
  {
    icon: Search,
    title: "Local SEO setup",
    desc: "Foundational on-page SEO so your business can rank locally with confidence.",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp lead funnels",
    desc: "Turn website visitors into direct chats and qualified sales conversations.",
  },
  {
    icon: ServerCog,
    title: "Website hosting / care",
    desc: "Reliable hosting, updates, and support so your website stays fast and safe.",
  },
  {
    icon: Sparkles,
    title: "Before-and-after concepts",
    desc: "Visual concept previews that show exactly how your new online presence can look.",
  },
];

export function Services() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_74%,#f8f7f5_100%)] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.06),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.10),transparent_36%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Built to get your business noticed and chosen"
            description="Every service is focused on credibility, speed, and lead generation for local businesses."
          />
        </Reveal>
        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={staggerChildVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -6,
                      rotate: -0.5,
                      rotateX: 1.2,
                      boxShadow: "0 25px 70px rgba(0,0,0,0.08), 0 10px 40px rgba(0,255,200,0.12)",
                    }
              }
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-smooth"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-300/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ animationDelay: `${i * 80}ms` }}
              />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-[5.5rem] w-[12.5rem] rotate-[-15deg] bg-gradient-to-r from-transparent via-lime-200/16 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent transition-transform duration-700 group-hover:translate-x-[140%]" />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/45 bg-slate-900 text-cyan-200 shadow-lg shadow-cyan-900/15">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-[#0b0f14]">{title}</h3>
                <p className="mt-3 leading-relaxed text-[#5b6b7a]">{desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
